export type GateRecord = {
  id: string;
  name: string;
  description: string;
  network: "preview" | "preprod" | "mainnet" | "undeployed";
  contractId: string | null;
  deploymentTxId: string | null;
  status: "draft" | "published";
  oneTimeProof: boolean;
  contractVersion: "credential-hash-v2";
};

const STORAGE_KEY = "vaultpass_gates";

export const DEFAULT_GATE: GateRecord = {
  id: "genesis",
  name: "Genesis Vault",
  description: "A private launch room for approved VaultPass members.",
  network: "preview",
  contractId: null,
  deploymentTxId: null,
  status: "draft",
  oneTimeProof: true,
  contractVersion: "credential-hash-v2",
};

export type GateSearchParams = {
  gate?: string | null;
  contract?: string | null;
  name?: string | null;
  description?: string | null;
  network?: string | null;
};

function isGate(value: unknown): value is GateRecord {
  if (!value || typeof value !== "object") return false;
  const gate = value as Partial<GateRecord>;
  return typeof gate.id === "string" && typeof gate.name === "string" &&
    typeof gate.description === "string" &&
    (typeof gate.contractId === "string" || gate.contractId === null) &&
    gate.contractVersion === "credential-hash-v2";
}

/**
 * Normalize contract address to lowercase bare hex (no 0x).
 * Midnight JS / Compact reject a 0x prefix on contractAddress; explorer helpers re-add 0x for URLs.
 */
export function normalizeContractId(value: string): string {
  return value.trim().replace(/^0x/i, "").toLowerCase();
}

/** Canonical storage / share-link form: bare hex (matches chain SDK). */
export function formatContractId(value: string): string {
  return normalizeContractId(value);
}

/**
 * Accept even-length hex with optional 0x.
 * Deployed addresses are commonly 32 bytes (64 hex) but can vary by encoding — keep flexible.
 */
export function isValidContractId(value: string): boolean {
  const hex = normalizeContractId(value);
  return /^[0-9a-f]{32,128}$/.test(hex) && hex.length % 2 === 0;
}

/** Stable gate id derived from contract so URL and storage stay linked. */
export function gateIdFromContract(contractId: string): string {
  const hex = normalizeContractId(contractId);
  return `gate-${hex.slice(0, 12)}`;
}

export function getGates(): GateRecord[] {
  if (typeof window === "undefined") return [DEFAULT_GATE];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    const gates = Array.isArray(parsed) ? parsed.filter(isGate) : [];
    return gates.length > 0 ? gates : [DEFAULT_GATE];
  } catch {
    return [DEFAULT_GATE];
  }
}

export function getGate(id = DEFAULT_GATE.id): GateRecord {
  return getGates().find((gate) => gate.id === id) ?? DEFAULT_GATE;
}

export function getGateByContractId(contractId: string): GateRecord | null {
  const target = normalizeContractId(contractId);
  if (!target) return null;
  return getGates().find((gate) => gate.contractId && normalizeContractId(gate.contractId) === target) ?? null;
}

export function saveGate(gate: GateRecord): void {
  if (typeof window === "undefined") return;
  const gates = getGates().filter((item) => item.id !== gate.id);
  // Also drop any other record pointing at the same contract to avoid duplicates.
  const filtered = gates.filter((item) => {
    if (!item.contractId || !gate.contractId) return true;
    return normalizeContractId(item.contractId) !== normalizeContractId(gate.contractId);
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...filtered, gate]));
}

/**
 * Restore or attach an already-deployed on-chain gate into local storage.
 * Use after clearing browser data or switching devices.
 */
export function restorePublishedGate(input: {
  contractId: string;
  name?: string;
  description?: string;
  network?: GateRecord["network"];
  deploymentTxId?: string | null;
  id?: string;
}): GateRecord {
  if (!isValidContractId(input.contractId)) {
    throw new Error("INVALID_CONTRACT_ID");
  }
  const contractId = formatContractId(input.contractId);
  const existing = getGateByContractId(contractId);
  const id = input.id ?? existing?.id ?? gateIdFromContract(contractId);
  const previous = existing ?? getGate(id);

  const restored: GateRecord = {
    id,
    name: (input.name?.trim() || previous.name || DEFAULT_GATE.name).slice(0, 80),
    description: (input.description?.trim() || previous.description || DEFAULT_GATE.description).slice(0, 500),
    network: input.network ?? previous.network ?? "preview",
    contractId,
    deploymentTxId: input.deploymentTxId ?? previous.deploymentTxId ?? null,
    status: "published",
    oneTimeProof: previous.oneTimeProof ?? true,
    contractVersion: "credential-hash-v2",
  };
  saveGate(restored);
  return restored;
}

/**
 * Resolve gate for member/admin pages from URL + localStorage.
 * Prefer URL contract param so links work without the deployer's browser storage.
 */
export function resolveGate(params: GateSearchParams = {}): GateRecord {
  const contractParam = params.contract?.trim() || null;
  const gateParam = params.gate?.trim() || null;

  if (contractParam && isValidContractId(contractParam)) {
    const contractId = formatContractId(contractParam);
    const fromStore = getGateByContractId(contractId);
    const name = params.name?.trim() || fromStore?.name || DEFAULT_GATE.name;
    const description = params.description?.trim() || fromStore?.description || DEFAULT_GATE.description;
    const network =
      params.network === "preprod" || params.network === "mainnet" || params.network === "preview" || params.network === "undeployed"
        ? params.network
        : fromStore?.network ?? "preview";

    const resolved: GateRecord = {
      id: fromStore?.id ?? gateParam ?? gateIdFromContract(contractId),
      name,
      description,
      network,
      contractId,
      deploymentTxId: fromStore?.deploymentTxId ?? null,
      status: "published",
      oneTimeProof: fromStore?.oneTimeProof ?? true,
      contractVersion: "credential-hash-v2",
    };

    // Persist so Admin / Vault stay in sync after opening a share link.
    if (typeof window !== "undefined") {
      saveGate(resolved);
    }
    return resolved;
  }

  if (gateParam) {
    return getGate(gateParam);
  }

  return getGate(DEFAULT_GATE.id);
}

/** Member/admin share link — embeds contract when published so restore is not required. */
export function gateUrl(gate: GateRecord): string {
  const params = new URLSearchParams();
  params.set("gate", gate.id);
  if (gate.contractId) {
    params.set("contract", normalizeContractId(gate.contractId));
  }
  if (gate.name && gate.name !== DEFAULT_GATE.name) {
    params.set("name", gate.name);
  }
  if (gate.network && gate.network !== "preview") {
    params.set("network", gate.network);
  }
  return `/gate?${params.toString()}`;
}

export function vaultUrl(gate: GateRecord): string {
  const params = new URLSearchParams();
  params.set("gate", gate.id);
  if (gate.contractId) {
    params.set("contract", normalizeContractId(gate.contractId));
  }
  return `/vault?${params.toString()}`;
}

export function shorten(value: string | null, visible = 10): string {
  if (!value) return "Not deployed";
  if (value.length <= visible * 2) return value;
  return `${value.slice(0, visible)}...${value.slice(-visible)}`;
}
