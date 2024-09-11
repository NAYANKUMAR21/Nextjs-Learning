import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;
}
export const prisma: PrismaClient = global.prisma || new PrismaClient();

