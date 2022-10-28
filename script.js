
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


//initialisation du serpent
alumerSerpent(serpent);


//fonctionnalité des touches deplacements.
document
.getElementById("top")
.addEventListener('click', () => {
    serpent.direction = 0;
})

document
.getElementById("right")
.addEventListener('click', () => {
    serpent.direction = 1;
})

document
.getElementById("down")
.addEventListener('click', () => {
    serpent.direction = 2;
})

document
.getElementById("left")
.addEventListener('click', () => {
    serpent.direction = 3;
})

function deplacerSerpent() {
    seDeplacer(serpent);
}

let x;

document
.getElementById("start")
.addEventListener('click', () => {
    x = setInterval(deplacerSerpent, 500);
})

document
.getElementById("stop")
.addEventListener('click', () => {
    clearInterval(x);
})



