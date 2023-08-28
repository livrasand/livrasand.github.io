// Obtén una referencia al contenedor de publicaciones
const publicationsContainer = document.getElementById('publications-container');

// Realiza una solicitud HTTP para obtener el JSON
fetch('https://raw.githubusercontent.com/livrasand/Reviw/main/publications.json')
  .then(response => response.json())
  .then(jsonData => {
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
