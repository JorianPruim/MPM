var map;
var currentEditorScreen;
var selectedTile;
/*
*	l(string)
*	shortcut for document.getElementById
*/

l = (e)=>document.getElementById(e);

/*
*	select(array, string)
*	returns an array object with the value of the given string at the "name" key
*/
function select(array, name){
	for(var i = 0; i<array.length; i++){
		if(array[i]["name"] == name){
			return array[i];
		}else{
			continue;
		}
	}
	return false;
}
/*
*	tileClick(int, int)
*	triggers a tileOnClickEvent(WIP) when clicked
*/
function tileClick(x,y){
	console.log("TileClickEvent: clicked tile (",x,",",y,")");
	if(currentEditorScreen=="world"){

	}
}


function changeEditorScreen(s){
	if(map == undefined && s!="map"){
		console.warn("no owner map specified yet");
		alert("No owner map has been specified for this action. Please create a new map or import one (WIP)");
		changeEditorScreen("map");
		return;
	}
	if(s=="world" && map.currentWorld==undefined){
		console.warn("no mutable world selected");
		alert("Please select a world to edit");
		return;
	}
	for(x of document.getElementsByClassName("edit")){
		x.style.display = "none";
	}
	l("e"+s).style.display = "block";
	currentEditorScreen = s;
}

function createMap(){
	if(l("newMapName").value.length==0){
		console.warn("invalid name length @ createMap");
		alert("Please give your new map a valid name.");
		return;
	}else{
		if(map != undefined){
			if(!confirm("You already have a map active. Override?")){
				return;
			}
		}
		map = new Map();
		map.name = l("newMapName").value;
		map.displayName = l("newMapName").value;
		l("nmap").style.backgroundColor = "#5F5";
		l("currentmapname").innerHTML = "Current Map: " + map.name;
		l("newMapName").value = "";
		l("worldSelect").style.display = "block";
	}
}










function init(){
	l("emap").style.display = "block";
}
