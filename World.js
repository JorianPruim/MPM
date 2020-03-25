class World{
	constructor(name){
		this.name = name;
		this.displayName = name;
		this.tiles = [];
		this.entities = [];
		this.players = [];
		this.size = [0,0];

		this.attr = {};
	}

	setTile(x,y,tile){
		if(x>this.size[0] || x<0 || y>this.size[1] || y<0){
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
		if(x<this.size[0] || y<this.size[1]){
			if(!confirm("The current domain will trim some tiles and data will get lost. Continue anyway?")){
				return;
			}
			if(x<this.size[0]){
				
				for(var j=0; j<this.tiles.length; j++){
					for(var i = 0; i<(this.size[0])-x; i++){
						this.tiles[j].pop();
						
					}
				}
			}
			if(y<this.size[1]){
				
				for(var i = 0; i<this.size[1]-y; i++){
					this.tiles.pop();
				}
			}
		}
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
		map.render();
	}



	
}
