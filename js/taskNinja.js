
const form = document.querySelector('#formTareas');
const tbody = document.querySelector('#tareasGuardadas tbody');
const arrayTareas = [];
let idInicial = 1;
const selectFrecuencia = document.querySelector('#filtrarFrecuencia');
selectFrecuencia.addEventListener('change', actualizarTareasFiltradas);
const buscarInput = document.querySelector('#buscarTarea');
buscarInput.addEventListener('input', buscarTareas);


function guardarTarea(lista, nuevaTarea) {
    let posicion = lista.findIndex(tarea => tarea.value === nuevaTarea.value);
    if (posicion === -1) {
        lista.push(nuevaTarea);
        idInicial++;
        return {
            status: true, msg: 'Tarea guardada correctamente'
        };
    } else {
        return { status: false, msg: 'Tarea duplicada' };
    }
}

function borrarTarea(event) {
    let id = Number(event.target.dataset.id);
    let posicion = arrayTareas.findIndex(tarea => tarea.id === id);
    arrayTareas.splice(posicion, 1);

    let tbody = event.target.parentNode.parentNode.parentNode;
    let hijo = event.target.parentNode.parentNode
    tbody.removeChild(hijo);
    alert('Tarea borrada correctamente');

    actualizarTareasFiltradas();
}

function filtrarFrecuencia(listaTareas, frecuencia) {
    const listaFiltrada = listaTareas.filter(tarea => tarea.seleccionarFrecuencia === frecuencia);
    return listaFiltrada;
}

function quitarTildes(cadena) {
    let texto = cadena.replaceAll('á', 'a');
    const arrayCon = ['é', 'í', 'ó', 'ú']
    const arraySin = ['e', 'i', 'o', 'u']
    for (let i = 0; i < arraySin.length; i++) {
        texto = texto.replaceAll(arrayCon[i], arraySin[i])
    }
    return texto
}



function buscarTareas() {
    const filtro = quitarTildes(buscarInput.value.toLowerCase());
    const tareasFiltradas = arrayTareas.filter(tarea => {
        const tareaTexto = quitarTildes(tarea.value.toLowerCase());
        return tareaTexto.includes(filtro);
    });
    pintarTodasLasTareas(tareasFiltradas, tbody);

    if (tareasFiltradas.length === 0) {
        tbody.innerHTML = '<td class="mensaje-sin-resultado">No hay Resultados. Crea una Nueva Tarea.</td>';
    }
}



function pintarTarea(nuevaTarea, domElement) {

    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');

    const button = document.createElement('button');
    button.addEventListener('click', borrarTarea);
    button.dataset.id = nuevaTarea.id;
    button.classList.add('borrar');
    button.textContent = 'Borrar';
    th.textContent = nuevaTarea.value.toUpperCase();
    td1.textContent = nuevaTarea.seleccionarFrecuencia.toUpperCase();

    if (nuevaTarea.seleccionarFrecuencia.toLowerCase() === 'diaria') {
        td1.classList.add('diaria');
    } else if (nuevaTarea.seleccionarFrecuencia.toLowerCase() === 'semanal') {
        td1.classList.add('semanal');
    } else if (nuevaTarea.seleccionarFrecuencia.toLowerCase() === 'mensual') {
        td1.classList.add('mensual');
    }


    td2.appendChild(button);
    tr.append(th, td1, td2);
    domElement.appendChild(tr);
}

function pintarTodasLasTareas(lista, domElement) {
    if (lista.length > 0) {
        domElement.innerHTML = "";
        lista.forEach(tarea => pintarTarea(tarea, domElement));
    } else {
        domElement.innerHTML = '<td class="mensaje-sin-resultado">No hay Resultados. Crea una Nueva Tarea.</td>';
    }
}

function capturarData(event) {
    event.preventDefault();

    const tareaInput = event.target.tarea;
    const frecuenciaSelect = event.target.seleccionarFrecuencia;

    const tarea = event.target.tarea.value;
    const frecuencia = event.target.seleccionarFrecuencia.value;

    if (tarea === "" && frecuencia === "Seleccionar Frecuencia") {
        alert('Crea una tarea y asígnale una frecuencia.');
    } else if (tarea === "") {
        alert('La tarea no puede estar vacía.');
    } else if (frecuencia === "Seleccionar Frecuencia") {
        alert('Selecciona una frecuencia.');
    } else {
        const nuevaTarea = {
            id: idInicial,
            value: tarea,
            seleccionarFrecuencia: frecuencia
        };

        let respuesta = guardarTarea(arrayTareas, nuevaTarea);

        if (respuesta.status) {
            pintarTarea(nuevaTarea, tbody);
            alert(respuesta.msg);

            tareaInput.value = "";
            frecuenciaSelect.selectedIndex = 0;

        } else {
            console.log(respuesta, nuevaTarea);
            alert(respuesta.msg)
        }

        pintarTodasLasTareas(arrayTareas, tbody);
        actualizarTareasFiltradas();
    }
}

function actualizarTareasFiltradas() {
    const frecuenciaSeleccionada = document.querySelector('#filtrarFrecuencia').value;

    if (frecuenciaSeleccionada !== 'Filtrar por Frecuencia') {
        const tareasFiltradas = filtrarFrecuencia(arrayTareas, frecuenciaSeleccionada);
        pintarTodasLasTareas(tareasFiltradas, tbody);

        if (tareasFiltradas.length === 0) {
            tbody.innerHTML = '<td class="mensaje-sin-resultado">No hay Resultados. Crea una nueva tarea.</td>';
        }
    } else {
        pintarTodasLasTareas(arrayTareas, tbody);
    }

    const filtro = document.querySelector('#filtrarFrecuencia');
    const frecuenciasExistentes = [];

    for (const tarea of arrayTareas) {
        if (!frecuenciasExistentes.includes(tarea.seleccionarFrecuencia)) {
            frecuenciasExistentes.push(tarea.seleccionarFrecuencia);
        }
    }
    filtro.disabled = frecuenciasExistentes.length === 0;
}

pintarTodasLasTareas(arrayTareas, tbody);

form.addEventListener('submit', capturarData);


