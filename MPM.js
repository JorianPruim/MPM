class MPM{
	constructor(){
		this.name = ""; //name of the map as it will be read by the code and how it will be downloaded (WIP)
		this.tiles = []; //list of tile TEMPLATES
		this.entities = []; //list of entity TEMPLATES
		this.players = []; //list of players
		this.worlds = []; //list of worlds
		this.events = []; //list of stored events
		this.displayName = ""; //name of how it will be shown to the client
		this.currentWorld = undefined; //world that will be rendered on a render request
		this.currentTile = undefined; //used in the editor
		this.x = 0; //x-coordinate of the topleft most tile in the browser
		this.y = 0; //y-coordinate ^
		this.zoom = 20; //edge length of the current shown render
		this.doRenderLogging = true;

		this.attr = {};
	}
	/*
	*	render(void) -> void
	*	method will update the browser map
	*/
	render(){
		if(this.doRenderLogging){
			console.log("rendering...");
		}
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
		if(this.x>this.currentWorld.size[0] || this.y>this.currentWorld.size[1]){
			console.warn("current rendering range does not intersect with current world domain");
		}
		var marginDown = window.innerHeight % this.zoom;
		var tileSize = (window.innerHeight - marginDown)/this.zoom;//makes map relative to the screen
		l("main").style.width = (window.innerWidth - window.innerHeight - marginDown - tileSize) + "px";
		for(var i = this.y; i<Math.min(this.zoom+this.y,this.currentWorld.size[1]); i++){
			var newRow = document.createElement("div");//every row contains this.zoom tiles
			newRow.setAttribute("class","row");
			newRow.style.height = tileSize + "px";
			l("map").appendChild(newRow);
			for(var j = this.x; j<Math.min(this.zoom+this.x,this.currentWorld.size[0]); j++){
				var newTile = document.createElement("div");
				newTile.setAttribute("class","tile");
				newTile.setAttribute("id",""+j+"-"+i+"");
				newTile.style.width = tileSize + "px";
				newTile.style.height = tileSize + "px";
				newTile.setAttribute("onclick","tileClick(" + j + ", " + i + ", event)");

        		for(var d in this.currentWorld.tiles[j][i].display){//loads in custom styles from the provided tile object
          			if(d == "width" || d == "height"){//do not alter the size of a tile, css is a b*tch.
            			continue;
        		  	}

          		newTile.style[d] = this.currentWorld.tiles[j][i].display[d];
          		console.log(newTile);
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
		if(this.doRenderLogging){
			console.log("map rendered");
		}
		

	}
	/*
	*	createWorld(string)->void
	*	adds a new world to build a map within
	*/
	createWorld(name){

		if(select(this.worlds, name) instanceof World){
			console.warn("World with name " + name + " already exists.");
			alert("World with name "+name+" already exists.");
			return;
		}else{
			if(name.length == 0){
				console.warn("Please enter a valid world name");
				alert("Please enter a valid world name");
				return;
			}

			this.worlds.push(new World(name));
			l("newWorldName").value = "";
			this.refreshWorldList();
		}

	}

	addTile(name){
		if(select(this.tiles, name) instanceof Tile){
			console.warn("Tile with name " + name + "already exists.");
			alert("Tile with name "+name+" already exists.");
			return;
		}else{
			if(name.length == 0){
				console.warn("Please entar a valid tile name");
				alert("Please enter a valid tile name");
				return;
			}
			this.tiles.push(new Tile(name));
			l('tilename').value = "";
			this.refreshTileList();
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
		if(typeof x != "number" || typeof y != "number"){
			console.warn("please specify valid spawn coordinates");
			alert("Please specify valid spawn coordinates");
		}
		x = Math.floor(x);
		y = Math.floor(y);
		var nP = new Player(x,y,w);
		this.players.push(nP);
		w.players.push(nP);
	}

	/*
	*	setXY(int, int)->void
	*	convenience method to directly change the coordinates of view of the current render
	*/
	setXY(newX, newY){
		if(!typeof(newX) == "number" || !typeof(newY) == "number" || isNaN(newX) || isNaN(newY)){
			console.warn("please enter a vaild number");
			return;
		}else{
			this.x = newX;
			this.y = newY;
			this.render();
		}
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

	zoomIn(amount){
		if(this.zoom + amount < 0){
			console.warn("cannot zoom out that much");
			alert("cannot zoom out that much");
		}else{
			this.zoom += amount;
			this.render();
		}
	}

	refreshWorldList(){
		if(this.worlds.length == 0){
			l("worldList").innerHTML = "No worlds detected";
		}else{
			l("worldList").innerHTML = "";
			for(var world of this.worlds){
				l("worldList").innerHTML += "<button onclick=\"map.selectWorld('"+world.name+"')\">"+world.name+"</button><br>";

			}
		}
		
	}

	refreshTileList(){
		if(this.tiles.length == 0){
			l("tileList").innerHTML = "No tiles detected";
		}else{
			l("tileList").innerHTML = "";
			for(var tile of this.tiles){
				l("tileList").innerHTML += "<button onclick=\"map.selectTile('"+tile.name+"')\">"+tile.name+"</button><br>";
			}
		}
	}
	
	hideWorldList(){
		l("worldList").innerHTML = "";
	}

	hideTileList(){
		l("tileList").innerHTML = "";
	}

	selectWorld(name){
		if(!select(this.worlds, name)){
			console.error("this world does not exist");
			return;
		}
		this.currentWorld = select(this.worlds, name);
		l("currentmapname").innerHTML = "Current Map: " + this.name + " > " + this.currentWorld.name;
		l("nworld").style.backgroundColor = "#5F5";
	}

	selectTile(name){
		if(!select(this.tiles, name)){
			console.error("this tile does not exist");
			return;
		}
		this.currentTile = select(this.tiles, name);
		l("currentmapname").innerHTML = "Current Map: " + this.name + "(Tile)=>" + this.currentTile.name;
		l("tileCreator").style.display = "block";

	}

}