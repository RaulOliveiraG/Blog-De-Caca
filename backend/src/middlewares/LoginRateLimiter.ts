// importa os tipos do Express
import { Request, Response, NextFunction } from 'express';

// define a estrutura dos dados de tentativas
interface DadosTentativas {
  tentativas: number;       // número de tentativas feitas
  ultimaTentativa: number;  // horário da última tentativa (em milissegundos)
}

// cria uma estrutura em memória para guardar as tentativas por e-mail
const tentativasLogin: Map<string, DadosTentativas> = new Map();

// número máximo de tentativas permitidas
const MAXIMO_TENTATIVAS = 5;

// tempo de bloqueio após exceder o limite (15 minutos em milissegundos)
const TEMPO_BLOQUEIO = 15 * 60 * 1000;

// middleware que verifica se o usuário está bloqueado por muitas tentativas
export function LimitadorTentativasLogin(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body; // pega o e-mail do corpo da requisição

  // se não foi enviado e-mail, retorna erro
  if (!email) {
    return res.status(400).json({ erro: 'O campo de e-mail é obrigatório.' });
  }

  // busca os dados salvos de tentativas desse e-mail
  const dados = tentativasLogin.get(email);

  const agora = Date.now(); // pega o horário atual

  if (dados) {
    // verifica se já passou do limite de tentativas
    if (dados.tentativas >= MAXIMO_TENTATIVAS) {
      const tempoDesdeUltima = agora - dados.ultimaTentativa;

      // se o tempo de bloqueio ainda não passou, retorna erro
      if (tempoDesdeUltima < TEMPO_BLOQUEIO) {
        const tempoRestante = Math.ceil((TEMPO_BLOQUEIO - tempoDesdeUltima) / 1000);

        return res.status(429).json({
          erro: `Muitas tentativas inválidas. Tente novamente em ${tempoRestante} segundos.`,
        });
      } else {
        // se o tempo de bloqueio já passou, remove os dados e deixa tentar novamente
        tentativasLogin.delete(email);
      }
    }
  }

  // segue para o próximo middleware se estiver tudo certo
  next();
}

// função que adiciona uma tentativa ao e-mail
export function adicionarTentativa(email: string) {
  const agora = Date.now();
  const dadosExistentes = tentativasLogin.get(email);

  if (dadosExistentes) {
    // se já existe, aumenta o número de tentativas e atualiza o horário
    tentativasLogin.set(email, {
      tentativas: dadosExistentes.tentativas + 1,
      ultimaTentativa: agora,
    });
  } else {
    // se é a primeira tentativa, cria um novo registro
    tentativasLogin.set(email, {
      tentativas: 1,
      ultimaTentativa: agora,
    });
  }
}

// função que limpa as tentativas após login bem-sucedido
export function limparTentativas(email: string) {
  tentativasLogin.delete(email);
}