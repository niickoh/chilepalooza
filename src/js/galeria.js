document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        // Crear atributos personalizados con html5
        imagen.dataset.imagenId = i;

        // Añadir la función de mostrarImagen
        imagen.onclick = mostrarImagen;
        
        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    const id = parseInt(e.target.dataset.imagenId)

    //Generar la imagen
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');


    // Boton para cerrar la imagen
    const cerrar = document.createElement('P');
    cerrar.textContent = 'X';
    cerrar.classList.add('btn-cerrar')

    // Al presionar el boton se cierra imagen

    cerrar.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }
    
    // Cuando se da click fuera de la imagen, cerrar imagen
    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    overlay.appendChild(cerrar);

    //Mostrar en el HTML

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}