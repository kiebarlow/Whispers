class Player {
  constructor(x, y) {
    this.x = x
    this.y = y

    // Player parameneters
    this.w = cellHeight * 0.65
    this.h = cellHeight * 0.95

    // For player movement, velocities are needed
    this.xVel = 0
    this.yVel = 0

    // Animations
    this.direction = 10 // 8 up, 9 left, 10 down, 11 right
    this.maxFrame = 8 // Number of frames for walking
    this.frame = 0
    this.animType = 'walk'
    this.facing = 10

    // Health
    this.maxHealth = 10
    this.health = this.maxHealth

    // Setting the sprite gender
    this.currentSprite = maleSprite
  }

  update() {
    if (this.animType == 'attack') {
      this.walk()
    }
    this.changeSprite()
    // Movement
    this.xVel = 0
    this.yVel = 0
    // Up
    if (keyIsDown(87)) {
      this.facing = 8
      this.yVel = -0.75
    }
    // Down
    if (keyIsDown(83)) {
      this.facing = 10
      this.yVel = 0.75
    }
    // Left
    if (keyIsDown(65)) {
      this.facing = 9
      this.xVel = -0.75
    }
    // Right
    if (keyIsDown(68)) {
      this.facing = 11
      this.xVel = 0.75
    }

    // Change the direction
    this.direction = this.facing

    // Chaning the current frame
    if (frameCount % 4 == 0) {
      if (this.xVel || this.yVel != 0) {
        this.frame = ++this.frame % this.maxFrame
      }

    }

    // Moving the character
    this.x += this.xVel
    this.y += this.yVel

  }

  // Resetting players position if colliding with walls
  setPos() {
    if (this.xVel != 0) {
      this.x += -this.xVel
    }
    if (this.yVel != 0) {
      this.y += -this.yVel
    }
  }

  // Stopping player from moving
  stop() {
    this.xVel = 0
    this.yVel = 0
  }

  // rendering player
  render() {
    fill(0)
    push()
    imageMode(CORNER)
    image(this.currentSprite, this.x, this.y, this.w, this.h, this.frame * 64, this.direction * 65, 65, 60)
    pop()

    // Health displayed in hearts
    image(hearts, cellHeight / 2, cellHeight / 3, cellHeight * 3, cellHeight / 2, 0, (this.maxHealth - this.health) * 87, 500, 85)
  }

  // Sprite sheet changing to the correct one
  changeSprite() {
    if (characterGender == 'male') {
      if (inventory[currentSlot - 1] == axe) {
        this.currentSprite = maleSpriteWeapon
      } else {
        this.currentSprite = maleSprite
      }
    } else {
      if (inventory[currentSlot - 1] == axe) {
        this.currentSprite = femaleSpriteWeapon
      } else {
        this.currentSprite = femaleSprite
      }
    }
  }

  // Attacking function
  attack() {
    this.animType = 'attack'
    this.maxFrame = 5
    attacking = true
    if (frameCount % 6 == 0) {
      this.direction = this.facing + 4
      this.frame = ++this.frame % this.maxFrame
    }
  }

  // Walking regularly function
  walk() {
    this.animType = 'walk'
    this.maxFrame = 8
    attacking = false
  }

}