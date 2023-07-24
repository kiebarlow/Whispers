// Defines all variables for the level to be drawn
let level = []
let levelSize = 8
let cellWidth
let cellHeight
// Defines all variables needed for the player character to work
let p
// Menu system variable
let gameState = 'mainMenu'
// Menu buttons
// Start the game from main menu
let startBut
// Options button from main menu
let optionsBut
// Credits button on main menu
let creditBut
// Back button on credit menu
let credBackBut
// Back button on options menu for main menu
let mainOptBackBut
// Back button on options menu in game 
let gameOptBackBut
// Main menu button on options in game
let gameOptMainBut
// Grid toggle button on options in game
let gameOptGridBut
// Options buttons main menu
let mainOptGridBut
let mainOptGenderBut
// Change gender button on options in game
let gameOptGenderBut
let characterGender = 'male'
// Death screen credits
let deadCredBut
// Death screen restart
let deadRestartBut
// Death screen return to main menu
let daedMainBut
// Defines inventory variables
let inventory
let currentSlot = 1
let tempKey
let axe
let apple
// Using up items
let oneSecond
let appleInUse = false
// Items spawning
let appleOne
let appleTwo
let appleThree
// Showing grid variable
let gridShow = false
// Current map variable
let currentMap = 1
// Enemy object
let e
// Player attacking
let attacking = false

// Hard coded levels / maps
let levelArrayOne = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 3, 1, 0, 2, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 4],
  [1, 0, 0, 0, 1, 1, 0, 1],
  [1, 1, 0, 0, 1, 1, 0, 1],
  [1, 2, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]
]
let levelArrayTwo = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 1, 0, 1, 0, 1],
  [1, 2, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 1],
  [5, 0, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]
]


// Preload any images used
let maleSprite
let maleSpriteWeapon
let femaleSprite
let femaleSpriteWeapon
let enemy
let hearts
let forestBG
let mainBG
let mainBGOver
let optionsBG
let secondBG
let secondBGOver
let deadBG
// Preload font
let spookyFont
function preload() {
  // Font
  spookyFont = loadFont('HennyPenny-Regular.ttf')
  // Character sprites
  maleSprite = loadImage('images/spriteSheets/male.png')
  maleSpriteWeapon = loadImage('images/spriteSheets/maleWeapon.png')
  femaleSprite = loadImage('images/spriteSheets/female.png')
  femaleSpriteWeapon = loadImage('images/spriteSheets/femaleWeapon.png')
  enemy = loadImage('images/spriteSheets/enemy.png')
  // Health hearts images
  hearts = loadImage('images/spriteSheets/heartSprite.png')
  // Backgrounds
  forestBG = loadImage('images/backgrounds/forest.png')
  mainBG = loadImage('images/backgrounds/forestMap.png')
  mainBGOver = loadImage('images/backgrounds/forestMapOver.png')
  optionsBG = loadImage('images/backgrounds/spooky.png')
  secondBG = loadImage('images/backgrounds/bossMap.png')
  secondBGOver = loadImage('images/backgrounds/bossMapOver.png')
  deadBG = loadImage('images/backgrounds/deadScreen.png')
  //Inventory item images
  axe = loadImage('images/axe.png')
  apple = loadImage('images/apple.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  textFont(spookyFont)

  // Defining inventory
  inventory = [axe, apple]

  // Set frame rate to suitable rate for animation
  frameRate(60)

  // Creating level as objects.
  cellWidth = width / levelSize
  cellHeight = height / levelSize

  // Creating the player character as an object.
  p = new Player(cellWidth * 2, cellHeight)

  // Intialise level one
  initLevelOne()
}

function reset() {
  // Reset inventory
  inventory.splice(0, inventory.length)
  inventory = [axe, apple]
  // Remaking player
  p = new Player(cellWidth * 2, cellHeight)
  currentMap = 1
  initLevelOne()
}


function initLevelOne() {
  if (currentMap == 2) {
    p.x = cellWidth * 6.5
    p.y = cellHeight * 2
  }
  level.splice(0, level.length)
  currentMap = 1
  // Creating the level objects 
  for (i = 0; i < levelSize; i++) {
    for (j = 0; j < levelSize; j++) {
      level.push(new Cells(i * cellWidth, j * cellHeight, levelArrayOne[j][i]))
    }
  }

  // Adding items to map
  appleOne = new Item(cellWidth * 1.25, cellHeight * 2.25, apple, 'appleOne')
  appleTwo = new Item(cellWidth * 4.25, cellHeight * 1.25, apple, 'appleTwo')
  appleThree = new Item(cellWidth * 1.25, cellHeight * 6.75, apple, 'appleThree')
}

function initLevelTwo() {
  level.splice(0, level.length)
  currentMap = 2
  // Creating the level objects 
  for (i = 0; i < levelSize; i++) {
    for (j = 0; j < levelSize; j++) {
      level.push(new Cells(i * cellWidth, j * cellHeight, levelArrayTwo[j][i]))
    }
  }
  // Changing the players position on the new map
  p.x = cellWidth * 1.25
  p.y = cellHeight * 6

  // Creating the enemy
  e = new Enemy(cellWidth * 5.5, cellHeight * 3, 10)
}


function draw() {
  // Main menu rendering
  if (gameState == 'mainMenu') {
    background(0, 102, 153)
    image(forestBG, 0, 0, width, height)

    // Defining the buttons
    startBut = new Button(width * 0.2, height * 0.33, 'Start')
    mainOptBut = new Button(width * 0.2, height * 0.5, 'Options')
    creditBut = new Button(width * 0.2, height * 0.66, 'Credits')

    // Showing buttons
    startBut.show()
    mainOptBut.show()
    creditBut.show()
    push()
    textAlign(CENTER)
    fill(255)
    // Main title
    textSize(height / 7.5)
    text('Whispers', width / 2, height / 5)
    pop()

  }

  // Main options menu rendering
  if (gameState == 'mainOptions') {
    image(optionsBG, 0, 0, width, height)
    // defining buttons
    mainOptBackBut = new Button(width / 2, height * 0.8, '<- Back')
    mainOptGridBut = new Button(width / 2, height * 0.4, 'Show Grid')
    mainOptGenderBut = new Button(width / 2, height * 0.6, characterGender)
    // Showing buttons
    mainOptGridBut.show()
    mainOptGenderBut.show()
    mainOptBackBut.show()
    // Options title
    push()
    noStroke()
    textAlign(CENTER)
    fill(255)
    textSize(height / 8)
    text('Options', width / 2, height / 5)
    pop()
  }

  // Credits screen rendering
  if (gameState == 'credits') {
    image(forestBG, 0, 0, width, height)
    // Back button definition and showing
    credBackBut = new Button(width * 0.1, height * 0.9, '<- Back')
    credBackBut.show()
    push()
    textAlign(CENTER)
    fill(255)
    // Credits title
    textSize(height / 7.5)
    text('Credits', width / 2, height / 5)
    // Credits text
    textSize(height / 15)
    text('Developed by Kieran Barlow', width / 2, height * 0.4)
    text('Dedicated to: ', width / 2, height * 0.6)
    text('Grandad (Kevin Ward)', width / 2, height * 0.75)
    pop()
  }

  // In-game options menu rendering
  if (gameState == 'gameOptions') {
    image(optionsBG, 0, 0, width, height)
    // Defining buttons
    gameOptBackBut = new Button(width / 2, height * 0.2, 'Return')
    gameOptMainBut = new Button(width / 2, height * 0.8, 'Main Menu')
    gameOptGridBut = new Button(width / 2, height * 0.4, 'Show Grid')
    gameOptGenderBut = new Button(width / 2, height * 0.6, characterGender)
    // Buttons showing
    gameOptMainBut.show()
    gameOptBackBut.show()
    gameOptGridBut.show()
    gameOptGenderBut.show()
  }

  // Death screen rendering
  if (gameState == 'dead') {
    image(deadBG, 0, 0, width, height)
    // Defining buttons
    deadRestartBut = new Button(width / 2, height * 0.33, 'Restart')
    deadMainBut = new Button(width / 2, height * 0.5, 'Main Menu')
    deadCredBut = new Button(width / 2, height * 0.66, 'Credits')
    // Showing buttons
    deadCredBut.show()
    deadRestartBut.show()
    deadMainBut.show()
    // Text on death screen
    push()
    noStroke()
    textAlign(CENTER)
    fill(0)
    textSize(height / 6.5)
    text('You died', width / 2, height / 5)
    pop()

    // Stopping apple from increasing health
    if (appleInUse) {
      clearInterval(oneSecond)
      appleInUse = false
    }
  }

  // Game rendering
  if (gameState == 'play') {
    // Checking to see if the player is dead
    if (p.health <= 0) {
      gameState = 'dead'
    }
    // Map background showing
    if (currentMap == 1) {
      image(mainBG, 0, 0, width, height)
    } else if (currentMap == 2) {
      image(secondBG, 0, 0, width, height)
    }

    // Updating the player
    if (mouseIsPressed && inventory[currentSlot - 1] == axe) {
      p.attack()
    } else {
      p.update()
    }

    // Rendering the map
    for (i = 0; i < level.length; i++) {
      if (gridShow) {
        level[i].show()
      }
      // Collision detection
      if (level[i].hits(p)) {
        switch (level[i].type) {
          case 1:
            // Actual collision results
            p.setPos()
            p.stop()
            break
          case 2:
            // Decrease health
            if (p.health > 0 && (frameCount % 60 == 0)) {
              p.health--
            }
            break
          case 3:
            // Increase health
            if (p.health < p.maxHealth && (frameCount % 60 == 0)) {
              p.health++
            }
            break
          case 4:
            // Change level to level two
            initLevelTwo()
            break
          case 5:
            // Change level to level two
            initLevelOne()
            break
        }
      }
    }

    if (currentMap == 1) {
      // Rendering the items on map
      if (appleOne != null) {
        appleOne.show()
        if (appleOne.hits(p)) {
          appleOne.check()
        }
      }
      if (appleTwo != null) {
        appleTwo.show()
        if (appleTwo.hits(p)) {
          appleTwo.check()
        }
      }
      if (appleThree != null) {
        appleThree.show()
        if (appleThree.hits(p)) {
          appleThree.check()
        }
      }
    }

    // Rendering the player
    p.render()

    //Rendering the enemy
    if (currentMap == 2 && e != 0) {
      e.show()
      // Enemy collision detection
      if (e.hits(p)) {
        // Decrease health
        e.animate()
        if (p.health > 0 && (frameCount % 60 == 0)) {
          p.health--
        }
        // Checks if the player is attacking
        if (attacking) {
          if (e.health > 0 && frameCount % 30 == 0) {
            e.health--
          } else if (e.health == 0) {
            e = 0
          }
        }
      }
    }

    // Map overlays
    if (currentMap == 1) {
      image(mainBGOver, 0, 0, width, height)
    } else if (currentMap == 2) {
      image(secondBGOver, 0, 0, width, height)
    }

    // Rendering the inventory bar in the game 
    let invWidth = width / 18
    for (let s = 0; s < 10; s++) {
      if (currentSlot == s + 1) {
        strokeWeight(3)
        stroke(255)
      } else {
        strokeWeight(1)
        stroke(175)
      }
      fill(125, 100)
      rect((s + 4) * invWidth, height * 0.88, invWidth, invWidth)
    }

    // Rendering images in inventory bar
    for (let i = 0; i < inventory.length; i++) {
      image(inventory[i], (i + 4) * invWidth, height * 0.88, invWidth, invWidth)
    }
  }

}

// Stopping the player character when key is released
function keyReleased() {
  p.stop()
}

// Checking to see if the mouse has been clicked
// Can be used for buttons and attacking 
function mouseClicked() {
  // For buttons on the main menu
  if (gameState == 'mainMenu') {
    if (startBut.check()) {
      gameState = 'play'
    } else if (mainOptBut.check()) {
      gameState = 'mainOptions'
    } else if (creditBut.check()) {
      gameState = 'credits'
    }
  }

  // For buttons on credits menu
  if (gameState == 'credits') {
    if (credBackBut.check()) {
      gameState = 'mainMenu'
    }
  }

  // For buttons on main options menu
  if (gameState == 'mainOptions') {
    if (mainOptBackBut.check()) {
      gameState = 'mainMenu'
    } else if (mainOptGridBut.check()) {
      gridTog()
    } else if (mainOptGenderBut.check()) {
      genderTog()
    }
  }

  // For buttons on game options menu
  if (gameState == 'gameOptions') {
    if (gameOptBackBut.check()) {
      gameState = 'play'
    } else if (gameOptMainBut.check()) {
      gameState = 'mainMenu'
    } else if (gameOptGridBut.check()) {
      gridTog()
    } else if (gameOptGenderBut.check()) {
      genderTog()
    }
  }

  // For buttons on death screen
  if (gameState == 'dead') {
    if (deadRestartBut.check()) {
      reset()
      gameState = 'play'
    } else if (deadMainBut.check()) {
      gameState = 'mainMenu'
    } else if (deadCredBut.check()) {
      gameState = 'credits'
    }
  }

  // For item use in the game
  if (gameState == 'play') {
    switch (inventory[currentSlot - 1]) {
      case apple:
        //Checks whether health is full or apple currently in use
        if ((p.health >= p.maxHealth) || appleInUse) {
          console.log('not now')
        } else {
          healthIncCheck()
          // Remove item from inventory array
          inventory.splice(currentSlot - 1, 1)
        }
        break
      case axe:
        console.log('axe click')
        break
    }
  }
}


function keyPressed() {

  switch (gameState) {
    case 'play':
      // Check whether 'ESC' is being pressed
      if (keyCode == 27) {
        gameState = 'gameOptions'
      }

      // Changing the inventory slots
      tempKey = key
      if (keyCode >= 48 && keyCode <= 58) {
        if (tempKey == 0) {
          tempKey = 10
        }
        currentSlot = tempKey
      }
      break
    case 'gameOptions':
      if (keyCode == 27) {
        gameState = 'play'
      }
      break
    case 'credits':
      if (keyCode == 27) {
        gameState = 'mainMenu'
      }
      break
    case 'mainOptions':
      if (keyCode == 27) {
        gameState = 'mainMenu'
      }
      break
  }
}

// Setting apple to increase health
function healthIncCheck() {
  appleInUse = true
  // Starts increasing health every second
  oneSecond = setInterval(healthInc, 1000)
}

// Incrementing the players health
function healthInc() {
  if (p.health < p.maxHealth) {
    p.health++
  } else if (p.health >= p.maxHealth) {
    // Stop apple when health is full
    clearInterval(oneSecond)
    appleInUse = false
  }
}

// Adding objects to the inventory
function inventoryAdd(item) {
  if (inventory.length < 10) {
    inventory.push(item)
  } else {
    console.log('inventory full')
  }
}

// Toggling grid
function gridTog() {
  if (gridShow) {
    gridShow = false
  } else {
    gridShow = true
  }
}

// Toggling character gender
function genderTog() {
  if (characterGender == 'male') {
    characterGender = 'female'
  } else if (characterGender == 'female') {
    characterGender = 'male'
  }
}