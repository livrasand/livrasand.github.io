jQuery(document).ready(function($) {

    AOS.init({
        offset: 100,
        once: true,
        duration: 800,
        throttleDelay: 50,
        disable: window.innerWidth < 768
    });

});

// Buscador activar/desactivar
//document.getElementById('abrir-buscador').addEventListener('click', function() {
//  document.getElementById('buscador-pantalla-completa').style.display = 'flex';
//  document.body.classList.add('buscador-activo');
//});

function cerrarBuscador() {
    document.getElementById('buscador-pantalla-completa').style.display = 'none';
    document.body.classList.remove('buscador-activo');
}

// Ocultar el buscador al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('buscador-pantalla-completa').style.display = 'none';
});

// Mostrar contenido dinámico
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
            projectItem.innerHTML = `
                <div class="ds-project-list-loop-inner" style="margin-bottom: 30px; width: 100%;">
            <section style="display: flex; align-items: center;">
              <figure><img src="${publication.imageURL}" style="width: 100%;"></figure>
              <h2 class="ds-proj-hedding" style="flex: 1;width:100%;">${publication.title}</h2>
              <a onclick="showDownloadModal('${publication.downloadURL}')"><span class="ri-download-cloud-2-line transition" style="margin-left: 15px;"></span></a>
              <a href="https://github.com/livrasand/Reviw/issues/new?assignees=&amp;labels=removal+request&amp;projects=&amp;template=jwpub_removal.yml"><span class="ri-bug-line transition" style="margin-left: 15px;"></span></a>
            </section>
          </div>
            `;
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

       // Obtén los contribuyentes del repositorio
        fetch('https://api.github.com/repos/livrasand/livrasand.github.io/contributors')
            .then(response => response.json())
            .then(contributors => {
                const contributorContainer = document.getElementById('contributors');
                const contributorCount = document.getElementById('contributor-count');
                contributorCount.textContent = `${contributors.length} contribuyentes`;

                contributors.forEach(contributor => {
                    const contributorLink = document.createElement('a');
                    contributorLink.href = contributor.html_url;
                    contributorLink.className = 'contributor-link';
                    contributorLink.innerHTML = `
                        <span role="tooltip" aria-label="${contributor.login}" class="Tooltip__TooltipBase-sc-uha8qm-0 iJGqWI tooltipped-n">
                            <img src="${contributor.avatar_url}?size=40" alt="${contributor.login}" class="Avatar-sc-oifmh0-0 gIEPlT">
                        </span>
                    `;
                    contributorContainer.appendChild(contributorLink);
                });
            })
            .catch(error => console.error('Error cargando los contribuyentes:', error));

        // Obtén la última fecha de edición y el editor
        fetch('https://api.github.com/repos/livrasand/livrasand.github.io/commits')
            .then(response => response.json())
            .then(commits => {
                const lastCommit = commits[0];
                const lastEdited = document.getElementById('last-edited');
                lastEdited.innerHTML = `
                    <a href="${lastCommit.html_url}" class="Link-sc-hrxz1n-0 jmnotL">Última</a> editada por 
                    <a href="${lastCommit.author.html_url}" class="Link-sc-hrxz1n-0 jmnotL">${lastCommit.commit.author.name}</a> el 
                    <a href="${lastCommit.html_url}" class="Link-sc-hrxz1n-0 jmnotL">${new Date(lastCommit.commit.author.date).toLocaleDateString()}</a>
                `;
            })
            .catch(error => console.error('Error cargando la información de la última edición:', error));
    