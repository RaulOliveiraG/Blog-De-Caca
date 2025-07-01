export async function enviarLogin(dados: { email: string; senha: string }) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro no login.");
    }

    return await response.json();
  } catch (err) {
    console.error("Erro ao enviar login:", err);
    throw err;
  }
}
