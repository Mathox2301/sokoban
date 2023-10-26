"use strict";
/**
 * Classe représentant un état.
 * @private 
 * 
 */
class State {
    #posBox;
    #posJoueur;




    /**
     * Construit un objet de type State avec les paramètres donnés.
     * @param {{x: number, y:number}} posJoueur  la position du joueur
     * @param {{x: number, y:number}} posBox le déplacement
     */
    constructor(posJoueur, posBox) {
        this.#posJoueur = posJoueur;
        this.#posBox = posBox;
    }



    /**
     * getter pour la position du joueur.
     * @returns {{x: number, y:number}}la position du joueur
     */
    playerPosition() {
        return { x: this.#posJoueur.x, y: this.#posJoueur.y };
    }
    /**
     * getter pour la position de la boite
     * @returns {{x: number, y:number}}la position de la boite
     */
    boxPosition() {
        return { x: this.#posBox.x, y: this.#posBox.y };
    }
}

