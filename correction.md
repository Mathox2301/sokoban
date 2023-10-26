# Commentaires
## Itération 1
 OK

## Itération 2
 * Lors du chargement du niveau, une boucle `for of` t'aurait évité de devoir faire des manipulations spéciales lorsque le caractère 🧍 est rencontré.
 * L'utilisation d'une classe `on` pour symboliser les boîtes sur les cibles amène une redondance dans les données, ce qui peut causer des problèmes. Par exemple, tu n'as pas fait en sorte que `buildLevel` ajoute cette classe si une boîte commence sur une cible.
 * Il te manque une classe pour gérer le sol ; il vaudrait mieux en implémenter une plutôt que de se baser sur un manque de classe.
 * Problèmes de CSS : utiliser une marge de dimensions fixes cause des problèmes sur certaines tailles d'écran et même des aplatissements de ta zone de jeu.

## Itération 3
 * `getPlayerPosition` renvoie la position de départ du joueur, pas sa position actuelle. Cela t'éviterait en outre d'utiliser une variable globale

## Itération 4
 * Aucun message ne se déclenche à la fin d'un niveau
 * Le message de fin de jeu devrait se déclencher dès que le niveau est terminé.
 * L'aide ne bloque pas le jeu

## Itération 5
 * Le constructeur de `State` n'a pas d'argument optionnel
 * getters de `State` non présents.
 * Il est possible d'annuler après avoir fini un niveau
 * Tenter d'annuler alors qu'il n'y a pas d'états en mémoire cause un bug
 * Impossible d'annuler plus d'un mouvement.
 * Le compteur de mouvement n'est pas décrémenté.

## Autres
 * Erreurs de linter
 * JSDoc manquante pour `states`
 * Type de retour mal renseigné pour `getSquareAt`, `finishLevel`, `binding`
 
## Défense
 * Binding de recommencer ok
 * Binding d'annuler non implémenté
 * Le meilleur score n'est pas enregistré ni chargé au bon moment.

# Evaluation 
| Question | Sur | Résultat |
| :------- | :-: | :-: |
| Itération 1 | 1 | 1 |
| Itération 2 | 2 | 1 |
| Itération 3 | 3 | 2 |
| Itération 4 | 7 | 6.25 |
| Itération 5 | 3 | 2.1 |
| Autres | 4 | 2 |
| _Total projet_ | _20_ | _14.35_ | 
| Défense | 20 | 13 |
| __Total__ | __20__ | __14__ | 
