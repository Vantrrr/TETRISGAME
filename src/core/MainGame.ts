import * as PIXI from 'pixi.js';
import { Tetromino, IShape, LShape, JShape, OShape, TShape, SShape, ZShape } from './tetromino';
class Game {
    score: number;
    boardWidth: number;
    boardHeight: number;
    currentBoard: number[][];
    landedBoard: number[][];
    currentTetromino: Tetromino;
    app: PIXI.Application;
    blockSize: number;
    padding: number;
    blockColors: number[];

    constructor() {
        this.score = 0;
        this.boardWidth = 10;
        this.boardHeight = 23;
        this.currentBoard = Array.from({ length: this.boardHeight }, () => Array(this.boardWidth).fill(0));
        this.landedBoard = Array.from({ length: this.boardHeight }, () => Array(this.boardWidth).fill(0));
        this.currentTetromino = this.randomTetromino();

        this.app = new PIXI.Application({ width: 500, height: 650, backgroundColor: 0xFFFFFF });
        document.body.appendChild(this.app.view);
        this.blockSize = 24;
        this.padding = 4;
        this.blockColors = [
            0xFF0000, // Đỏ
            0x00FF00, // Xanh lá cây
            0x0000FF, // Xanh dương
            0xFFFF00, // Vàng
            0xFF00FF, // Hồng
            0x00FFFF, // Cyan
            0xFFA500, // Cam
            0x800080, // Tím
            0xFFFF99, // Màu vàng nhạt
            0x00FF99, // Màu xanh lá cây nhạt
        ];
    }

    draw() {
        const graphics = new PIXI.Graphics();
        this.app.stage.addChild(graphics);

        graphics.clear();
        graphics.lineStyle(1, 0x800080);

        // Vẽ khung board
        graphics.drawRect(this.padding, this.padding, this.blockSize * this.boardWidth + this.padding * (this.boardWidth + 1), this.blockSize * (this.boardHeight - 3) + this.padding * (this.boardHeight - 3 + 1));

        for (let i = 3; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                const colorIndex = this.currentBoard[i][j] - 1; // Lấy màu từ mảng blockColors
                const color = colorIndex >= 0 ? this.blockColors[colorIndex] : 0xf8f8f8; // Mặc định là màu xám nếu không có màu nào được định
                graphics.beginFill(color);
                graphics.drawRect(this.padding * 2 + j * (this.blockSize + this.padding), this.padding * 2 + (i - 3) * (this.blockSize + this.padding), this.blockSize, this.blockSize);
                graphics.endFill();
            }
        }

        const gameTitle = PIXI.Sprite.from('../assets/logo_tetris.png'); 
        gameTitle.position.set(310, 10);
        gameTitle.width = 150; 
        gameTitle.height = 25; 
        this.app.stage.addChild(gameTitle);

        const nextText = new PIXI.Text('Continue:', { fontSize: '25px', fill: 0x000000 });
        nextText.position.set(300, 60);
        this.app.stage.addChild(nextText);

        const scoreText = new PIXI.Text('Scores:', { fontSize: '25px', fill: 0x000000 });
        scoreText.position.set(300, 300);
        this.app.stage.addChild(scoreText);


        const scoreValue = new PIXI.Text(this.score.toString(), { fontSize: '28px', fill: 0x000000 });
        scoreValue.position.set(400, 300);
        this.app.stage.addChild(scoreValue);


        const stage = PIXI.Sprite.from('../assets/button_reset_up.png'); 
        stage.position.set(300, 500);
        stage.width = 175; 
        stage.height = 50; 
        this.app.stage.addChild(stage);

    }

    randomTetromino(): Tetromino {
        const randNum = Math.floor(Math.random() * 7);
        switch (randNum) {
            case 0:
                return new LShape(1, 4);
            case 1:
                return new JShape(1, 4);
            case 2:
                return new OShape(2, 4);
            case 3:
                return new TShape(2, 4);
            case 4:
                return new SShape(2, 4);
            case 5:
                return new ZShape(2, 4);
            case 6:
                return new IShape(0, 4);
            default:
                throw new Error("Invalid Tetromino");
        }
    }
    canTetrominoMoveSideways(direction: string): boolean {
        const offset = direction === 'left' ? -1 : 1;

        for (let i = 0; i < this.currentTetromino.height; i++) {
            for (let j = 0; j < this.currentTetromino.width; j++) {
                if (this.currentTetromino.shape[i][j] > 0) {
                    const row = this.currentTetromino.row + i;
                    const col = this.currentTetromino.col + j + offset;

                    // Kiểm tra xem có di chuyển ra ngoài biên trái/phải không
                    if (col < 0 || col >= this.boardWidth) {
                        return false;
                    }

                    // Kiểm tra xem có đè lên các khối hộp đã ổn định không
                    if (row >= 0 && row < this.boardHeight && this.landedBoard[row][col] > 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    play() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    if (this.canTetrominoMoveSideways('left')) {
                        this.currentTetromino.move('left');
                    }
                    break;
                case 'ArrowRight':
                    if (this.canTetrominoMoveSideways('right')) {
                        this.currentTetromino.move('right');
                    }
                    break;
                case 'ArrowUp':
                    this.currentTetromino.rotate();
                    break;
                case 'ArrowDown':
                    this.dropTetromino();
                    break;
            }
            this.updateCurrentBoard();
            this.draw();
        });

        setInterval(() => {
            this.progress();
            this.updateCurrentBoard();
            this.draw();
        }, 800);
    }

    dropTetromino() {
        while (this.canTetrominoFall()) {
            this.currentTetromino.fall();
        }
    }


    progress() {
        if (this.canTetrominoFall()) {
            this.currentTetromino.fall();
        } else {
            this.updateLandedBoard();
            this.currentTetromino = this.randomTetromino();
            if (!this.canTetrominoFall()) {
                console.log("Game Over!");
                return;
            }
        }
    }


    canTetrominoFall(): boolean {
        for (let i = 0; i < this.currentTetromino.height; i++) {
            for (let j = 0; j < this.currentTetromino.width; j++) {
                if (this.currentTetromino.shape[i][j] > 0) {
                    let row = this.currentTetromino.row + i + 1;
                    let col = this.currentTetromino.col + j;
                    if (row >= this.boardHeight || this.landedBoard[row][col] > 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    updateLandedBoard() {
        for (let i = 0; i < this.currentTetromino.height; i++) {
            for (let j = 0; j < this.currentTetromino.width; j++) {
                if (this.currentTetromino.shape[i][j] > 0) {
                    this.landedBoard[this.currentTetromino.row + i][this.currentTetromino.col + j] = this.currentTetromino.shape[i][j];
                }
            }
        }
    }

    updateCurrentBoard() {
        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                this.currentBoard[i][j] = this.landedBoard[i][j];
            }
        }

        for (let i = 0; i < this.currentTetromino.height; i++) {
            for (let j = 0; j < this.currentTetromino.width; j++) {
                if (this.currentTetromino.shape[i][j] > 0) {
                    this.currentBoard[this.currentTetromino.row + i][this.currentTetromino.col + j] = this.currentTetromino.shape[i][j];
                }
            }
        }
    }
}

export function initializeGame() {
    const game = new Game();
    game.updateCurrentBoard();
    game.draw();
    game.play();

}