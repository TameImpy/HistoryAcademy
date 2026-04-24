import type { FastifyRequest, FastifyReply } from "fastify";
import type { AuthProvider, TokenPayload } from "./provider.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: TokenPayload;
  }
}

export function buildAuthMiddleware(provider: AuthProvider) {
  return async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const header = request.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return reply.status(401).send({ error: "Authentication required" });
    }

    const token = header.slice(7);
    const payload = await provider.verifyToken(token);

    if (!payload) {
      return reply.status(401).send({ error: "Invalid token" });
    }

    request.user = payload;
  };
}
