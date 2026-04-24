import { buildApp } from "./app.js";
import { ClerkAuthProvider } from "./auth/clerk-provider.js";

const isProduction = process.env.NODE_ENV === "production";

const app = buildApp({
  authProvider: isProduction ? new ClerkAuthProvider() : undefined,
});

const start = async () => {
  const port = Number(process.env.PORT) || 3000;
  await app.listen({ port, host: "0.0.0.0" });
  console.log(`API listening on port ${port}`);
};

start();
