let arrayTareas = [];
function guardadoArray(tarea, id) {
    let nombreTarea = {
        Nombre: tarea,
        Id: id,
    }
    arrayTareas.push(nombreTarea);
}

let objId = 0; 
///funciones
function check(checkk) {
    if (checkk === true) {
        alert('es true')
    }
    else {
        alert('es false')
    }
}
function eliminar(id) {
    let datos = localStorage.getItem("formulario");
    let datosJson = JSON.parse(datos);
    arrayTareas = datosJson.filter((e) => e.Id !== id);
    localStorage.setItem("formulario", JSON.stringify(arrayTareas));
}
function editarImputId(id) {
    fomrularioEdit.style = "display: flex;"
    formulario.style = "display: none"
    objId =id;
}
function editarTask(){
    let inputTareaEdit = document.getElementById("tareaEdit").value;
    arrayTareas.forEach(element =>{
        if(element.Id === objId){
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
    const section = document.getElementById("section-3");
    arrayTareas = JSON.parse(localStorage.getItem('formulario'));
    section.innerHTML = "";
    if (arrayTareas === null) {
        arrayTareas = [];
    }
    else {
        arrayTareas.forEach(element => {
            //section3
            // div comtendor 
            const divContainer = document.createElement("div");

            //div contendor check y tarea 
            const divContainerTareaDiv = document.createElement("div");
            divContainerTareaDiv.className = "div-contai-tarea-div"

            // input tipo check 
            let inputCheck = document.createElement("input");
            inputCheck.type = "checkbox"
            inputCheck.className = "input-checkBox"
            inputCheck.addEventListener('change', (e) => {
                let checkk = inputCheck.checked;
                check(checkk);
            }, false)

            //h3 tarea
            let h3Tareaa = document.createElement("h3");
            h3Tareaa.className = "h3Tarea";
            h3Tareaa.textContent = element.Nombre;

            // div contenedor de los botones 
            const divContainerBotones = document.createElement("div");

            //boton edit y delete
            let botonEdit = document.createElement("button");
            botonEdit.textContent = "Edit";
            botonEdit.className = "button-edit"
            botonEdit.addEventListener('click', (e) => {
                editarImputId(element.Id)
            })
            let botonFormEdit = document.getElementById("ButonEditar");
            botonFormEdit.addEventListener('click',editarTask)
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

//// Formulario
let formulario = document.getElementById("formulario");
let fomrularioEdit = document.getElementById("formulario2");
fomrularioEdit.style = "display : none"
let contadorId = 0;
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputNombreTarea = document.getElementById("tarea").value;
    contadorId += 1
    guardadoArray(inputNombreTarea, contadorId);
    guardarDB();
    imprimirHtml();
    formulario.reset();
})


document.addEventListener('DOMContentLoaded', imprimirHtml)


