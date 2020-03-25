class ConditionalEvent extends MapEvent{
	constructor(name){
		super(name);
		this.comparisonMode = "=";
		this.left = "";
		this.right = "";
		this.leftAttrHolder;
		this.rightAttrHolder;
		this.onTrue = new MapEvent();
		this.onFalse = new MapEvent();
	}

	setOnTrue(event){
		if(event instanceof MapEvent){
			this.onTrue = event;
		}else{
			console.error("Error: event to set is not an instance of MapEvent");
		}
	}

	setOnFalse(event){
		if(event instanceof MapEvent){
			this.onFalse = event;
		}else{
			console.error("Error: event to set is not an instance of MapEvent");
		}
	}

	refreshSides(){//This accessing mess makes sure your data stays up-to-date: it fetches the current value from the attribute holder in order to prevent the conditional holding constant values.
		if(this.leftAttrHolder){
			this.left = this.leftAttrHolder[0].attr[this.leftAttrHolder[1]];
		}
		if(this.rightAttrHolder){
			this.right = this.rightAttrHolder[0].attr[this.rightAttrHolder[1]];
		}
	}

	setLeftAttr(attrHolder, attrName){
		this.leftAttrHolder = [attrHolder, attrName];
	}
	setRightAttr(attrHolder, attrName){
		this.rightAttrHolder = [attrHolder, attrName];
	}
	unsetLeftAttr(){
		this.leftAttrHolder = undefined;
	}
	unsetRightAttr(){
		this.rightAttrHolder = undefined;
	}

	execute(){
		this.refreshSides();
		switch(this.comparisonMode){
			case "=":
				console.log(this.left == this.right);
				if(this.left == this.right){
					this.onTrue.execute();
				}else{
					this.onFalse.execute();
				}
				break;
			case "<":
				if(this.left < this.right){
					this.onTrue.execute();
				}else{
					this.onFalse.execute();
				}
				break;
			case ">":
				if(this.left > this.right){
					this.onTrue.execute();
				}else{
					this.onFalse.execute();
				}
				break;
			case "<=":
				if(this.left <= this.right){
					this.onTrue.execute();
				}else{
					this.onFalse.execute();
				}
				break;
			case ">=":
				if(this.left >= this.right){
					this.onTrue.execute();
				}else{
					this.onFalse.execute();
				}
				break;
			case "!=":
				if(this.left != this.right){
					this.onTrue.execute();
				}else{
					this.onFalse.execute();
				}
				break;
			default:
				console.warn("no valid comparison mode found.");
				this.onTrue.execute();
		}
	}
}