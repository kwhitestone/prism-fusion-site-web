/** Site-owned logout API contract. Credentials are never persisted by the addon. */
export interface CasdoorLogoutRequest {
  refreshToken: string;
}

export interface CasdoorLogoutResponse {
  code: number;
  message: string;
}
