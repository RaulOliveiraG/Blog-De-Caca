// --- ARQUIVO: backend/src/middlewares/LoginRateLimiter.ts ---

import { Request, Response, NextFunction } from 'express';

interface DadosTentativas {
  tentativas: number;
  ultimaTentativa: number;
}

const tentativasLogin: Map<string, DadosTentativas> = new Map();
const MAXIMO_TENTATIVAS = 5;
const TEMPO_BLOQUEIO = 15 * 60 * 1000;

setInterval(() => {
  const agora = Date.now();
  for (const [key, dados] of tentativasLogin.entries()) {
    if (agora - dados.ultimaTentativa > TEMPO_BLOQUEIO) {
      tentativasLogin.delete(key);
      console.log(`[Rate Limiter] Chave expirada e removida: ${key}`);
    }
  }
}, TEMPO_BLOQUEIO);

function getRequestKey(req: Request): string | null {
  const ip = (req.headers['x-forwarded-for'] as string) || req.ip;
  return ip || null;
}

export function LimitadorTentativasLogin(req: Request, res: Response, next: NextFunction) {
  const chave = getRequestKey(req);

  if (!chave) {
    console.warn('[Rate Limiter] Não foi possível determinar o IP. Pulando a verificação.');
    return next();
  }
  
  console.log(`[Rate Limiter] Verificando requisição para a chave: ${chave}`);

  const dados = tentativasLogin.get(chave);
  const agora = Date.now();

  if (dados && dados.tentativas >= MAXIMO_TENTATIVAS) {
    const tempoDesdeUltima = agora - dados.ultimaTentativa;

    if (tempoDesdeUltima < TEMPO_BLOQUEIO) {
      const tempoRestante = Math.ceil((TEMPO_BLOQUEIO - tempoDesdeUltima) / 1000);
      console.warn(`[Rate Limiter] Requisição BLOQUEADA para a chave: ${chave}. Tente novamente em ${tempoRestante}s.`);
      return res.status(429).json({
        erro: `Muitas tentativas inválidas. Tente novamente em ${tempoRestante} segundos.`,
      });
    } else {
      tentativasLogin.delete(chave);
      console.log(`[Rate Limiter] Bloqueio expirado para a chave: ${chave}.`);
    }
  }

  next();
}

export function adicionarTentativa(req: Request) {
  const chave = getRequestKey(req);
  if (!chave) return; // Não adiciona tentativa se não houver chave

  const agora = Date.now();
  const dadosExistentes = tentativasLogin.get(chave);
  const novasTentativas = (dadosExistentes?.tentativas || 0) + 1;
  
  console.log(`[Rate Limiter] Adicionando tentativa #${novasTentativas} para a chave: ${chave}`);

  tentativasLogin.set(chave, {
    tentativas: novasTentativas,
    ultimaTentativa: agora,
  });
}

export function limparTentativas(req: Request) {
  const chave = getRequestKey(req);
  if (!chave) return; // Não limpa se não houver chave

  console.log(`[Rate Limiter] Limpando tentativas para a chave: ${chave}`);
  tentativasLogin.delete(chave);
}