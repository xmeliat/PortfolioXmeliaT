// DECLARACIO DE VARIABLES
let palabrasSolucion = [
  "queso",
  "devolver",
  "nombrar",
  "letra",
  "huevo",
  "elegante",
  "peligro",
  "boquepasa",
  "enano",
  "cabezon",
  "unificar",
  "polonia",
  "quebrar",
  "meter",
  "unidos",
  "temor",
  "yogurt",
  "selva",
  "conejo",
  "parar",
  "minita",
  "silbar",
  "craneo",
  "helicoptero",
  "llorar",
  "orbita",
  "lastre",
  "silencio",
  "surcar",
  "tucan",
  "restaurante",
  "demasiado",
  "laberinto",
  "arbitro",
  "rosa",
  "futbolista",
  "llaves",
  "todo",
  "perooooooo",
  "oscuro",
  "musica",
  "salsicha",
  "ahora",
  "algoritmo",
  "estoy",
  "teclado",
  "mostrar",
  "nadar",
  "cigarro",
  "abrigo",
  "pizarra",
  "digital",
  "lapiz",
  "chofer",
  "comida",
  "coche",
  "cocodrilo",
  "solicitud",
  "persona",
  "telefono",
  "yoyo",
  "gracias",
  "portatil",
  "ordenador",
  "mesa",
  "error",
  "hola",
  "adios",
  "silencio",
  "videojuego",
  "barcelona",
  "motocicleta",
];
let palabraElejida = palabrasSolucion[getRandomInt(0, palabrasSolucion.length-1)];
let letrasEscritas = [];
let letrasErradas = [];
let letrasCorrectas = [];
let segundos1;
let elCrono, elReloj;
let laMevaData = new Date();
let reloj = new Date();
let user;
let time;
let misses;
let arrStatsPartida = [];
let arrAuxiliarStatsPartida = [];
let arrAuxiliarTiempoOrdenado = [];
let correcto = false;

// REFERENCIA A OBJECTES DEL HTML
let display = document.getElementById("hora");
let tiempoRespuesta = document.getElementById("tiempoRespuesta");
let start = document.getElementById("start");
let teclado = document.querySelector("#teclado");
let errores = document.getElementById("errores");
let numeroErrores = document.getElementById("numeroErrores");
let palabraFinal = document.getElementById("palabraFinal");
let restartBtn = document.getElementById("restartBtn");
let resumenPartida = document.getElementById("resumenPartida");
let btnCerrar = document.getElementById("btnCerrar");
let clasificacion = document.getElementById("clasificacion");
let clasificacionTabla = document.getElementById("clasificacionTabla");
let nomRanking = document.getElementById("nomRanking");
let aux = JSON.parse(localStorage.getItem("array"));
let aux2 = JSON.parse(localStorage.getItem("array2"));

// FUNCIONES

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

// 10 SEGONS PER ESCOLLIR UNA LLETRA
function temporizador() {
  segundos1 = reloj.getSeconds();
  segundos1 -= 1;
  // Reset del temporizador passats els 10 segons
  if (segundos1 < 1) {
    numeroErrores.innerHTML++;
    cambiaColorErrores();
    segundos1 = 10;
    // Pantalla de final de joc 
    if (numeroErrores.innerHTML == 7) {
      mensajeFinal.style.display = "block";
      gameOver.innerHTML = "¡HAS PERDIDO, INTENTALO DE NUEVO!";
      document.getElementById("gameSolution").style.display = "block";
      document.getElementById("gameSolution").innerHTML = "La palabra correcta era:  \"" + palabraElejida +"\"";
    }
  }

  // Canvi de color al temporitzador quan hi queda poc temps
  if (segundos1 < 4) {
    tiempoRespuesta.style.color = "red";
    tiempoRespuesta.style.fontWeight = "bold";
  } else {
    tiempoRespuesta.style.color = "white";
    tiempoRespuesta.style.fontWeight = "";
  }
  reloj.setSeconds(segundos1);
  tiempoRespuesta.innerHTML = segundos1 + " s";
}

// Temporizador general de la partida
function crono() {
  let horas = laMevaData.getHours();
  let minutos = laMevaData.getMinutes();
  let segundos = laMevaData.getSeconds();

  segundos += 1;

  if (segundos == 60) {
    segundos = 0;
    minutos += 1;
    laMevaData.setMinutes(minutos);
  }

  if (horas < 10) {
    horas = "0" + horas;
  }

  if (minutos < 10) {
    minutos = "0" + minutos;
  }

  if (segundos < 10) {
    segundos = "0" + segundos;
  }

  laMevaData.setSeconds(segundos);

  display.innerHTML = horas + " : " + minutos + " : " + segundos;
}

// AMB AQUESTA FUNCIO QUAN REINICIEM LA PAGINA NO HAUREM DE TORNAR A INSERIR UN USUARI, ES GUARDARA DE L'ULTIMA VEGADA I EL PODEM EDITAR
// L'usuari ha de haver jugat minim una partida per a que es guardi --
function recordarUsuario() {
  usuari = localStorage.getItem("usuari");
  nomRanking.value = usuari;

  if(user==undefined) user = arrAuxiliarStatsPartida[arrAuxiliarStatsPartida.length-3];
}

function descargarClasificacion() {
    arrAuxiliarStatsPartida = aux.concat(arrAuxiliarStatsPartida);
    arrAuxiliarStatsPartida = aux2.concat(arrAuxiliarStatsPartida); 
}

// MOSTRAR LES DADES DEL LOCAL STORAGE  
function insertarClasificacion() {

  for(i = 0; i <= arrAuxiliarStatsPartida.length; i++){
    let strTime = arrAuxiliarStatsPartida[i]+"".trim;
    if (strTime.includes(":")) {
      arrAuxiliarTiempoOrdenado.push(arrAuxiliarStatsPartida[i]);
    }
  }
  arrAuxiliarTiempoOrdenado.sort();

  arrAuxiliarTiempoOrdenado.length=5;

  for (i = 0; i <arrAuxiliarTiempoOrdenado.length; i++){
    document.getElementById("j"+(i+1)+"t").innerHTML = arrAuxiliarTiempoOrdenado[i];
    
    posicionTiempo = arrAuxiliarStatsPartida.indexOf(arrAuxiliarTiempoOrdenado[i]);
    document.getElementById("j"+(i+1)+"u").innerHTML = arrAuxiliarStatsPartida[posicionTiempo-1];
    document.getElementById("j"+(i+1)+"f").innerHTML = arrAuxiliarStatsPartida[posicionTiempo+1];

  }

}

// FUNCIÓ AUXILIAR PER AHORRAR CODI A LA FUNCIÓ "corregirClasificacion" 
function codiNet(i) {
  return document.getElementById("j"+i+"f").innerText;
}

// FA LA TAULA DE CLASSIFICACIÓ MÉS GUAPA ELIMINANT PARAULES "UNDEFINED"
function corregirClasificacion() {
  for (i = 1; i<=5; i++){
    if(codiNet(i)!=0 && codiNet(i)!="1" && codiNet(i)!="2" && codiNet(i)!="3" && codiNet(i)!="4" && codiNet(i)!="5" && codiNet(i)!="6" || codiNet(i) == "undefined"){
      document.getElementById("j"+i+"f").innerHTML = "-";
    }

    if(document.getElementById("j"+i+"u").innerText == "undefined") document.getElementById("j"+i+"u").innerHTML = "-";

    if(document.getElementById("j"+i+"t").innerText == "undefined") document.getElementById("j"+i+"t").innerHTML = "-";
    
  };
}


// FUNCIO AUXILIAR PER PASAR EL CONTINGUT A STRING (anira be per a comparar lletres)
function arrayLetras(array) {
  let str = "";
  for (i = 0; i < array.length; i++) {
    str += array[i] + " ";
  }
  return str;
}

// FUNCIÓ DE DECORACIÓ
function cambiaColorErrores() {
  if (numeroErrores.innerHTML == 5) {
    document.getElementById("erroresDiv").style.color = "darkorange";
  }else if (numeroErrores.innerHTML == 6) {
    document.getElementById("erroresDiv").style.color = "red";
  } else {
    document.getElementById("erroresDiv").color = "";
  }
}

// RECARGA LA PAGINA
function resetear() {
  location.reload();
}

// MOSTRAR HUECOS DE LA PALABRA
function insertaPalabra() {
  for (i = 0; i < palabraElejida.length; i++) {
    letrasCorrectas[i] = "_";
    palabraFinal.innerHTML += letrasCorrectas[i] + " ";
  }
}

// CRONOMETRE FET A CLASSE
function intervalo() {
  elCrono = setInterval(crono, 1000);
  start.disabled = true;
  stop.disabled = false;
  reset.disabled = false;
}

function intervaloRespuesta() {
  elReloj = setInterval(temporizador, 1000);
  start.disabled = true;
  stop.disabled = false;
  reset.disabled = false;
}

laMevaData.setHours(0, 0, 0, 0);
reloj.setSeconds(10, 0);
display.innerHTML = "00 : 00 : 00";
tiempoRespuesta.innerHTML = "10s";


/* ----    INICIO DE PROGRAMA     -----*/

// INSERTA PALABRA ALEATORIA EN FORMA DE GUIONES
insertaPalabra();

// MEMORIZA TUS PARTIDAS EN CASO DE QUE EXISTA TU USUARIO
if (aux){
  descargarClasificacion();
  insertarClasificacion();
  recordarUsuario();
}

corregirClasificacion();


// EVENTOS
start.addEventListener("click", () => {
  // FUNCION DE CRONOMETRO
  intervalo();
  intervaloRespuesta();
  
  // CAPTURA DE TECLADO
  teclado.addEventListener("click", (e) => {
    tiempoRespuesta.innerHTML = "10s";
    segundos1 = 10;
    reloj.setSeconds(segundos1);
    
    let actual = e.target.value + "";
    
    if (actual.length == 1) {
      letrasEscritas[letrasEscritas.length] = actual;
      for (i = 0; i < palabraElejida.length; i++) {
        if (actual == palabraElejida[i]) {
          correcto = true;
          break;
        } else {
          correcto = false;
        }
      }
      
      if (correcto === true) {
        for (i = 0; i < palabraElejida.length; i++) {
          if (actual == palabraElejida[i]) {
            letrasCorrectas[i] = actual;
          }
        }
      } else {
        letrasErradas[letrasErradas.length] = actual;
        errores.innerText +=
        letrasErradas[letrasErradas.length - 1].toUpperCase();
        numeroErrores.innerHTML++;
        
        resumenPartida.src="./img/f" + letrasErradas.length +".png" ;
      }
      
      palabraFinal.innerHTML = arrayLetras(letrasCorrectas).toUpperCase();
      
      e.target.disabled = true;        
    }
    
    // JOC ACABAT 
    if (!letrasCorrectas.includes("_")) {
      setTimeout(() => {
        mensajeFinal.style.display = "block";
        gameOver.innerHTML = "¡ENHORABUENA, HAS GANADO!";
        document.getElementById("gameSolution").style.display = "none";
      }, 250);
      
      // Si al ganar, el usuario no puso su nombre, no va a registrar los datos de la partida
      if(user!=undefined){ 
        // Primer capturarem les dates que ens interessen
        window.localStorage.setItem("tiempo", display.innerHTML);
        time = localStorage.getItem("tiempo");
        window.localStorage.setItem("usuari", user);
        usuari = localStorage.getItem("usuari");
        window.localStorage.setItem("errorsPartida", numeroErrores.innerHTML);
        errorsPartida = localStorage.getItem("errorsPartida");
        
        // Despres les pasarem a JSON per a tenir una especie de array al local storage.
        arrStatsPartida = [usuari, time, errorsPartida];
        localStorage.setItem("array", JSON.stringify(arrStatsPartida));
        localStorage.setItem("array2", JSON.stringify(arrAuxiliarStatsPartida));
      }
    }
    
    if (numeroErrores.innerHTML == 7) {
      mensajeFinal.style.display = "block";
      gameOver.innerHTML = "¡HAS PERDIDO, INTENTALO DE NUEVO!";
      document.getElementById("gameSolution").style.display = "block";
      document.getElementById("gameSolution").innerHTML = "La palabra correcta era:  \"" + palabraElejida +"\"";
    }
    cambiaColorErrores();
});

});

reset.addEventListener("click", resetear, false);

restartBtn.addEventListener("click", ()=>{
    location.reload();
}, false);

clasificacion.addEventListener("click", ()=>{
  clasificacionTabla.style.display = "block";
}, false);

btnCerrar.addEventListener("click", ()=>{
  clasificacionTabla.style.display = "none";
}, false);

// CAPTURAR EL NOM DEL USUARI SENSE PREMER CAP SUBMIT
nomRanking.addEventListener("input", ()=>{
  user = nomRanking.value;
});