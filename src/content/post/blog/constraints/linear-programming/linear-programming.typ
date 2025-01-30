#set page(width: auto, height: auto, fill: none)
#import "@preview/cetz:0.3.0"

#let vectorAdd(a, b) = {
  (x: a.x + b.x, y: a.y + b.y)
}

#let vectorScale(a, s) = {
  (x: a.x * s, y: a.y * s)
}

#let vectorToList(a) = {
  (x: a.x, y: a.y)
}

#let vectorNorm(a) = {
  calc.sqrt(calc.pow(a.x, 2) + calc.pow(a.y, 2))
}

#cetz.canvas({
  import cetz.draw: *

  set-style(
    stroke: 3pt,
    grid: (
      stroke: gray + 1pt,
    ),
    mark: (
      transform-shape: false,
      fill: black
    )
  )

  let size = 7         // actual size of plot grid
  let max = 4           // maximum absolute x and y value
  let scaleFactor = size / max

  scale(x: size / max, y: size/max)

  grid((-max, -max), (max, max), step: 1)

  let axesExtent = max + 0.5
  line((-axesExtent, 0), (axesExtent, 0), mark: (end: "stealth"))
  line((0, -axesExtent), (0, axesExtent), mark: (end: "stealth"))

  let vertices = (
    (-1,3),
    (2,2),
    (3,-1),
    (-1,-3),
    (-3,0)
  )

  line(close: true, stroke: blue + 3pt, fill: blue.transparentize(80%), ..vertices)

  line((0,0), (3,2), stroke: red.darken(30%) + 3pt, mark: (end: "stealth"))
})

#pagebreak()

#cetz.canvas({
  import cetz.draw: *

  set-style(
    stroke: 3pt,
    grid: (
      stroke: gray + 1pt,
    ),
    mark: (
      transform-shape: false,
      fill: black
    )
  )

  let size = 7         // actual size of plot grid
  let max = 4           // maximum absolute x and y value
  let scaleFactor = size / max

  scale(x: size / max, y: size/max)

  grid((-max, -max), (max, max), step: 1)

  let axesExtent = max + 0.5
  line((-axesExtent, 0), (axesExtent, 0), mark: (end: "stealth"))
  line((0, -axesExtent), (0, axesExtent), mark: (end: "stealth"))

  let vertices = (
    (-1,3),
    (2,2),
    (3,-1),
    (-1,-3),
    (-3,0)
  )

  line(close: true, stroke: blue + 3pt, fill: blue.transparentize(80%), ..vertices)

  let objective = (x: 3, y: 2)
  let objectiveUnit = vectorScale(objective, 1/vectorNorm(objective))
  let objectivePerp = (x: -objectiveUnit.y, y: objectiveUnit.x)

  line((0,0), objective, stroke: red.darken(30%) + 3pt, mark: (end: "stealth"))

  // level sets
  let levelScale = 3.0
  for k in (-3, -2, -1, 0, 1, 2, 3) {
    let a = vectorScale(objectiveUnit, k*vectorNorm(objective)/2)
    let b = vectorAdd(a, vectorScale(objectivePerp, levelScale))
    let c = vectorAdd(a, vectorScale(objectivePerp, -levelScale))

    line(vectorToList(b), vectorToList(c))
  }
})