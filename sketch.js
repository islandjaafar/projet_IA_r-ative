let slider, sliderVitesse, sliderAcceleration, sliderPoissonsIndifferents;
let behaviorSelect, alignmentSelect;
let vehicles = [];
let mouseImg, mouseImg2;
let target;
let flowfield;
let poissonsIndifferents = [];

function preload() {
  mouseImg = loadImage('assets/ver.png');
  mouseImg2 = loadImage('assets/requin.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  flowfield = new FlowField(20);

  // Initialiser les poissons indifférents
  for (let i = 0; i < 50; i++) {
    poissonsIndifferents.push(new PoissonIndifferent(random(width), random(height)));
  }

  createP('Nombre de véhicules').position(10, 15).style('color', '#fff');
  slider = createSlider(1, 50, 10).position(10, 45);

  createP('Vitesse maximale').position(10, 75).style('color', '#fff');
  sliderVitesse = createSlider(1, 10, 4, 0.1).position(10, 105);

  createP('Accélération maximale').position(10, 135).style('color', '#fff');
  sliderAcceleration = createSlider(0.1, 1, 0.25, 0.01).position(10, 165);

  createP('Nombre de poissons indifférents').position(10, 200).style('color', '#fff');
  sliderPoissonsIndifferents = createSlider(1, 100, 50).position(10, 230);

  createP('Comportement:').position(10, 260).style('color', '#fff');
  behaviorSelect = createSelect().position(115, 290);
  behaviorSelect.option('seek');
  behaviorSelect.option('flee');
  behaviorSelect.option('pursue');
  behaviorSelect.option('evade');
  behaviorSelect.option('seek_with_arrive');
  behaviorSelect.option('pursue_with_arrive');

  createP('Alignement:').position(10, 330).style('color', '#fff');
  alignmentSelect = createSelect().position(115, 360);
  alignmentSelect.option('separation');
  alignmentSelect.option('cohesion');

  for (let i = 0; i < slider.value(); i++) {
    vehicles.push(new Vehicule(random(width), random(height)));
  }

  target = new Ver();
}

function draw() {
  drawOceanBackground();

  // Ajuster le nombre de véhicules
  let nombre_voulu = slider.value();
  if (vehicles.length !== nombre_voulu) {
    while (vehicles.length < nombre_voulu) {
      vehicles.push(new Vehicule(random(width), random(height)));
    }
    while (vehicles.length > nombre_voulu) {
      vehicles.pop();
    }
  }

  // Ajuster le nombre de poissons indifférents
  let nombrePoissons = sliderPoissonsIndifferents.value();
  if (poissonsIndifferents.length !== nombrePoissons) {
    while (poissonsIndifferents.length < nombrePoissons) {
      poissonsIndifferents.push(new PoissonIndifferent(random(width), random(height)));
    }
    while (poissonsIndifferents.length > nombrePoissons) {
      poissonsIndifferents.pop();
    }
  }

  // Mettre à jour les paramètres des véhicules
  let nouvelleVitesse = sliderVitesse.value();
  let nouvelleAcceleration = sliderAcceleration.value();
  for (let vehicle of vehicles) {
    vehicle.maxvitesse = nouvelleVitesse;
    vehicle.maxacceleration = nouvelleAcceleration;
    
  }

  // Modifier dynamiquement la cible en fonction du comportement
  let selectedBehavior = behaviorSelect.value();
  if (selectedBehavior === 'flee' || selectedBehavior === 'evade') {
    if (!(target instanceof Requin)) {
      target = new Requin();
    }
  } else {
    if (!(target instanceof Ver)) {
      target = new Ver();
    }
  }

  // Mettre à jour et afficher la cible
  if (target && target.update && target.show) {
    target.update();
    target.show();
  }

  // Récupérer le choix entre cohésion et séparation
  let selectedAlignment = alignmentSelect.value();

  // Appliquer le comportement sélectionné à chaque véhicule
  for (let vehicle of vehicles) {
    if (target && target.position && target.vitesse) {
      if (selectedBehavior === 'seek') {
        vehicle.seek(target);
      } else if (selectedBehavior === 'flee') {
        vehicle.flee(target);
      } else if (selectedBehavior === 'pursue') {
        vehicle.pursue(target);
      } else if (selectedBehavior === 'evade') {
        vehicle.evade(target);
      } else if (selectedBehavior === 'seek_with_arrive') {
        vehicle.seek_with_arrive(target);
      } else if (selectedBehavior === 'pursue_with_arrive') {
        vehicle.pursue_with_arrive(target);
      }
    }

    // Appliquer la cohésion ou la séparation en fonction du choix
    if (selectedAlignment === 'separation') {
      vehicle.separate(vehicles);
    } else if (selectedAlignment === 'cohesion') {
      let cohesionForce = vehicle.cohesion(vehicles);
      vehicle.applique_acceleration(cohesionForce);
    }

    vehicle.update();
    vehicle.edges();
    vehicle.show();
  }

  // Gérer les poissons indifférents
  for (let poisson of poissonsIndifferents) {
    let alignForce = poisson.align(poissonsIndifferents);
    poisson.appliqueForce(alignForce);
    poisson.suivre(flowfield);

    poisson.update();
    poisson.edges();
    poisson.show();
  }

  // Afficher le champ de flux
  flowfield.show();
}

function drawOceanBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(0, 105, 148), color(0, 46, 93), inter);
    stroke(c);
    line(0, y, width, y);
  }
}
