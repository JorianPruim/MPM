class Tile{
	constructor(){
		this.name = "";
		this.displayName = "";
		this.display = {};
		this.onTileEnterEvent = {
			default:{},
			left:{},
			right:{},
			up:{},
			down:{}
		}
		this.onTileLeaveEvent = {
			default:{},
			left:{},
			right:{},
			up:{},
			down:{}
		}

		this.attr = {};
	}

	onTileEnter(){

	}
	onTileEnterLeft(){

	}
	onTileEnterRight(){

	}
	onTileEnterUp(){

	}
	onTileEnterDown(){

	}
	onTileLeave(){

	}
	onTileLeaveLeft(){

	}
	onTileLeaveRight(){

	}
	onTileLeaveUp(){

	}
	onTileLeaveDown(){

	}


}
