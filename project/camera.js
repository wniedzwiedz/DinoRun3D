canvas = null
key = []
previousTimeStamp = 0
speed = 0.1

function lockPointer()
{
  if (!canvas) return

  canvas.requestPointerLock()
}

function rotateCamera(dx, dy)
{
  camera = document.getElementById("camera")
  if (!camera) return

  orientation = camera.orientation.split(" ")
  orientation[3] = Number(orientation[3]) - dx * 0.001

  camera.orientation = orientation.join(" ")
}

function moveForward(speed, angle = 0)
{
  camera = document.getElementById("camera")
  if (!camera) return
  orientation = camera.orientation.split(" ")
  posArray = camera.position.split(" ")

  position = glMatrix.vec3.fromValues(posArray[0], posArray[1], posArray[2])

  forward = glMatrix.vec3.fromValues(1, 0, 0)
  glMatrix.vec3.rotateY(forward, forward, glMatrix.vec3.fromValues(0, 0, 0), Number(orientation[3]) + Math.PI / 2 + angle)

  vec = glMatrix.vec3.create()
  glMatrix.vec3.multiply(vec, forward, glMatrix.vec3.fromValues(speed, speed, speed))
  glMatrix.vec3.add(position, position, vec)

  camera.position = [position[0], position[1], position[2]].join(" ")
}

function mouseMove(e)
{
  dx = e.movementX
  dy = e.movementY

  rotateCamera(dx, dy)
}

function onResize(e)
{
  canvas.width = document.body.clientWidth; 
  canvas.height = document.body.clientHeight;
}

function onKeyDown(e)
{
  key[e.keyCode] = true
  console.log("onKeyDown", e.keyCode)
}

function onKeyUp(e)
{
  key[e.keyCode] = false
}

function step(timestamp) {
  if (start === undefined) 
  {
    start = timestamp
  }
  const elapsed = timestamp - start

  if (previousTimeStamp !== timestamp) 
  {
    if (key[87])
    {
      moveForward(speed)
    } 
    if (key[83])
    {
      moveForward(-speed)
    }

    if (key[65])
    {
      moveForward(speed, +Math.PI / 2)
    }
    if (key[68])
    {
      moveForward(speed, -Math.PI / 2)
    }
  }

  window.requestAnimationFrame(step)
}

function start()
{
  canvas = x3dom.canvases[0].canvas
  canvas.requestPointerLock()
  canvas.onclick = lockPointer

  document.addEventListener("mousemove", mouseMove)
  document.addEventListener("resize", onResize)
  document.addEventListener("keydown", onKeyDown)
  document.addEventListener("keyup", onKeyUp)

  window.requestAnimationFrame(step)
}

window.onload = function()
{
  setTimeout(start, 100)
}
