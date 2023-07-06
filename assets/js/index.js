const content = document.getElementById("content");
const body = document.querySelector("body");
const habitaciones = document.getElementById("floatingPassword1");
const min_metros = document.getElementById("floatingPassword2");
const max_metros = document.getElementById("floatingPassword3");
const invalid = document.getElementById("invalid-feedback");
const buscar = document.getElementById("buscar");
const total = document.getElementById("totalPropiedades");
let llenado = true;
let total_habitaciones = null;
let total_min = null;
let total_max = null;
let html = "";
let html_filtro = "";
let contador = 0;
const propiedades = [
  {
    name: "Casa de campo",
    description: "Un lugar ideal para descansar de la ciudad",
    src: "https://i0.wp.com/casadecampoliving.com/wp-content/uploads/2022/10/Casa-AZ-1-1.jpg?fit=1000%2C667&ssl=1",
    rooms: 2,
    m: 170,
  },
  {
    name: "Casa de playa",
    description: "Despierta tus días oyendo el oceano",
    src: "https://images.adsttc.com/media/images/5a58/a660/f197/cc25/0900/02b1/medium_jpg/S3_CDS--6.jpg?1515759188",
    rooms: 2,
    m: 130,
  },
  {
    name: "Casa en el centro",
    description: "Ten cerca de ti todo lo que necesitas",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Ciudad_Satelite_2_casa.JPG",
    rooms: 1,
    m: 80,
  },
  {
    name: "Casa rodante",
    description: "Conviertete en un nómada del mundo sin salir de tu casa",
    src: "https://americanbid.cl/cdn/shop/products/AmericanBid.cl-puma2016_1200x1200.jpg?v=1648488616",
    rooms: 1,
    m: 6,
  },
  {
    name: "Departamento",
    description: "Desde las alturas todo se ve mejor",
    src: "https://zoominmobiliario.com/image?path=images/external/httpswww.almagro.clwp-contentuploads201904mackenna2-listado-nuevo.jpg",
    rooms: 3,
    m: 200,
  },
  {
    name: "Mansión",
    description: "Vive una vida lujosa en la mansión de tus sueños ",
    src: "https://imgclasificados1.emol.com/Proyectos/imagenes/docs_corredores/archivos/1186/1120067/59382f82e27c252c1bd3721e67b9f521.jpg",
    rooms: 5,
    m: 500,
  },
];

function renderizado() {
  if (llenado) {
    for (let propiedad of propiedades) {
      html += `
            <div class="card" style="width: 18rem;">
                <img src=${propiedad.src} class="card-img-top" style="height: 10rem" alt="imagen casa">
                <div class="card-body">
                    <h5 class="card-title">${propiedad.name}</h5>
                    <h6 class="card-text">Metros cuadrados: ${propiedad.m} mts.</h6>
                    <h6 class="card-text">Habitaciones: ${propiedad.rooms}</h6>
                    <p class="card-text">${propiedad.description}</p>
                    <a href="#" class="btn btn-primary">+ INFO</a>
                </div>
            </div>
            `;
    }
    content.innerHTML = html;
    total.innerHTML = "Total: " + propiedades.length;
    llenado = false;
  } else {
    content.innerHTML = html;
    total.innerHTML = "Total: " + propiedades.length;
  }
}
renderizado();

function recorrer_arreglo() {
  for (let propiedad of propiedades) {
    if (
      total_min >= propiedad.m <= total_max &&
      total_habitaciones === propiedad.rooms
    ) {
      html_filtro += `
            <div class="card" style="width: 18rem;">
                <img src=${propiedad.src} class="card-img-top" style="height: 10rem" alt="imagen casa">
                <div class="card-body">
                    <h5 class="card-title">${propiedad.name}</h5>
                    <h6 class="card-text">Metros cuadrados: ${propiedad.m} mts.</h6>
                    <h6 class="card-text">Habitaciones: ${propiedad.rooms}</h6>
                    <p class="card-text">${propiedad.description}</p>
                    <a href="#" class="btn btn-primary">+ INFO</a>
                </div>
            </div>
            `;
      contador++;
    }
  }
}
habitaciones.addEventListener("change", (event) => {
  total_habitaciones = Number(event.target.value);
});
min_metros.addEventListener("change", (event) => {
  total_min = Number(event.target.value);
});
max_metros.addEventListener("change", (event) => {
  total_max = Number(event.target.value);
});

function mayor_y_menor(mayor, menor) {
  if (mayor < menor) {
    let nuevo_mayor = menor;
    let numero_menor = mayor;
    return nuevo_mayor, numero_menor;
  }
}

buscar.addEventListener("click", () => {
  if (total_habitaciones == 0 || total_max == null || total_min == null) {
    min_metros.classList.add("is-invalid");
    max_metros.classList.add("is-invalid");
    habitaciones.classList.add("is-invalid");
    invalid.style.display = "block";
    return 0;
  } else {
    min_metros.classList.remove("is-invalid");
    max_metros.classList.remove("is-invalid");
    habitaciones.classList.remove("is-invalid");
    invalid.style.display = "none";
    mayor_y_menor(total_max, total_min);
    recorrer_arreglo();
    content.innerHTML = html_filtro;
    total.innerHTML = "Total: " + contador;
  }
  if (contador == 0) {
    content.innerHTML = "<h5>No existen coincidencias con su busqueda.</h5>";
  }
  html_filtro = "";
  contador = 0;
});
