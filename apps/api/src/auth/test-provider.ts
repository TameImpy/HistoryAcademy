import type { AuthProvider, TokenPayload } from "./provider.js";

const TEST_USERS: Record<string, TokenPayload> = {
  "test-valid-token": {
    userId: "user_1",
    email: "test@example.com",
    externalId: "clerk_test_1",
  },
};

export class TestAuthProvider implements AuthProvider {
  async verifyToken(token: string): Promise<TokenPayload | null> {
    return TEST_USERS[token] ?? null;
  }
}
