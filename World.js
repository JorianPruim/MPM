class World{
	constructor(){
		this.name = "";
		this.displayName = "";
		this.tiles = [];
		this.entities = [];
		this.players = [];
		this.size = [0,0];

	}

	setTile(x,y,tile){
		if(x>this.size[0][1] || x<this.size[0][0] || y>this.size[1][1] || y<this.size[1][0]){
			console.warn("the tile to be changed falls not in the current domain of this world.");
		}
		else if(!(tile instanceof Tile)){
			console.warn("please specify a tile type");
		}
		else{
			this.tiles[x][y] = tile;
		}
	}

	setDomain(x,y){
		this.size[0] = x;
		this.size[1] = y;
		for(var i=0;i<x;i++){
			if((typeof this.tiles[i])=="undefined"){
				this.tiles[i] = [];
			}
			for(var j=0;j<y;j++){
				if((typeof this.tiles[i][j]) == "undefined"){
					this.tiles[i][j] = new Tile();
				}
			}
		}
	}

	
}
