function finishReached(player, collider) {
  console.log("YOU WON!");
  document.getElementById("timer").innerHTML = "YOU SURVIVED";
  var scene = document.getElementById('game');
  scene.innerHTML = ""
  scene.innerHTML = "<img src='https://c.tenor.com/3uCfvzgTIFUAAAAC/dinos-dinosaurs.gif'></img>";
}


var gametime = 0.1;
var countDownDate = new Date().getTime() + (gametime * 60 * 1000);

var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (!document.getElementById("timer").innerHTML.includes("YOU")) {
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
  
  if (distance <= 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "YOU DIED";
    var scene = document.getElementById('game');
    scene.innerHTML = "";
  }}
}, 1000);

function updateAsteroid() {
  progress = 1.0 - (countDownDate / 1000 - new Date().getTime() / 1000) / (gametime * 60)
  const START = glMatrix.vec3.fromValues(-100, 100, -100)

  const INFLATE = 1.0001

  /*
  asteroidTransform = document.getElementById("asteroidTransform")
  translation = asteroidTransform.translation.split(" ")
  asteroidPos = glMatrix.vec3.fromValues(Number(translation[0]), Number(translation[1]), Number(translation[2]) )
  */

  asteroidPos = START

  asteroidDir = glMatrix.vec3.create()
  glMatrix.vec3.subtract(asteroidDir, player.position, asteroidPos)
  //glMatrix.vec3.normalize(asteroidDir, asteroidDir)
  newAsteroidPos = glMatrix.vec3.create()
  asteroidVec = glMatrix.vec3.create()
  glMatrix.vec3.multiply(asteroidVec, asteroidDir, glMatrix.vec3.fromValues(progress, progress, progress))
  glMatrix.vec3.add(newAsteroidPos, asteroidPos, asteroidVec)

  if (!isNaN(newAsteroidPos[0]))
    asteroidTransform.translation = [newAsteroidPos[0], newAsteroidPos[1], newAsteroidPos[2]].join(" ")

  scale = asteroidTransform.scale.split(" ")
  currentScale = Number(scale[0])
  newScale = currentScale * INFLATE
  asteroidTransform.scale = [newScale, newScale, newScale].join(" ")

  return [newAsteroidPos, newScale]
}
