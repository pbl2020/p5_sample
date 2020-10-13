function easeInOutQuad(x) {
	return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

class Component{

	onClick = null;

	_prevMouseIsPressed = false;

	_shouldEventExecute(){
		if(!this._prevMouseIsPressed && mouseIsPressed && this.isClicked(mouseX, mouseY))
			this.onClick && this.onClick();
		this._prevMouseIsPressed = mouseIsPressed;
	}

	isClicked(x, y){
		return false;
	};

	draw(){
		this._shouldEventExecute();
	}
}

class Rectangle extends Component{
	mx = 100;
	my = 100;

	x = 100;
	y = 100;
	width = 300;
	height = 300;

	isOpen = false;
	frameRate = 50;
	f = 50;
	constructor(x, y, onClick){
		super();
		this.x = x;
		this.y = y;
		this.mx = x;
		this.my = y;
		this.onClick = onClick;
	}

	open(){
		if(this.isOpen) return;
		this.isOpen = true;
		this.f = 0;
	}

	close(){
		if(!this.isOpen) return;
		this.isOpen = false;
		this.f = 0;
	}

	isClicked(mouseX, mouseY){
		const fragX = this.x < mouseX && mouseX < this.x + this.width;
		const fragY = this.y < mouseY && mouseY < this.y + this.height;
		return fragX && fragY;
	}

	draw(){
		super.draw();
		if(this.isOpen && this.f != this.frameRate){
			this.mx = this.x + this.width * easeInOutQuad(this.f / this.frameRate);
			this.f += 1;
		}
		if(!this.isOpen && this.f != this.frameRate){
			this.mx = (this.x + this.width) - this.width * easeInOutQuad(this.f / this.frameRate);
			this.f += 1;
		}
		rect(this.mx, this.my, this.width, this.height);
	}
}

var rec;

function setup(){
	createCanvas(windowWidth, windowHeight);
	rec = new Rectangle(windowWidth - 300, 100, () => {console.log("Hello, world!!")});
}

function draw(){
	clear();
	rec.draw();
}

function keyPressed() {
	if (keyCode  === RIGHT_ARROW && rec.f === rec.frameRate) {
		rec.open();
	} else if (keyCode  === LEFT_ARROW && rec.f === rec.frameRate) {
		rec.close();
	}
}
