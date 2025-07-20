document
  .getElementById("produtosForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const messageDiv = document.getElementById("message");
    messageDiv.className = ""; // Limpa classes anteriores
    messageDiv.textContent = ""; // Limpa mensagens anteriores

    const formData = {
      nome: document.getElementById("nome").value,
      preco: parseFloat(document.getElementById("preco").value),
      quantidade: parseInt(document.getElementById("quantidade").value),
      categoria: document.getElementById("categoria").value || null, // Envia null se vazio
    };

    try {
      // Corrija a URL: de "/api/produtos" para "/api/products"
      const response = await fetch("http://localhost:3000/api/products", {
        // <<<<<<<<< AQUI ESTÁ A CORREÇÃO
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        messageDiv.classList.add("success");
        messageDiv.textContent = `Sucesso: ${
          result.message || "Produto adicionado!"
        }`;
        document.getElementById("produtosForm").reset(); // Limpa o formulário
      } else {
        messageDiv.classList.add("error");
        messageDiv.textContent = `Erro: ${result.error || "Algo deu errado."}`;
        console.error("Erro na resposta da API:", result);
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      messageDiv.classList.add("error");
      messageDiv.textContent =
        "Erro de conexão com o servidor. Verifique se a API está rodando.";
    }
  });
