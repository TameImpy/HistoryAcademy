export interface TokenPayload {
  userId: string;
  email: string;
  externalId: string;
}

export interface AuthProvider {
  verifyToken(token: string): Promise<TokenPayload | null>;
}
