canvas = null
key = []
previousTimeStamp = 0

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
