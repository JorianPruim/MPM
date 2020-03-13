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
			return false;
		}
	}
}
/*
*	tileClick(int, int)
*	triggers a tileOnClickEvent(WIP) when clicked
*/
function tileClick(x,y){
	console.log(x,y);
}