Fish Behavior Simulation - p5.js

Description

Ce projet, développé avec la librairie p5.js, est une simulation interactive de comportements de poissons dans un environnement aquatique. L'application permet de configurer et d'observer divers comportements de poissons normaux et indifférents, tout en interagissant avec des paramètres tels que le nombre de poissons, leur vitesse et leur accélération.



Comportements Intégrés

Six comportements peuvent être sélectionnés directement dans l'application pour les poissons normaux :

-Seek : Les poissons poursuivent un objectif (comme un ver).

-Flee : Les poissons s'éloignent rapidement d'une menace (comme un requin).

-Seek with Arrive : Les poissons poursuivent un objectif avec une décélération progressive à l'arrivée.

-Pursue with Arrive : Les poissons poursuivent un objectif mobile avec une décélération progressive à l'arrivée.

-Evade : Les poissons évitent activement une menace mobile.

-Pursue : Les poissons poursuivent un objectif mobile sans décélération.




Réactions selon le comportement choisi



Si le comportement choisi est Seek, Pursue, Seek with Arrive, ou Pursue with Arrive, les poissons normaux poursuivent les vers.

Si le comportement choisi est Flee ou Evade, les poissons normaux fuient le requin.



Comportement additionnel

Wander : Les poissons normaux adoptent un comportement erratique et aléatoire, simulant une exploration naturelle.




Cohésion et Séparation

Les poissons normaux peuvent être configurés pour adopter l'un des comportements suivants :

Cohésion : Les poissons nagent ensemble en groupe compact.

Séparation : Les poissons maintiennent une certaine distance entre eux pour éviter les collisions.

Alignement : Un mode d'alignement peut être activé pour ajuster leur direction commune.




Les Poissons Indifférents

Ces poissons suivent uniquement le flux du courant d'eau et ne réagissent ni aux vers ni au requin.





Paramètres de l'Application

L'application propose plusieurs sliders pour personnaliser la simulation :

Nombre de poissons normaux : Ajuste la quantité de poissons actifs.

Nombre de poissons indifférents : Ajuste la quantité de poissons suivant le courant.

Vitesse maximale : Définit la vitesse limite des poissons.

Accélération maximale : Définit l'accélération maximale que les poissons peuvent atteindre.

Fonctionnalités Clés

Simulation fluide et interactive des comportements de poissons.

Configuration personnalisée grâce à des sliders pour ajuster les paramètres en temps réel.

Intégration d'un flux de courant d'eau visible.

Prise en compte des interactions entre poissons (cohésion, séparation et alignement).

Technologies Utilisées

p5.js : Bibliothèque JavaScript pour la création graphique et interactive.

Installation