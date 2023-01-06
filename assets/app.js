window.addEventListener('load', function () {
  getClients();
  getTypes();
});

function getClients() {
  // 1. GET request using fetch()
  fetch(urlBase() + "/planner/api/uploaddeliverable/all")
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
      <td>${item.client}</td>
      <td>${item.project} </td>
      <td>${item.period}</td>
      <td>${item.date}</td>
      <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadFiles" data-bs-client_id="${item._id}">Upload Files</button>
      </td>
    </tr>`;
      });

      // 4. DOM Display result
      document.getElementById("customers").innerHTML = li;
    });
}

function createClient() {

  const client = document.getElementById('client').value;
  const project = document.getElementById('project').value;
  const period = document.getElementById('period').value;

  fetch(urlBase() + "/planner/api/uploaddeliverable/create", {
    // 6. Adding method type
    method: "POST",

    // 7. Adding body or contents to send JSON Stringify


    body: JSON.stringify({
      client: client,
      project: project,
      period: period
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
      getClients();
    })

    // 10. Displaying results to console
    .then((json) => {
      console.log(json)

    });
}

function addOptions(domElement, array) {
  var select = document.getElementsByName(domElement)[0];
 
  for (value in array) {
   var option = document.createElement("option");
   option.text = array[value];
   select.add(option);
  }
 }

function getTypes() {
  // 1. GET request using fetch()
  fetch(urlBase() + "/planner/api/deliverableType/all")
    // Converting received data to JSON
    .then((response) => response.json())
    .then((json) => {

      console.log(json)

      // 2. Create a variable to store HTML table headers
      let li = ``;
      let types = []
      // 3. Loop through each data and add a table row
      json.content.forEach((item) => {
       /* li += `<tr>
      <td>#</td>
      <td>${item.name}</td>
      <td>${item.status} </td>
      <td>${item.createdAt}</td>
      <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit" data-bs-data_id="${item._id}" data-bs-data_name="${item.name}">Edit</button>
      </td>
    </tr>`;*/
    types.push(item.name)

      });

      addOptions("type_name", types);

    });
}

function uploadFile(){
  
}

function urlBase() {
  return 'http://localhost:9098'
}

//Moddal upload Files

var exampleModal = document.getElementById('uploadFiles')
exampleModal.addEventListener('show.bs.modal', function (event) {
  // Botón que activó el modal
  var button = event.relatedTarget
  // Extraer información de los atributos data-bs-*
  var client_id = button.getAttribute('data-bs-client_id')
  // Si es necesario, puedes iniciar una solicitud AJAX aquí
  // y luego realiza la actualización en una devolución de llamada.
  //
  // Actualizar el contenido del modal.
  const client = document.getElementById('client_id');
  client.value = client_id
})