export  abstract class Tetromino {
    row: number;
    col: number;
    angle: number;

    constructor(row: number, col: number, angle = 0) {
        this.row = row;
        this.col = col;
        this.angle = angle;
    }

    abstract get shape(): number[][];

    get width(): number {
        return this.shape[0].length;
    }

    get height(): number {

        return this.shape.length;
    }

    fall() {
        this.row += 1;
    }

    rotate() {
        if (this.angle < 3) {
            this.angle += 1;
        } else {
            this.angle = 0;
        }
    }

    move(direction: string) {
        if (direction === 'left') {
            this.col -= 1;
        } else if (direction === 'right') {
            this.col += 1;
        }
    }
}

export class LShape extends Tetromino {
    static shapes: number[][][] = [
        [
            [1, 0],
            [1, 0],
            [1, 1]
        ],

        [
            [1, 1, 1],
            [1, 0, 0]
        ],

        [
            [1, 1],
            [0, 1],
            [0, 1]
        ],

        [
            [0, 0, 1],
            [1, 1, 1]
        ]
    ];

    constructor(row: number, col: number) {
        super(row, col);
    }

    get shape() {
        return LShape.shapes[this.angle];
    }

    get width() {
        return this.shape[0].length;
    }

    get height() {
        return this.shape.length;
    }
}
export class JShape extends Tetromino {
    static shapes: number[][][] = [
        [
            [0, 2],
            [0, 2],
            [2, 2]
        ],

        [
            [2, 0, 0],
            [2, 2, 2]
        ],

        [
            [2, 2],
            [2, 0],
            [2, 0]
        ],

        [
            [2, 2, 2],
            [0, 0, 2]
        ]
    ];

    constructor(row: number, col: number) {
        super(row, col);
    }

    get shape() {
        return JShape.shapes[this.angle];
    }

    get width() {
        return this.shape[0].length;
    }

    get height() {
        return this.shape.length;
    }
}
export  class OShape extends Tetromino {
    static shapes: number[][][] = [
        [
            [3, 3],
            [3, 3]
        ],

        [
            [3, 3],
            [3, 3]
        ],

        [
            [3, 3],
            [3, 3]
        ],

        [
            [3, 3],
            [3, 3]
        ]
    ];

    constructor(row: number, col: number) {
        super(row, col);
    }

    get shape() {
        return OShape.shapes[this.angle];
    }

    get width() {
        return this.shape[0].length;
    }

    get height() {
        return this.shape.length;
    }
}


export class TShape extends Tetromino {
    static shapes: number[][][] = [
        [
            [0, 4, 0],
            [4, 4, 4]
        ],

        [
            [4, 0],
            [4, 4],
            [4, 0]
        ],

        [
            [4, 4, 4],
            [0, 4, 0]
        ],

        [
            [0, 4],
            [4, 4],
            [0, 4]
        ]
    ];

    constructor(row: number, col: number) {
        super(row, col);
    }

    get shape() {
        return TShape.shapes[this.angle];
    }

    get width() {
        return this.shape[0].length;
    }

    get height() {
        return this.shape.length;
    }
}

export  class SShape extends Tetromino {
    static shapes: number[][][] = [
        [
            [0, 5, 5],
            [5, 5, 0]
        ],

        [
            [5, 0],
            [5, 5],
            [0, 5]
        ],

        [
            [0, 5, 5],
            [5, 5, 0]
        ],

        [
            [5, 0],
            [5, 5],
            [0, 5]
        ]
    ];

    constructor(row: number, col: number) {
        super(row, col);
    }

    get shape() {
        return SShape.shapes[this.angle];
    }

    get width() {
        return this.shape[0].length;
    }

    get height() {
        return this.shape.length;
    }
}
export  class ZShape extends Tetromino {
    static shapes: number[][][] = [
        [
            [6, 6, 0],
            [0, 6, 6]
        ],

        [
            [0, 6],
            [6, 6],
            [6, 0]
        ],

        [
            [6, 6, 0],
            [0, 6, 6]
        ],

        [
            [0, 6],
            [6, 6],
            [6, 0]
        ]
    ];

    constructor(row: number, col: number) {
        super(row, col);
    }

    get shape() {
        return ZShape.shapes[this.angle];
    }

    get width() {
        return this.shape[0].length;
    }

    get height() {
        return this.shape.length;
    }
}


export  class IShape extends Tetromino {
    static shapes: number[][][] = [
        [
            [7],
            [7],
            [7],
            [7]
        ],

        [
            [7, 7, 7, 7]
        ],

        [
            [7],
            [7],
            [7],
            [7]
        ],

        [
            [7, 7, 7, 7]
        ]
    ];

    constructor(row: number, col: number) {
        super(row, col);
    }

    get shape() {
        return IShape.shapes[this.angle];
    }

    get width() {
        return this.shape[0].length;
    }

    get height() {
        return this.shape.length;
    }
}
