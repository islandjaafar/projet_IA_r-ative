

class Vehicule{
    static debug = false;
    constructor(x,y){
        this.position=createVector(x,y);
        this.vitesse=createVector(0,0);
        this.acceleration=createVector(0,0);
        this.maxvitesse=5;
        this.maxacceleration=0.5;
        this.r=16;
        
        this.distanceCercle = 150;
        this.wanderRadius = 50;
        this.wanderTheta = PI / 2;
        this.displaceRange = 0.3;
        this.bubbleTrail = new BubbleTrail();
    // trainée derrière les véhicules
        this.pathLength = 20;
        this.path = [];
        this.largeurZoneEvitementDevantVaisseau= this.r / 2;
    }
    
      
    
    
    
    
    seek(target){
        let acceleration_voulue=p5.Vector.sub(target.position,this.position);
        acceleration_voulue.setMag(this.maxvitesse);
        acceleration_voulue.sub(this.vitesse);
        this.applique_acceleration(acceleration_voulue);
    }
    flee(target){
        let acceleration_voulue=p5.Vector.sub(this.position,target.position);
        acceleration_voulue.setMag(this.maxvitesse);
        acceleration_voulue.add(this.vitesse);
        this.applique_acceleration(acceleration_voulue);
    }
    seek_with_arrive(target){
        let acceleration_voulue=p5.Vector.sub(target.position,this.position);
        let d = acceleration_voulue.mag();
        if (d < 100) {
            let m = map(d, 0, 100, 0, this.maxvitesse);
            acceleration_voulue.setMag(m);
            }
        else {
                acceleration_voulue.setMag(this.maxvitesse);
             }
             acceleration_voulue.sub(this.vitesse);
             acceleration_voulue.limit(this.maxacceleration);
             this.applique_acceleration(acceleration_voulue);
            }
    pursue(target) {
                // Vérifiez si la cible est valide
              
            
                // Calculer la distance entre le véhicule et la cible
                let distance = p5.Vector.dist(this.position, target.position);
            
                // Calculer le facteur de prédiction basé sur la distance (ajustez le facteur si nécessaire)
                // Plus proche = prédiction moindre
            
                // Calculer la position future de la cible
                let point_futur = target.position.copy();
                let prediction = target.vitesse.copy();
                // Prédire la position future
                point_futur.add(prediction);
            
                // Appeler 'seek' avec la position prédite
                this.seek({ position: point_futur });
            }
            
    evade(target){
        let distance = p5.Vector.dist(this.position, target.position);
            
        // Calculer le facteur de prédiction basé sur la distance (ajustez le facteur si nécessaire)
        // Plus proche = prédiction moindre
    
        // Calculer la position future de la cible
        let point_futur = target.position.copy();
        let prediction = target.vitesse.copy();
        // Prédire la position future
        point_futur.add(prediction);
    
        // Appeler 'seek' avec la position prédite
        this.flee({ position: point_futur });
    }
    separate(others) {
        // Distance de séparation souhaitée basée sur la taille du véhicule
        let desiredSeparation = this.r * 20; // Augmenté pour une plus grande séparation
        let sum = createVector(); // Somme des forces de séparation
        let count = 0; // Nombre de voisins détectés
    
        for (let other of others) {
            let d = p5.Vector.dist(this.position, other.position);
    
            // Vérifier si l'autre véhicule est assez proche et n'est pas lui-même
            if (this !== other && d < desiredSeparation) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.normalize(); // Normaliser pour ne garder que la direction
                diff.div(d * 0.5); // Inversément proportionnel à la distance (effet renforcé)
                sum.add(diff);
                count++;
            }
        }
    
        if (count > 0) {
            // Moyenne des forces
            sum.div(count);
    
            // Mettre la magnitude de la force au maximum souhaité
            sum.setMag(this.maxvitesse * 1.5); // Augmenté pour plus d'effet
    
            // Calculer la force de steering (changement de direction)
            let steer = p5.Vector.sub(sum, this.vitesse);
            steer.limit(this.maxacceleration); // Limiter à l'accélération maximale
    
            // Appliquer la force de séparation
            this.applique_acceleration(steer);
        }
    }
    cohesion(vehicles) {
        let neighborDistance = 20; // Distance pour considérer un voisin
        let sum = createVector(0, 0); // Somme des positions des voisins
        let count = 0; // Nombre de voisins détectés
    
        for (let other of vehicles) {
            let d = p5.Vector.dist(this.position, other.position);
    
            // Vérifier si un autre véhicule est un voisin proche
            if (this !== other && d < neighborDistance) {
                sum.add(other.position); // Ajouter la position du voisin
                count++;
            }
        }
    
        if (count > 0) {
            // Calculer la position moyenne
            sum.div(count);
    
            // Utiliser la méthode `seek` pour générer une force vers cette position moyenne
            return this.seek({ position: sum });
        } else {
            // Si aucun voisin proche, pas de cohésion
            return createVector(0, 0);
        }
    }
    
    
      
    pursue_with_arrive(target){
        let point_futur = target.position.copy();
        let prediction = target.vitesse.copy();
        point_futur.add(prediction);
        let acceleration_voulue = p5.Vector.sub(point_futur, this.position);
        let d = acceleration_voulue.mag();

    // Ajuster la vitesse en fonction de la distance
        if (d < 100) { // Distance pour ralentir
        let m = map(d, 0, 100, 0, this.maxvitesse); // Mapper la vitesse selon la distance
        acceleration_voulue.setMag(m);
         }
          else {
        acceleration_voulue.setMag(this.maxvitesse); // Aller à vitesse maximale
    }

    // Calculer l'accélération finale
    acceleration_voulue.sub(this.vitesse);
    acceleration_voulue.limit(this.maxacceleration);

    // Appliquer l'accélération
    this.applique_acceleration(acceleration_voulue);
            }
    

    applique_acceleration(une_acceleration){
        this.acceleration.add(une_acceleration);
    }
    update() {
        this.vitesse.add(this.acceleration);
        this.vitesse.limit(this.maxvitesse);
        this.position.add(this.vitesse);
        this.acceleration.mult(0);
        this.bubbleTrail.addBubbles(this.position);
      }
      show() {
        let angle = this.vitesse.heading();
        fill(255, 165, 0); // Couleur orange
        stroke(0); // Contour noir
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
      
        // Dessin du corps (ellipse)
        ellipse(0, 0, this.r * 4, this.r * 2);
      
        // Dessin de la queue (triangle)
        beginShape();
        vertex(-this.r * 2, 0);
        vertex(-this.r * 3, -this.r);
        vertex(-this.r * 3, this.r);
        endShape(CLOSE);
      
        pop();
      
        // Affichage des bulles
        this.bubbleTrail.show();
      }
      
    
    edges() {
        if (this.position.x > width + this.r) {
          this.position.x = -this.r;
        } else if (this.position.x < -this.r) {
          this.position.x = width + this.r;
        }
        if (this.position.y > height + this.r) {
          this.position.y = -this.r;
        } else if (this.position.y < -this.r) {
          this.position.y = height + this.r;
        }
      }
    }

