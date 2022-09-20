let arrayTareas = [];
let idObjetoEdit = 0;
let idObjetoDelete = 0;
let objetoIdCompletada = 0;
let tareasTraspaso = 0;
let objetoInvalidarEdit = 0;
let validarchekc = null;
///filtrado de arrays
function filtrarCompletadas() {
    validarchekc = false;
    let datos = JSON.parse(localStorage.getItem('Tareas'))
    let tareasCompletadas = datos.filter((e) => e.complete === "completada")
    localStorage.setItem("TareasCompletadas", JSON.stringify(tareasCompletadas))
    tareasTraspaso = true;
    imprimirTareas()
    h3CompleteImprimir()
}
function filtrarAlls() {
    validarchekc = null;
    tareasTraspaso = 0;
    imprimirTareas()
}
function filtrarActivas() {
    validarchekc = true;
    let datos = JSON.parse(localStorage.getItem('Tareas'))
    let TareasActivas = datos.filter((e) => e.activa === "activa")
    localStorage.setItem("TareasActivas", JSON.stringify(TareasActivas))
    tareasTraspaso = false;
    imprimirTareas()
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
    let arrayTareas = JSON.parse(localStorage.getItem('TareasCompletadas'))
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
        EditAtivo: "activo",
        placeholder: "",
    }

    arrayTareas.push(tarea);
    guadarDB()
}
function check(checkk, id,divContainerTareaDiv,inputComentario,botonChulito,inputCheck) {
    let checkeado = checkk.checked;
    objetoIdCompletada = 0;
    objetoIdCompletada = id
    if (checkeado === true) {
        divContainerTareaDiv.insertAdjacentElement('beforeend', inputComentario);
        divContainerTareaDiv.insertAdjacentElement('beforeend', botonChulito);
        arrayTareas.forEach(element => {
            if (element.Id === objetoIdCompletada) {
             
                if (element.complete === "incompleta") {
                    element.complete = "completada"
                    element.activa = "desativada"

                }
            }

        })
        guadarDB()
        if (validarchekc == true) {
            filtrarActivas();
        }
        else{
            imprimirTareas()
        }
    }
    else {
        inputComentario.remove()
        botonChulito.remove()
        placeholderComentaBorrar(id)
        ActivarBotonEdit(inputCheck,id)
        arrayTareas.forEach(element => {
            if (element.Id === objetoIdCompletada) {
                if (element.complete === "completada") {
                    element.complete = "incompleta"
                    element.activa = "activa"

                }
            }
        })
      
        guadarDB()
        if (validarchekc == false) {
            filtrarCompletadas();
        }
        else{
            imprimirTareas()
        }
    }

guadarDB

}
function invalidarBotonEdit(ubicacion, id) {
    objetoInvalidarEdit = id
    let botonEdit = ubicacion.target.parentNode.parentNode.childNodes[1].childNodes[0];
    botonEdit.setAttribute("disabled", '')
    arrayTareas.forEach(element => {
        if (element.Id === id) {
            element.EditAtivo = "desativado"
        }
    })
    guadarDB()
  
}
function placeholderComenta(placeholderr,id){
    arrayTareas.forEach(element => {
        if (element.Id === id) {
            element.placeholder = placeholderr;
        }
    })
    guadarDB()
}
function placeholderComentaBorrar(id){
    arrayTareas.forEach(element=>{
        if(element.Id === id){
            element.placeholder = "";
        }
    })
    guadarDB()    
}
function ActivarBotonEdit(ubicacion, id) {
    
    objetoInvalidarEdit = id
    let botonEdit = ubicacion.parentNode.parentNode.childNodes[1].childNodes[0];
    arrayTareas.forEach(element => {
        if (element.Id === id) {
            element.EditAtivo = "activo"
        }
    })
    guadarDB()
    imprimirTareas()
}
function eliminar(section, id) {
    let eliminar = section.target.parentNode.parentNode;
    eliminar.remove()
    let datos = localStorage.getItem("Tareas");
    let datosJason = JSON.parse(datos);
    let ArrayNuevo = datosJason.filter((e) => e.Id !== id)
    localStorage.setItem("Tareas", JSON.stringify(ArrayNuevo))
    if (validarchekc == true) {
        filtrarActivas();
    }
    if (validarchekc == false) {
        filtrarCompletadas();
    }
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
        if (tareasTraspaso === false) {
            arrayTareas = JSON.parse(localStorage.getItem('TareasActivas'))
        }
        arrayTareas.forEach(element => {
            let divContenedor = document.createElement('div')
            let divContainerTareaDiv = document.createElement('div');
            divContainerTareaDiv.className = "div-contai-tarea-div"
            //input de chekeo
            let inputCheck = document.createElement('input')
            inputCheck.type = "checkbox"
            inputCheck.className = "input-checkBox"
            inputCheck.addEventListener('change', (e) => {
                check(inputCheck, element.Id,divContainerTareaDiv,inputComentario,botonChulito,inputCheck);         
            },false)

            //nombre de la tarea
            let h3Tarea = document.createElement('h3');
            h3Tarea.textContent = element.tarea
            //input comentario
            let inputComentario = document.createElement('textarea')
            inputComentario.placeholder = element.placeholder;
            inputComentario.className = "textAreaComentario"
            
            let divButonesEditDelete = document.createElement("div");
            //boton editar
            let btonEditar = document.createElement("button");
            btonEditar.className = "button-edit";
            btonEditar.textContent = "Edit"
            btonEditar.addEventListener('click', (e) => {
                editar(element.Id)
            })
            //boton eliminar
            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "delete"
            botonEliminar.className = "button-delete";
            botonEliminar.addEventListener('click', (e) => {
                e.preventDefault();
                eliminar(e,element.Id)
            })
            let botonChulito = document.createElement("button")
            botonChulito.className = "botonAgregarComentario";
            botonChulito.textContent = "✓";
            botonChulito.addEventListener("click", (e) => {
                inputComentario.textContent = ""
                invalidarBotonEdit(e, element.Id)
                let placeholderComentario = inputComentario.value;
                placeholderComenta(placeholderComentario,element.Id);
                inputComentario.value = "";
                imprimirTareas()
            })

            //inserciones
            section.insertAdjacentElement("beforeend", divContenedor);
            divContenedor.insertAdjacentElement("beforeend", divContainerTareaDiv);
            divContenedor.insertAdjacentElement("beforeend", divButonesEditDelete);
            divContainerTareaDiv.insertAdjacentElement('beforeend', inputCheck)
            divContainerTareaDiv.insertAdjacentElement('beforeend', h3Tarea)
            divButonesEditDelete.insertAdjacentElement("beforeend", btonEditar)
            divButonesEditDelete.insertAdjacentElement("beforeend", botonEliminar)

            //eventos
            if(element.complete === "incompleta"){
                inputCheck.getAttribute("checked", "")
            }
            if (element.complete === "completada") {
                inputCheck.setAttribute("checked", "checked")
                divContainerTareaDiv.insertAdjacentElement('beforeend', inputComentario);
                divContainerTareaDiv.insertAdjacentElement('beforeend', botonChulito);
            }
            
            if (element.EditAtivo === "desativado") {
                btonEditar.setAttribute("disabled", "")
            }
          
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

buttonAll.addEventListener("click", filtrarAlls)
buttonActive.addEventListener("click", filtrarActivas)
buttonComplete.addEventListener("click", filtrarCompletadas)

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let tarea = document.getElementById('tarea').value;
    let id = newId()
    tareaPushArray(tarea, id)
    imprimirTareas();
    formulario.reset()
})

document.addEventListener('DOMContentLoaded', imprimirTareas())