let arrayTareas = [];
function guardadoArray(tarea, id, active, complete,contadorAll) {
    let nombreTarea = {
        Nombre: tarea,
        Id: id,
        Active: active,
        Complete: complete,
        tareaCompleta: contadorAll,
    }
    arrayTareas.push(nombreTarea);
}
let active = "Active"
let complete = "incompleto"
let objId = 0;
let checkId = 0;
let ContadorReset = 0;
let contadorAll = 0;
///funciones
function ImprimirTareasCompletadas() {
    let section = document.getElementById("section-3");
    let arrayTareasComplet = JSON.parse(localStorage.getItem('tareasCompletadas'));
    section.innerHTML = "";
    if (arrayTareasComplet === null) {
        alert('No hay tareas Completadas')
    }
    else {
        arrayTareasComplet.forEach(element => {
            // div comtendor 
            let divContainer = document.createElement("div");

            //div contendor check y tarea 
            let divContainerTareaDiv = document.createElement("div");
            divContainerTareaDiv.className = "div-contai-tarea-div"

            // input tipo check 
            let inputCheck = document.createElement("input");
            inputCheck.type = "checkbox"
            inputCheck.className = "input-checkBox"
            inputCheck.setAttribute("checked", "checked")
            inputCheck.addEventListener('change', (e) => {
                let checkk = inputCheck.checked;
                check(checkk, element.Id);
            }, false)

            //h3 tarea
            let h3Tareaa = document.createElement("h3");
            h3Tareaa.className = "h3Tarea";
            h3Tareaa.textContent = element.Nombre;

            // div contenedor de los botones 
            let divContainerBotones = document.createElement("div");

            //boton edit y delete
            let botonEdit = document.createElement("button");
            botonEdit.textContent = "Edit";
            botonEdit.className = "button-edit"
            botonEdit.addEventListener('click', (e) => {
                editarImputId(element.Id)
            })
            let botonFormEdit = document.getElementById("ButonEditar");
            botonFormEdit.addEventListener('click', (e) => {
                e.preventDefault()
                editarTask()
            })
            let butonDelete = document.createElement("button");
            butonDelete.id = 'deletee'
            butonDelete.textContent = "Delete";
            butonDelete.className = "button-delete";
            butonDelete.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.remove();
                eliminar(element.Id)
            })


            //inserciones 
            section.insertAdjacentElement("beforeend", divContainer);
            divContainer.insertAdjacentElement("beforeend", divContainerTareaDiv);
            divContainerTareaDiv.insertAdjacentElement("afterbegin", h3Tareaa);
            divContainerTareaDiv.insertAdjacentElement("afterbegin", inputCheck);
            divContainer.insertAdjacentElement("beforeend", divContainerBotones);
            divContainerBotones.insertAdjacentElement("afterbegin", butonDelete);
            divContainerBotones.insertAdjacentElement("afterbegin", botonEdit);
        });
    }

}
function ImprimirTareasActivas() {
    let section = document.getElementById("section-3");
    let arrayTareasActivas = JSON.parse(localStorage.getItem("tareasActivas"));
    section.innerHTML = "";
    if (arrayTareasActivas === null) {
        alert('No hay tareas activas')
    }
    else {
        arrayTareasActivas.forEach(element => {
            // div comtendor 
            let divContainer = document.createElement("div");

            //div contendor check y tarea 
            let divContainerTareaDiv = document.createElement("div");
            divContainerTareaDiv.className = "div-contai-tarea-div"

            // input tipo check 
            let inputCheck = document.createElement("input");
            inputCheck.type = "checkbox"
            inputCheck.className = "input-checkBox"
            inputCheck.addEventListener('change', (e) => {
                let checkk = inputCheck.checked;
                check(checkk, element.Id);
            }, false)

            //h3 tarea
            let h3Tareaa = document.createElement("h3");
            h3Tareaa.className = "h3Tarea";
            h3Tareaa.textContent = element.Nombre;

            // div contenedor de los botones 
            let divContainerBotones = document.createElement("div");

            //boton edit y delete
            let botonEdit = document.createElement("button");
            botonEdit.textContent = "Edit";
            botonEdit.className = "button-edit"
            botonEdit.addEventListener('click', (e) => {
                editarImputId(element.Id)
            })
            let botonFormEdit = document.getElementById("ButonEditar");
            botonFormEdit.addEventListener('click', (e) => {
                e.preventDefault()
                editarTask()
            })
            let butonDelete = document.createElement("button");
            butonDelete.id = 'deletee'
            butonDelete.textContent = "Delete";
            butonDelete.className = "button-delete";
            butonDelete.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.remove();
                eliminar(element.Id)
            })


            //inserciones 
            section.insertAdjacentElement("beforeend", divContainer);
            divContainer.insertAdjacentElement("beforeend", divContainerTareaDiv);
            divContainerTareaDiv.insertAdjacentElement("afterbegin", h3Tareaa);
            divContainerTareaDiv.insertAdjacentElement("afterbegin", inputCheck);
            divContainer.insertAdjacentElement("beforeend", divContainerBotones);
            divContainerBotones.insertAdjacentElement("afterbegin", butonDelete);
            divContainerBotones.insertAdjacentElement("afterbegin", botonEdit);
        });
    }

}

function sectionActive(){
    let datos = localStorage.getItem("formulario");
    let datosJson = JSON.parse(datos);
    let arrayTareasActivas = datosJson.filter((e) => e.Active == "Active");
    localStorage.setItem("tareasActivas", JSON.stringify(arrayTareasActivas));

}
function sectionComplete() {
    let datos = localStorage.getItem("formulario");
    let datosJson = JSON.parse(datos);
    let arrayTareasComplet = datosJson.filter((e) => e.Complete == "completada");
    localStorage.setItem("tareasCompletadas", JSON.stringify(arrayTareasComplet));
}
function editarImputId(id) {
    fomrularioEdit.style = "display: flex;"
    formulario.style = "display: none"
    objId = id;
}
function check(checkk, id) {
    checkId = id;
    if (checkk === true) {
        arrayTareas.forEach(element => {
            if (element.Id === checkId) {
                element.Complete = "completada"
                element.Active = "desativada"
            }
        })
    }
    else {
        arrayTareas.forEach(element => {
            if (element.Id === checkId) {
                element.Complete = "incompleto"
                element.Active = "Active"
                
            }
        })
    }
    guardarDB()
}
function eliminar(id) {
    let datos = localStorage.getItem("formulario");
    let datosJson = JSON.parse(datos);
    arrayTareas = datosJson.filter((e) => e.Id !== id);
    localStorage.setItem("formulario", JSON.stringify(arrayTareas));
}
function editarTask() {
    let inputTareaEdit = document.getElementById("tareaEdit").value;
    arrayTareas.forEach(element => {
        if (element.Id === objId) {
            element.Nombre = inputTareaEdit;
            localStorage.setItem("formulario", JSON.stringify(arrayTareas));
            imprimirHtml();
        }
    })
    fomrularioEdit.style = "display: none;"
    formulario.style = "display: flex"
}
const guardarDB = () => {
    localStorage.setItem('formulario', JSON.stringify(arrayTareas));
}
function imprimirHtml() {
    taskActive.textContent = ``;
    taskComplete.textContent = ``;
    let section = document.getElementById("section-3");
    arrayTareas = JSON.parse(localStorage.getItem('formulario'));
    section.innerHTML = "";
    if (arrayTareas === null) {
        arrayTareas = [];
    }
    else {
        arrayTareas.forEach(element => {
            // div comtendor 
            let divContainer = document.createElement("div");

            //div contendor check y tarea 
            let divContainerTareaDiv = document.createElement("div");
            divContainerTareaDiv.className = "div-contai-tarea-div"

            // input tipo check 
            let inputCheck = document.createElement("input");
            inputCheck.type = "checkbox"
            inputCheck.className = "input-checkBox"
            if(element.Complete == "completada"){
                inputCheck.setAttribute("checked", "checked")
            }
            inputCheck.addEventListener('change', (e) => {
                let checkk = inputCheck.checked;
                check(checkk, element.Id);
            }, false)

            //h3 tarea
            let h3Tareaa = document.createElement("h3");
            h3Tareaa.className = "h3Tarea";
            h3Tareaa.textContent = element.Nombre;

            // div contenedor de los botones 
            let divContainerBotones = document.createElement("div");

            //boton edit y delete
            let botonEdit = document.createElement("button");
            botonEdit.textContent = "Edit";
            botonEdit.className = "button-edit"
            botonEdit.addEventListener('click', (e) => {
                editarImputId(element.Id)
            })
            let botonFormEdit = document.getElementById("ButonEditar");
            botonFormEdit.addEventListener('click', (e) => {
                
                e.preventDefault()
                editarTask()
            })
            let butonDelete = document.createElement("button");
            butonDelete.id = 'deletee'
            butonDelete.textContent = "Delete";
            butonDelete.className = "button-delete";
            butonDelete.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.remove();
                eliminar(element.Id)
            })


            //inserciones 
            section.insertAdjacentElement("beforeend", divContainer);
            divContainer.insertAdjacentElement("beforeend", divContainerTareaDiv);
            divContainerTareaDiv.insertAdjacentElement("afterbegin", h3Tareaa);
            divContainerTareaDiv.insertAdjacentElement("afterbegin", inputCheck);
            divContainer.insertAdjacentElement("beforeend", divContainerBotones);
            divContainerBotones.insertAdjacentElement("afterbegin", butonDelete);
            divContainerBotones.insertAdjacentElement("afterbegin", botonEdit);
        });
    }
}
//// Botones All Active Complete
let botonActive = document.getElementById("Active");
let botonAll = document.getElementById("all");
let botonComplete = document.getElementById("tarea-completada")

////Eventos botones All Active Complete
botonComplete.addEventListener('click', (e) => {
    e.preventDefault()
    sectionComplete();
    ImprimirTareasCompletadas();
    taskComplete.textContent = `task Complete:`;
    taskActive.textContent = ``;
    taskAll.textContent = ``;
   
})
botonActive.addEventListener('click',(e)=>{
    e.preventDefault();
    sectionActive();
    taskActive.textContent = `task Active:`;
    taskAll.textContent = ``;
    taskComplete.textContent = ``;
    ImprimirTareasActivas()
})
botonAll.addEventListener('click',(e)=>{
    e.preventDefault();
    taskAll.textContent = `task remaining:`
    taskActive.textContent = ``;
    taskComplete.textContent = ``;
    imprimirHtml()
})
/// Task Tareas all, edit and complet
let taskAll = document.getElementById("h3-Task");
let taskActive = document.getElementById('h3-active');
let taskComplete = document.getElementById('h3-complete');

//// Formulario
let formulario = document.getElementById("formulario");
let fomrularioEdit = document.getElementById("formulario2");
fomrularioEdit.style = "display : none"
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputNombreTarea = document.getElementById("tarea").value;
    guardadoArray(inputNombreTarea, active, complete);
    guardarDB();
    imprimirHtml();
    formulario.reset();
})


document.addEventListener('DOMContentLoaded', imprimirHtml)

