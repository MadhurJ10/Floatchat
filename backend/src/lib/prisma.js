import { PrismaClient } from '../generated/prisma/index.js'; // <-- note the relative path and .js extension

const prisma = new PrismaClient();

export default prisma;
