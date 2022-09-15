let arrayTareas = [];
function guadarDB(){
    localStorage.setItem("Tareas",JSON.stringify(arrayTareas))
}                                                                                 arrayTareas = [];
function imprimirTareas(){
    arrayTareas = JSON.parse(localStorage.getItem('Tareas'))
    section.innerHTML = '';
    arrayTareas.forEach(element=>{
        section.innerHTML = 
        ` <div class="div-contai-tarea-div">
        <input type="checkbox" class="input-checkBox">
        <h3>tarea</h3>
    </div> 
    <div>
        <button class="button-edit ">
            Edit
        </button>
        <button class="button-delete">
            delete
        </button>
    </div>`
    })
}
let section =document.getElementById("section-3")
let formulario = document.getElementById("formulario");
formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    let tarea = document.getElementById('tarea').value;
    arrayTareas.push(tarea)
    formulario.reset()
    guadarDB()

})