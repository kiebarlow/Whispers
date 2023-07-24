class Cells {
  constructor(x, y, t) {
    this.x = x
    this.y = y
    this.h = cellHeight
    this.w = cellWidth
    this.type = t
  }

  show() {
    // Shows diffrent colours depending on the type of cell that is being rendered.
    switch (this.type) {
      case 0:
        // Path cells
        push()
        stroke(225)
        strokeWeight(2)
        fill(200, 150)
        rect(this.x, this.y, this.w, this.h)
        pop()
        break
      case 1:
        // Walls cells
        break
      case 2:
        // Damage cells
        push()
        stroke(225)
        strokeWeight(2)
        fill(255, 0, 0, 150)
        rect(this.x, this.y, this.w, this.h)
        pop()
        break
      case 3:
        // Healing cells
        push()
        stroke(225)
        strokeWeight(2)
        fill(0, 255, 0, 150)
        rect(this.x, this.y, this.w, this.h)
        pop()
        break
      case 4:
        // Transition cell on first map
        push()
        stroke(225)
        strokeWeight(2)
        fill(255, 204, 102, 150)
        rect(this.x, this.y, this.w, this.h)
        pop()
        break
      case 5:
        // Transition cell on second map
        push()
        stroke(225)
        strokeWeight(2)
        fill(255, 204, 102, 150)
        rect(this.x, this.y, this.w, this.h)
        pop()
        break
    }
  }

  hits(player) {
    // Multipliers for the player rectangle make the collisions occur at the correct time
    return collideRectRect(this.x, this.y, this.w, this.h, player.x + (player.w * 0.3), player.y + (this.h / 15), player.w * 0.4, player.h * 0.75)
  }
}