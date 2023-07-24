class Item {
  constructor(x, y, t, n) {
    this.x = x
    this.y = y
    this.t = t
    this.n = n
    this.r = (cellHeight + cellWidth) / 8
  }

  show() {
    // Rendering item image
    image(this.t, this.x, this.y, this.r, this.r)
  }

  hits(player) {
    // Multipliers correct player hitbox
    return collideRectRect(this.x, this.y, this.r, this.r, (player.x + (player.w * 0.3)), (player.y + (this.r / 15)), player.w * 0.4, player.h * 0.75)
  }

  check() {
    // Checks for 'E' key
    if (keyIsDown(69)) {
      inventoryAdd(this.t)
      if (this.n == 'appleOne') {
        appleOne = null
      } else if (this.n == 'appleTwo') {
        appleTwo = null
      } else if (this.n == 'appleThree') {
        appleThree = null
      }
    }
  }
}