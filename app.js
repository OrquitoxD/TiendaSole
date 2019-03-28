firebase.initializeApp({
    apiKey: 'AIzaSyDK84sFJOPq2UjEFbN7-mPkBchElgt8Ba8',
    authDomain: 'proyectousuarios-3ac75.firebaseapp.com',
    projectId: 'proyectousuarios-3ac75'
  });
  
// Initialize Cloud Firestore through Firebase
 var db = firebase.firestore();
  
//Agregar documentos
 function guardar(){
    var nombre = document.getElementById('nombre').value;
    var usuario = document.getElementById('usuario').value;
    var fecha = document.getElementById('fecha').value;   

    db.collection("users").add({
          first: nombre,
          last: usuario,
          born: fecha
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
              document.getElementById('nombre').value = '';
              document.getElementById('usuario').value = '';
              document.getElementById('fecha').value = '';
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
}

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML= '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
        <tr>
                    <th scope="row">${doc.id}</th>
                    <td>${doc.data().first}</td>
                    <td>${doc.data().last}</td>
                    <td>${doc.data().born}</td>
                    <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
                    <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
                  </tr>
        `
    });
});

//Borrar documentos
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Editar documentos
function editar(id,nombre,usuario,fecha){

    document.getElementById('nombre').value = nombre;
    document.getElementById('usuario').value = usuario;
    document.getElementById('fecha').value = fecha;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function(){
        var washingtonRef = db.collection("users").doc(id);

        // Actualiza los datos del documento

        var nombre = document.getElementById('nombre').value;
        var usuario = document.getElementById('usuario').value;
        var fecha = document.getElementById('fecha').value;

        return washingtonRef.update({
            first: nombre,
            last: usuario,
            born: fecha
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('nombre').value = '';
            document.getElementById('usuario').value = '';
                document.getElementById('fecha').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        }); 
    }
}
