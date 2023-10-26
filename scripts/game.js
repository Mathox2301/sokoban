"use strict";

const square = { x: 0, y: 0 };
let level = 0;
let mvt;
let states = [];
const index = 0;

/**
 * affiche le niveau du jeu en ajoutant un div à chaque ligne et à chaque élément de cette ligne.
 *  ajoute une classe à chaque élé ment selon son type
 * @param {number} level le niveau
 */
function buildLevel(level) {
    for (let i = 0; i < levels[level].map.length; i++) {
        $("#world").append("<div class='ligne'><div>");
        for (let j = 0; j < levels[level].map[i].length; j++) {
            const square = $(".ligne").eq(i)
            if (levels[level].map[i][j] === "\ud83e") {
                $(square).append("<div class='square player'></div>");
            } else if (levels[level].map[i][j] === "\uddcd") {
                $(square).remove(levels[level].map[i][j]);
            } else if (levels[level].map[i][j] === " ") {
                $(square).append("<div class='square '></div>");
            } else if (levels[level].map[i][j] === "x") {
                $(square).append("<div class='square target'></div>");
            } else if (levels[level].map[i][j] === "@") {
                $(square).append("<div class='square box target'></div>");
            } else if (levels[level].map[i][j] === "#") {
                $(square).append("<div class='square box'></div>");
            } else {
                $(square).append("<div class='square wall'></div>");
            }
            console.log(levels[level].map[i][j]);
        }
    }
}

/**
 * retourne la position du joueur
 * @returns {{x: number, y:number}} la position du joueur.
 */
function getPlayerPosition() {
    for (let i = 0; i < levels[level].map.length; i++) {
        for (let j = 1; j < levels[level].map[i].length; j++) {
            if (levels[level].map[i][j] === "\ud83e") {
                square.x = j + 1;
                square.y = i;
            }
        }
    }
    return square;
}
/**
 * retourne la case en position donnée
 * @param {{x: number, y:number}} position la position d'une case
 * @returns {*} la case
 */
function getSquareAt(position) {
    return $("#world").children()
        .eq(position.y)
        .children()
        .eq(position.x);
}

let caseSuiv = { x: 0, y: 0 };
caseSuiv = getPlayerPosition();
let save = { x: 0, y: 0 };


/**
 * Permet de changer la position du joueur grâce aux touches enfoncées sur le clavier.
 * @param {Event} event lorsqu'on appuie sur le clavier
 */
function move(event) {
    let joueur = getSquareAt(caseSuiv);
    let contexte = { x: 0, y: 0 };
    if (!allOnTarget()) {
        switch (event.key) {
            case "ArrowUp":
                save = caseSuiv;
                caseSuiv = { x: caseSuiv.x, y: caseSuiv.y - 1 };
                if (getSquareAt(caseSuiv).hasClass("wall")) {
                    caseSuiv = save;
                    break;
                }
                else if (getSquareAt(caseSuiv).hasClass("box")) {
                    contexte = { x: caseSuiv.x, y: caseSuiv.y - 1 };
                    if (getSquareAt(contexte).hasClass("box") || getSquareAt(contexte).hasClass("wall") || getSquareAt(contexte).hasClass("on")) {
                        caseSuiv = save;
                        break;
                    } else {
                        getSquareAt(contexte).addClass("box");
                        getSquareAt(caseSuiv).removeClass("box");
                        getSquareAt(caseSuiv).addClass("player");
                        getSquareAt(caseSuiv).addClass("up");
                        $(joueur).removeClass("player up left right down on won");
                        if (getSquareAt(contexte).hasClass("target") && getSquareAt(contexte).hasClass("box")) {
                            getSquareAt(contexte).addClass("on");
                            getSquareAt(caseSuiv).removeClass("on");
                        }
                        mvt = new State(save, caseSuiv);
                        states.push(mvt);
                        incrMoves();
                        break;
                    }
                }
                else {
                    getSquareAt(caseSuiv).addClass("player");
                    getSquareAt(caseSuiv).addClass("up");
                    $(joueur).removeClass("player up left right down on won");
                    mvt = new State(save);
                    states.push(mvt);
                    incrMoves();
                    break;
                }
            case "ArrowDown":
                save = caseSuiv;
                caseSuiv = { x: caseSuiv.x, y: caseSuiv.y + 1 };
                if (getSquareAt(caseSuiv).hasClass("wall")) {
                    caseSuiv = save;
                    break;
                }
                else if (getSquareAt(caseSuiv).hasClass("box")) {
                    contexte = { x: caseSuiv.x, y: caseSuiv.y + 1 };
                    if (getSquareAt(contexte).hasClass("box") || getSquareAt(contexte).hasClass("wall") || getSquareAt(contexte).hasClass("on")) {
                        caseSuiv = save;
                        break;
                    } else {
                        getSquareAt(contexte).addClass("box");
                        getSquareAt(caseSuiv).removeClass("box");
                        getSquareAt(caseSuiv).addClass("player");
                        getSquareAt(caseSuiv).addClass("down");
                        $(joueur).removeClass("player up left right down on won");
                        if (getSquareAt(contexte).hasClass("target") && getSquareAt(contexte).hasClass("box")) {
                            getSquareAt(contexte).addClass("on");
                            getSquareAt(caseSuiv).removeClass("on");
                        }
                        incrMoves();
                        mvt = new State(save, caseSuiv);
                        states.push(mvt);
                        break;
                    }
                } else {
                    getSquareAt(caseSuiv).addClass("player");
                    getSquareAt(caseSuiv).addClass("down");
                    mvt = new State(save);
                    states.push(mvt);
                    $(joueur).removeClass("player up left right down on won");
                    incrMoves();
                    break;
                }
            case "ArrowLeft":
                save = caseSuiv;
                caseSuiv = { x: caseSuiv.x - 1, y: caseSuiv.y };
                if (getSquareAt(caseSuiv).hasClass("wall")) {
                    caseSuiv = save;
                    break;
                } else if (getSquareAt(caseSuiv).hasClass("box")) {
                    contexte = { x: caseSuiv.x - 1, y: caseSuiv.y };
                    if (getSquareAt(contexte).hasClass("box") || getSquareAt(contexte).hasClass("wall") || getSquareAt(contexte).hasClass("on")) {
                        caseSuiv = save;
                        break;
                    } else {
                        getSquareAt(contexte).addClass("box");
                        getSquareAt(caseSuiv).removeClass("box");
                        getSquareAt(caseSuiv).addClass("player");
                        getSquareAt(caseSuiv).addClass("left");
                        $(joueur).removeClass("player up left right down on won");
                        if (getSquareAt(contexte).hasClass("target") && getSquareAt(contexte).hasClass("box")) {
                            getSquareAt(contexte).addClass("on");
                            getSquareAt(caseSuiv).removeClass("on");
                        }
                        mvt = new State(save, caseSuiv);
                        states.push(mvt);
                        incrMoves();
                        break;
                    }
                } else {
                    getSquareAt(caseSuiv).addClass("player");
                    getSquareAt(caseSuiv).addClass("left");
                    $(joueur).removeClass("player up left right down on won");
                    mvt = new State(save);
                    states.push(mvt);
                    incrMoves();
                    break;
                }
            case "ArrowRight":
                save = caseSuiv;
                caseSuiv = { x: caseSuiv.x + 1, y: caseSuiv.y };
                if (getSquareAt(caseSuiv).hasClass("wall")) {
                    caseSuiv = save;
                    break;
                }
                else if (getSquareAt(caseSuiv).hasClass("box")) {
                    contexte = { x: caseSuiv.x + 1, y: caseSuiv.y };
                    if (getSquareAt(contexte).hasClass("box") || getSquareAt(contexte).hasClass("wall") || getSquareAt(contexte).hasClass("on")) {
                        caseSuiv = save;
                        break;
                    } else {
                        getSquareAt(contexte).addClass("box");
                        getSquareAt(caseSuiv).removeClass("box");
                        getSquareAt(caseSuiv).addClass("player");
                        getSquareAt(caseSuiv).addClass("right");
                        $(joueur).removeClass("player up left right down on won");
                        if (getSquareAt(contexte).hasClass("target") && getSquareAt(contexte).hasClass("box")) {
                            getSquareAt(contexte).addClass("on");
                            getSquareAt(caseSuiv).removeClass("on");
                        }
                        mvt = new State(save, caseSuiv);
                        states.push(mvt);
                        incrMoves();
                        break;
                    }
                } else {
                    getSquareAt(caseSuiv).addClass("player");
                    getSquareAt(caseSuiv).addClass("right");
                    $(joueur).removeClass("player up left right down on won");
                    mvt = new State(save);
                    states.push(mvt);
                    incrMoves();
                    break;
                }
        }
    }
}
let cpt = 0;
/**
 * incrémente un compteur et l'affiche à l'écran 
 */
function incrMoves() {
    cpt++;
    $(".cpt").text(cpt);
}

let bestScore = levels[0].best;
/**
 * affiche le meilleur score possible dun niveau
 */
function displayBestScore() {
    let affichageScore = bestScore.toString();
    $(".bS").text(affichageScore);
}
/**
 * regarde si les boites sont toutes sur les cibles
 * @returns true si les boites sont toutes sur les cibles, faux sinon.
 */
function allOnTarget() {
    if ($(".box").length === $(".on").length) {
        $(".player").addClass("won");
        return true;
    }
    return false;
}


/**
 * affiche le niveau suivant si le niveau actuel est terminé 
 * et que l'utilisateur appuie sur la barre espace.
 * @param {*} event un événement
 */
function finishLevel(event) {
    if (allOnTarget() && event.key === ' ') {
        $(".ligne").remove("div");
        if (level === levels.length - 1) {
            $("#world").text("Bravo, vous avez terminé le jeu");
        } else {
            ++level;
            buildLevel(level);
            caseSuiv = getPlayerPosition();
            cpt = 0;
            $(".cpt").text(cpt);
            states = [];
        }
    }
}    
let ancienScore = Math.min();
/**
 * détruit le niveau courant et le reconstruit.
 */
function restartLevel() {
    $(".ligne").remove("div");
    buildLevel(level);
    caseSuiv = getPlayerPosition();
    let save = cpt;
    let compteur = save.toString();
    if (save < ancienScore) {
        localStorage.setItem(".currentScore", compteur);
        ancienScore = save;
    }
    cpt = 0;
    states = [];
    $(".cpt").text(cpt);
    if (localStorage.getItem(".currentScore") !== undefined) {
        let score = localStorage.getItem(".currentScore");
        $(".currentScore").text(score);
}
}
/**
 * affiche la fenetre modale.
 */
function afficherFenetre() {
    $("#modal").show();
}
/**
 * cache la fenetre modale.
 */
function cacherFenetre() {
    $("#modal").hide();
}
/**
 * efface le meilleur score du joueur.
 */
function effacerScore() {
    localStorage.setItem(".currentScore",0);
    let ancienScore = localStorage.getItem(".currentScore");
    $(".currentScore").text(ancienScore);
}
/**
 * annule le mouvement que le joueur vient d'effectuer 
 * et fait revenir le jeu à l'état précédant.
 */
function annulerMvt() {
    const lastMvt = states[states.length - 1];
    const currentPos = getSquareAt(caseSuiv);
    $(currentPos).removeClass("player up left right down on won");
    const lastPosition = lastMvt.playerPosition();
    getSquareAt(lastPosition).addClass("player down");

    if (lastMvt.boxPosition() !== undefined) {
        $(currentPos).addClass("box");

        let posBoite = { x: caseSuiv.x + 1, y: caseSuiv.y };
        let caseBoite = getSquareAt(posBoite);
        caseBoite.removeClass("box on");
        posBoite = { x: caseSuiv.x - 1, y: caseSuiv.y };
        caseBoite = getSquareAt(posBoite)
        caseBoite.removeClass("box on")
        posBoite = { x: caseSuiv.x, y: caseSuiv.y - 1 }
        caseBoite = getSquareAt(posBoite)
        caseBoite.removeClass("box on")
        posBoite = { x: caseSuiv.x, y: caseSuiv.y + 1 }
        caseBoite = getSquareAt(posBoite)
        caseBoite.removeClass("box on")
    }
    caseSuiv = lastPosition;
    states.pop();
}
/**
 * associe une touche à une fonction
 * @param {*} event
 */
function binding(event){
    if(event.key === 'r'){
        restartLevel();   
    }
    if (event.key === 'b'){
        annulerMvt();
    }
}


$(document).ready(() => {
    buildLevel(level);
    $("#modal").hide();
    $(document).keydown(move);
    $(document).keydown(finishLevel);
    $(document).keydown(binding);
    $(".rebootScore").click(effacerScore);
    $(".restart").click(restartLevel);
    $(".aide").click(afficherFenetre);
    $(".close").click(cacherFenetre);
    $(".last").click(annulerMvt);
});
