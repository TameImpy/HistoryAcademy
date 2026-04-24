import { verifyToken } from "@clerk/fastify";
import type { AuthProvider, TokenPayload } from "./provider.js";

export class ClerkAuthProvider implements AuthProvider {
  private secretKey: string;

  constructor(secretKey?: string) {
    this.secretKey = secretKey ?? process.env.CLERK_SECRET_KEY ?? "";
  }

  async verifyToken(token: string): Promise<TokenPayload | null> {
    try {
      const payload = await verifyToken(token, {
        secretKey: this.secretKey,
      });

      return {
        userId: payload.sub,
        email: ((payload as Record<string, unknown>).email as string) ?? "",
        externalId: payload.sub,
      };
    } catch {
      return null;
    }
  }
}
