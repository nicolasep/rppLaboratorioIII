
window.addEventListener("load",function(){

    cargar();
    var btn = $("btnAgregar");
    btn.addEventListener("click",abrirGrilla);

    var btnCancelar = $("btnCancelar");
    btnCancelar.addEventListener("click",cerrarGrilla);
});

var idIndex=0;

function cargar()
{

    var peticionHttp = new XMLHttpRequest();

    peticionHttp.onreadystatechange = function () 
    {

        if (peticionHttp.readyState == 4 && peticionHttp.status == 200) 
        {

            var objJson = JSON.parse(peticionHttp.responseText);
            idIndex = objJson.length;
            for (var i = 0; i < objJson.length; i++) 
            {

                agregarTodos(objJson[i].id, objJson[i].make, objJson[i].model, objJson[i].year);
                
            }
        }
    }
    peticionHttp.open("GET", "http://localhost:3000/autos", true)
    peticionHttp.send();
}

function $(id){
    return document.getElementById(id);
}


function agregarTodos(id, marca, modelo, año) 
{

    var tCuerpo = $("tCuerpo");

    var tr = document.createElement("tr");

    tr.setAttribute("idAuto", id);
    
    var tdMarca = document.createElement("td");
    tr.appendChild(tdMarca);
    var nodoMarca = document.createTextNode(marca);
    tdMarca.appendChild(nodoMarca);

    
    var tdModelo = document.createElement("td");
    tr.appendChild(tdModelo);
    var nodoModelo = document.createTextNode(modelo);
    tdModelo.appendChild(nodoModelo);

    var selecAño = document.createElement("select");
    tr.appendChild(selecAño);
    obtenerAños(selecAño);
    selecAño.selectedIndex = devolverIndex(año);

    tCuerpo.appendChild(tr);

}
function devolverIndex(año)
{
    var contador = 0;
    for(var i=2000;i<=2020;i++)
    {
        if(i == año)
        {
            return contador;
        }
        contador++;
    }
}

function obtenerAños(select)
{
    for(var i=2000 ; i<=2020;i++)
    {
        var opcionAño = document.createElement("option");
        var nodoAño = document.createTextNode(i);
        
        nodoAño.textContent=i;
        opcionAño.appendChild(nodoAño);

        select.appendChild(opcionAño);
    }
    
}


function abrirGrilla(event) 
{

    var lineaSeleccionada = event.target.parentNode;
    $("contGrilla").style.display = "block"
    obtenerAños($("años"));
    btnGuardar.onclick = function () 
    {

       
        idIndex++;
        var marca = $("marca").value;
        var modelo = $("modelo").value;

        var año = $("años").value;

       
        if (!validarMarca(marca) || !validarModelo(modelo)) 
        {
            
            return;
        }

            var httpPost = new XMLHttpRequest();
            
            httpPost.onreadystatechange = function () {

                if (httpPost.readyState == 4 && httpPost.status == 200) 
                {
                    $("Cargando").style.display = "none";

                }
                cerrarGrilla();
                
            }
            agregarTodos(idIndex,marca,modelo,año);
        httpPost.open("POST", "http://localhost:3000/nuevoAuto", true)
        httpPost.setRequestHeader("Content-Type", "application/Json");
        
        $("Cargando").style.display = "flex";
        var JsonAuto = { "id": idIndex, "make": marca, "model": modelo, "year": año};

        httpPost.send(JSON.stringify(JsonAuto));
    }
   
    


}

function cerrarGrilla() {

    $("contGrilla").style.display = "none"

}


function validarMarca(marca)
{
    if (marca.length <= 3) 
    {
        $("marca").className="conError";
        alert("Debe ingresar una marca.");
        $("marca").focus();
        
        return false;
    }
    
    $("marca").className="sinError";
    return true;
}  
function validarModelo(mod)
{
    if (mod.length <= 3) 
    {
        $("modelo").className="conError";
        alert("Debe ingresar un modelo.");
        $("modelo").focus();
        
        return false;
    }
    
    $("modelo").className="sinError";
    return true;
}  


function modificar()
{
    btnMod.onclick = function () {

       
        //var nuevoSexo = document.querySelector('input[name="sexo"]:checked').value;
        
        var marca = $("marca").value;
        var modelo = $("modelo").value;

        var año = $("años").value;

        
        if (!validarMarca(marca) || !validarModelo(modelo)) 
        {
            
            return;
        }

            var httpPost = new XMLHttpRequest();
            
            httpPost.onreadystatechange = function () {

                if (httpPost.readyState == 4 && httpPost.status == 200) {
                    $("Cargando").style.display = "none";

                    trClick.childNodes[1].innerHTML = nuevoNombre;
                    trClick.childNodes[2].innerHTML = nuevoApellido;


                    trClick.childNodes[3].innerHTML = nuevaFechaFormateada;
                    sexo = document.querySelector('input[name="sexo"]:checked').value;
                    trClick.childNodes[4].innerHTML = nuevoSexo;
                }
                cerrarGrilla();
            }
      
        httpPost.open("POST", "http://localhost:3000/editar", true)
        httpPost.setRequestHeader("Content-Type", "application/Json");
        alert("llego");
        $("Cargando").style.display = "flex";
        var JsonMaterias = { "id": id, "nombre": nuevoNombre, "apellido": nuevoApellido, "fecha": nuevaFechaFormateada, "sexo": nuevoSexo };

        httpPost.send(JSON.stringify(JsonMaterias));
    }
}