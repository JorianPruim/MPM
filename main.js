document.onload = init();

l("newMapName").value = "myMap";
createMap();
map.doRenderLogging = false;
map.createWorld("myWorld");
map.selectWorld("myWorld");
changeEditorScreen("world");
map.currentWorld.setDomain(20,20);


var player = new Player();
var event = new AttrChangeEvent("setHP", player);
event.mode = "set";
event.entry = "hp";
event.value = 100;
event.execute();

var addEvent = new AttrChangeEvent("addHP", player);
addEvent.entry = "hp";
addEvent.mode = "add";
addEvent.value= 50;

var condition = new ConditionalEvent("testCondition");
condition.comparisonMode = "=";
condition.setLeftAttr(player, "hp");
condition.right = 100;
condition.onTrue = addEvent;
condition.onFalse = event;
condition.execute();
condition.execute();
console.log(player);