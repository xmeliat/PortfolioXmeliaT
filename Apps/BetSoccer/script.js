// Declaracio d'elements
let teamsHeader = document.getElementById("equipos");
let jornadaDiv = document.getElementById("jornadaGenerada");
let quinielaGenerada = document.getElementById("quinielaGenerada");
let enviarQuiniela = document.getElementById("enviarQuiniela");
let quiniela = document.getElementById("quiniela");
let comprobarApuesta = document.getElementById("comprobarApuesta");
let taulaAcerts = document.getElementById("taulaAcerts");
let numAcerts = document.getElementById("numAcerts");
let quinielasHistorico = document.getElementById("quinielasHistorico");
let generaRapit = document.getElementById("generaRapit");

// Declaracio de variables
let teamsSrc = "img/teams/";
// Guardam en forma de objectes per a tenir multiples informacions de cada equip
let primeraMasc = [{nom:"Almería", escut: teamsSrc + "1.png"}, {nom:"Athletic Club", escut: teamsSrc + "2.png"} , {nom:"Atlético de Madrid", escut: teamsSrc + "3.png"} , {nom:"FC Barcelona", escut: teamsSrc + "4.png"} , {nom:"Real Betis", escut: teamsSrc + "5.png"} , {nom:"Cádiz", escut: teamsSrc + "6.png"} , {nom:"Celta de Vigo", escut: teamsSrc + "7.png"} , {nom:"Elche", escut: teamsSrc + "8.png"} , {nom:"Espanyol", escut: teamsSrc + "9.png"} , {nom:"Getafe", escut: teamsSrc + "10.png"} , {nom:"Girona", escut: teamsSrc + "11.png"} , {nom:"Real Mallorca", escut: teamsSrc + "12.png"} , {nom:"Osasuna", escut: teamsSrc + "13.png"}, {nom:"Real Sociedad", escut: teamsSrc + "14.png"} , {nom:"Rayo Vallecano", escut: teamsSrc + "15.png"} ,{nom:"Real Madrid", escut: teamsSrc + "16.png"} , {nom:"Valladolid", escut: teamsSrc + "17.png"} , {nom:"Sevilla", escut: teamsSrc + "18.png"} , {nom:"Valencia", escut: teamsSrc + "19.png"} , {nom:"Villareal", escut: teamsSrc + "20.png"} ];
let primeraFem = [{nom:"Alhama", escut: teamsSrc + "fem/1.png"}, {nom:"Athletic Club Fem", escut: teamsSrc + "fem/2.png"}, {nom:"Atlético de Madrid", escut: teamsSrc + "fem/3.png"}, {nom:"Alavés", escut: teamsSrc + "fem/4.png"}, {nom:"FC Barcelona", escut: teamsSrc + "fem/5.png"}, {nom:"Las Planas", escut: teamsSrc + "fem/6.png"}, {nom:"Levante Fem", escut: teamsSrc + "fem/7.png"}, {nom:"Madrid CFF", escut: teamsSrc + "fem/8.png"}, {nom:"Real Betis Fem", escut: teamsSrc + "fem/9.png"}, {nom:"Real Madrid Fem", escut: teamsSrc + "fem/10.png"}, {nom:"Real Sociedad Fem", escut: teamsSrc + "fem/11.png"}, {nom:"Sevilla Fem", escut: teamsSrc + "fem/12.png"}, {nom:"Huelva Fem", escut: teamsSrc + "fem/13.png"}, {nom:"Tenerife", escut: teamsSrc + "fem/14.png"}, {nom:"Valencia Fem", escut: teamsSrc + "fem/15.png"}, {nom:"Villareal Fem", escut: teamsSrc + "fem/16.png"}];
let jornadaGenerada = [];
let historialQuinielas = [];
let paginaActual = "m"

// Mostrar Equips al header
for (i = 1; i <= 20; i++) {
  teamsHeader.innerHTML += "<img class='teams' height='40px' src='" + teamsSrc + i + ".png'>";
}

// Aqui generarem el primer partit de la temporada
function generarJornada(arrayEquips) {
  let jornadaGenerada = [];
  let y = 0;
  let ran, ran2;

  // Ordena els equips de forma aleatoria cada vegada (restant 0,5 feim q mus doni nombres positius i negatius, aixi amb sort() ordneara equips per davant com per darrere).
  arrayEquips.sort(function () {
    return Math.random() - 0.5;
  });

  for (i = 0; i < arrayEquips.length; i++) {
    y = i + 1;
    // Generarem ja el reultat de cada partit, estara amagat fins a que es fagi la quiniela. Tambe afagirem l'horari del partit 
    ran = marcarGols();
    ran2 =  marcarGols();
    let auxLocal = arrayEquips[i];
    let auxVisitant = arrayEquips[y];
    let resultatLocal = ran;
    let resultatVisitant = ran2;
    let partit = [auxLocal, auxVisitant, resultatLocal, resultatVisitant, gernerarHorari()];
    jornadaGenerada[i] = partit;
    i++;
  }

  //Sense aquesta funció, es generava un partit cada 2 elements de l'array, aixi el netejam
  return jornadaGenerada.filter(function () {
    return true;
  });
};

// AQUESTA FUNCIO PRINTA PER PANTALLA LA JORNADA QUE VOLEM I A LA QUINIELA FICA 4 PARITS RANDOM DE L'ALTRE LLIGA
function imprimirJornada(jornada, jornadaSecundaria){
  let arr = generarJornada(jornada);
  let arr2 = generarJornada(jornadaSecundaria);
  let jornadaCompleta = arr.concat(arr2);

  jornadaDiv.innerHTML="";
  quinielaGenerada.innerHTML=`<tr><td><b>Quiniela</b></td><td> </td><td> </td><td> </td><td>1</td><td>X</td><td>2</td></tr>`; //Formatejam la taula cada vegada 
  
  for(i=0; i<arr.length; i++){
    jornadaDiv.innerHTML +=  `<tr class="partitTaula"> <td class="izq"> <img class="mt-2 mb-2" src="`+ arr[i][0]['escut'] +`" height="70"> <h5>`+ arr[i][0]['nom'] +`</h5> </td><td> <h4> `+ arr[i][4] +` </h4> <button type="button" onclick="mostrarQuiniela()" class="hacerQuiniela">Pronosticar resultado</button> <h2 class="resultados" style="display:none">` + arr[i][2] + " - " + arr[i][3] + `</h2> </td><td class="der"> <img class="mt-2 mb-2" src="`+ arr[i][1]['escut'] +`" height="70"> <h5>`+ arr[i][1]['nom'] +`</h5></td></tr><tr class="partitNull"><td><div class="p-1"></div></td></tr>`
    quinielaGenerada.innerHTML += `<tr><td>`+ (i+1) +`.</td><td>`+ arr[i][0]['nom'] +`</td><td>vs</td><td>`+ arr[i][1]['nom'] +`</td><td><input type="radio" class="inputsRadio" value="1" name="partido`+ i +`"></td><td><input type="radio" class="inputsRadio" required value="0" name="partido`+ i +`"></td><td><input type="radio" class="inputsRadio" value="2" name="partido`+ i +`"></td></tr>`
  }
  // AFEGIR 4 PARTITS DE L'ALTRA LLIGA
  for(i=arr.length+1; i<(arr.length+5); i++){
    quinielaGenerada.innerHTML+= ` <tr><td>`+ i +`.</td><td>`+ arr2[(i-arr.length-1)][0]['nom'] +`</td><td>vs</td><td>`+ arr2[(i-arr.length-1)][1]['nom'] +`</td><td><input type="radio" class="inputsRadio" value="1" name="partido`+ i +`"></td><td><input required type="radio" class="inputsRadio" value="0" name="partido`+ i +`"></td><td><input type="radio" class="inputsRadio" value="2" name="partido`+ i +`"></td></tr>` ;
  }

  paginaActual = "m"
  document.getElementById("tituloJornada").innerHTML = "Generador de jornada"

  comprobarApuesta.style.display = "none";

  return jornadaCompleta;
};

// AQUESTA FUNCIO GENERARA UN NOMBRE RANDOM DE 0 A 100 I AMB 'IF' DONAREM MES POSSIBILITATS A RESULTATS AMB POCS GOLS, PER A QUE SIGUI MES REALISTA
function marcarGols() {
  let ran = Math.floor(Math.random()*101);
  
    if(ran<20) return 0;      
    if (ran>= 20 && ran<55) return 1;
    if (ran>= 55 && ran<76) return 2;
    if (ran>= 76 && ran<88) return 3;
    if (ran>= 88 && ran<94) return 4;
    if (ran>= 94 && ran<98) return 5;
    if (ran>= 98) return 6;   
}

// AQUESTA FUNCIO GENERARA UN HORARI RANDOM PER CADA PARTIT 
function gernerarHorari(){
  let randDia = Math.floor(Math.random()*4)
  let dia = "";
  let randHora = Math.floor(Math.random()*6)
  let hora = "";
  
  switch (randDia) {
    case 0:
      dia = "Viernes"      
      break;
    case 1:
      dia = "Sábado"      
      break;
    case 2:
      dia = "Domingo"      
      break;
    case 3:
      dia = "Lunes"      
      break;
  
    default:
      dia = "Sábado"
      break;
  }

  switch (randHora) {
    case 0:
      hora = "18:30h"      
      break;
    case 1:
      hora = "20:00h"      
      break;
    case 2:
      hora = "21:00h"      
      break;
    case 3:
      hora = "14:00h"      
      break;
    case 4:
      hora = "19:30h"      
      break;
    case 5:
      hora = "17:00h"      
      break;
    default:
      hora = "21:00h"
      break;
  }

  return dia +  " - " + hora;
}

// FUNCIONS PER LA FINESTRA DE LES QUINIELAS
function amagarQuiniela() {
  document.getElementById('quiniela').style.display="none";
  document.getElementById('body').classList.remove("stop-scrolling");
  taulaAcerts.style.display = "none";
  document.getElementById("difuminat").style.display="none";
}
function mostrarQuiniela() {
  document.getElementById('quiniela').style.display="block";
  document.getElementById('body').classList.add("stop-scrolling");
  document.getElementById("difuminat").style.display="inline";
}

// capturarem tots els imputs type="radio" i els ficarem en un array. Filtrarem sols els que estuiguin marcats 
function contarAposta() {
  let arrQuinela = [];
  let inputs = document.getElementsByClassName("inputsRadio");

  var arrInputs = Array.prototype.filter.call(inputs, function(anElement) {
    return anElement.value;
  })
 
  for(i=0; i<arrInputs.length; i++){
    if (arrInputs[i].checked) {
      arrQuinela.push(arrInputs[i].value);
    }
  }
  return [arrQuinela.length, inputs.length, arrQuinela];
}

function afegirAposta(jornadaCompleta) {
  let arrAux = contarAposta()[2]
  // L'enunciat ens demana tenir tots els partits de la lliga principal + 4 aleatoris de la secundaria. LLevarem els q sobrin de la secundaria i numes en deixarem 4
  let arrDesitjat = [];
  for(i=0; i<jornadaCompleta.length; i++){
    jornadaCompleta[i][5] = arrAux[i];    
  }
  for(i=0; i<jornadaCompleta.length; i++){
    if(jornadaCompleta[i][5] != undefined){
      arrDesitjat.push(jornadaCompleta[i])
    }    
  }
  jornadaDiv.innerHTML = "";
  for(i=0; i<arrDesitjat.length-4; i++){
    jornadaDiv.innerHTML +=  `<tr class="partitTaula"> <td class="izq"> <img class="mt-2 mb-2" src="`+ arrDesitjat[i][0]['escut'] +`" height="70"> <h5>`+ arrDesitjat[i][0]['nom'] +`</h5> </td><td> <h4> `+ arrDesitjat[i][4] +` </h4><h2 class="resultados">` + arrDesitjat[i][2] + " - " + arrDesitjat[i][3] + `</h2> </td><td class="der"> <img class="mt-2 mb-2" src="`+ arrDesitjat[i][1]['escut'] +`" height="70"> <h5>`+ arrDesitjat[i][1]['nom'] +`</h5></td></tr><tr class="partitNull"><td><div class="p-1"></div></td></tr>`
  }
  arrayTop = arrDesitjat;
}

// AMAGA ELS MENUS EN MOSTRAR TOTS ELS ACERTS
function aceptarErrores() {
  numAcerts.style.display = "none"
  document.getElementById("cerrarQuiniela").style.display = "block";
  amagarQuiniela();
  taulaAcerts.style.display = "none";
  document.getElementById("sinCambios").style.display="none";
  
  generaRapit.style.display = "block"
  
  setTimeout(() => {
    generaRapit.style.display = "none"
  }, 15100);
}

// EVENTS
enviarQuiniela.addEventListener("click", ()=>{
  afegirAposta(arrayTop);
  amagarQuiniela();
  comprobarApuesta.style.display = "inline"
});

// FAREM APAREIXER EL BOTO D'ENVIAR EN CAS DE QUE TOTS ELS PARTITS ESTIGUIN APOSTATS
quinielaGenerada.addEventListener("click", ()=>{
  let numValues = contarAposta()[0];
  let numImputs = contarAposta()[1];

  if(numImputs/3 == numValues){
    enviarQuiniela.style.display = "inline";
  }else{
    enviarQuiniela.style.display = "none";
  }
});

// MOSTRAR ACERTS
comprobarApuesta.addEventListener("click", ()=> {
  let valorAux;
  let y = 100;
  let countBe = 0; 
  let countTotal = 0;

  document.getElementById("sinCambios").style.display="block";

  taulaAcerts.innerHTML = "";

  for (i = 0; i < arrayTop.length; i++){
    if(arrayTop[i][2]>arrayTop[i][3]) valorAux = 1;
    if(arrayTop[i][2]<arrayTop[i][3]) valorAux = 2;
    if(arrayTop[i][2]==arrayTop[i][3]) valorAux = 0;
    
    if (valorAux == arrayTop[i][5]) {
      arrayTop[i].push(true)
      setTimeout(() => {
        taulaAcerts.innerHTML += `<tr><td class="acert"></td></tr>`
      }, y);
      countBe++;
    }else{
      arrayTop[i].push(false)
      setTimeout(() => {
        taulaAcerts.innerHTML += `<tr><td class="error"></td></tr>` 
      }, y);
      }
      y+=100;
      countTotal++;
  }

  mostrarQuiniela();
  enviarQuiniela.style.display = "none";
  
  numAcerts.innerHTML = `<h2>ACERTASTE</h2><h1>`+ countBe +`/`+ (countTotal) +`</h1><h2>PARTIDOS</h2><button class="btn btn-light mt-5" onclick="aceptarErrores()">Aceptar</button>`

  numAcerts.style.display = "block";
  
  historialQuinielas.push(["Quiniela " + (historialQuinielas.length+1), countBe +`/`+ (countTotal)]);

  quinielasHistorico.innerHTML = "";
  
  for (i = 0 ; i < historialQuinielas.length ; i++){
    quinielasHistorico.innerHTML += `<div class="jornadesHistoriques"><h6>`+ historialQuinielas[i][0] +`</h6><p> ` + historialQuinielas[i][1] + `</p></div>`;
  }

  document.getElementById("cerrarQuiniela").style.display = "none";
  comprobarApuesta.style.display = "none";
  taulaAcerts.style.display = "block";
});

// FER FUNCIONAR LES FLETXETES DE CANVI DE JORNADA RAPID
function intercambiarJornada() {
  if (paginaActual === "m") {
    arrayTop = imprimirJornada(primeraFem, primeraMasc);
    paginaActual = "f"
    document.getElementById("tituloJornada").innerHTML = "Generador de jornada femenina"
  } else{
    arrayTop = imprimirJornada(primeraMasc, primeraFem);
    paginaActual = "m"
    document.getElementById("tituloJornada").innerHTML = "Generador de jornada"
  }  
}

// FER FUNCIONAR ELS BOTONS DE CANVI DE JORNADA 
function botonJornadaFem() {
  arrayTop = imprimirJornada(primeraFem, primeraMasc);
  paginaActual = "f"
  document.getElementById("tituloJornada").innerHTML = "Generador de jornada femenina" 
  generaRapit.style.display = "none"
}

function botonJornadaMasc() {
  arrayTop = imprimirJornada(primeraMasc, primeraFem);
  paginaActual = "m"
  document.getElementById("tituloJornada").innerHTML = "Generador de jornada" 
  generaRapit.style.display = "none"
}

// Tanca el menu generaRapit
function tancaGeneraRapit() {
  generaRapit.style.display="none";
}

let arrayTop = imprimirJornada(primeraMasc, primeraFem);

