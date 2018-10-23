//var studentsList = localStorage.getItem("studentsList")



$("#student-birthdate").datepicker({
  dayNamesMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"]
});


var alumnos = [{
  "Nombre": "Edwin",
  "Edad": 20,
  "Ciudad": "Puerto Vallarta",
  "FechaNacimiento": "N/A",
  "FotoUrl": "img/student-one.jpg"
}, {
  "Nombre": "Kevin",
  "Edad": 28,
  "Ciudad": "Puerto Vallarta",
  "FechaNacimiento": "N/A",
  "FotoUrl": "img/student-two.jpg"
}, {
  "Nombre": "Edgar",
  "Edad": 28,
  "Ciudad": "Coahuila",
  "FechaNacimiento": "N/A",
  "FotoUrl": "img/student-three.jpg"
}, {
  "Nombre": "Alfredo",
  "Edad": 21,
  "Ciudad": "CDMX",
  "FechaNacimiento": "N/A",
  "FotoUrl": "img/student-four.jpg"
}];

/*función para eliminar un usuario*/
const deleteStudent = (e) => {
  let selectedRow = $(e.target).closest("tr").index();
  alumnos.splice(selectedRow, 1);
  $(e.target).closest("tr").remove();
  localStorage.setItem("studentsList", JSON.stringify(alumnos));
}

const updateTable = () => {
  $("#alumnos-table").empty();
  /*llena la tabla con los registros actuales*/
  $.each(alumnos, (index, value) => {
    $("#alumnos-table").append(`
            <tr>
                <td>${value.Nombre}</td>
                <td>${value.Edad}</td>
                <td>${value.Ciudad}</td>
                <td>${value.FechaNacimiento}</td>
                <td><div class="btn btn-delete">Eliminar</div>
                <td><div class="btn btn-success">Ver pefil</div>
            </tr>`);
  });
  $(".btn-delete").on("click", (e) => {
    deleteStudent(e)
  })

  $(".btn-success").on("click", function(e) {
    console.log("success")
    let selectedRow = $(e.target).closest("tr").index();
    let studentData = alumnos[selectedRow];
    console.log(studentData)
    $(".student-card").slideUp("fast", function() {
      $(".student-card .card-student-pic").attr("src", "").attr("src", studentData.FotoUrl)
      $(".student-card .card-student-name").text(studentData.Nombre);
      $(".student-card .card-student-age").text(studentData.Edad);
      $(".student-card .card-student-city").text(studentData.Ciudad);
      $(".student-card .card-student-birthdate").text(studentData.FechaNacimiento);
      $(".student-card").slideDown("fast")
    })
  })
}

$(".nav-button").on("click", function(e) {
  let selectedButton = e.target;
  let currentSection = $(e.target).data("controls"); /*obtenemos la sección a mostrar*/
  /*oculta las secciones*/
  $("section").hide();
  /*muestra la sección seleccionada*/
  $(currentSection).show();
  switch (currentSection) {
    case '#alumnos':
      updateTable()
      break;
    default:
      break;
  }
});

/*(crear funcion que se ejecute al dar click en el boton y que extraiga los datos del formulario)
 */

$("#add-student").on("click", function(e) {
  let studentName = $("#student-name").val(),
    studentAge = $("#student-age").val(),
    studentCity = $("#student-city").val(),
    studentBirthdate = $("#student-birthdate").val();
  let newStudent = {
    "Nombre": studentName,
    "Edad": studentAge,
    "Ciudad": studentCity,
    "FechaNacimiento": studentBirthdate
  };
  alumnos.push(newStudent);
  $("input").val("");
  updateTable();
  localStorage.setItem("studentsList", JSON.stringify(alumnos));
})

var memo = {
  descripcion: "ya tengo sueño",
  fb: "https://www.facebook.com/guillermo.lopezvargas",
  nombreCompleto: "Guillermo Lopez Vargas"
}


$(".nav-button").on("click", function(e) {
  let target = $(e.target).data("view-url");
  $("#content-wrapper").load(target, function() {
    $(".get-users-btn").on("click", (e) => {
      console.log("click");
      $.ajax({
        type: "DELETE",
        url: "https://example2-189b5.firebaseio.com/kodemia/0/koders/-LPTg7L9EWLYvMEd7aVF.json",
        //data: JSON.stringify(memo),
        success: function(data) {
          console.log("memo eliminado");
          console.log(data)
        },
        error: function(error) {
          console.log(error)
        }
        //dataType: dataType
      });
      /*$.get("https://example2-189b5.firebaseio.com/kodemia/0/koders.json", function(data) {
          console.log(data)
      });*/
    })
  })
})


$(document).ready(function() {

});

updateTable();

const empujarAlumnos = () => {
  alumnos.forEach((element) => {
    $.ajax({
      type: "POST",
      url: "https://example2-189b5.firebaseio.com/kodemia/-LPTowKkZHAQhJcVBVRM.json",
      data: JSON.stringify(element),
      success: function(data) {
        console.log("array insertado");
        console.log(data)
      },
      error: function(error) {
        console.log(error)
      }
      //dataType: dataType
    });
  })
}


const eliminarElemento = () => {
  alumnos.forEach((element) => {
    let elementoToDel = "-LPTpmzO2LOyaEvRy8MV";
    $.ajax({
      type: "DELETE",
      url: "https://example2-189b5.firebaseio.com/kodemia/-LPTowKkZHAQhJcVBVRM/"+elementoToDel+".json",
      success: function(data) {
        console.log("elemento borrado");
      },
      error: function(error) {
      }
      //dataType: dataType
    });
  })
}


const actualizarAlumno = () => {
  alumnos.forEach((element) => {
    let testAlumnoKey = "-LPTqw9PEUXa4DatqbPV";
    let testAlumno = {
		"Ciudad": "Puerto Vallartototoot",
		"Edad": 20,
		"FechaNacimiento": "N/A",
		"FotoUrl": "img/student-one.jpg",
		"Nombre": "Edwin"
	};

    $.ajax({
      type: "PUT",
      url: "https://example2-189b5.firebaseio.com/kodemia/-LPTowKkZHAQhJcVBVRM/"+testAlumnoKey+".json",
      data: JSON.stringify(testAlumno),
      success: function(data) {
        console.log("Alumno actualizado");
        console.log(data)
      },
      error: function(error) {
        console.log("error")
      }
      //dataType: dataType
    });
  })
}


const insertarAlumno = () => {

    let testAlumno = {
		"Ciudad": "Pototo",
		"Edad": 50,
		"FechaNacimiento": "N/A",
		"FotoUrl": "img/student-one.jpg",
		"Nombre": "Mimimi"
	};

    $.ajax({
      type: "POST",
      url: "https://example2-189b5.firebaseio.com/kodemia/-LPTowKkZHAQhJcVBVRM.json",
      data: JSON.stringify(testAlumno),
      success: function(data) {
        console.log("Alumno agregado");
        console.log(data)
      },
      error: function(error) {
        console.log("error")
      }
      //dataType: dataType
    });

}


//$(".btn-delete").closest("tr")
//$("table").children("tr")/*selecciona todos los tr que son descendientes inmediatos de table*/
//$("table").find("tr")/*selecciona todos los tr que son descendietnes de table*/
//$("td").siblings("")

//$("#content-wrapper").load(contentUrl,callback)