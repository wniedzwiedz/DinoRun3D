const player = 
{
  velocity: glMatrix.vec3.create(),
  position: glMatrix.vec3.create(),
  speed: 0.1
}

BOBBING = 0.2

function getShapeSize(name)
{
  if (name == null || name === undefined || name == "null")
    return 0.0

  switch (name)
  {
    case "TREE1":
    case "TREE2":
      return 2.5
    case "TREE3":
    case "TREE4":
    case "TREE5":
      return 3.3
    case "ROCK1":
    case "ROCK2":
    case "ROCK3":
      return 2.8
    case "ROCK4":
    case "ROCK5":
      return 2.5

    case "FINISH":
      return 3.0
 
    case "FALLENTREE1":
    case "FALLENTREE2":
    case "LOG":
    case "STUMP":
      return 0.0

    case null:
    case undefined:
    case "":
    case "null":
    case "Shape":
      return 0.0
  }
  console.warn(`Size for '${name}' not defined`)
}

function getColliders()
{
  colliders = []
  transforms = document.getElementById("Inline-Scene").querySelectorAll("Transform")
  for (t of transforms)
  {
    transArr = t.translation.split(" ")
    
    while (t.children[0].tagName == t.tagName)
    {
      t = t.children[0]
      transArr2 = t.translation.split(" ")
      transArr[0] += transArr2[0]
      transArr[1] += transArr2[1]
      transArr[2] += transArr2[2]
    }
    tPos = glMatrix.vec3.fromValues(transArr[0], transArr[1], transArr[2])

    shape = t.querySelector("Group")
    size = 0.0
    name = null
    if (shape)
    {
      if (shape.hasAttribute("DEF"))
        name = shape.getAttribute("DEF").split("_")[0]
      else if (shape.hasAttribute("USE"))
        name = shape.getAttribute("USE")
    }
    if (name.split("_")[0] == "Shape")
      continue

    if (name != null)
    {
      size = getShapeSize(name)
    }

    colliders.push([tPos, size, name])
  }
  return colliders
}

function move(speed, angle = 0)
{
  forward = glMatrix.vec3.fromValues(1, 0, 0)
  glMatrix.vec3.rotateY(forward, forward, glMatrix.vec3.fromValues(0, 0, 0), cameraYaw + Math.PI / 2 + angle)

  vecX = glMatrix.vec3.create()
  glMatrix.vec3.multiply(vecX, forward, glMatrix.vec3.fromValues(speed, 0, 0))
  glMatrix.vec3.add(vecX, player.position, vecX)
  
  vecZ = glMatrix.vec3.create()
  glMatrix.vec3.multiply(vecZ, forward, glMatrix.vec3.fromValues(0, 0, speed))
  glMatrix.vec3.add(vecZ, player.position, vecZ)

  let collisionX = false
  let collisionZ = false
  let colliders = getColliders()
  let closest = undefined
  let minDist = 99999.9

  if (vecX[0] < -7.5)
    collisionX = true
  
  if (vecX[0] > 7.5)
    collisionX = true

  if (vecZ[2] < -2.5)
    collisionZ = true
  
  if (vecZ[2] > 72.0)
    collisionZ = true

  for (collider of colliders)
  {
    let dstZ = glMatrix.vec3.distance(vecZ, collider[0])
    if (dstZ < collider[1])
    {
      if (collider[2] == "FINISH")
      {
        finishReached(player, collider)
        break
      }
      collisionZ = true
    }
    let dstX = glMatrix.vec3.distance(vecX, collider[0])
    if (dstX < collider[1])
    {
      if (collider[2] == "FINISH")
      {
        finishReached(player, collider)
        break
      }
      collisionX = true
    }
    if (dstX < minDist)
    {
      closest = collider
      minDist = dstX
    }
  }

  // for debugging
  if (closest)
  {
    //console.log(closest, minDist)
  }

  if (!collisionX)
  {
    player.position[0] = vecX[0]
  }

  if (!collisionZ)
  {
    player.position[2] = vecZ[2]
  }

  setCameraPosition(player.position[0], BOBBING*Math.sin(vecX[0]+vecZ[2]) + player.position[1], player.position[2])
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
      move(player.speed)
    
    if (key[83])
      move(-player.speed)

    if (key[65])
      move(player.speed, +Math.PI / 2)
 
    if (key[68])
      move(player.speed, -Math.PI / 2)
  }

  updateAsteroid()

  setCameraOrientation(cameraYaw, cameraPitch)

  window.requestAnimationFrame(step)
}

function initPlayer()
{
  window.requestAnimationFrame(step)
}

window.addEventListener("load", () => { setTimeout(initPlayer, 100) })
