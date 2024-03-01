const form = document.querySelector('#formTareas');
const tbody = document.querySelector('#tareasGuardadas tbody');
const arrayTareas = [];
// {id:1, value: 'Sacar al perro', value: 'diaria'}

let idInicial = 1;

function guardarTarea(lista, nuevaTarea) {
    let posicion = lista.findIndex(tarea => tarea.value === nuevaTarea.value);
    if (posicion === -1) {
        lista.push(nuevaTarea);
        idInicial++;
        return { status: true, msg: 'Tarea guardada correctamente' }
    } else {
        return { status: false, msg: 'Tarea duplicada' }
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
}

/*
tbody.innerHTML = `<tr>
    <th scope="row" id="tarea3">3</th>
    <td>Leer un Libro</td>
    <td>Mensual</td>
    <td><button class="borrar">Borrar</button></td>
</tr>`
*/

function pintarTarea(nuevaTarea, domElement) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    // td2.addEventListener('change', capturarData);
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

        } else {
            console.log(respuesta, nuevaTarea);
            alert(respuesta.msg)
        }
    }
}

form.addEventListener('submit', capturarData)




