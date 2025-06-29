export async function recuperarSenha(email: string) {
  try {
    const response = await fetch("http://localhost:3000/recuperar-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao recuperar senha.");
    }

    return await response.json();
  } catch (err) {
    console.error("Erro na recuperação de senha:", err);
    throw err;
  }
}
