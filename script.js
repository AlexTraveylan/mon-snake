
//definition du serpent
let tete = [20 , 20]; //[x ; y]
let direction = 0; // 0 haut 1 droite 2 bas 3 gauche

class Serpent {
    constructor(tete, taille, direction) {
        this.tete = tete;
        this.direction = direction;
        this.taille = taille;
    }
}
//creation du serpent.
let serpent = new Serpent(tete, 3, direction);

//fonctions du serpents
function seDeplacer(serpent) {
    let direction = serpent.direction;
    switch (direction) {
        case 0:
            serpent.tete[1] --;
            break;
        case 1:
            serpent.tete[0] ++;
            break;
        case 2:
            serpent.tete[1] ++;
            break;
        case 3:
            serpent.tete[0] --;
    }
} 

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

//initialisation du serpent
document
.getElementById(`r${serpent.tete[0]}_c${serpent.tete[1]}`)
.classList.add("row_case_active");


//fonctionnalité des touches deplacements.
document
.getElementById("top")
.addEventListener('click', () => {
    desactiverCase(serpent.tete[0], serpent.tete[1]);
    serpent.direction = 0;
    seDeplacer(serpent);
    activerCase(serpent.tete[0], serpent.tete[1]);
})

document
.getElementById("right")
.addEventListener('click', () => {
    desactiverCase(serpent.tete[0], serpent.tete[1]);
    serpent.direction = 1;
    seDeplacer(serpent);
    activerCase(serpent.tete[0], serpent.tete[1]);
})

document
.getElementById("down")
.addEventListener('click', () => {
    desactiverCase(serpent.tete[0], serpent.tete[1]);
    serpent.direction = 2;
    seDeplacer(serpent);
    activerCase(serpent.tete[0], serpent.tete[1]);
})

document
.getElementById("left")
.addEventListener('click', () => {
    desactiverCase(serpent.tete[0], serpent.tete[1]);
    serpent.direction = 3;
    seDeplacer(serpent);
    activerCase(serpent.tete[0], serpent.tete[1]);
})
