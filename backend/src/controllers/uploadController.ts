import { Request, Response } from 'express';

export const uploadController = {
  upload: (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
      }
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      return res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
      return res.status(500).json({ message: 'Erro interno ao fazer upload da imagem.' });
    }
  },
};