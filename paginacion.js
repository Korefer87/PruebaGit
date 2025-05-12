 document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentPage = 0;

    function updatePagination() {
        // Mostrar solo la página actual
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === currentPage);
        });

        // Deshabilitar botones si estamos en los extremos
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === pages.length - 1;
    }

    // Eventos de los botones
    prevButton.addEventListener('click', () => {
        if (currentPage > 0) currentPage--;
        updatePagination();
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < pages.length - 1) currentPage++;
        updatePagination();
    });

    // Inicializar la paginación
    updatePagination();
});
