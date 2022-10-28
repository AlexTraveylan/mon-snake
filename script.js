//score
let score = 0;
let elmScore = document.getElementById("score");

function updateScore() {
    elmScore.innerHTML = `Score : ${score}`;

}

//definition du serpent
let direction = 0; // 0 haut 1 droite 2 bas 3 gauche
let corps = [[20 , 20], [19 , 20], [18 , 20]]; //la tete est toujours dans l'index 0

class Serpent {
    constructor(corps, direction) {
        this.corps = corps; 
        this.direction = direction;
    }
}

//creation du serpent.
let serpent = new Serpent(corps, direction);

//activer ou desactiver une case avec x et y
function activerCase(row, column){
    document
    .getElementById(`r${row}_c${column}`)
    .classList.add("row_case_active");
}

function desactiverCase(row, column) {
    document
    .getElementById(`r${row}_c${column}`)
    .classList.remove("row_case_active");
}


//fonctions du serpents

function alumerSerpent(serpent) {
    for (let elmCorp of serpent.corps) {
        activerCase(elmCorp[0], elmCorp[1]);
    }
}

function eteindreSerpent(serpent) {
    for (let elmCorp of serpent.corps) {
        desactiverCase(elmCorp[0], elmCorp[1]);
    }
}

function repositionnerSerpent(tete) {
    serpent.corps.unshift(tete);
    eteindreSerpent(serpent);
    serpent.corps.pop();
    alumerSerpent(serpent);
}

function seDeplacer(serpent) {
    let direction = serpent.direction;
    let tete;
    let temps;
    switch (direction) {
        case 0:
            //Calcul de la nouvelle tete apres le deplacement.
            temps = [serpent.corps[0][0] , serpent.corps[0][1] -1];
            tete = temps;
            //fin du calcul
            repositionnerSerpent(tete);
            break;
        case 1:
            temps = [serpent.corps[0][0] + 1 , serpent.corps[0][1]];
            tete = temps;
            repositionnerSerpent(tete);

            break;
        case 2:
            temps = [serpent.corps[0][0], serpent.corps[0][1] + 1];
            tete = temps;
            repositionnerSerpent(tete);

            break;
        case 3:
            temps = [serpent.corps[0][0] - 1 , serpent.corps[0][1]];
            tete = temps;
            repositionnerSerpent(tete);

            break;
    }
} 

//Fonction des pommes
function nombreAleatoireEntre1et40() {
    return Math.floor(1 + Math.random()*39);
}
let pomme = [nombreAleatoireEntre1et40(), nombreAleatoireEntre1et40()];

//return true seulement si la position n'est pas dans le corps du serpent.
function testerPositionSerpent(coordonnees){
    let test = true;
    for (let elm of serpent.corps) {
        if (elm[0] == coordonnees[0] && elm[1] == coordonnees[1]) {
            test = false;
        }
    }
    return test;
}

function nouvellePomme() {
    pomme = [nombreAleatoireEntre1et40(), nombreAleatoireEntre1et40()];
    if (testerPositionSerpent(pomme)) {
        document
    .getElementById(`r${pomme[0]}_c${pomme[1]}`)
    .classList.add("pomme");
    } else {
        nouvellePomme();
    }
}

function supprPomme() {
    document
    .getElementById(`r${pomme[0]}_c${pomme[1]}`)
    .classList.remove("pomme");
}

//manger une pomme et grandir

//return true si la tete est sur la pomme.
function testManger() {
    let test = false; 
    if (serpent.corps[0][0] === pomme[0] && serpent.corps[0][1] === pomme[1]) {
        test = true;
        console.log("coucou");
    }
    return test;
}

function leSerpentGrandit() {
    let temps = serpent.corps[0];
    serpent.corps.unshift(temps);
}

//Condition de défaite
function isLimit(){
    let test=false;
    if (serpent.corps[0][0] < 1 || serpent.corps[0][1] < 1 ){
        test=true;
    }
    return test;
}

function isEatingHimself() {
    let test = false;
    for (let elm = 1; elm < serpent.corps.length ; elm++){
        if (serpent.corps[elm][0] == serpent.corps[0][0] && serpent.corps[elm][1] == serpent.corps[0][1]){
            test=true;
        }
    }
    return test;
}

function isGameOver(){
    let test = false;
    if (isLimit() || isEatingHimself()) {
        test = true;
    }
    return test;
}

//initialisation
nouvellePomme(pomme);
alumerSerpent(serpent);
updateScore();


//fonctionnalité des touches deplacements.
document
.getElementById("top")
.addEventListener('click', () => {
    if (serpent.direction != 2 ) {
        serpent.direction = 0;
    }
})

document
.getElementById("right")
.addEventListener('click', () => {
    if (serpent.direction != 3 ) {
        serpent.direction = 1;
    }

})

document
.getElementById("down")
.addEventListener('click', () => {
    if (serpent.direction != 0 ) {
        serpent.direction = 2;
    }

})

document
.getElementById("left")
.addEventListener('click', () => {
    if (serpent.direction != 1 ) {
        serpent.direction = 3;
    }

})

function deplacerSerpent() {
    if (!isGameOver){
        if (testManger()) {
            supprPomme();
            score++;
            updateScore();
            nouvellePomme();
            leSerpentGrandit();
        }
        seDeplacer(serpent); 
    } else {
        clearInterval(x);
    }
    
}

let x;

document
.getElementById("start")
.addEventListener('click', (e) => {
    x = setInterval(deplacerSerpent, 150);
})

document
.getElementById("stop")
.addEventListener('click', () => {
    clearInterval(x);
})



