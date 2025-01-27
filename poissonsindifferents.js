class PoissonIndifferent {
    constructor(x, y) {
      this.position = createVector(x, y); // Position initiale
      this.vitesse = createVector(0, 0); // Vitesse initiale
      this.acceleration = createVector(0, 0); // Accélération initiale
      this.maxvitesse = 4; // Vitesse maximale
      this.maxacceleration = 0.25; // Accélération maximale
      this.r = 16; // Taille du poisson
    }
    align(others) {
      let neighborDistance = 50;
      let sum = createVector(0, 0);
      let count = 0;

      for (let other of others) {
          let d = p5.Vector.dist(this.position, other.position);

          if (this !== other && d < neighborDistance) {
              sum.add(other.vitesse);
              count++;
          }
      }

      if (count > 0) {
          sum.div(count);
          sum.setMag(this.maxvitesse);

          let steer = p5.Vector.sub(sum, this.vitesse);
          steer.limit(this.maxacceleration);

          return steer;
      } else {
          return createVector(0, 0);
      }
  }

  appliqueForce(force) {
      this.acceleration.add(force);
  }
    // Appliquer une force externe
    
    
    // Suivre le champ de flux
    suivre(flowfield) {
      let force = flowfield.lookup(this.position); // Obtenez le vecteur correspondant à la position
      this.appliqueForce(force); // Appliquez la force
    }
    
    
  
    // Mise à jour de la position et de la vitesse
    update() {
      this.vitesse.add(this.acceleration); // Ajouter l'accélération à la vitesse
      this.vitesse.limit(this.maxvitesse); // Limiter la vitesse
      this.position.add(this.vitesse); // Mettre à jour la position
      this.acceleration.set(0, 0); // Réinitialiser l'accélération
    }
  
    // Gestion des bords (réapparaître de l'autre côté de l'écran)
    edges() {
      if (this.position.x > width + this.r) this.position.x = -this.r;
      if (this.position.x < -this.r) this.position.x = width + this.r;
      if (this.position.y > height + this.r) this.position.y = -this.r;
      if (this.position.y < -this.r) this.position.y = height + this.r;
    }
  
    // Afficher le poisson indifférent
    show() {
      stroke(255);
      strokeWeight(2);
      fill(255, 0, 0); // Couleur bleu clair
      push();
      translate(this.position.x, this.position.y);
      rotate(this.vitesse.heading()); // Orienter selon la direction de déplacement
      ellipse(0, 0, this.r * 2, this.r); // Corps principal
      fill(100, 150, 255); // Couleur de la queue
      beginShape();
      vertex(-this.r, -this.r / 2);
      vertex(-this.r - this.r / 2, 0);
      vertex(-this.r, this.r / 2);
      endShape(CLOSE);
      pop();
    }
  }
  