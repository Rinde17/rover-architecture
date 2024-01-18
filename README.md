# Mars rover simulator

![Mover rover simulator illustration](Mars-rover-simulator-illustration.jpg)

Cette application est un mini-jeu qui simule la communication entre un rover mars et le contrôle de mission situé sur terre. L'application est basée sur le language Typescript en utilisant le paradigme de programmation orientée objet.

**Crédits** :

- Bastien Benech
- Guilhem Souchaud
- Calvin Perrot
- Dylan Tavares

Réalisé Ynov Campus Bordeaux

**Le jeu doit suivre les règles suivantes** :

- [ ] Vous connaissez le point d’impact du Rover (x,y) et son orientation de départ (N,S,E,W)
- [ ] Le Rover sait avancer, reculer et tourner de 90° sur lui-même dans les 2 sens.
      Après chaque commande il renvoie son état (position et orientation)
      Les planètes sont toroïdales et de taille finie entière
- [ ] Le Rover doit pouvoir traiter de manière autonome une suite de commandes.
- [ ] Parfois il rencontrera un obstacle sur son passage.
- [ ] Lorsqu’il rencontre un obstacle, il s’arrête, signale l’obstacle et renvoie sa position.
- [ ] S’il est dans une suite de commandes, il n’annule pas les commandes déjà effectuées, mais ne poursuit pas la séquence.
- [ ] Le Rover est un agent distant, communiquant par le réseau.
- [ ] L’interface de Contrôle lui envoie les commandes au format texte.
- [ ] L’Interface de Contrôle est une Console.
      Dessinez un schéma d’architecture et faites-le valider.
- [ ] Mars est trop loin pour une communication directe.
      Un répéteur sera parfois nécessaire. Ajoutez-le au diagramme.
      Il doit être optionnel.
      Vous ne connaissez pas le terrain, seulement la taille de la planète.
- [ ] Le Mission Control ne sait pas où sont les obstacles avant leur découverte par le rover.
- [ ] Affichez une carte (console ou UI simple) et permettez le pilotage au clavier du Rover.
- [ ] La carte se rafraîchit après chaque commande avec les éventuels obstacles découverts.

## Get Started

Pré-requis:

- Typescript

**Cloner le repository**

_( Il est recommendé de cloner avec la méthode SSH )_

`git clone git@github.com:BastienBenech/architecture-logicielle.git`

**Installer les dépendences**

_( à la racine du project cloné précédement )_

`npm install`

**Executer le serveur du rover**

`npm run start:server`

**Exectuter la CLI**

`npm run start:client`
