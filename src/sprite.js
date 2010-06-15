function Sprite(src)
{
	this.src = src; //this is the location of the Json file
	this.moving = false; //this will determine later if we're having a walking animation
	this.attack = false;
	this.face = [0,0]; //this is the direction we're facing
	this.image = new Image();
	this.init();
};

Sprite.prototype.init = function()
{
	var sprite = this;
		$.getJSON(sprite.src, null, function(json){
			sprite.image.src = json.Source;
			sprite.sWidth = json.SpriteWidth; //width of a sprite cell
			sprite.sHeight = json.SpriteHeight; //height of sprite cell
			sprite.down = json.Down; //the location of the sprites facing down (could be an array of arrays for animation)
			sprite.left = json.Left;
			sprite.up = json.Up;
			sprite.right = json.Right;
			sprite.xoff = json.xOffset;
			sprite.yoff = json.yOffset;
			//figure out later what to do for attacks and stuff
			sprite.dAttack = json.Down_Attack;
			sprite.lAttack = json.Left_Attack;
			sprite.uAttack = json.Up_Attack;
			sprite.rAttack = json.Right_Attack;

			sprite.face = sprite.down;
		});
		
};

Sprite.prototype.drawInfo = function(x,y)
{
	image = this.image;
	sWidth = this.sWidth;
	sHeight = this.sHeight;
	sx = this.face[0] * sWidth;
	sy = this.face[1] * sHeight;
	dx = x + this.xoff;
	dy = y + this.yoff;
	//console.log([image,sx, sy, sWidth, sHeight, dx, dy]);
	return [image,sx, sy, sWidth, sHeight, dx, dy];
}


Sprite.prototype.changeFace = function(direction)
{
	switch (direction){
		case down:
			this.face = this.down;
			//console.log(this.face);
			break;
		case up:
			this.face = this.up;
			//console.log(this.face);
			break;
		case left:
			this.face = this.left;
			//console.log(this.face);
			break;
		case right:
			this.face = this.right;
			//console.log(this.face);
			break;	
	//	case attack:
	//		this.face[1] = 1;
	//		break;
	}
	if (this.moving == false)
	{	
		this.face[1] = 0;
		//console.log(this.face);
	}
	if (this.attack == true)
	{
		this.face[1] = 1;
		//console.log(this.face);
	}
}