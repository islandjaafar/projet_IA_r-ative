class Requin {
    constructor() {
      // Initialiser la position du requin au centre du canevas
      this.position = createVector(width > 0 ? width / 2 : 0, height > 0 ? height / 2 : 0);
      this.vitesse = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.img = mouseImg2; // Utiliser l'image préchargée pour le requin
    }
  
    update() {
        let newPosition = createVector(mouseX, mouseY);
        this.vitesse = p5.Vector.sub(newPosition, this.position);
        this.position.set(newPosition);
      }
    
      show() {
        if (this.img) {
          imageMode(CENTER);
          image(this.img, this.position.x, this.position.y, 50, 50);
        } else {
          console.error("Image introuvable pour le Ver.");
        }
      }
    }