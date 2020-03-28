class Tile{
	constructor(name){
		this.name = name;
		this.displayName = name;
		this.display = {};
		this.onTileEnterEvent = {
			default:[],
			left:[],
			right:[],
			up:[],
			down:[]
		}
		this.onTileLeaveEvent = {
			default:[],
			left:[],
			right:[],
			up:[],
			down:[]
		}

		this.attr = {};
	}

	onTileEnter(){
		for(e of this.onTileEnterEvent.default){
			e.execute();
		}
	}
	onTileEnterLeft(){
		for(e of this.onTileEnterEvent.left){
			e.execute();
		}
	}
	onTileEnterRight(){
		for(e of this.onTileEnterEvent.right){
			e.execute();
		}
	}
	onTileEnterUp(){
		for(e of this.onTileEnterEvent.up){
			e.execute();
		}
	}
	onTileEnterDown(){
		for(e of this.onTileEnterEvent.down){
			e.execute();
		}
	}
	onTileLeave(){
		for(e of this.onTileLeave.default){
			e.execute();
		}
	}
	onTileLeaveLeft(){
		for(e of this.onTileLeave.left){
			e.execute();
		}
	}
	onTileLeaveRight(){
		for(e of this.onTileLeave.right){
			e.execute();
		}
	}
	onTileLeaveUp(){
		for(e of this.onTileLeave.up){
			e.execute();
		}
	}
	onTileLeaveDown(){
		for(e of this.onTileLeave.down){
			e.execute();
		}
	}

	addEvent(eventName, direction, trigger){
		var event = select(map.events, eventName);
		if(!(event instanceof MapEvent)){
			console.error("Error: unable to add a non-event to an event list");
			alert("Please enter a valid event.");
			return;
		}
		if(trigger == "Enter"){
			switch(direction){
				case "Any":
					this.onTileEnterEvent.default.push(event);
					break;
				case "Left":
					this.onTileEnterEvent.left.push(event);
					break;
				case "Right":
					this.onTileEnterEvent.right.push(event);
					break;
				case "Up":
					this.onTileEnterEvent.up.push(event);
					break;
				case "Down":
					this.onTileEnterEvent.down.push(event);
					break;
				default:
					console.warn("no valid direction found");
					alert("Please specify a valid direction");
			}
		}else if(trigger == "Leave"){
			switch(direction){
				case "Any":
					this.onTileLeaveEvent.default.push(event);
					break;
				case "Left":
					this.onTileLeaveEvent.left.push(event);
					break;
				case "Right":
					this.onTileLeaveEvent.right.push(event);
					break;
				case "Up":
					this.onTileLeaveEvent.up.push(event);
					break;
				case "Down":
					this.onTileLeaveEvent.down.push(event);
					break;
				default:
					console.warn("no valid direction found");
					alert("Please specify a valid direction");
			}
		}else{
			console.error("Please specify a tileLeave or tileEnter event");
			alert("Event must be either triggerd by leaving or entering a tile");
			return;
		}
		l("tileEventName").value="";
	}

	setDisplayName(name){
		if(name.length==0){
			console.warn("display name must contain at least 1 character");
			alert("Please enter a valid display name");
			return;
		}else{
			this.displayName = name;
			l("tileDisplayName").value = "";
		}
		
	}

}
