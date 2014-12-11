void setup() {
  size(500, 500, P3D); 
}

void draw() {
  background(200);
  stroke(255, 50);
  translate(mouseX, mouseY, 0);
  fill(mouseX/2, (mouseX+mouseY)/4, mouseY/2);
  sphere(40);
}
