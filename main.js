var map = new Map();
map.createWorld("myWorld");
select(map.worlds, "myWorld").setDomain(40,40);
map.currentWorld = select(map.worlds, "myWorld");
map.createPlayer(5,6,"myWorld");
map.setXY(2,3);
