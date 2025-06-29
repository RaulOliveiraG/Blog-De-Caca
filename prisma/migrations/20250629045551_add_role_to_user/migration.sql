/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha_hash` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Made the column `nome` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `foto_perfil` VARCHAR(191) NULL,
    ADD COLUMN `nickname` VARCHAR(191) NOT NULL,
    ADD COLUMN `numero_telefone` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    ADD COLUMN `senha_hash` VARCHAR(191) NOT NULL,
    MODIFY `nome` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `usuario_cpf_key` ON `usuario`(`cpf`);
