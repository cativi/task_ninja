
const form = document.querySelector('#formTareas');
const tbody = document.querySelector('#tareasGuardadas tbody');
const arrayTareas = [];
let idInicial = 1;

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
    console.log(arrayTareas);
    let tbody = event.target.parentNode.parentNode.parentNode;
    let hijo = event.target.parentNode.parentNode
    tbody.removeChild(hijo);
    alert('Tarea borrada correctamente');

    pintarTodasLasTareas(arrayTareas, tbody);
}

//FILTRAR TAREA
function filtrarFrecuencia(listaTareas, frecuencia) {
    const listaFiltrada = listaTareas.filter(tarea => tarea.seleccionarFrecuencia === frecuencia);
    return listaFiltrada;
}

// function pintarTareaFiltrada(tareaFiltrada, domElement) {

// } 


/*      
<p>Filtrado por diagnostico</p>
    <select id="selectDiagnosis">
        <option value="">Selecciona un diagnostico</option>
        <option value="gripe">Gripe</option>
        <option value="hipertension">Hipertensión</option>
        <option value="agorafobia">Agorafobia</option>
    </select> 
*/

// BUSCAR TAREA


// function quitarTildes(cadena) {
//     let texto = cadena.replaceAll('á', 'a');
//     const arrayCon = ['é', 'í', 'ó', 'ú']
//     const arraySin = ['e', 'i', 'o', 'u']
//     for (let i = 0; i < arraySin.length; i++) {
//         texto = texto.replaceAll(arrayCon[i], arraySin[i])
//     }
//     return texto
// }


/*
tbody.innerHTML = `<tr>
    <th scope="row" id="tarea3">3</th>
    <td>Leer un Libro</td>
    <td>Mensual</td>
    <td><button class="borrar">Borrar</button></td>
</tr>`
*/

// tbody haría lo que el dompacientes
// const domPacientes = document.querySelector('main .flex');
// recorrer el array de tareas.length y meterlo con textContent en su elemento del DOM
// domTotal.textContent = pacientes.length;

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

    td2.appendChild(button);

    tr.append(th, td1, td2);
    domElement.appendChild(tr);
}

function pintarTodasLasTareas(lista, domElement) {
    if (lista.length > 0) {
        domElement.innerHTML = "";
        lista.forEach(tarea => pintarTarea(tarea, domElement));
    } else {
        domElement.innerHTML = '<td style="color: red">No hay Resultados. Crea una Nueva Tarea.</td>';
    }
}


function capturarData(event) {
    event.preventDefault();

    const tarea = event.target.tarea.value;
    const frecuencia = event.target.seleccionarFrecuencia.value;

    if (tarea === "" && frecuencia === "Seleccionar Frecuencia") {
        alert('Completa la tarea y selecciona una frecuencia.');
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
            alert(respuesta.msg)

        } else {
            console.log(respuesta, nuevaTarea);
            alert(respuesta.msg)
        }
        pintarTodasLasTareas(arrayTareas, tbody);
    }
}

pintarTodasLasTareas(arrayTareas, tbody);

form.addEventListener('submit', capturarData);


