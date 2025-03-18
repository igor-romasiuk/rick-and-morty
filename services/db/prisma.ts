import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

export let db: PrismaClient;

const logConnectionIssue = (error: Error) => {
  console.error("Prisma connection error:", error);
  console.error("DATABASE_URL is set:", Boolean(process.env.DATABASE_URL));
  if (process.env.NODE_ENV === "production") {
    console.error("Check your Vercel environment variables");
  }
};

try {
  if (process.env.NODE_ENV === "production") {
    db = new PrismaClient();
  } else {
    if (!global.cachedPrisma) {
      global.cachedPrisma = new PrismaClient();
    }
    db = global.cachedPrisma;
  }
  
  db.$connect()
    .then(() => {
      console.log("Database connection established successfully");
    })
    .catch((error) => {
      logConnectionIssue(error);
    });
} catch (error) {
  logConnectionIssue(error as Error);
  db = new PrismaClient();
} 