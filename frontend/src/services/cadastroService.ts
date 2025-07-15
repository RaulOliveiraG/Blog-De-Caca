export async function enviarCadastro(dados: {
  nickname: string;
  senha: string;
  cpf: string;
  nome: string;
  email: string;
  numero_telefone: string;
  foto_perfil: string
}) {
  const response = await fetch("http://localhost:3000/registro?Content-Type=application/json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao cadastrar.");
  }

  return await response.json();
}
