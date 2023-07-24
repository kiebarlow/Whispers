 class Button {
  constructor(x, y, t) {
    this.x = x
    this.y = y
    this.text = t
    this.w = width / 5
    this.h = height / 10
    this.hover = false
    this.r
    this.g
    this.b
  }

  show() {
    // Checks whether the mouse is over the button
    // Checks x coordinates
    if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2) {
      // Checks y coordinates
      if (mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
        // If the players mouse is within button area, true is returned
        this.hover = true
      } else {
        this.hover = false
      }
    } else {
      this.hover = false
    }
    push()
    // Rectmode for positions
    rectMode(CENTER)
    // The text in the button
    if (gridShow && (this.text == 'Show Grid')) {
      this.r = 5
      this.g = 115
      this.b = 1
    } else if (!gridShow && (this.text == 'Show Grid')) {
      this.r = 115
      this.g = 7
      this.b = 1
    } else if (gameState == 'dead') {
      this.r = 0
      this.g = 0
      this.b = 0
    } else {
      this.r = 255
      this.g = 255
      this.b = 255
    }
    // Checking if mouse is hovering over button
    if (this.hover) {
      strokeWeight(2)
      stroke(this.r, this.g, this.b)
    } else {
      noStroke()
    }
    fill(this.r, this.g, this.b)
    textAlign(CENTER, TOP)
    textSize((this.w + this.h) / 8)
    text(this.text, this.x, this.y, this.w, this.h)
    pop()
  }

  check() {
    //Checks x coordinates
    if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2) {
      // Checks y coordinates
      if (mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
        // If the players mouse is within button area, true is returned.
        return (true)
      }
    }
  }
}