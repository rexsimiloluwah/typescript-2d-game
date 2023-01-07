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

const WINNING_SCORE = 20;
const GAME_TIMER_LIMIT = 10000; // in ms

// Keyboard inputs
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const SHOOT_PROJECTILE = " ";

// load event
window.addEventListener("load", () => {
  // canvas setup
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = 500;
  canvas.height = 500;

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

  // Creating projectiles (projectiles will be spawned from players for shooting enemies)
  class Projectile {
    game: Game;
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    markedForDeletion: boolean;

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
      context.fillStyle = "yellow";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  interface IGameSprite {
    x: number;
    y: number;
    width: number;
    height: number;
    game: Game;
    update: () => void;
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
    }

    /**
     * Update the position of the player object
     */
    update() {
      if (this.game.keys.includes(ARROW_UP)) {
        this.speedY = -this.maxSpeed;
      } else if (this.game.keys.includes(ARROW_DOWN)) {
        this.speedY = this.maxSpeed;
      } else {
        this.speedY = 0;
      }
      this.y += this.speedY;
      // handle the projectiles
      this.projectiles.forEach((projectile) => projectile.update());
      // clear projectiles that have been marked for deletion from the projectiles store
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      );
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
    }

    /**
     * Draw the player on the canvas 2D context
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
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
    }

    /**
     * Update the enemy's x-position
     */
    update() {
      this.x += this.speedX;
      // check if the enemy has moved completely off the game screen
      if (this.x + this.width < 0) {
        this.markedForDeletion = true;
      }
    }

    draw(context: CanvasRenderingContext2D) {}
  }

  class Angler1 extends Enemy {
    y: number;

    constructor(game: Game) {
      super(game); // ensure that the constructor on the parent gets executed
      this.width = 228 * 0.3;
      this.height = 169 * 0.3;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.score = 2;
    }

    /**
     * Draw the enemy object on the game canvas
     * @param context
     */
    draw(context: CanvasRenderingContext2D) {
      context.fillStyle = "red";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.fillStyle = "black";
      context.font = "20px Helvetica";
      context.fillText(`${this.lives}`, this.x, this.y);
    }
  }

  class Layer {}

  class Background {}

  // for drawing/showing messages and statuses on the game
  class UI {
    game: Game;
    fontSize: number;
    fontFamily: string;
    color: string;

    constructor(game: Game) {
      this.game = game;
      this.fontSize = 25;
      this.fontFamily = "Helvetica";
      this.color = "white";
    }

    draw(context: CanvasRenderingContext2D) {
      context.save();
      context.fillStyle = this.color;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowColor = "black";
      context.font = `${this.fontSize}px ${this.fontFamily}`;

      // display player ammo level
      context.fillStyle = this.color;
      for (let i = 0; i < this.game.ammo; i++) {
        context.fillRect(20 + 5 * i, 50, 3, 20);
      }

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
        if (this.game.score > WINNING_SCORE) {
          message1 = "You Win!";
          message2 = "Well done.";
        } else {
          message1 = "You Lose!";
          message2 = "Try again next time.";
        }
        // display the first message
        context.font = `50px ${this.fontFamily}`;
        context.fillText(
          message1,
          this.game.width * 0.5,
          this.game.height * 0.5 - 40
        );
        // display the second message
        context.font = `25px ${this.fontFamily}`;
        context.fillText(
          message2,
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        );
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
      if (this.gameTimer > this.gameTimerLimit) {
        this.gameOver = true;
      }
      this.player.update();
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
        // check for collision between the enemy and player
        if (this.checkCollision(enemy, this.player)) {
          enemy.markedForDeletion = true;
        }
        // check collision between projectile and enemy
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            // flag the projectile for deletion
            projectile.markedForDeletion = true;
            enemy.lives--;
            if (enemy.lives <= 0) {
              // flag the enemy for deletion
              enemy.markedForDeletion = true;
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
    }

    /**
     * Render the player on the canvas
     */
    draw(context: CanvasRenderingContext2D) {
      this.player.draw(context);
      // update the UI
      this.UI.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
    }

    /**
     * Add a new enemy to the enemy store
     */
    addEnemy() {
      this.enemies.push(new Angler1(this));
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
