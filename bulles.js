class BubbleTrail {
    constructor() {
      this.bubbles = []; // Liste des bulles
    }
  
    // Ajouter plusieurs bulles à une position donnée
    addBubbles(position, count = 20) { // Augmentez si nécessaire
        for (let i = 0; i < count; i++) {
          this.bubbles.push({
            position: position.copy().add(random(-2, 2), random(-2, 2)),
            size: random(8, 15),
            alpha: 255,
          });
        }
        if (this.bubbles.length > 500) {
          this.bubbles.splice(0, this.bubbles.length - 1000);
        }
      }
    // Afficher et mettre à jour les bulles
    show() {
      for (let i = this.bubbles.length - 1; i >= 0; i--) {
        let bubble = this.bubbles[i];
        fill(255, 255, 0, bubble.alpha); // Couleur bleu clair avec transparence
        noStroke();
        ellipse(bubble.position.x, bubble.position.y, bubble.size);
  
        // Réduire progressivement l'opacité des bulles
        bubble.alpha -= 10; // Réduction plus lente pour une persistance accrue
        if (bubble.alpha <= 0) {
          this.bubbles.splice(i, 1); // Supprimer les bulles invisibles
        }
      }
    }
  }
  