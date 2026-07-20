/**
 * On-chain verification links for Midnight networks.
 * Official community explorer partnership (Midnight Foundation):
 * - Preview: https://preview.midnightexplorer.com
 * - Testnet: https://testnet.midnightexplorer.com
 */

export type ExplorerNetwork = "preview" | "preprod" | "mainnet" | "undeployed";

const EXPLORER_BASE: Record<Exclude<ExplorerNetwork, "undeployed">, string> = {
  preview: "https://preview.midnightexplorer.com",
  preprod: "https://testnet.midnightexplorer.com",
  // Mainnet explorer host may change; keep preview pattern until brand hub updates.
  mainnet: "https://midnightexplorer.com",
};

export function explorerBaseUrl(network: ExplorerNetwork = "preview"): string | null {
  if (network === "undeployed") return null;
  return EXPLORER_BASE[network] ?? EXPLORER_BASE.preview;
}

/** Normalize hex for explorer paths (prefer 0x prefix). */
export function toExplorerHex(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return trimmed.startsWith("0x") ? trimmed : `0x${trimmed}`;
}

/**
 * Transaction detail page.
 * Example: https://preview.midnightexplorer.com/transactions/0xd5823d...
 */
export function explorerTransactionUrl(
  txId: string | null | undefined,
  network: ExplorerNetwork = "preview",
): string | null {
  if (!txId) return null;
  const base = explorerBaseUrl(network);
  if (!base) return null;
  return `${base}/transactions/${toExplorerHex(txId)}`;
}

/**
 * Contract detail page.
 * Example: https://preview.midnightexplorer.com/contracts/05668a...
 */
export function explorerContractUrl(
  contractId: string | null | undefined,
  network: ExplorerNetwork = "preview",
): string | null {
  if (!contractId) return null;
  const base = explorerBaseUrl(network);
  if (!base) return null;
  // Midnight Explorer contract pages expect the hash WITHOUT the 0x prefix.
  const hashWithout0x = contractId.trim().replace(/^0x/i, "");
  return `${base}/contracts/${hashWithout0x}`;
}

export function explorerHomeUrl(network: ExplorerNetwork = "preview"): string | null {
  return explorerBaseUrl(network);
}
