-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);
