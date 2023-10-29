let jsonData; // Declarar jsonData en el ámbito global
let publicationsContainer; // Declarar publicationsContainer en el ámbito global

// Obtén una referencia al contenedor de publicaciones
publicationsContainer = document.getElementById('publications-container');

// Realiza una solicitud HTTP para obtener el JSON
fetch('https://raw.githubusercontent.com/livrasand/Reviw/main/repository/publications.json')
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
<div class="label-container svelte-35xm21" style="display: flex; justify-content: space-between; align-items: left;">
  <h3 class="text-block type-title svelte-zxj483">${publication.title}</h3>
  <div class="mb-2">
  <span style="margin-left:2px;margin-right:5px;color: rgba(0,0,0,.7); font-weight: 600; font-family: 'Fira Mono', 'Andale Mono', 'Consolas', monospace; letter-spacing: 0px; font-size: 12px;">${publication.author}</span>
  <a class="button style-hyperlink svelte-nqc07q" style="background:#231f20;color:#fff;font-size:10px;border-radius:180px;padding:0 10px 0 10px;" href="${publication.downloadURL}" download="" target="_blank" rel="noreferrer noopener" role="button" onclick="registerDownload('${publication.title}')">
      <span>Descargar</span>
    </a>
    <span style="margin-left:4px;" class="Counter"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="11" height="11"><path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path><path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"></path></svg> ${publication.descargas} descargas totales</span>
    <a href="https://github.com/livrasand/Reviw/issues/new?assignees=&labels=removal+request&projects=&template=jwpub_removal.yml"><span style="margin-left:4px;color:black;" class="Counter"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="11" height="11"><path d="M4.72.22a.75.75 0 0 1 1.06 0l1 .999a3.488 3.488 0 0 1 2.441 0l.999-1a.748.748 0 0 1 1.265.332.75.75 0 0 1-.205.729l-.775.776c.616.63.995 1.493.995 2.444v.327c0 .1-.009.197-.025.292.408.14.764.392 1.029.722l1.968-.787a.75.75 0 0 1 .556 1.392L13 7.258V9h2.25a.75.75 0 0 1 0 1.5H13v.5c0 .409-.049.806-.141 1.186l2.17.868a.75.75 0 0 1-.557 1.392l-2.184-.873A4.997 4.997 0 0 1 8 16a4.997 4.997 0 0 1-4.288-2.427l-2.183.873a.75.75 0 0 1-.558-1.392l2.17-.868A5.036 5.036 0 0 1 3 11v-.5H.75a.75.75 0 0 1 0-1.5H3V7.258L.971 6.446a.75.75 0 0 1 .558-1.392l1.967.787c.265-.33.62-.583 1.03-.722a1.677 1.677 0 0 1-.026-.292V4.5c0-.951.38-1.814.995-2.444L4.72 1.28a.75.75 0 0 1 0-1.06Zm.53 6.28a.75.75 0 0 0-.75.75V11a3.5 3.5 0 1 0 7 0V7.25a.75.75 0 0 0-.75-.75ZM6.173 5h3.654A.172.172 0 0 0 10 4.827V4.5a2 2 0 1 0-4 0v.327c0 .096.077.173.173.173Z"></path></svg> Reportar archivo</span></a>
    </div>
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
<div class="label-container svelte-35xm21" style="display: flex; justify-content: space-between; align-items: left;">
  <h3 class="text-block type-title svelte-zxj483">${publication.title}</h3>
  <div class="mb-2">
  <span style="margin-left:2px;margin-right:5px;color: rgba(0,0,0,.7); font-weight: 600; font-family: 'Fira Mono', 'Andale Mono', 'Consolas', monospace; letter-spacing: 0px; font-size: 12px;">${publication.author}</span>
  <a class="button style-hyperlink svelte-nqc07q" style="background:#231f20;color:#fff;font-size:10px;border-radius:180px;padding:0 10px 0 10px;" href="${publication.downloadURL}" download="" target="_blank" rel="noreferrer noopener" role="button" onclick="registerDownload('${publication.title}')">
      <span>Descargar</span>
    </a>
    <span style="margin-left:4px;" class="Counter"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="11" height="11"><path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path><path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"></path></svg> ${publication.descargas} descargas totales</span>
    <a href="https://github.com/livrasand/Reviw/issues/new?assignees=&labels=removal+request&projects=&template=jwpub_removal.yml"><span style="margin-left:4px;color:black;" class="Counter"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="11" height="11"><path d="M4.72.22a.75.75 0 0 1 1.06 0l1 .999a3.488 3.488 0 0 1 2.441 0l.999-1a.748.748 0 0 1 1.265.332.75.75 0 0 1-.205.729l-.775.776c.616.63.995 1.493.995 2.444v.327c0 .1-.009.197-.025.292.408.14.764.392 1.029.722l1.968-.787a.75.75 0 0 1 .556 1.392L13 7.258V9h2.25a.75.75 0 0 1 0 1.5H13v.5c0 .409-.049.806-.141 1.186l2.17.868a.75.75 0 0 1-.557 1.392l-2.184-.873A4.997 4.997 0 0 1 8 16a4.997 4.997 0 0 1-4.288-2.427l-2.183.873a.75.75 0 0 1-.558-1.392l2.17-.868A5.036 5.036 0 0 1 3 11v-.5H.75a.75.75 0 0 1 0-1.5H3V7.258L.971 6.446a.75.75 0 0 1 .558-1.392l1.967.787c.265-.33.62-.583 1.03-.722a1.677 1.677 0 0 1-.026-.292V4.5c0-.951.38-1.814.995-2.444L4.72 1.28a.75.75 0 0 1 0-1.06Zm.53 6.28a.75.75 0 0 0-.75.75V11a3.5 3.5 0 1 0 7 0V7.25a.75.75 0 0 0-.75-.75ZM6.173 5h3.654A.172.172 0 0 0 10 4.827V4.5a2 2 0 1 0-4 0v.327c0 .096.077.173.173.173Z"></path></svg> Reportar archivo</span></a>
    </div>
  </div>
        `;

        publicationsContainer.appendChild(article);
      }
    });
  }
}

function registerDownload(title) {
  fetch('download.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })
    .then(response => response.json())
    .then(data => {
      // Actualizar el contador de descargas localmente
      jsonData.forEach(publication => {
        if (publication.title === title) {
          publication.descargas = data.descargas;
        }
      });
    })
    .catch(error => {
      console.error('Error al registrar la descarga:', error);
    });
}
