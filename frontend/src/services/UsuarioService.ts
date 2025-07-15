export async function getUsuario(id: string) {
  // Exemplo de futura chamada com axios:
  // const { data } = await axios.get(`/api/usuarios/${id}`);
  return {
    id,
    nome: "",
    username: "",
    biografia: "",
    amigos: 0,
    posts: 0,
  };
}

export async function atualizarUsuario(id: string, dados: any) {
  // Exemplo de futura chamada com axios:
  // const { data } = await axios.put(`/api/usuarios/${id}`, dados);
  return dados;
}

export async function deletarUsuario(id: string) {
  // Exemplo de futura chamada com axios:
  // await axios.delete(`/api/usuarios/${id}`);
  return;
}
