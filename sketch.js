function easeInOutQuad(x) {
	return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

console.log(easeInOutQuad(0), easeInOutQuad(1))

class Rectangle{
	x = 100;
	y = 100;

	f = 0;
	isOpen = false;
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	open(){
		if(this.isOpen) return;
		this.isOpen = true;
		this.f = 100;
	}

	close(){
		if(!this.isOpen) return;
		this.isOpen = false;
		this.f = 100;
	}

	draw(){
		if(this.isOpen && this.f != 0){
			this.x += easeInOutQuad(this.f / 100) * 5;
			this.f -= 1;
		}
		if(!this.isOpen && this.f != 0){
			this.x -= easeInOutQuad(this.f / 100) * 5;
			this.f -= 1;
		}
		rect(this.x, this.y, 300, 100);
	}
}

var rec;

function setup(){
	createCanvas(windowWidth, windowHeight);
	rec = new Rectangle(windowWidth - 300, 100);
}

function draw(){
	clear();
	rec.draw();
}

function keyPressed() {
	if (keyCode  === RIGHT_ARROW && rec.f === 0) {
		rec.open();
	} else if (keyCode  === LEFT_ARROW && rec.f === 0) {
		rec.close();
	}
}