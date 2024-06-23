jQuery(document).ready(function($) {
  // Función para ajustar AOS dependiendo del tamaño de la pantalla
  function adjustAOS() {
    AOS.init({
      offset: 100,
      once: true,
      duration: 800,
      throttleDelay: 50,
      disable: window.innerWidth < 768
    });
  }

  // Llamar a la función para ajustar AOS al cargar la página y al cambiar el tamaño de la ventana
  adjustAOS();
  window.addEventListener('resize', adjustAOS);

// Buscador activar/desactivar
//document.getElementById('abrir-buscador').addEventListener('click', function() {
  //  document.getElementById('buscador-pantalla-completa').style.display = 'flex';
    //document.body.classList.add('buscador-activo');
//});

function cerrarBuscador() {
    document.getElementById('buscador-pantalla-completa').style.display = 'none';
    document.body.classList.remove('buscador-activo');
}

// Ocultar el buscador al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('buscador-pantalla-completa').style.display = 'none';
});

// Mostrar contenido dinamico
  let j// Mostrar contenido dinámico basado en el JSON
  let jsonData; // Declarar jsonData en el ámbito global
  let publicationsContainer; // Declarar publicationsContainer en el ámbito global

  // Obtén una referencia al contenedor de publicaciones
  publicationsContainer = document.querySelector('.ds-project-list-section .ds-project-list');

  // Realiza una solicitud HTTP para obtener el JSON
  fetch('https://raw.githubusercontent.com/livrasand/Reviw/main/repository/publications.json')
    .then(response => response.json())
    .then(data => {
      jsonData = data; // Asigna los datos JSON a la variable global jsonData

      // Genera el contenido basado en el JSON
      jsonData.forEach(publication => {
        const projectItem = document.createElement('div');
        
        // Determina qué contenido mostrar según el tamaño de la pantalla
        const content = window.innerWidth < 768 ? `
          <div class="ds-project-list-loop-inner" style="margin-bottom: 30px; width: 100%;">
            <section style="display: flex; flex-direction: column; align-items: center; text-align: center;">
              <figure style="width: 80%; max-width: 300px;">
                <img src="${publication.imageURL}" style="width: 100%; max-width: 100%;">
              </figure>
              <h2 class="ds-proj-hedding" style="margin: 0; margin-top: 1rem;">${publication.title}</h2>
              <div style="display: flex; justify-content: center; margin-top: 1rem;">
                <a onclick="showDownloadModal('${publication.downloadURL}')" style="margin-left: 15px;"><span class="ri-download-cloud-2-line transition"></span></a>
                <a href="https://github.com/livrasand/Reviw/issues/new?assignees=&amp;labels=removal+request&amp;projects=&amp;template=jwpub_removal.yml" style="margin-left: 15px;"><span class="ri-bug-line transition"></span></a>
              </div>
            </section>
          </div>
        ` : `
          <div class="ds-project-list-loop-inner" style="margin-bottom: 30px; width: 100%;">
            <section style="display: flex; align-items: center;">
              <figure style="width: 20%;"><img src="${publication.imageURL}" style="width: 100%;"></figure>
              <h2 class="ds-proj-hedding" style="margin-left:85%; flex: 1;width:100%;">${publication.title}</h2>
              <a onclick="showDownloadModal('${publication.downloadURL}')"><span class="ri-download-cloud-2-line transition" style="margin-left: 15px;"></span></a>
              <a href="https://github.com/livrasand/Reviw/issues/new?assignees=&amp;labels=removal+request&amp;projects=&amp;template=jwpub_removal.yml"><span class="ri-bug-line transition" style="margin-left: 15px;"></span></a>
            </section>
          </div>
        `;
        
        projectItem.innerHTML = content;
        publicationsContainer.appendChild(projectItem);
      });
    })
    .catch(error => {
      console.error('Error cargando el JSON:', error);
    });

function showDownloadModal(downloadURL) {
  const modal = document.getElementById('modal');
  modal.style.visibility = 'visible';
  modal.style.opacity = 1;

  // Espera 3 segundos antes de descargar el archivo
  setTimeout(() => {
    // Crea un enlace dinámicamente
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadURL;
    downloadLink.download = 'nombre_del_archivo'; // Puedes establecer un nombre de archivo aquí
    document.body.appendChild(downloadLink);

    // Haz clic en el enlace para activar la descarga
    downloadLink.click();

    // Elimina el enlace después de hacer clic
    document.body.removeChild(downloadLink);
  }, 3000);
}

function closeDownloadModal() {
  const modal = document.getElementById('modal');
  modal.style.visibility = 'hidden';
  modal.style.opacity = 0;
}


function closeDonationModal() {
  const modal = document.getElementById('modal');
  modal.style.visibility = 'hidden';
  modal.style.opacity = 0;
}

// CONTRIBUIDORES 
document.addEventListener('DOMContentLoaded', function() {
  // Obtén una referencia al contenedor de contribuidores
  const contributorListContainer = document.getElementById('contributor-list');

  // Realiza una solicitud HTTP para obtener el JSON de contribuidores
  fetch('https://api.github.com/repos/livrasand/Reviw/contributors')
    .then(response => response.json())
    .then(contributors => {
      const totalContributors = Math.min(contributors.length, 10);

      // Itera sobre la lista de contribuidores y crea elementos HTML para cada uno
      for (let i = 0; i < 10; i++) {
        const contributorItem = document.createElement('div');

        if (i < totalContributors) {
          // Utiliza los contribuidores reales
          const contributor = contributors[i];
          contributorItem.innerHTML = `
            <div class="contributor-item">
              <a href="${contributor.html_url}" target="_blank">
                <img src="${contributor.avatar_url}" alt="${contributor.login}" style="border-radius: 42%; width: 77px; height: 77px; margin-right: 10px;">
              </a>
            </div>
          `;
        } else {
          // Utiliza colores de fondo aleatorios para los lugares faltantes
          const randomColor = getRandomColor();
          contributorItem.style.backgroundColor = randomColor;
          contributorItem.style.width = '77px'; // Ajusta el ancho para los colores de fondo
          contributorItem.style.height = '77px'; // Ajusta la altura para los colores de fondo
          contributorItem.style.marginRight = '10px'; // Ajusta el margen derecho para los colores de fondo
          contributorItem.style.borderRadius = '42%';
        }

        // Agrega el elemento del contribuidor al contenedor
        contributorListContainer.appendChild(contributorItem);
      }

      contributorListContainer.style.display = 'flex';
    })
    .catch(error => {
      console.error('Error cargando la lista de contribuidores:', error);
    });
});

var botonFlotante = document.getElementById('boton-flotante');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) { // Cambia 100 por la posición a partir de la cual deseas ocultar el botón
        botonFlotante.classList.add('oculto');
    } else {
        botonFlotante.classList.remove('oculto');
    }
});
