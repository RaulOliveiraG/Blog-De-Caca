import { Router } from 'express';
import { uploadController } from '../controllers/uploadController';
import { authMiddleware } from '../middlewares/authMiddleware';
import upload from '../middlewares/uploadMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Rota para upload de arquivos
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Faz upload de uma imagem
 *     tags: [Upload]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: URL da imagem enviada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *       400:
 *         description: Nenhum arquivo enviado.
 */
router.post('/upload', authMiddleware, upload.single('image'), uploadController.upload);

export default router;