export const demoAgent = {
  agentName: "PayBot Alpha",
  builderName: "Gift",
  agentId: "AGENT001GIFT",
  customerId: "AGENT001GIFT9",
  walletAddress: "0x8E6B0C8E05C7A5fA7aF0a3Bcb7844B9747622E91",
  chain: "monad",
  atokenAddress: "0xA700000000000000000000000000000000000123",
  poolContractAddress: "0xC000000000000000000000000000000000000321",
  merchant: "Monad Hackathon Treasury",
  amount: "450.00",
  currency: "USDC",
  purpose: "Autonomous vendor payment for hackathon infrastructure",
  transactionLimit: "2,000",
  riskLevel: "Low Risk",
  transactionHash: "0xmonad-agentpay-guardian",
};

export const complianceChecklist = [
  ["Agent identity verified", "Passed"],
  ["A-Pass status active", "Passed"],
  ["A-Token rule valid", "Passed"],
  ["Amount within limit", "Passed"],
  ["Travel Rule data available", "Passed"],
  ["AML risk score low", "Passed"],
  ["Audit log created", "Passed"],
] as const;

export const cleanverseIntegrations = [
  ["A-Pass", "Identity verification", "Real Cleanverse API Call"],
  ["A-Token", "Compliance-based payment authorization", "Real Cleanverse API Call"],
  ["Validator", "Compliance eligibility check", "Real Cleanverse API Call"],
  ["Monad", "Transaction record and audit trail", "Demo Mock"],
] as const;
