import { config as dotenvConfig } from "dotenv";
import { z } from "zod";

dotenvConfig();

const envSchema = z.object({
  AIRNOW_API_KEY: z.string().min(1, "AIRNOW_API_KEY must be set"),
  LOG_LEVEL: z.string().default("info"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("Invalid environment variables:", env.error.format());
  process.exit(1);
}

export const AIRNOW_API_HOSTNAME = "https://www.airnowapi.org/";
export const { AIRNOW_API_KEY, LOG_LEVEL } = env.data;
