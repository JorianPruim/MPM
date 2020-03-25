class MapEvent{//TODO DO DO DO DOOOOO
	constructor(name){
		this.name = name;
	}

	execute(){
		
	}
}

class AttrChangeEvent extends MapEvent{
	constructor(name, target){
		super(name);
		this.target = target;
		this.mode = "set";
		this.entry = "";
		this.value = "";
	}

	execute(){
		switch(this.mode){
			case "set":
				this.target.attr[this.entry] = this.value;
				break;
			case "add":
				this.target.attr[this.entry] += this.value;
				//works as concatination too, use at own risk.
				break;
			case "substract":
				this.target.attr[this.entry] -= this.value;
				break;
			case "multiply":
				this.target.attr[this.entry] *= this.value;
				break;
			case "divide":
				this.target.attr[this.entry] /= this.value;
				break;
			case "modulo":
				this.target.attr[this.entry] %= this.value;
				break;
			case "concat":
				(this.target.attr[this.entry]).toString() += (this.value).toString();
				break;
			default:
				this.target.attr[this.entry] = this.value;
				//If you're missing an operation, please post a pull request on github and I'll tell you why a sane person doesn't want that added or how you can use other methods for that.

		}
	}
}


class TileChangeEvent extends MapEvent{
	constructor(name, world, x, y){
		super(name);
		this.world = world;
		this.x = x;
		this.y = y;
		this.tileType = new Tile();
	}

	execute(){
		this.world.setTile(this.x, this.y, this.tileType);
		map.render();
	}
}