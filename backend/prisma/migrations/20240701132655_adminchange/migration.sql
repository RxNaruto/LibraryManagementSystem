/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "admin_adminId_key" ON "admin"("adminId");
