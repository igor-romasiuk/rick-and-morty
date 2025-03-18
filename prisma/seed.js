const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Verifying database connection...');
  try {
    await prisma.$connect();
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    console.log('Seed script completed successfully.');
  })
  .catch(async (e) => {
    console.error('Seed script failed:', e);
    process.exit(1);
  }); 