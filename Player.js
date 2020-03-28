class Player{
	constructor(name,x,y,world){
		this.name = name;
		this.attr = {};
		this.position = [x,y];
		this.ownerWorld = world;
		this.ownerMap = null;
	}
}