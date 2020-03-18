document.onload = init();

l("newMapName").value = "myMap";
createMap();
map.doRenderLogging = false;
map.createWorld("myWorld");
map.selectWorld("myWorld");
changeEditorScreen("world");