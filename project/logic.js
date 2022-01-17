function finishReached(player, collider) {
  console.log("YOU WON!");
  document.getElementById("demo").innerHTML = "YOU SURVIVED";
  var scene = document.getElementById('game');
  scene.innerHTML = ""
  scene.innerHTML ="<img src='https://c.tenor.com/3uCfvzgTIFUAAAAC/dinos-dinosaurs.gif'></img>";
}
