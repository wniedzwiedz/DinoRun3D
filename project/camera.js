canvas = null
key = []
previousTimeStamp = 0

cameraPitch = 0.0
cameraYaw = 0.0

function lockPointer()
{
  if (!canvas) return

  canvas.requestPointerLock()
}

function rotateCamera(dx, dy)
{
  camera = document.getElementById("camera")
  if (!camera) return

  cameraPitch += dy * 0.001
  cameraYaw -= dx * 0.001

  cameraYaw = cameraYaw % (Math.PI * 2.0)
}

function setCameraOrientation(yaw, pitch)
{
  forward = glMatrix.vec3.fromValues(1, 0, 0)
  glMatrix.vec3.rotateY(forward, forward, glMatrix.vec3.fromValues(0, 0, 0), cameraYaw + Math.PI / 2)

  up = glMatrix.vec3.fromValues(0, 1, 0)
  glMatrix.vec3.rotateZ(up, up, glMatrix.vec3.fromValues(0, 0, 0), cameraPitch)

  right = glMatrix.vec3.create()
  glMatrix.vec3.cross(right, forward, up)

  trueUp = glMatrix.vec3.create()
  glMatrix.vec3.cross(trueUp, right, forward)
  //orientation = camera.orientation.split(" ")
  
  //TODO: use pitch and yaw
  orientation = [0.0, 1.0, 0.0, cameraYaw]

  camera.orientation = orientation.join(" ")
}

function getCameraOrientation()
{
  camera = document.getElementById("camera")
  if (!camera) return

  return camera.orientation.split(" ")
}

function getCameraPosition()
{
  camera = document.getElementById("camera")
  if (!camera) return
  return camera.position.split(" ")
}

function setCameraPosition(x, y, z)
{
  camera = document.getElementById("camera")
  if (!camera) return
  camera.position = [x, y, z].join(" ")
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

function start()
{
  canvas = x3dom.canvases[0].canvas
  canvas.requestPointerLock()
  canvas.onclick = lockPointer

  document.addEventListener("mousemove", mouseMove)
  document.addEventListener("resize", onResize)
  document.addEventListener("keydown", onKeyDown)
  document.addEventListener("keyup", onKeyUp)
}

window.addEventListener("load", () => { setTimeout(start, 100) })
