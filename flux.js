class FlowField {
    constructor(resolution) {
      this.resolution = resolution;
      this.cols = floor(width / resolution);
      this.rows = floor(height / resolution);
      this.field = this.make2DArray();
      this.init();
    }
  
    make2DArray() {
      let arr = new Array(this.cols);
      for (let i = 0; i < this.cols; i++) {
        arr[i] = new Array(this.rows);
      }
      return arr;
    }
  
    init() {
      noiseSeed(random(10000));
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          let angle = noise(i * 0.1, j * 0.1) * TWO_PI;
          this.field[i][j] = p5.Vector.fromAngle(angle);
        }
      }
    }
  
    lookup(position) {
      let col = floor(constrain(position.x / this.resolution, 0, this.cols - 1));
      let row = floor(constrain(position.y / this.resolution, 0, this.rows - 1));
      return this.field[col][row].copy();
    }
  
    show() {
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          let x = i * this.resolution;
          let y = j * this.resolution;
          let v = this.field[i][j];
          stroke(200);
          push();
          translate(x, y);
          rotate(v.heading());
          line(0, 0, this.resolution / 2, 0);
          pop();
        }
      }
    }
  }
  