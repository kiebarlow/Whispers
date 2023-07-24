class Enemy {
  constructor(x, y, hp) {
    this.x = x
    this.y = y
    this.w = cellHeight * 0.65
    this.h = cellHeight * 0.95
    // Health variables
    this.maxHealth = hp
    this.health = this.maxHealth
    // Animation variables
    this.frame = 0
    this.maxFrame = 6
  }

  show() {
    // Enemy rendering
    image(enemy, this.x, this.y, this.w, this.h, this.frame * 64, 13 * 65, 65, 60)
    // Enemy health bar rendering
    fill(115)
    stroke(0)
    rect(this.x, this.y, this.w, this.h / 10)
    fill(158, 16, 6)
    rect(this.x, this.y, this.w / this.maxHealth * this.health, this.h / 10)
  }

  animate() {
    // Animation
    if (frameCount % 6 == 0) {
      this.frame = ++this.frame % this.maxFrame
    }
  }

  hits(player) {
    // Multipliers correct player hitbox
    return collideRectRect(this.x, this.y, this.w, this.h * 0.9, (player.x + (player.w * 0.3)), (player.y + (this.w / 15)), player.w * 0.4, player.h * 0.75)
  }
}