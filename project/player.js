const player = 
{
  velocity: glMatrix.vec3.create(),
  position: glMatrix.vec3.create(),
  speed: 0.1
}

BOBBING = 0.2

function getColliders()
{
  colliders = []
  transforms = document.getElementById("Inline-Scene").querySelectorAll("Transform")
  for (t of transforms)
  {
    transArr = t.translation.split(" ")
    tPos = glMatrix.vec3.fromValues(transArr[0], transArr[1], transArr[2])
    colliders.push([tPos, null]) // TODO: add mask
  }
  return colliders
}

function move(speed, angle = 0)
{
  orientation = getCameraOrientation()
  forward = glMatrix.vec3.fromValues(1, 0, 0)
  glMatrix.vec3.rotateY(forward, forward, glMatrix.vec3.fromValues(0, 0, 0), Number(orientation[3]) + Math.PI / 2 + angle)

  vec = glMatrix.vec3.create()
  glMatrix.vec3.multiply(vec, forward, glMatrix.vec3.fromValues(speed, speed, speed))
  glMatrix.vec3.add(vec, player.position, vec)

  let collision = false
  let colliders = getColliders()
  for (collider of colliders)
  {
    let dst = glMatrix.vec3.distance(vec, collider[0])
    if (dst < 3.0)
    {
      collision = true
    }
  }

  if (!collision)
  {
    player.position[0] = vec[0]
    player.position[1] = vec[1]
    player.position[2] = vec[2]
  }
  setCameraPosition(player.position[0], BOBBING*Math.sin(vec[0]+vec[2]) + player.position[1], player.position[2])
}

function step(timestamp) 
{
  if (start === undefined) 
  {
    start = timestamp
  }
  const elapsed = timestamp - start

  if (previousTimeStamp !== timestamp) 
  {
    if (key[87])
    {
      move(player.speed)
    } 
    if (key[83])
    {
      move(-player.speed)
    }

    if (key[65])
    {
      move(player.speed, +Math.PI / 2)
    }
    if (key[68])
    {
      move(player.speed, -Math.PI / 2)
    }
  }

  window.requestAnimationFrame(step)
}

function initPlayer()
{
  window.requestAnimationFrame(step)
}

window.addEventListener("load", () => { setTimeout(initPlayer, 100) })
