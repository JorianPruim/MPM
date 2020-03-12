l = (e)=>document.getElementById(e);

class Map{
	constructor(){
		this.name = "";
		this.tiles = [];
		this.entities = [];
		this.worlds = [];
		this.players = [];
		this.displayName = "";
		this.currentWorld = new World();
		this.x = 0;
		this.y = 0;
		this.zoom = 20;
		
	}
	render(){
		console.log("rendering...");
		l("map").innerHTML = "";
		var marginDown = window.innerHeight % this.zoom;
		var tileSize = (window.innerHeight - marginDown)/this.zoom;
		for(var i = 0; i<this.zoom; i++){
			var newRow = document.createElement("div");
			newRow.setAttribute("class","row");
			newRow.style.height = tileSize + "px";
			l("map").appendChild(newRow);
			for(var j = 0; j<this.zoom; j++){
				var newTile = document.createElement("div");
				newTile.setAttribute("class","tile");
				newTile.style.width = tileSize + "px";
				newTile.style.height = tileSize + "px";
				newTile.setAttribute("onclick","tileClick(" + j + ", " + i + ")");
        for(var d in newTile.display){
          if(d == "width" || d == "height"){
            continue;
          }
          newTile.style.d = newTile.display.d;
        }



				newRow.appendChild(newTile);
			}

		}

	}
	setXY(newX, newY){
		this.x = newX;
		this.y = newY;
		this.render();
	}

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