document.onload = init();

l("newMapName").value = "myMap";
createMap();
map.doRenderLogging = false;
map.createWorld("myWorld");
map.selectWorld("myWorld");
changeEditorScreen("world");
map.currentWorld.setDomain(20,20);
map.addTile("myTile");
changeEditorScreen("tiles");
var myEvent = new MapEvent('myEvent');
map.events.push(myEvent);
