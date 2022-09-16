let arrayTareas = [];
let idObjetoEdit = 0;
let idObjetoDelete = 0;
let objetoIdCompletada = 0;
let tareasTraspaso = 0;
///filtrado de arrays
function filtrarCompletadas(){
    let datos = JSON.parse(localStorage.getItem('Tareas'))
    let tareasCompletadas = datos.filter((e) => e.complete === "completada")
    localStorage.setItem("TareasCompletadas", JSON.stringify(tareasCompletadas))
    tareasTraspaso = true;
    imprimirTareas()
    h3CompleteImprimir()
}
function filtrarAlls(){
    tareasTraspaso = 0;
    imprimirTareas()
}
function filtrarActivas(){
    let datos = JSON.parse(localStorage.getItem('Tareas'))
    let TareasActivas = datos.filter((e) => e.activa === "activa")
    localStorage.setItem("TareasActivas", JSON.stringify(TareasActivas))
    tareasTraspaso = false;
    imprimirTareas() 
    h3CompleteImprimir()
    h3ActiveImprimir()
}
function h3allImprimir() {
    arrayTareas = JSON.parse(localStorage.getItem('Tareas'))
    let h3All = arrayTareas.length;
    h3TaskAll.textContent = `Task remaining: ${h3All}`
}
function h3ActiveImprimir() {
   

    let tareasTotales = JSON.parse(localStorage.getItem('TareasActivas'))
    let numeroTotales = tareasTotales.length;

    let h3Active = numeroTotales;
    h3TaskAll.textContent = `Task Active: ${h3Active}`
}
function h3CompleteImprimir() {
    arrayTareas = JSON.parse(localStorage.getItem('TareasCompletadas'))
    let h3All = arrayTareas.length;
    h3TaskAll.textContent = `Task Complete ${h3All}`
}
function guadarDB() {
    localStorage.setItem("Tareas", JSON.stringify(arrayTareas))
}
function tareaPushArray(Tarea, id) {
    let tarea = {
        tarea: Tarea,
        Id: id,
        complete: "incompleta",
        activa: "activa",
    }
    arrayTareas.push(tarea);
    guadarDB()
}
function check(checkk, id) {
    let checkeado = checkk.checked;
    objetoIdCompletada = id
    console.log(id)
    if (checkeado === true) {
        arrayTareas.forEach(element => {
            if (element.Id === objetoIdCompletada) {
                if (element.complete === "incompleta") {
                    element.complete = "completada"
                    element.activa = "desativada"
                    
                }
            }
        })
        guadarDB()
        
    }
    else {
        arrayTareas.forEach(element => {
            if (element.Id === objetoIdCompletada) {
                if (element.complete === "completada") {
                    element.complete = "incompleta"
                    element.activa = "activa"
                }
            }
        })
        guadarDB()
    }
}
function eliminar(section, id) {
    console.log(id)
    let eliminar = section.parentNode.parentNode
    eliminar.remove()
    let datos = localStorage.getItem("Tareas");
    let datosJason = JSON.parse(datos);
    let ArrayNuevo = datosJason.filter((e) => e.Id !== id)
    localStorage.setItem("Tareas", JSON.stringify(ArrayNuevo))
    h3allImprimir()
}
function editar(id) {
    idObjetoEdit = id;
    let formularioEdit = document.getElementById("formulario2")
    formularioEdit.style = "display:flex;"
    formulario.style = "display:none"
    formularioEdit.addEventListener("submit", (e) => {
        arrayTareas = JSON.parse(localStorage.getItem('Tareas'));
        let tareaEdit = document.getElementById("tareaEdit").value;
        e.preventDefault()
        formularioEdit.style = "display:none;"
        formulario.style = "display:flex"
        arrayTareas.forEach(element => {
            if (element.Id === idObjetoEdit) {
                element.tarea = tareaEdit;
            }

        })
        localStorage.setItem("Tareas", JSON.stringify(arrayTareas))
        imprimirTareas()
    })
}


function newId() {
    let lastId = localStorage.getItem("Id") || "-1";
    let newLasId = JSON.parse(lastId) + 1;
    localStorage.setItem("Id", JSON.stringify(newLasId));
    return newLasId;
}
function imprimirTareas() {
    let arrayTareas = JSON.parse(localStorage.getItem('Tareas'))
    section.innerHTML = '';
    if (arrayTareas === null) {
        arrayTareas = [];
    }
    else {
        h3allImprimir()
        if (tareasTraspaso === true) {
            arrayTareas = JSON.parse(localStorage.getItem('TareasCompletadas'))
        }
        if(tareasTraspaso === false){
            arrayTareas = JSON.parse(localStorage.getItem('TareasActivas'))
        }
        arrayTareas.forEach(element => {
            let setAtributeChecked = ""
            if(element.complete === "completada"){
               setAtributeChecked = "checked"
            }
            section.innerHTML +=
                ` <div>
            <div class="div-contai-tarea-div">
                <input type="checkbox" class="input-checkBox" ${setAtributeChecked} onchange="check(this,${element.Id},false)">
                <h3>${element.tarea}</h3>
            </div> 
            <div>
                <button class="button-edit"  onclick="editar(${element.Id})">
                    Edit
                </button>
                <button class="button-delete" onclick="eliminar(this,${element.Id})">
                    delete
                </button>
            </div>
        </div>`
        })
    }
    guadarDB()
    h3allImprimir()
}
let section = document.getElementById("section-3");
let formulario = document.getElementById("formulario");
let h3TaskAll = document.getElementById("h3-Task");
let buttonComplete = document.getElementById("tarea-completada");
let buttonActive = document.getElementById("Active");
let buttonAll = document.getElementById("all");
buttonAll.addEventListener("click",filtrarAlls)
buttonActive.addEventListener("click",filtrarActivas)

buttonComplete.addEventListener("click",filtrarCompletadas)

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let tarea = document.getElementById('tarea').value;
    let id = newId()
    tareaPushArray(tarea, id)
    imprimirTareas();
    formulario.reset()
})

document.addEventListener('DOMContentLoaded', imprimirTareas())