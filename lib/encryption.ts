export type EncryptionResult = {
  data: string;
  encrypted: boolean;
};

export function encryptForCleanverse(payload: unknown): EncryptionResult {
  /*
   * TODO: Replace this placeholder with the exact Cleanverse AES/CBC routine
   * once the encryption spec, IV handling, padding mode, and key derivation
   * details are available.
   */
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64");

  return {
    data: encoded,
    encrypted: false,
  };
}
