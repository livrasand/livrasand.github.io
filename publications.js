let jsonData; // Declarar jsonData en el ámbito global
let publicationsContainer; // Declarar publicationsContainer en el ámbito global

// Obtén una referencia al contenedor de publicaciones
publicationsContainer = document.getElementById('publications-container');

// Realiza una solicitud HTTP para obtener el JSON
fetch('https://raw.githubusercontent.com/livrasand/Reviw_Channel/main/publications.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data; // Asigna los datos JSON a la variable global jsonData

    // Genera el contenido basado en el JSON
    jsonData.forEach(publication => {
      const article = document.createElement('article');
      article.classList.add('download-source', 'svelte-35xm21');
      article.style.marginBottom = '15px';

      article.innerHTML = `
         <picture>
            <img class="download-source-icon svelte-35xm21" src="${publication.imageURL}" alt="">
         </picture>
         <div class="label-container svelte-35xm21">
            <h3 class="text-block type-title svelte-zxj483">${publication.title}</h3>
            <a href="${publication.downloadURL}" download="" target="_blank" rel="noreferrer noopener" class="svelte-35xm21">
               Descargar
            </a>
         </div>
      `;

      publicationsContainer.appendChild(article);
    });
  })
  .catch(error => {
    console.error('Error cargando el JSON:', error);
  });

function searchPublications() {
  // Obtén el valor ingresado en el cuadro de búsqueda
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.toLowerCase();

  // Limpia el contenido actual del contenedor
  publicationsContainer.innerHTML = '';

  // Verifica que jsonData esté definida y no sea nula
  if (jsonData) {
    // Filtra las publicaciones que coincidan con el término de búsqueda
    jsonData.forEach(publication => {
      if (publication.title.toLowerCase().includes(searchTerm)) {
        const article = document.createElement('article');
        article.classList.add('download-source', 'svelte-35xm21');
        article.style.marginBottom = '15px';

        article.innerHTML = `
           <picture>
              <img class="download-source-icon svelte-35xm21" src="${publication.imageURL}" alt="">
           </picture>
           <div class="label-container svelte-35xm21">
              <h3 class="text-block type-title svelte-zxj483">${publication.title}</h3>
              <a href="${publication.downloadURL}" download="" target="_blank" rel="noreferrer noopener" class="svelte-35xm21">
                 Descargar
              </a>
           </div>
        `;

        publicationsContainer.appendChild(article);
      }
    });
  }
}
