window.addEventListener('load', function () {
    getAll();
  });
  
  function getAll() {
    // 1. GET request using fetch()
    fetch(urlBase() + "/planner/api/deliverableType/all")
      // Converting received data to JSON
      .then((response) => response.json())
      .then((json) => {
  
        console.log(json)
  
        // 2. Create a variable to store HTML table headers
        let li = ``;
  
        // 3. Loop through each data and add a table row
        json.content.forEach((item) => {
          li += `<tr>
        <td>#</td>
        <td>${item.name}</td>
        <td>${item.status} </td>
        <td>${item.createdAt}</td>
        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit" data-bs-data_id="${item._id}" data-bs-data_name="${item.name}">Edit</button>
        </td>
      </tr>`;
        });
  
        // 4. DOM Display result
        document.getElementById("getAll").innerHTML = li;
      });
  }
  
  function create() {
  
    const type_name = document.getElementById('type_name').value;
  
    fetch(urlBase() + "/planner/api/deliverableType/create", {
      // 6. Adding method type
      method: "POST",
  
      // 7. Adding body or contents to send JSON Stringify
  
  
      body: JSON.stringify({
        name: type_name
      }),
  
      // 8. Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      // 9. Converting to JSON
      .then((response) => {
        response.json()
        toastr.success('Creado correctamente')
        getAll();
      })
  
      // 10. Displaying results to console
      .then((json) => {
        console.log(json)
  
      });
  }

  function edit(){
    const type_name = document.getElementById('name').value;
    const type_id = document.getElementById('type_id').value;
  
    fetch(urlBase() + "/planner/api/deliverableType/update", {
      // 6. Adding method type
      method: "POST",
  
      // 7. Adding body or contents to send JSON Stringify
  
  
      body: JSON.stringify({
        _id: type_id,
        name: type_name
      }),
  
      // 8. Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      // 9. Converting to JSON
      .then((response) => {
        response.json()
        toastr.success('Actualizado correctamente')
        getAll();
      })
  
      // 10. Displaying results to console
      .then((json) => {
        console.log(json)
  
      });
  }

  
  function urlBase() {
    return 'http://localhost:9098'
  }

  var editModal = document.getElementById('edit')
  editModal.addEventListener('show.bs.modal', function (event) {
  // Botón que activó el modal
  var button = event.relatedTarget
  // Extraer información de los atributos data-bs-*
  var _id = button.getAttribute('data-bs-data_id')
  var type_name = button.getAttribute('data-bs-data_name')
  // Si es necesario, puedes iniciar una solicitud AJAX aquí
  // y luego realiza la actualización en una devolución de llamada.
  //
  // Actualizar el contenido del modal.
  const type_id = document.getElementById('type_id');
  const name = document.getElementById('name');
  type_id.value = _id
  name.value = type_name
})