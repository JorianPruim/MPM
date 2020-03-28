document.onload = init();

l("newMapName").value = "myMap";
createMap();
map.doRenderLogging = false;
map.createWorld("myWorld");
map.selectWorld("myWorld");
changeEditorScreen("world");
map.currentWorld.setDomain(20,20);
map.addTile("myTile");
select(map.tiles,"myTile").display.backgroundColor = "#55FF55";