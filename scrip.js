let arrayTareas = [];
function guardadoArray(tarea, id, active, complete,invalidarEdit) {
    let nombreTarea = {
        Nombre: tarea,
        Id: id,
        Active: active,
        Complete: complete,
        completeInvalidEdi:invalidarEdit, 
        PlaceHolder: ''
    }
    arrayTareas.push(nombreTarea);
}
let active = "Active"
let complete = "incompleto"
let invalidEdit = "valido"
let objId = 0;
let checkId = 0;
let idInavlidarEdit =0;
let contadorAll = 0;
let contadorComplete = 0;
let contadorActive = 0;
if(contadorAll == null){
    contadorAll = 0;
}
contadorAll = JSON.parse(localStorage.getItem('contadorLocalAll'));
contadorComplete = JSON.parse(localStorage.getItem('contadorCompleteLocal'));


///funciones
function botonComentarioInvalido(e,idElement){
    let TargetButon = e.target.parentNode.parentNode.childNodes[1].childNodes[0];
    TargetButon.setAttribute("disabled","disabled");
    let TargetText = e.target.parentNode.childNodes[2]
    idInavlidarEdit = idElement;
    arrayTareas.forEach(element=>{
        if(element.Id == idInavlidarEdit){
            element.completeInvalidEdi = "invalido";
            element.PlaceHolder = TargetText.value;
        }
    })
   guardarDB()
}
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
            if(element.Complete == "completada"){
                inputCheck.setAttribute("checked", "checked")
                let inputComentario = document.createElement("texTarea");
                inputComentario.placeholder = element.PlaceHolder
                let butonChulito = document.createElement("button")
                butonChulito.className = "botonAgregarComentario"
                butonChulito.textContent = "  ✓"
                inputComentario.className = "textAreaComentario"
                divContainerTareaDiv.insertAdjacentElement('beforeend', inputComentario);
                divContainerTareaDiv.insertAdjacentElement('beforeend',butonChulito)
                butonChulito.addEventListener('click',(e)=>{
        
                    botonComentarioInvalido(e,element.Id,inputComentario)
                })
            }
            inputCheck.addEventListener('change', (e) => {
                let checkk = inputCheck.checked;
                if(checkk === true){
                    butonDelete.addEventListener('click',(e)=>{
                        contadorComplete -= 1;
                    })
                    butonDelete.addEventListener("click",(e)=>{
                        contadorComplete -=1;
                        contadorAll -=1;
                    })
                }
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
            if(element.completeInvalidEdi== "invalido"){
                botonEdit.setAttribute("disabled","disabled")
            }
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
                if(element.Complete == "completada"){
                    contadorComplete -=1;
                    contadorCompleteLocal()
                }
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
                contadorComplete +=1;
                contadorCompleteLocal()
          
          
            }
        })
    }
    else {
        arrayTareas.forEach(element => {
            if (element.Id === checkId) {
                element.Complete = "incompleto"
                element.Active = "Active"
                contadorComplete -=1;
                contadorCompleteLocal()
                element.completeInvalidEdi = invalidEdit;
                element.PlaceHolder = "";
              
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
    //contadores
    contadorAll -=1;
    contadorAllLocal();
    contadorActive = contadorAll - contadorComplete;
    window.location = window.location.href;
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
                let inputComentario = document.createElement("texTarea");
                inputComentario.placeholder = element.PlaceHolder
                let butonChulito = document.createElement("button")
                butonChulito.className = "botonAgregarComentario"
                butonChulito.textContent = "  ✓"
                inputComentario.className = "textAreaComentario"
                divContainerTareaDiv.insertAdjacentElement('beforeend', inputComentario);
                divContainerTareaDiv.insertAdjacentElement('beforeend',butonChulito);
                butonChulito.addEventListener('click',(e)=>{
                    botonComentarioInvalido(e,element.Id)
                })
            }
            inputCheck.addEventListener('change', (e) => {
                let checkk = inputCheck.checked;
                if(checkk === true){
                    butonDelete.addEventListener('click',(e)=>{
                        contadorComplete -= 1;
                    })
                }
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
            if(element.completeInvalidEdi== "invalido"){
                botonEdit.setAttribute("disabled","disabled")
            }

            
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
                if(element.Complete == "completada"){
                    contadorComplete -=1;
                    contadorCompleteLocal()
                }
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
    if(contadorComplete == null){
        contadorComplete = 0;
    }
    taskComplete.textContent = `task Complete: ${contadorComplete}`;
    taskActive.textContent = ``;
    taskAll.textContent = ``;
   
})

botonActive.addEventListener('click',(e)=>{
    e.preventDefault();
    sectionActive();
    taskActive.textContent = `task Active: ${contadorAll - contadorComplete}`;
   
    taskAll.textContent = ``;
    taskComplete.textContent = ``;
    ImprimirTareasActivas()
})
botonAll.addEventListener('click',(e)=>{
    e.preventDefault();
    taskAll.textContent = `task remaining: ${contadorAll}`
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
    contadorAll +=1;
    taskAll.textContent = `task remaining: ${contadorAll}`
    contadorAllLocal()
    let inputNombreTarea = document.getElementById("tarea").value;
    guardadoArray(inputNombreTarea,idLocalStorage(), active, complete,invalidEdit);
    guardarDB();
    imprimirHtml();
    formulario.reset();
})
function idLocalStorage() {
    let idLocal = localStorage.getItem('Id') || "0";
    let IdNew = JSON.parse(idLocal) + 1;
    localStorage.setItem("Id", JSON.stringify(IdNew));
    return IdNew;
}

function contadorAllLocal(){
    localStorage.setItem('contadorLocalAll', JSON.stringify(contadorAll));
    contadorAll = JSON.parse(localStorage.getItem('contadorLocalAll'));
    taskAll.textContent = `task remaining: ${contadorAll}`


}
function contadorCompleteLocal(){
    localStorage.setItem('contadorCompleteLocal', JSON.stringify(contadorComplete));
    contadorComplete = JSON.parse(localStorage.getItem('contadorCompleteLocal'));
}

document.addEventListener('DOMContentLoaded', imprimirHtml)
document.addEventListener('DOMContentLoaded', contadorAllLocal)


