let arrayTareas = [];
let idObjetoEdit = 0;
let idObjetoDelete = 0;
function guadarDB(){
    localStorage.setItem("Tareas",JSON.stringify(arrayTareas))
}
function tareaPushArray(Tarea,id) {
    let tarea = {
        tarea: Tarea,
        Id: id,
    }
    arrayTareas.push(tarea);
    guadarDB()
}    
function check(cheke){

 
}
function eliminar(section,id){
    console.log(id)
    let eliminar = section.parentNode.parentNode
    eliminar.remove()
    let datos = localStorage.getItem("Tareas");
    let datosJason = JSON.parse(datos);
    let ArrayNuevo = datosJason.filter((e)=> e.Id !== id)
    localStorage.setItem("Tareas",JSON.stringify(ArrayNuevo))
    h3allImprimir()
}
function editar(id){
    idObjetoEdit = id;
    let formularioEdit = document.getElementById("formulario2")
    formularioEdit.style = "display:flex;"
    formulario.style = "display:none"
    formularioEdit.addEventListener("submit",(e)=>{
        arrayTareas = JSON.parse(localStorage.getItem('Tareas'));
        let tareaEdit = document.getElementById("tareaEdit").value;
        e.preventDefault()
        formularioEdit.style = "display:none;"
        formulario.style = "display:flex"
        arrayTareas.forEach(element =>{
            if(element.Id === idObjetoEdit){
                element.tarea = tareaEdit;
            }
            
        })
        localStorage.setItem("Tareas",JSON.stringify(arrayTareas))
        imprimirTareas()
    })
}
function newId(){
    let lastId = localStorage.getItem("Id") || "-1";
    let newLasId = JSON.parse(lastId) + 1; 
    localStorage.setItem("Id", JSON.stringify(newLasId));
    return newLasId;
}
function imprimirTareas(){
    arrayTareas = JSON.parse(localStorage.getItem('Tareas'))
    section.innerHTML = '';
    if(arrayTareas === null){
        arrayTareas = [];
    }
    else{
        arrayTareas.forEach(element=>{
            section.innerHTML += 
            ` <div>
            <div class="div-contai-tarea-div">
                <input type="checkbox" class="input-checkBox">
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
    h3allImprimir()
}
let section =document.getElementById("section-3")
let formulario = document.getElementById("formulario");
let h3TaskAll = document.getElementById("h3-Task");

function h3allImprimir(){
    arrayTareas=JSON.parse(localStorage.getItem('Tareas'))
    let h3All = arrayTareas.length;
    h3TaskAll.textContent = `Task remaining ${h3All}`
}
formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    let tarea = document.getElementById('tarea').value;
    let id = newId()
    tareaPushArray(tarea,id)
    imprimirTareas();
    formulario.reset()
    guadarDB()
})

document.addEventListener('DOMContentLoaded',imprimirTareas())