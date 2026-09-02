document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('input[type="search"]');
    const searchIcon = document.getElementById('searchIcon');

    if (searchInput && searchIcon) {
        function executarBusca() {
            window.location.href = '/livros?search=' + encodeURIComponent(searchInput.value);
        }
        searchIcon.addEventListener('click', executarBusca);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') executarBusca();
        });
    }

    const selectElement = document.getElementById('id');
    if (selectElement) {
        fetch('/livrosDoUsuario')
            .then(response => response.json())
            .then(livros => {
                livros.forEach(livro => {
                    const option = document.createElement('option');
                    option.value = livro.id_livro;
                    option.textContent = `${livro.id_livro} - ${livro.titulo}`;
                    selectElement.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao buscar livros:', error));
    }
});