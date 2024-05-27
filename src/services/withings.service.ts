import { redirect } from "next/dist/server/api-utils";
import crypto from "crypto";
enum Action {
  GET_NONCE = "getnonce",
  GET_REQUEST_TOKEN = "requesttoken",
  REVOKE = "revoke",
  DEMO_ACCESS = "getdemoaccess",
}
interface SignatureResult {
  signature: string;
  timestamp: number;
}

interface NonceResponse {
  status: number;
  body: {
    nonce: string;
  };
}

interface RequestTokenResponse {
  status: number;
  body: {
    userid: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    csrf_token: string;
    token_type: string;
  };
}

export class WithingsService {
  private static readonly API_URL = "https://wbsapi.withings.net";
  private static readonly AUTH_URL = "https://account.withings.com/oauth2_user/authorize2";
  private static readonly REDIRECT_URL = "https://localhost:3000/auth/withings/callback";

  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async getDemoAccountAccess() {
    const nonce = await this.getNonce();
    const { signature } = this.generateSignature(Action.DEMO_ACCESS);
    const url = `${WithingsService.API_URL}/v2/oauth2`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: Action.DEMO_ACCESS,
        client_id: this.clientId,
        nonce,
        signature,
        scope_oauth2: "user.activity,user.metrics", //A comma-separated list of permission scopes you want to ask your user for (see the Index Data API section to know which scope you should use). https://developer.withings.com/developer-guide/v3/data-api/all-available-health-data/
      }),
    });

    const result = await response.json();
    /*
    {
  "status": 0,
  "body": {
    "access_token": "a075f8c14fb8df40b08ebc8508533dc332a6910a",
    "refresh_token": "f631236f02b991810feb774765b6ae8e6c6839ca",
    "expires_in": 10800
  }
}
    */

    console.log({ result });

    if (!response.ok) {
      throw new Error("Failed to get access token");
    }

    return result;
  }

  async revokeUserAccess(userid: string) {
    const nonce = await this.getNonce();
    const { signature } = this.generateSignature(Action.REVOKE);
    const url = `${WithingsService.API_URL}/v2/oauth2`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: Action.REVOKE,
        client_id: this.clientId,
        nonce,
        signature,
        userid,
      }),
    });

    const result = await response.json();
    /*
    {
        "status": 0,
        "body": { }
    }    
    */

    console.log({ result });

    if (!response.ok) {
      throw new Error("Failed to get access token");
    }

    return result;
  }
  async getRequestToken(code: string) {
    const url = `${WithingsService.API_URL}/v2/oauth2`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: Action.GET_REQUEST_TOKEN,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: WithingsService.REDIRECT_URL,
      }),
    });

    const result = (await response.json()) as RequestTokenResponse;

    console.log({ result });

    if (!response.ok) {
      throw new Error("Failed to get access token");
    }

    return result;
  }

  async getNonce(): Promise<string> {
    const { signature, timestamp } = this.generateSignature(Action.GET_NONCE);

    const url = `${WithingsService.API_URL}/v2/signature`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: Action.GET_NONCE,
        client_id: this.clientId,
        timestamp,
        signature,
      }),
    });

    const result = (await response.json()) as NonceResponse;

    if (!response.ok) {
      throw new Error("Failed to get nonce");
    }

    return result.body.nonce;
  }

  getAuthCodeUrl(state: string): string {
    const queryParams = new URLSearchParams({
      response_type: "code",
      client_id: this.clientId,
      state,
      scope: "user.info,user.metrics,user.activity",
      redirect_uri: WithingsService.REDIRECT_URL,
    });

    return `${WithingsService.AUTH_URL}?${queryParams.toString()}`;
  }

  /**
   * Calculatest the payload signature for the request
   * @param action the action to sign
   * @returns a signature and timestamp
   */
  private generateSignature(action: Action): SignatureResult {
    if (!this.clientSecret) {
      throw new Error("Client secret is null");
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const params = { action, client_id: this.clientId, timestamp };
    const sortedParams = this.sortParams(params);

    const concatenatedValues = sortedParams.map(([, value]) => value).join(",");

    const hmac = crypto.createHmac("sha256", this.clientSecret);
    hmac.update(concatenatedValues);

    return { signature: hmac.digest("hex"), timestamp };
  }

  private sortParams(params: { [key: string]: string | number }): [string, string | number][] {
    return Object.entries(params).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  }
}
