import { randomUUID } from "crypto";
import { demoAgent } from "@/lib/demo-data";
import { encryptForCleanverse } from "@/lib/encryption";

type CleanverseCallOptions = {
  encrypted?: boolean;
  allowMock?: boolean;
};

type CleanverseResult<T> = {
  ok: boolean;
  mocked: boolean;
  endpoint: string;
  requestId: string;
  response: {
    code: string;
    message: string;
    data?: T;
  };
};

const baseUrl =
  process.env.CLEANVERSE_BASE_URL ??
  "https://uatapi.cleanverse.com/api/cooperate";

function hasCredentials() {
  return Boolean(process.env.CLEANVERSE_API_ID && process.env.CLEANVERSE_API_KEY);
}

async function cleanverseCall<T>(
  endpoint: string,
  body: unknown,
  fallbackData: T,
  options: CleanverseCallOptions = {}
): Promise<CleanverseResult<T>> {
  const requestId = randomUUID();
  const canCall = hasCredentials();

  if (!canCall) {
    return {
      ok: true,
      mocked: true,
      endpoint,
      requestId,
      response: {
        code: "DEMO",
        message: "Demo response. Add Cleanverse credentials to .env.local for live calls.",
        data: fallbackData,
      },
    };
  }

  const payload = options.encrypted ? { data: encryptForCleanverse(body).data } : body;
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-id": process.env.CLEANVERSE_API_ID!,
      "api-key": process.env.CLEANVERSE_API_KEY!,
      "X-Request-ID": requestId,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const json = await response.json().catch(() => ({
    code: String(response.status),
    message: response.statusText,
  }));

  if (!response.ok && options.allowMock) {
    return {
      ok: true,
      mocked: true,
      endpoint,
      requestId,
      response: {
        code: "DEMO",
        message: `Live ${endpoint} call was unavailable, so the demo used a local result.`,
        data: fallbackData,
      },
    };
  }

  return {
    ok: response.ok && json.code === "0000",
    mocked: false,
    endpoint,
    requestId,
    response: json,
  };
}

export function generateApass(override = false) {
  const body = {
    customerId: demoAgent.customerId,
    kycSource: "AGENTPAY_GUARDIAN_DEMO",
    kycId: demoAgent.agentId,
    subTier: 1,
    subGroup: "AG",
    override,
    expirationTime: 1863690034,
    wallet: {
      address: demoAgent.walletAddress,
      chain: demoAgent.chain,
    },
    identityDataList: [
      {
        idType: "PASSPORT",
        fullName: demoAgent.builderName,
        idNumber: "A123456789",
        validUntil: "2030-12-31",
        issuingCountryISO2: "US",
      },
    ],
    bankAccountList: [],
  };

  return cleanverseCall(
    "/generate_apass",
    body,
    {
      customerId: demoAgent.customerId,
      cvRecordId: "2018959227867381760",
      tier: "3",
      wallet: {
        operate: "update",
        address: demoAgent.walletAddress,
        chain: demoAgent.chain,
        txHash: demoAgent.transactionHash,
      },
    },
    { encrypted: true }
  );
}

export async function generateApassWithRetry() {
  const first = await generateApass(false);

  if (first.response.code === "1000") {
    return generateApass(true);
  }

  return first;
}

export function queryApassRules() {
  return cleanverseCall(
    "/atoken/rules",
    {
      chain: demoAgent.chain,
      atoken_address: demoAgent.atokenAddress,
    },
    {
      chain: demoAgent.chain,
      rules: [
        {
          allowed_group: "",
          allowed_sub_group: "AG",
          min_tier: 30,
          min_sub_tier: 0,
        },
      ],
      atoken_address: demoAgent.atokenAddress,
    }
  );
}

export function queryApassPaused() {
  return cleanverseCall(
    "/atoken/is_paused",
    {
      chain: demoAgent.chain,
      atoken_address: demoAgent.atokenAddress,
    },
    {
      chain: demoAgent.chain,
      paused: false,
      atoken_address: demoAgent.atokenAddress,
    }
  );
}

export function verifyValidatorCompliance() {
  return cleanverseCall(
    "/validator/verify",
    {
      chain: demoAgent.chain,
      contract_address: demoAgent.poolContractAddress,
      user_address: demoAgent.walletAddress,
    },
    {
      chain: demoAgent.chain,
      contract_address: demoAgent.poolContractAddress,
      user_address: demoAgent.walletAddress,
      valid: true,
    },
    { allowMock: true }
  );
}
