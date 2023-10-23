document.addEventListener('DOMContentLoaded', function() {
    const imgElements = document.querySelectorAll('img');
    imgElements.forEach(img => {
        const src = img.getAttribute('src');

        if (src.startsWith('jwpub-media://')) {
            const newSrc = src.replace('jwpub-media://', '');
            const finalSrc = `../${newSrc}`;
            img.setAttribute('src', finalSrc);
        }
    });
});
