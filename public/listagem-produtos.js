document.addEventListener("DOMContentLoaded", async () => {
  const produtosListaDiv = document.getElementById("produtos-lista");

  try {
    const response = await fetch("http://localhost:3000/api/products");
    const result = await response.json();

    if (response.ok) {
      produtosListaDiv.innerHTML = ""; // Limpa a mensagem de carregamento

      if (result.length === 0) {
        produtosListaDiv.innerHTML =
          '<p class="loading">Nenhum produto encontrado.</p>';
        return;
      }

      result.forEach((produto) => {
        const produtoCard = document.createElement("div");
        produtoCard.classList.add("produto-card");

        // <<<<<<<<<<<<<<<<<<<<<<< AQUI ESTÁ A CORREÇÃO >>>>>>>>>>>>>>>>>>>>>>>>>>
        // Converta 'produto.preco' para um número (float) antes de usar toFixed()
        const precoNumerico = parseFloat(produto.preco);

        produtoCard.innerHTML = `
                    <h2>${produto.nome}</h2>
                    <p>Preço: <span class="preco">R$ ${
                      precoNumerico // Use a variável numérica
                        ? precoNumerico.toFixed(2).replace(".", ",")
                        : "N/A"
                    }</span></p>
                    <p>Quantidade: ${produto.quantidade || 0}</p>
                    <p class="categoria">Categoria: ${
                      produto.categoria || "N/A"
                    }</p>
                `;
        produtosListaDiv.appendChild(produtoCard);
      });
    } else {
      produtosListaDiv.innerHTML = `<p class="erro">Erro ao carregar produtos: ${
        result.message || "Erro desconhecido"
      }</p>`;
      console.error("Erro na resposta da API:", result);
    }
  } catch (error) {
    produtosListaDiv.innerHTML =
      '<p class="erro">Erro de conexão com o servidor. Verifique se a API está rodando.</p>';
    console.error("Erro ao buscar produtos:", error);
  }
});
