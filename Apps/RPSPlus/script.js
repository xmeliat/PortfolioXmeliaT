//declaracio de variables
let opciones = ["papel", "piedra", "tijeras", "lagarto", "spock"];
let primeraPosicion;
let aux;
let palabraEscojida;
let palabraEscojidaRival;
let nombre = "";
let textoIntroducido;
let mensaje = document.getElementById("mensaje");
let local = document.getElementById("local");
let rival = document.getElementById("rival");
let marcador = document.getElementById("marcador");
let resumen = document.getElementById("resumen");
let jugarBtn = document.getElementById("jugarBtn");
let restartBtn = document.getElementById("restartBtn");
let mensajeFinal = document.getElementById("mensajeFinal");
let gameOver = document.getElementById("gameOver");

let puntLocal = 0;
let puntRival = 0;

// Funcion donde ejecutamos el juego, sera llamada por un evento
function juego(){
    // feim que sols demani un boto la primera vegada
    if(!nombre){
        nombre = prompt("¿Cómo te llamas?");
    }
    
    // demanam la opcio que llançarem
    textoIntroducido = prompt("¿Qué opción escojes?");
    if (textoIntroducido){
        document.getElementById('i1').style.display = "block";
        // Afegim delays per a donar emocio al joc
        setTimeout(() => {
            document.getElementById('i2').style.display = "block";
        }, 1500);
        setTimeout(() => {
            document.getElementById('i3').style.display = "block";
            document.getElementById('i4').style.display = "block";
        }, 2750);
    }
    
    // Comprovam que el torn es valid i sinos s'haura de tornar a introduir
    while ( buscaEleccion(textoIntroducido) == "") {
        textoIntroducido = prompt("Tu movimiento no es valido, vuelve a introducirlo");
    }

    // decoracio
    let bienvenida = document.getElementById("bienvenida");
    bienvenida.innerHTML = "Bienvenido " + nombre + ",";

    buscaEleccion(textoIntroducido);

    let eleccionRivalAux = "";

    eleccionRivalAux = eleccionRival();

    rival.innerHTML = "El rival ha lanzado " + eleccionRivalAux;
    actualizarMarcador(palabraEscojida, eleccionRivalAux.toLowerCase());
    
    // imprimim per pantalla el marcador 
    marcador.innerHTML = puntLocal + " - " + puntRival;

    //actualitzam el nom del boto
    jugarBtn.innerHTML = "Siguiente Ronda";

    if (puntLocal == 5 || puntRival == 5) {
        mensajeFinal.style.display = "block";

        if (puntLocal === 5) gameOver.innerHTML = "¡ENORHABUENA, HAS GANADO!";
        if (puntRival === 5) gameOver.innerHTML = "¡HAS PERDIDO, INTENTALO DE NUEVO!";
    }
}

// Comprobamos la posicion en la cadena de cada palabra del array 'opciones'. El valor mas bajo del indexOf sera su primeria coincidencia. 
function buscaEleccion(texto) {

    texto = texto.toLowerCase();
    aux = texto.length+1;
    palabraEscojida = "";
    
    for (let i = 0; i < opciones.length; i++) {        
        if(texto.indexOf(opciones[i]) < aux && texto.indexOf(opciones[i]) >= 0){
            primeraPosicion = texto.indexOf(opciones[i]);
            aux = primeraPosicion;
            palabraEscojida = opciones[i];
        };
    };
        
    local.innerHTML = "Has lanzado " + (palabraEscojida.charAt(0).toUpperCase()+palabraEscojida.slice(1)) + ", que aparece en la posición " + aux;
    return palabraEscojida;
}

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max+1 - min)) + min;

}

function eleccionRival(){
    palabraEscojidaRival = opciones[getRandomInt(0,4)]
    return (palabraEscojidaRival.charAt(0).toUpperCase()+palabraEscojidaRival.slice(1));
}

function actualizarMarcador(eleccionLocal, eleccionRival) {

    console.log(eleccionLocal);
    console.log(eleccionRival);

    // Comprobamos empate
    if (eleccionLocal === eleccionRival) {
        resumen.innerHTML = "¡Empate!"
    }; 

    // Piedra como local
    if (eleccionLocal == "piedra" && (eleccionRival == "lagarto" || eleccionRival == "tijeras")) {
        puntLocal++;
        resumen.innerHTML = "¡Ganas esta ronda!"
    };

    // Papel como local
    if (eleccionLocal == "papel" && (eleccionRival == "piedra" || eleccionRival == "spock")) {
        puntLocal++;
        resumen.innerHTML = "¡Ganas esta ronda!"
    };

    // Tijeras como local
    if (eleccionLocal == "tijeras" && (eleccionRival == "papel" || eleccionRival == "lagarto")) {
        puntLocal++;
        resumen.innerHTML = "¡Ganas esta ronda!"
    };

    // Lagarto como local
    if (eleccionLocal == "lagarto" && (eleccionRival == "spock" || eleccionRival == "papel")) {
        puntLocal++;
        resumen.innerHTML = "¡Ganas esta ronda!"
    };
    
    // Spock como local
    if (eleccionLocal == "spock" && (eleccionRival == "piedra" || eleccionRival == "tijeras")) {
        puntLocal++;
        resumen.innerHTML = "¡Ganas esta ronda!"
    };



    // Piedra como rival
    if (eleccionRival == "piedra" && (eleccionLocal == "lagarto" || eleccionLocal == "tijeras")) {
        puntRival++;
        resumen.innerHTML = "¡Pierdes esta ronda!"
    };

    // Papel como rival
    if (eleccionRival == "papel" && (eleccionLocal == "piedra" || eleccionLocal == "spock")) {
        puntRival++;
        resumen.innerHTML = "¡Pierdes esta ronda!"
    };

    // Tijeras como rival
    if (eleccionRival == "tijeras" && (eleccionLocal == "papel" || eleccionLocal == "lagarto")) {
        puntRival++;
        resumen.innerHTML = "¡Pierdes esta ronda!"
    };

    // Lagarto como rival
    if (eleccionRival == "lagarto" && (eleccionLocal == "spock" || eleccionLocal == "papel")) {
        puntRival++;
        resumen.innerHTML = "¡Pierdes esta ronda!"
    };
    
    // Spock como rival
    if (eleccionRival == "spock" && (eleccionLocal == "piedra" || eleccionLocal == "tijeras")) {
        puntRival++;
        resumen.innerHTML = "¡Pierdes esta ronda!"
    };
};


// EVENTOS
jugarBtn.addEventListener("click", ()=>{
    document.getElementById('i1').style.display = "none";
    document.getElementById('i2').style.display = "none";
    document.getElementById('i3').style.display = "none";
    document.getElementById('i4').style.display = "none";
    juego()
}, false);

restartBtn.addEventListener("click", ()=>{
    location.reload();
}, false);