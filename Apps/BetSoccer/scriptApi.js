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
let jsonApi = [];
let arrayTop, arrFechas;

// Mostrar Equips al header
for (i = 1; i <= 20; i++) {
  teamsHeader.innerHTML += "<img class='teams' height='40px' src='" + teamsSrc + i + ".png'>";
}

// Aqui generarem el primer partit de la temporada
function generarJornada(arrayEquips) {
  let jornadaGenerada = [];
  let y = 0;
  let ran, ran2;

  for (i = 0; i < arrayEquips.length; i++) {
    y = i + 1;
    // Generarem ja el reultat de cada partit, estara amagat fins a que es fagi la quiniela. Tambe afagirem l'horari del partit 
    ran = marcarGols();
    ran2 =  marcarGols();
    let auxLocal = arrayEquips[i];
    let auxVisitant = arrayEquips[y];
    let resultatLocal = ran;
    let resultatVisitant = ran2;
    let partit = [auxLocal, auxVisitant, resultatLocal, resultatVisitant, arrFechas[i]];
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

  paginaActual = "m"
  document.getElementById("tituloJornada").innerHTML = "Generador de jornada"

  return jornadaCompleta;
};

// NO LA FAREM SERVIR A LA API;
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


// FUNCIONS PER LA FINESTRA DE LES QUINIELAS
function amagarQuiniela() {
  document.getElementById('quiniela').style.display="none";
  document.getElementById('body').classList.remove("stop-scrolling");
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
  for(i=0; i<arrDesitjat.length; i++){
    jornadaDiv.innerHTML +=  `<tr class="partitTaula"> <td class="izq"> <img class="mt-2 mb-2" src="`+ arrDesitjat[i][0]['escut'] +`" height="70"> <h5>`+ arrDesitjat[i][0]['nom'] +`</h5> </td><td> <h4> `+ arrDesitjat[i][4] +` </h4><h4 class="text-danger"> Pronóstico Realizado </h4> </td><td class="der"> <img class="mt-2 mb-2" src="`+ arrDesitjat[i][1]['escut'] +`" height="70"> <h5>`+ arrDesitjat[i][1]['nom'] +`</h5></td></tr><tr class="partitNull"><td><div class="p-1"></div></td></tr>`
  }
  arrayTop = arrDesitjat;
}

// AMAGA ELS MENUS EN MOSTRAR TOTS ELS ACERTS
function aceptarErrores() {
  numAcerts.style.display = "none"
  document.getElementById("cerrarQuiniela").style.display = "block";
  amagarQuiniela();
  taulaAcerts.style.display = "none";
  
  generaRapit.style.display = "block"
  
  setTimeout(() => {
    generaRapit.style.display = "none"
  }, 15100);
}

// EVENTS
enviarQuiniela.addEventListener("click", ()=>{
  afegirAposta(arrayTop);
  amagarQuiniela();
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

// US DE API I FORMATETJ DE DATES
fetch("https://v3.football.api-sports.io/fixtures?next=10&league=140 ", {
  "method": "GET",
  "headers": {
  "x-rapidapi-host": "v3.football.api-sports.io",
  "x-rapidapi-key": "fb354b52bd5ae21f2d7309134ed6e259"
  }
})
.then(response => {
  return response.json();
}).then((data)=>{
    console.log(data.response);
    let arrAux = [];
    let arrAuxFecha = [];

    for (i = 0; i < data.response.length; i++) {
      let team1 = {nom: data.response[i]['teams']['home']['name'], escut: data.response[i]['teams']['home']['logo']};
      let team2 = {nom: data.response[i]['teams']['away']['name'], escut: data.response[i]['teams']['away']['logo']};
      arrAux.push(team1);
      arrAux.push(team2);

      let fechas = data.response[i]['fixture']['date'];

      let dias = fechas.substring(8,10);
      let meses = fechas.substring(5,7);
      let anos = fechas.substring(0,4);
      let horas = parseInt(fechas.substring(11,13))+1;
      let minutos = fechas.substring(13,16);
      let estadio = data.response[i]['fixture']['venue']['name'];

      let horaFinal = "<b>" + estadio + " </br> </b> " + horas + minutos + "h " + " - " + dias + "/" + meses + "/" + anos

      arrAuxFecha.push(horaFinal);
      arrAuxFecha.push(horaFinal);      
    }

    arrFechas = arrAuxFecha;
    arrayTop = imprimirJornada(arrAux, [""]);
    let jornadaActual = data.response[0]['league']['round'].substring(16, 19)

    document.getElementById("tituloJornada").innerHTML = "Jornada " + jornadaActual;
})
.catch(err => {
    console.log(err);
});