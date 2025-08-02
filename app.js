document.getElementById("generate").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const language = document.getElementById("language").value;
  const fullPrompt = `Escribe código en ${language} para: ${prompt}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer TU_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: fullPrompt }]
    })
  });

  const data = await response.json();
  const code = data.choices?.[0]?.message?.content || "Error al generar código";

  document.querySelector("#result code").textContent = code;
});
