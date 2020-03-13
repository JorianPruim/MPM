class Map{
	constructor(){
		this.name = ""; //name of the map as it will be read by the code and how it will be downloaded (WIP)
		this.tiles = []; //list of tile TEMPLATES
		this.entities = []; //list of entity TEMPLATES
		this.players = []; //list of players
		this.worlds = []; //list of worlds
		this.displayName = ""; //name of how it will be shown to the client
		this.currentWorld = null; //world that will be rendered on a render request
		this.x = 0; //x-coordinate of the topleft most tile in the browser
		this.y = 0; //y-coordinate ^
		this.zoom = 20; //edge length of the current shown render
		
	}
	/*
	*	render(void) -> void
	*	method will update the browser map
	*/
	render(){
		console.log("rendering...");
		l("map").innerHTML = "";//clears the screen
		l("map").style.height = window.innerHeight + "px";
		if(this.currentWorld == null && this.worlds.length > 0){
			this.currentWorld = this.worlds[0];
		}
		if(this.worlds.length == 0){
			console.warn("no worlds to render");
			return;
		}

		//TILE RENDERING
		if(this.currentWorld.tiles.length == 0){
			console.warn("no tiles to render")
			return;
		}
		var marginDown = window.innerHeight % this.zoom;
		var tileSize = (window.innerHeight - marginDown)/this.zoom;//makes map relative to the screen
		l("main").style.width = (window.innerWidth - window.innerHeight - marginDown - tileSize) + "px";
		for(var i = this.y; i<this.zoom+this.y; i++){
			var newRow = document.createElement("div");//every row contains this.zoom tiles
			newRow.setAttribute("class","row");
			newRow.style.height = tileSize + "px";
			l("map").appendChild(newRow);
			for(var j = this.x; j<this.zoom+this.x; j++){
				var newTile = document.createElement("div");
				newTile.setAttribute("class","tile");
				newTile.setAttribute("id",""+j+"-"+i+"");
				newTile.style.width = tileSize + "px";
				newTile.style.height = tileSize + "px";
				newTile.setAttribute("onclick","tileClick(" + j + ", " + i + ")");

        		for(var d in this.currentWorld.tiles[j][i].display){//loads in custom styles from the provided tile object
          			if(d == "width" || d == "height"){//do not alter the size of a tile, css is a b*tch.
            			continue;
        		  	}
          		newTile.style[d] = this.currentWorld.tiles[j][i].display[d];
        		}

				newRow.appendChild(newTile);

			}

		}

		//PLAYER RENDERING
		for(var i = 0; i<this.currentWorld.players.length; i++){
			var rPlayer = this.currentWorld.players[i];
			if(!(rPlayer instanceof Player)){
				console.warn("a not-a-player has been found in the player list");
				continue;
			}
			var containerElement = l(""+rPlayer.position[0]+"-"+rPlayer.position[1]+"");
			if(typeof(containerElement)!="undefined" && containerElement!=null){
				var newPlayer = document.createElement("div");
				newPlayer.setAttribute("class","player");
				newPlayer.setAttribute("id","p"+rPlayer.position[0]+"-"+rPlayer.position[1]+"");
				newPlayer.style.marginTop = (tileSize*0.25)/2 - 2+ "px";
				newPlayer.style.marginBottom = (tileSize*0.25)/2 - 2 + "px";
				containerElement.appendChild(newPlayer);
			}
		}
		console.log("map rendered");

	}
	/*
	*	createWorld(string)->void
	*	adds a new world to build a map within
	*/
	createWorld(name){

		if(select(this.worlds, name) instanceof World){
			console.warn("World with name " + name + " already exists.");
			return;
		}else{
			this.worlds.push(new World(name));
		}

	}
	/*
	*	createPlayer(int, int, World.name)->void
	*	creates a player at the specified location
	*/
	createPlayer(x,y,world){
		var w = select(this.worlds, world);
		if(!w instanceof World){
			console.warn("please specify a spawn world for the new player");
			return;
		}
		var nP = new Player(x,y,w);
		this.players.push(nP);
		w.players.push(nP);
	}

	/*
	*	setXY(int, int)->void
	*	convenience method to directly change the coordinates of view of the current render
	*/
	setXY(newX, newY){
		this.x = newX;
		this.y = newY;
		this.render();
	}
	/*
	*	pan(string, int)->void
	*	pans the map to a given direction
	*/
	pan(direction, amount){
		switch(direction){
			case "up":
    		    if(amount>this.y){
          			break;
       			}
				this.y-=amount;
				this.render();
				break;
			case "down":
 		       if(amount>this.currentWorld.size[1]){
        			break;
       			}
				this.y+=amount;
				this.render();
				break;
			case "left":
       			if(amount>this.x){
        		    break;
        		}
				this.x-=amount;
				this.render();
				break;
			case "right":
        		if(amount>this.currentWorld.size[0]){
          			break;
        		}
				this.x+=amount;
				this.render();
				break;
			default:
				console.warn("invalid direction");
		}
		return;
	}
	
}