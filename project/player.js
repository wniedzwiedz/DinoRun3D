const player = 
{
  velocity: glMatrix.vec3.create(),
  position: glMatrix.vec3.create(),
  speed: 0.1
}

function move(speed, angle = 0)
{
  orientation = getCameraOrientation()
  forward = glMatrix.vec3.fromValues(1, 0, 0)
  glMatrix.vec3.rotateY(forward, forward, glMatrix.vec3.fromValues(0, 0, 0), Number(orientation[3]) + Math.PI / 2 + angle)

  vec = glMatrix.vec3.create()
  glMatrix.vec3.multiply(vec, forward, glMatrix.vec3.fromValues(speed, speed, speed))
  glMatrix.vec3.add(player.position, player.position, vec)

  setCameraPosition(player.position[0], player.position[1], player.position[2])
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
