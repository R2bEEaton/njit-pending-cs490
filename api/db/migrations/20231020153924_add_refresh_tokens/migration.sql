-- AlterTable
ALTER TABLE "Identity" ADD COLUMN     "refreshExpiry" TIMESTAMP(3),
ADD COLUMN     "refreshToken" TEXT;
