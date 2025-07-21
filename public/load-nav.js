document.addEventListener("DOMContentLoaded", async () => {
  const navContainer = document.getElementById("nav-placeholder");

  // Verifica se o container para o NAV existe na página atual
  if (navContainer) {
    try {
      const response = await fetch("/nav.html"); // Requisição para o arquivo nav.html
      if (response.ok) {
        const navHtml = await response.text(); // Pega o conteúdo HTML como texto
        navContainer.innerHTML = navHtml; // Insere o HTML do NAV no container
      } else {
        console.error(
          "Erro ao carregar o arquivo de navegação:",
          response.statusText
        );
        navContainer.innerHTML =
          '<p style="color: red;">Erro ao carregar navegação.</p>';
      }
    } catch (error) {
      console.error("Erro de rede ao carregar o arquivo de navegação:", error);
      navContainer.innerHTML =
        '<p style="color: red;">Erro de conexão para carregar navegação.</p>';
    }
  }
});
