// Importa os tipos necessários do Express para criar um middleware.
// Request: representa a requisição que chega do cliente.
// Response: representa a resposta que enviaremos de volta.
// NextFunction: uma função que passará o controle para o próximo middleware na fila.
import { Request, Response, NextFunction } from 'express';

// Importa a biblioteca jsonwebtoken para poder verificar e decodificar o token.
import jwt from 'jsonwebtoken';

// Importa a instância do Prisma Client, que é a nossa ponte para o banco de dados.
import prisma from '../config/database';

/**
 * TypeScript nos permite estender interfaces existentes.
 * Aqui, estamos criando uma nova interface chamada `AuthRequest` que é igual à `Request` padrão,
 * mas com uma propriedade opcional `user`.
 * Isso nos permite "anexar" os dados do usuário decodificado à requisição (`req`)
 * para que outros middlewares ou controllers possam usá-los mais tarde, se necessário.
 */
interface AuthRequest extends Request {
  user?: { userId: number };
}

/**
 * Este é o nosso middleware de autorização. Ele é uma função `async` porque precisa
 * fazer uma operação de I/O (entrada/saída) ao consultar o banco de dados,
 * o que é uma operação assíncrona.
 *
 * O objetivo deste middleware é agir como um "segurança de boate": ele verifica a identidade
 * (o token) e a permissão (a role de admin) antes de deixar a requisição entrar na "festa" (o controller).
 */
export const onlyAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // --- ETAPA 1: EXTRAIR E VALIDAR O FORMATO DO TOKEN ---

  // Pega o valor do cabeçalho 'Authorization' da requisição. É aqui que o cliente
  // deve enviar o token. Ex: "Bearer eyJhbGciOiJIUzI1Ni..."
  const authHeader = req.headers.authorization;

  // Se o cabeçalho 'Authorization' não foi enviado, o cliente nem tentou se autenticar.
  // Retornamos um erro 401 (Unauthorized) e paramos a execução.
  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  // O padrão "Bearer" separa a palavra "Bearer" do token com um espaço.
  // Usamos `split(' ')` para dividir a string em um array de duas partes.
  // Ex: "Bearer eyJ..." se torna ["Bearer", "eyJ..."].
  const parts = authHeader.split(' ');

  // Verificamos se o array tem exatamente duas partes e se a primeira parte é a palavra "Bearer".
  // Se não for, o token está mal formatado. Retornamos 401 e paramos.
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token com formato inválido.' });
  }

  // Se o formato estiver correto, a segunda parte do array (`parts[1]`) é o nosso token JWT.
  const token = parts[1];

  // --- ETAPA 2: VERIFICAR A AUTENTICIDADE E VALIDADE DO TOKEN ---

  // Usamos um bloco `try...catch` porque a função `jwt.verify` pode lançar um erro
  // se o token for inválido, expirado ou se a assinatura não corresponder ao segredo.
  try {
    // `jwt.verify` faz o trabalho pesado:
    // 1. Decodifica o token.
    // 2. Verifica a assinatura usando a nossa chave secreta (`ACCESS_TOKEN_SECRET`).
    // 3. Verifica se o token não expirou.
    // Se tudo estiver OK, ele retorna o payload que colocamos dentro do token quando o criamos.
    // Usamos `as { userId: number }` para dizer ao TypeScript qual é o formato esperado do payload.
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: number };

    // --- ETAPA 3: VERIFICAR A AUTORIZAÇÃO (PERMISSÃO) NO BANCO DE DADOS ---

    // Agora que sabemos que o token é válido e temos o ID do usuário (`decoded.userId`),
    // precisamos consultar o banco de dados para obter a informação mais atualizada sobre ele.
    // Esta é a "fonte da verdade". Nunca confie em roles ou permissões que venham dentro do token.
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    // Se não encontrarmos um usuário com esse ID no banco, algo está errado.
    // Talvez o usuário tenha sido deletado depois que o token foi gerado.
    // Retornamos 403 (Forbidden) porque, embora o token seja tecnicamente válido, o usuário não existe mais.
    if (!user) {
      return res.status(403).json({ message: 'Usuário não encontrado.' });
    }

    // Esta é a verificação de permissão crucial.
    // Comparamos a `role` do usuário que veio DO BANCO DE DADOS com a string 'ADMIN'.
    // Usamos `toUpperCase()` para tornar a comparação à prova de falhas, funcionando tanto para 'admin' quanto para 'ADMIN'.
    if (user.role.toUpperCase() !== 'ADMIN') {
      // Se o usuário não for um admin, retornamos 403 (Forbidden) e a mensagem de acesso negado.
      return res.status(403).json({ message: 'Acesso restrito apenas para administradores.' });
    }

    // --- ETAPA 4: SUCESSO! PERMITIR O ACESSO ---

    // Se o código chegou até aqui, significa que o token é válido E o usuário é um admin.
    // Opcional, mas uma boa prática: anexamos o payload decodificado ao objeto `req`.
    // Isso pode ser útil se o próximo controller precisar saber qual usuário fez a requisição.
    req.user = decoded;

    // `next()` é a função que diz ao Express: "Este middleware terminou seu trabalho.
    // Pode passar a requisição para o próximo da fila (que, neste caso, é o controller `getAllUsers`)."
    next();

  } catch (error) {
    // Se o bloco `try` falhar (por exemplo, `jwt.verify` lançar um erro),
    // o `catch` será executado. Isso significa que o token é inválido ou expirado.
    // Retornamos 401 (Unauthorized) para informar ao cliente que ele precisa se autenticar novamente.
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};