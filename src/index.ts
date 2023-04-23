import "./styles/main.scss";

const canvas = document.getElementById("canvas1") as HTMLCanvasElement;

// Game constants
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 50;
const ADD_ENEMY_INTERVAL = 1000; // in ms
const ENEMY_LIVES = 3;

const PROJECTILE_HEIGHT = 3;
const PROJECTILE_WIDTH = 10;
const PROJECTILE_AMMO_COUNT = 20;
const MAX_PROJECTILE_AMMO_COUNT = 50;
const PROJECTILE_AMMO_REFRESH_INTERVAL = 5000; // in ms
const PROJECTILE_AMMO_REFRESH_COUNT = 2; // increase projectile ammo by 2 every 500ms

const WINNING_SCORE = 6 0;
const GAME_TIMER_LIMIT = 100000; // in ms
const GAME_CANVAS_WIDTH = 1000;
const GAME_CANVAS_HEIGHT = 500;

// Keyboard inputs
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const SHOOT_PROJECTILE = " ";
const TOGGLE_GAME_DEBUG_MODE = "d";

// load event
window.addEventListener("load", () => {
  // canvas setup
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = GAME_CANVAS_WIDTH;
  canvas.height = GAME_CANVAS_HEIGHT;

  // handling keyboard inputs
  class KeyboardInputHandler {
    game: Game;

    constructor(game: Game) {
      this.game = game;

      // Logic for keeping track of presses and releases of keyboard inputs
      // When a key is pressed, and the key has not been already registered in the keys queue in the main game object
      // Register/store the key in the keys queue of the main game object
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === ARROW_UP || e.key === ARROW_DOWN) &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        } else if (e.key === SHOOT_PROJECTILE) {
          this.game.player.shootTop();
        } else if (e.key === TOGGLE_GAME_DEBUG_MODE) {
          this.game.gameDebugMode = !this.game.gameDebugMode;
        }
        //console.log(this.game.keys);
      });

      // When the key is released, remove the key from the keys queue of the main game object
      window.addEventListener("keyup", (e) => {
        if (this.game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }
      });
    }
  }

  // for creating particles that fall off and bounce when the enemy is hit
  class Particle {
    game: Game;
    x: number;
    y: number;
    spriteImage: HTMLImageElement;
    frameX: number;
    frameY: number;
    spriteSize: number;
    sizeModifier: number;
    size: number; // modified particle size
    speedX: number;
    speedY: number;
    gravity: number;
    markedForDeletion: boolean;
    angle: number;
    va: number; // velocity of angle
    bounced: number;
    bottomBounceBoundary: number;

    constructor(game: Game, x: number, y: number) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.spriteImage = document.getElementById("gears") as HTMLImageElement;
      this.frameX = Math.floor(Math.random() * 3); // row number in the sprite image
      this.frameY = Math.floor(Math.random() * 3); // column number in the sprite image
      this.spriteSize = 50;
      this.sizeModifier = Number((Math.random() * 0.5 + 0.5).toFixed(1));
      this.size = this.sizeModifier * this.spriteSize;
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * -15;
      this.gravity = 0.5;
      this.markedForDeletion = false;
      this.angle = 0;
      this.va = Math.random() * 0.2 - 0.1;
      this.bounced = 0; // keeping track of how many times the particle has bounced
      this.bottomBounceBoundary = Math.random() * 100 + 60;
    }

    /**
     * Update the position of the particle
     */
    update() {
      this.angle += this.va;
      this.speedY += this.gravity;
      this.x -= this.speedX;
      this.y += this.speedY;

      // flag the particle for deletion if it falls off screen (vertically or horizontally)
      if (this.y > this.game.height + this.size || this.x < 0 - this.size) {
        this.markedForDeletion = true;
      }

      // for creating the bouncing effect
      if (
        this.y > this.game.height - this.bottomBounceBoundary &&
        this.bounced < 2
      ) {
        this.bounced++;
        this.speedY *= -0.5;
      }
    }

    /**
     * Draw the particle sprite on the canvas
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      context.save();

      // to rotate the particle
      context.translate(this.x, this.y);
      context.rotate(this.angle);

      context.drawImage(
        this.spriteImage,
        this.frameX * this.spriteSize,
        this.frameY * this.spriteSize,
        this.spriteSize,
        this.spriteSize,
        0,
        0,
        this.size,
        this.size
      );
      //   context.drawImage(
      //     this.spriteImage,
      //     this.frameX * this.spriteSize,
      //     this.frameY * this.spriteSize,
      //     this.spriteSize,
      //     this.spriteSize,
      //     this.x,
      //     this.y,
      //     this.size,
      //     this.size
      //   );
      context.restore();
    }
  }

  // Creating projectiles (projectiles will be spawned from players for shooting enemies)
  class Projectile {
    game: Game;
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    markedForDeletion: boolean;
    spriteImage: HTMLImageElement;

    /**
     *
     * @param game
     * @param x // starting x position of the projectile
     * @param y // starting y position of the projectile
     * @param width // projectile width
     * @param height // projectile height
     * @param markedForDeletion // flag the projectile object for removal from the game when it crosses out the game canvas
     */
    constructor(game: Game, x: number, y: number) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = PROJECTILE_WIDTH;
      this.height = PROJECTILE_HEIGHT;
      this.speed = 3;
      this.markedForDeletion = false;
      this.spriteImage = document.getElementById(
        "projectile"
      ) as HTMLImageElement;
    }

    /**
     * Update the projectile's x-position
     */
    update() {
      this.x += this.speed;
      if (this.x > this.game.width * 0.8) {
        // flag the projectile for deletion
        this.markedForDeletion = true;
      }
    }

    /**
     * Draw the projectile object on the game canvas
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      //   context.fillStyle = "yellow";
      //   context.fillRect(this.x, this.y, this.width, this.height);

      // draw the projectile sprite image
      context.drawImage(this.spriteImage, this.x, this.y);
    }
  }

  interface IGameSprite {
    x: number;
    y: number;
    width: number;
    height: number;
    game: Game;
    update: (deltaTime?: number) => void;
    draw: (context: CanvasRenderingContext2D) => void;
  }

  class Player implements IGameSprite {
    game: Game;
    width: number;
    height: number;
    x: number;
    y: number;
    speedY: number;
    maxSpeed: number;
    projectiles: Array<Projectile>;
    // for the sprite animation
    frameX: number;
    frameY: number;
    frameCount: number;
    spriteImage: HTMLImageElement;
    powerUp: boolean;
    powerUpTimer: number;
    powerUpTimerLimit: number;

    /**
     *
     * @param game
     */
    constructor(game: Game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.speedY = 0;
      this.maxSpeed = 3;
      this.projectiles = []; // queue for keeping track of the projectiles
      this.frameX = 0;
      this.frameY = 0;
      this.frameCount = 37;
      this.spriteImage = document.getElementById("player") as HTMLImageElement;
      this.powerUp = false;
      this.powerUpTimer = 3000;
      this.powerUpTimerLimit = 6000;
    }

    /**
     * Update the position of the player object
     */
    update(deltaTime?: number) {
      if (this.game.keys.includes(ARROW_UP)) {
        this.speedY = -this.maxSpeed;
      } else if (this.game.keys.includes(ARROW_DOWN)) {
        this.speedY = this.maxSpeed;
      } else {
        this.speedY = 0;
      }
      this.y += this.speedY;

      // vertical boundaries for the projectile
      if (this.y > this.game.height - this.height * 0.5) {
        this.y = this.game.height - this.height * 0.5;
      } else if (this.y < -this.height * 0.5) {
        this.y = -this.height * 0.5;
      }

      // handle the projectiles
      this.projectiles.forEach((projectile) => projectile.update());
      // clear projectiles that have been marked for deletion from the projectiles store
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      );

      // sprite animation: cycling between frames in the sprite image horizontally
      if (this.frameX < this.frameCount) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }

      // handling power up
      if (this.powerUp) {
        if (this.powerUpTimer > this.powerUpTimerLimit) {
          this.powerUpTimer = 0;
          this.powerUp = false;
          this.frameY = 0;
        } else {
          this.powerUpTimer += Number(deltaTime);
          this.frameY = 1;
          this.game.ammo += 0.1;
        }
      }
    }

    /**
     * Player attack mode for shooting projectiles from the top
     */
    shootTop() {
      if (this.game.ammo > 0) {
        // register the projectile in the projectiles queue
        this.projectiles.push(
          new Projectile(this.game, this.x + 80, this.y + 30)
        );
        this.game.ammo--; // reduce the player's ammo
      }
      // also shoot from bottom if the player is in power-up mode
      if (this.powerUp) {
        this.shootBottom();
      }
    }

    /**
     * Player attack mode for shooting projectiles from tail
     */
    shootBottom() {
      if (this.game.ammo > 0) {
        // register the projectile
        this.projectiles.push(
          new Projectile(this.game, this.x + 80, this.y + 175)
        );
        this.game.ammo--; //reduce the player's ammo
      }
    }

    /**
     * Enter power up mode
     */
    enterPowerupMode() {
      this.powerUpTimer = 0;
      this.powerUp = true;
      this.game.ammo = this.game.maxAmmo;
    }

    /**
     * Draw the player on the canvas 2D context
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      context.fillStyle = "black";
      if (this.game.gameDebugMode) {
        context.strokeRect(this.x, this.y, this.width, this.height);
      }
      context.drawImage(
        this.spriteImage,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

      // rendering the projectiles
      this.projectiles.forEach((projectile) => projectile.draw(context));
    }
  }

  class Enemy implements IGameSprite {
    x: number;
    y: number;
    markedForDeletion: boolean;
    speedX: number;
    width: number;
    height: number;
    lives: number;
    score: number;
    game: Game;
    // for sprite animation
    frameX: number;
    frameY: number;
    frameCount: number;
    type: string;

    constructor(game: Game) {
      this.game = game;
      this.width = ENEMY_WIDTH;
      this.height = ENEMY_HEIGHT;
      this.x = this.game.width;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.speedX = Math.random() * -1.5 - 0.5;
      this.markedForDeletion = false;
      this.lives = ENEMY_LIVES;
      this.score = this.lives;
      this.frameX = 0;
      this.frameY = 0;
      this.frameCount = 37;
      this.type = "";
    }

    /**
     * Update the enemy's x-position
     */
    update() {
      this.x += this.speedX - this.game.speed;
      // check if the enemy has moved completely off the game screen
      if (this.x + this.width < 0) {
        this.markedForDeletion = true;
      }

      // sprite animation
      if (this.frameX < this.frameCount) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }

    draw(context: CanvasRenderingContext2D) {}
  }

  class Angler1 extends Enemy {
    y: number;
    spriteImage: HTMLImageElement;

    constructor(game: Game) {
      super(game); // ensure that the constructor on the parent gets executed
      this.width = 228;
      this.height = 169;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.score = 2;
      this.spriteImage = document.getElementById("angler1") as HTMLImageElement;
      this.type = "angler1";
    }

    /**
     * Draw the enemy object on the game canvas
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      if (this.game.gameDebugMode) {
        context.strokeRect(this.x, this.y, this.width, this.height);
      }

      // draw the sprite image
      context.drawImage(
        this.spriteImage,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

      // display the enemy live
      context.fillStyle = "black";
      context.font = "20px Helvetica";
      if (this.game.gameDebugMode) {
        context.fillText(`${this.lives}`, this.x, this.y);
      }
    }
  }

  class Angler2 extends Enemy {
    y: number;
    spriteImage: HTMLImageElement;
    constructor(game: Game) {
      super(game); // ensure that the constructor on the parent gets executed
      this.width = 213;
      this.height = 165;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.score = 2;
      this.spriteImage = document.getElementById("angler2") as HTMLImageElement;
      this.type = "angler2";
    }

    /**
     * Draw the enemy object on the game canvas
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      if (this.game.gameDebugMode) {
        context.strokeRect(this.x, this.y, this.width, this.height);
      }

      // draw the sprite image
      context.drawImage(
        this.spriteImage,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

      // display the enemy live
      context.fillStyle = "black";
      context.font = "20px Helvetica";

      if (this.game.gameDebugMode) {
        context.fillText(`${this.lives}`, this.x, this.y);
      }
    }
  }

  class LuckyFish extends Enemy {
    y: number;
    spriteImage: HTMLImageElement;
    constructor(game: Game) {
      super(game); // ensure that the constructor on the parent gets executed
      this.width = 99;
      this.height = 95;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.score = 3;
      this.spriteImage = document.getElementById("lucky") as HTMLImageElement;
      this.type = "lucky";
    }

    /**
     * Draw the enemy (lucky fish) object on the game canvas
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      if (this.game.gameDebugMode) {
        context.strokeRect(this.x, this.y, this.width, this.height);
      }

      // draw the sprite image
      context.drawImage(
        this.spriteImage,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

      // display the enemy live
      context.fillStyle = "black";
      context.font = "20px Helvetica";

      if (this.game.gameDebugMode) {
        context.fillText(`${this.lives}`, this.x, this.y);
      }
    }
  }

  class HiveWhale extends Enemy {
    y: number;
    spriteImage: HTMLImageElement;
    constructor(game: Game) {
      super(game); // ensure that the constructor on the parent gets executed
      this.width = 400;
      this.height = 227;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.score = 15;
      this.lives = 15;
      this.spriteImage = document.getElementById(
        "hivewhale"
      ) as HTMLImageElement;
      this.type = "hivewhale";
      this.speedX = Math.random() * -0.1 - 0.05;
    }

    /**
     * Draw the enemy (lucky fish) object on the game canvas
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      if (this.game.gameDebugMode) {
        context.strokeRect(this.x, this.y, this.width, this.height);
      }

      // draw the sprite image
      context.drawImage(
        this.spriteImage,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

      // display the enemy live
      context.fillStyle = "black";
      context.font = "20px Helvetica";

      if (this.game.gameDebugMode) {
        context.fillText(`${this.lives}`, this.x, this.y);
      }
    }
  }

  class Drone extends Enemy {
    y: number;
    spriteImage: HTMLImageElement;

    constructor(game: Game, parentX: number, parentY: number) {
      super(game); // ensure that the constructor on the parent gets executed
      this.width = 115;
      this.height = 95;
      this.x = parentX;
      this.y = parentY;
      this.score = 3;
      this.lives = 3;
      this.spriteImage = document.getElementById("drone") as HTMLImageElement;
      this.type = "drone";
      this.speedX = Math.random() * -4.2 - 0.5;
    }

    /**
     * Draw the enemy (lucky fish) object on the game canvas
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      if (this.game.gameDebugMode) {
        context.strokeRect(this.x, this.y, this.width, this.height);
      }

      // draw the sprite image
      context.drawImage(
        this.spriteImage,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

      // display the enemy live
      context.fillStyle = "black";
      context.font = "20px Helvetica";

      if (this.game.gameDebugMode) {
        context.fillText(`${this.lives}`, this.x, this.y);
      }
    }
  }

  // a parallax layer
  class Layer {
    game: Game;
    image: CanvasImageSource;
    speedModifier: number;
    width: number;
    height: number;
    x: number;
    y: number;

    constructor(game: Game, image: CanvasImageSource, speedModifier: number) {
      this.game = game;
      this.image = image;
      this.speedModifier = speedModifier;
      this.width = 1768;
      this.height = 500;
      this.x = 0;
      this.y = 0;
    }

    /**
     * Update the layer's x-position to create a parallax effect
     */
    update() {
      if (this.x <= -this.width) {
        this.x = 0;
      } else {
        this.x -= this.game.speed * this.speedModifier;
      }
    }

    /**
     * Draw the layer on the canvas
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      context.drawImage(this.image, this.x, this.y);
      context.drawImage(this.image, this.x + this.width, this.y);
    }
  }

  // Handle the logic for combining each layer to create the game world
  class Background {
    game: Game;
    image1: HTMLImageElement;
    image2: HTMLImageElement;
    image3: HTMLImageElement;
    image4: HTMLImageElement;
    layer1: Layer;
    layer2: Layer;
    layer3: Layer;
    layer4: Layer;
    layers: Array<Layer>;

    constructor(game: Game) {
      this.game = game;
      this.image1 = document.getElementById("layer1") as HTMLImageElement;
      this.image2 = document.getElementById("layer2") as HTMLImageElement;
      this.image3 = document.getElementById("layer3") as HTMLImageElement;
      this.image4 = document.getElementById("layer4") as HTMLImageElement;
      this.layer1 = new Layer(this.game, this.image1, 0.2);
      this.layer2 = new Layer(this.game, this.image2, 0.3);
      this.layer3 = new Layer(this.game, this.image3, 1);
      this.layer4 = new Layer(this.game, this.image4, 1.3);
      this.layers = [this.layer1, this.layer2, this.layer3];
      // NOTE: layer4 will be a foreground layer
    }

    update() {
      this.layers.forEach((layer) => layer.update());
    }

    draw(context: CanvasRenderingContext2D) {
      this.layers.forEach((layer) => layer.draw(context));
    }
  }

  class Explosion {
    game: Game;
    x: number;
    y: number;
    frameX: number;
    spriteHeight: number;
    fps: number;
    timer: number;
    interval: number;
    markedForDeletion: boolean;
    maxFrame: number;

    constructor(game: Game, x: number, y: number) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.frameX = 0;
      this.spriteHeight = 200;
      this.fps = 30;
      this.timer = 0; // to control the fps for the explosion animation
      this.interval = 1000 / this.fps;
      this.markedForDeletion = false;
      this.maxFrame = 8;
    }

    /**
     * Update the explosion - sprite animation
     * @param deltaTime
     */
    update(deltaTime: number) {
      this.x -= this.game.speed;
      if (this.timer > this.interval) {
        this.frameX++;
        this.timer = 0;
      } else {
        this.timer += deltaTime;
      }

      if (this.frameX > this.maxFrame) {
        this.markedForDeletion = true;
      }
    }

    draw(context: CanvasRenderingContext2D) {}
  }

  class SmokeExplosion extends Explosion {
    spriteImage: HTMLImageElement;
    spriteWidth: number;
    width: number;
    height: number;

    constructor(game: Game, x: number, y: number) {
      super(game, x, y);
      this.spriteImage = document.getElementById(
        "smokeExplosion"
      ) as HTMLImageElement;
      this.spriteWidth = 200;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = x - this.width * 0.5;
      this.y = y - this.height * 0.5;
    }

    draw(context: CanvasRenderingContext2D) {
      context.drawImage(
        this.spriteImage,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class FireExplosion extends Explosion {
    spriteImage: HTMLImageElement;
    spriteWidth: number;
    width: number;
    height: number;

    constructor(game: Game, x: number, y: number) {
      super(game, x, y);
      this.spriteImage = document.getElementById(
        "fireExplosion"
      ) as HTMLImageElement;
      this.spriteWidth = 200;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = x - this.width * 0.5;
      this.y = y - this.height * 0.5;
    }

    draw(context: CanvasRenderingContext2D) {
      context.drawImage(
        this.spriteImage,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  // for drawing/showing messages and statuses on the game
  class UI {
    game: Game;
    fontSize: number;
    fontFamily: string;
    color: string;

    constructor(game: Game) {
      this.game = game;
      this.fontSize = 25;
      this.fontFamily = "Raleway";
      this.color = "white";
    }

    draw(context: CanvasRenderingContext2D) {
      context.save();
      context.fillStyle = this.color;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowColor = "black";
      context.font = `${this.fontSize}px ${this.fontFamily}`;

      // display current game score
      context.fillText(`Score: ${this.game.score}`, 20, 40);

      // display game timer
      const formattedGameTimer = (this.game.gameTimer / 1000).toFixed(1);
      context.fillText(`Timer: ${formattedGameTimer}`, 20, 100);

      // displaying game over messages
      if (this.game.gameOver) {
        context.textAlign = "center";
        let message1;
        let message2;
        if (this.game.score >= WINNING_SCORE) {
          message1 = "You Win!";
          message2 = "Well done explorer.";
        } else {
          message1 = "You Lose!";
          message2 = "Try again next time.";
        }
        // display the first message
        context.font = `75px ${this.fontFamily}`;
        context.fillText(
          message1,
          this.game.width * 0.5,
          this.game.height * 0.5 - 0
        );
        // display the second message
        context.font = `25px ${this.fontFamily}`;
        context.fillText(
          message2,
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        );
      }

      // display player ammo level
      if (this.game.player.powerUp) {
        // draw the ammo level with a different color in power up mode
        context.fillStyle = "yellow";
      }
      for (let i = 0; i < this.game.ammo; i++) {
        context.fillRect(20 + 5 * i, 50, 3, 20);
      }

      context.restore();
    }
  }

  // The brain of the entire project
  class Game {
    width: number;
    height: number;
    player: Player;
    keyboardInput: KeyboardInputHandler;
    keys: Array<string>;
    enemies: Array<Enemy>;
    ammo: number;
    maxAmmo: number;
    ammoTimer: number;
    ammoInterval: number;
    enemyTimer: number;
    enemyInterval: number;
    gameOver: boolean;
    UI: UI;
    score: number;
    gameTimer: number; //accumulates number of milliseconds since the game started
    gameTimerLimit: number;
    speed: number;
    background: Background;
    gameDebugMode: boolean;
    particles: Array<Particle>;
    explosions: Array<Explosion>;

    /**
     * @param width // width of the game canvas
     * @param height // height of the game canvas
     */
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.UI = new UI(this);
      this.keyboardInput = new KeyboardInputHandler(this);
      this.keys = [];
      this.ammo = PROJECTILE_AMMO_COUNT;
      this.maxAmmo = MAX_PROJECTILE_AMMO_COUNT;
      this.ammoInterval = PROJECTILE_AMMO_REFRESH_INTERVAL;
      this.ammoTimer = 0;
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = ADD_ENEMY_INTERVAL;
      this.gameOver = false;
      this.score = 0;
      this.gameTimer = 0;
      this.gameTimerLimit = GAME_TIMER_LIMIT;
      this.speed = 1;
      this.background = new Background(this);
      this.gameDebugMode = false;
      this.particles = [];
      this.explosions = [];
    }

    /**
     * Update the general game state
     * @param deltaTime // time counter from the animation loop
     */
    update(deltaTime: number) {
      // update the game timer
      if (!this.gameOver) {
        this.gameTimer += deltaTime;
      }
      if (this.gameTimer >= this.gameTimerLimit) {
        this.gameOver = true;
      }
      this.player.update(deltaTime);
      // handling ammo refresh periodically
      if (this.ammoTimer < this.ammoInterval) {
        this.ammoTimer += deltaTime;
      } else {
        if (this.ammo < this.maxAmmo) {
          this.ammo += PROJECTILE_AMMO_REFRESH_COUNT;
        }
        this.ammoTimer = 0; //reset the ammo timer
      }

      // handling enemies
      this.enemies.forEach((enemy) => {
        enemy.update();
        console.log(enemy.type, enemy.lives);
        // check for collision between the enemy and player
        if (this.checkCollision(enemy, this.player) && !this.gameOver) {
          enemy.markedForDeletion = true;

          // create a new explosion
          this.addExplosion(enemy);

          // spawn the particle gears when the projectile collides with the enemy
          for (let i = 0; i < enemy.score; i++) {
            this.particles.push(
              new Particle(
                this,
                enemy.x + enemy.width * 0.5,
                enemy.y + enemy.height * 0.5
              )
            );
          }

          if (enemy.type === "lucky") {
            if (!this.player.powerUp) {
              this.player.enterPowerupMode();
            }
          } else {
            this.score--;
          }
        }

        // handling particles
        this.particles.forEach((particle) => particle.update());
        // filter out particles that have been flagged for deletion
        this.particles = this.particles.filter(
          (particle) => !particle.markedForDeletion
        );

        // handling explosions
        this.explosions.forEach((explosion) => explosion.update(deltaTime));
        // filter out explosions that have been flagged for deletion
        this.explosions = this.explosions.filter(
          (explosion) => !explosion.markedForDeletion
        );

        // check collision between projectile and enemy
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            // flag the projectile for deletion
            projectile.markedForDeletion = true;
            if (!this.gameOver) {
              enemy.lives--;
            }
            if (enemy.lives <= 0) {
              // flag the enemy for deletion
              enemy.markedForDeletion = true;

              // create new explosion
              this.addExplosion(enemy);

              // spawn the particle gears when the projectile collides with the enemy
              for (let i = 0; i < enemy.score; i++) {
                this.particles.push(
                  new Particle(
                    this,
                    enemy.x + enemy.width * 0.5,
                    enemy.y + enemy.height * 0.5
                  )
                );
              }

              // spawn the drone enemies if the destroyed enemy is the hivewhale
              if (enemy.type === "hivewhale") {
                // console.log("hivewhale destroyed");
                // spawn five new hive whales
                for (let i = 0; i < 5; i++) {
                  this.enemies.push(
                    new Drone(
                      this,
                      enemy.x + Math.random() * enemy.width,
                      enemy.y + Math.random() * enemy.height * 0.5
                    )
                  );
                }
              }

              // increment the game score by the enemy's score weight
              if (!this.gameOver) {
                this.score += enemy.score;
              }
              if (this.score >= WINNING_SCORE) {
                this.gameOver = true;
              }
            }
          }
        });
      });
      // filter out enemies that have been flagged for deletion
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      // handling periodic creation of enemies
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }

      // update the background
      this.background.update();
      // update layer4 background
      this.background.layer4.update();
    }

    /**
     * Render the player on the canvas
     */
    draw(context: CanvasRenderingContext2D) {
      this.background.draw(context);
      this.player.draw(context);
      this.particles.forEach((particle) => particle.draw(context));
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.explosions.forEach((explosion) => explosion.draw(context));
      this.background.layer4.draw(context);
      // update the UI
      this.UI.draw(context);
    }

    /**
     * Add a new enemy to the enemy store
     */
    addEnemy() {
      // add either an angler1 or angler2 enemy object
      const rand = Math.random();
      if (rand < 0.4) {
        this.enemies.push(new Angler1(this));
      } else if (rand < 0.8) {
        this.enemies.push(new Angler2(this));
      } else if (rand < 0.9) {
        this.enemies.push(new HiveWhale(this));
      } else {
        this.enemies.push(new LuckyFish(this));
      }
    }

    addExplosion(enemy: Enemy) {
      const rand = Math.random();
      if (rand < 0.5) {
        this.explosions.push(
          new SmokeExplosion(
            this,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
      } else {
        this.explosions.push(
          new FireExplosion(
            this,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
      }
    }

    /**
     * To check for collision between two objects i.e. enemy and projectile or enemy and player
     */
    checkCollision(rect1: IGameSprite, rect2: IGameSprite) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
      );
    }
  }

  // initialize the game object
  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0; // for handling periodic events logic

  // animation loop: usually 60fps
  const animate = (timeStamp: number) => {
    const deltaTime = timeStamp - lastTime; // difference between the timestamp of the current loop and the previous loop (i.e. time between frames)
    lastTime = timeStamp; // update the "lastTime"
    // delete all canvas drawings between each animation frame loop
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  };

  animate(0);
});

// Note:
// Objects in JavaScript are reference data-types and unlike primitive data-types, they are dynamic in nature
// Inheritance - where all child classes inherit the properties and methods of a parent class can be used to reduce code duplication
// particle effects and physics
