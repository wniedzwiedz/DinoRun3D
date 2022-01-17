import { getColliders } from './player.js';

let colliders=getColliders();

let items=["TREE1","TREE2","ROCK1","ROCK2"];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  for (let i = 0; i < 10; i++) { 

    let item= items[getRandomInt(0,3)];
    let x=getRandomInt(0,50);
    let y=getRandomInt(0,80);

    let vec=[x,y];
    let coll=false;
for (collider of colliders)
  {
    let dst = glMatrix.vec3.distance(vec, collider[0])
    if (dst > 3.0)
    {
        coll=true;

    }
  }
if (coll==false){
    document.getElementById("game").innerHTML += '<Transform translation="'+x+' -2 '+y+'"><Shape USE="'+item+'"></Shape></Transform>';
}

  

}