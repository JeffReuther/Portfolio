// Wrote the dead_state function.
    // The hint was the set of arrays to represent a grid.
    // Printed out a set of arrays to a specific height and width.
// Wrote the random_state function.
    // The hint was randomization of numbers using built-in functions.
// Wrote the render function.
    // The hint was a visualization of how it should look.
// Wrote next_board_state function.
    // 

const life = function() {
    let board = [];
    let initialBoardState = [];
    let widthInput = parseInt(widthInputField.value);
    let heightInput = parseInt(heightInputField.value);
    let iterationInput = parseInt(iterationInputField.value);
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    init = function() {
// If this is the first time life is run,
        if (resumeButtonClicked === false) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            random_state(widthInput, heightInput);
        } else {
// Get the board via local storage.
            board = JSON.parse(localStorage.getItem('board'));
        }

// Self-invoked function loops through board states iterationInput-times.
        (function loop(iterationInput) {
            setTimeout(function() {
                playButton.disabled = false;
                resumeButton.disabled = false;
                resumeButtonClicked = false;

                let stringifyBoardObject = JSON.stringify(board);
                localStorage.setItem('board', stringifyBoardObject);
                initialBoardState = JSON.parse(stringifyBoardObject);
                
                nextBoardState(initialBoardState);
                if (--iterationInput) loop(iterationInput);
            }, 200);
            playButton.disabled = true;
            resumeButton.disabled = true;
        })(iterationInput);
    }

// Builds the array (board) of variable width and height,
    // filled with rows of arrays, filled with 1's and 0's.
    random_state = function(width, height) {
        let variableRow = [];
    
        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                let randomNumber = Math.random();
    
                if (randomNumber < 0.5) {
                    randomNumber = Math.floor(randomNumber);
                } else {
                    randomNumber = Math.ceil(randomNumber);
                }
                variableRow.push(randomNumber);
            }
            board.push(variableRow);
            variableRow = [];
        }
    
        render();
    }

    currentSurroundingTotal = function(board, r, c) { // r = row number, c = column number
        let total = 0;
        let surroundingArray = [];

        // If the cells near each cell exist, push one or zero to the array.
            // If they do not exist, 'undefined' is pushed to the array.
        if (board[r - 1]) {
            surroundingArray.push(board[r - 1]);            // top left
            surroundingArray.push(board[r - 1][c]);         // top middle
            surroundingArray.push(board[r - 1][c + 1]);     // top right
        }
        if (board[r + 1]) {
            surroundingArray.push(board[r + 1][c - 1]);     // bottom left
            surroundingArray.push(board[r + 1][c]);         // bottom middle
            surroundingArray.push(board[r + 1][c + 1]);     // bottom right
        }
        surroundingArray.push(board[r][c - 1]);             // middle left
        surroundingArray.push(board[r][c + 1]);             // middle right

        // If a cell is not undefined, add its number to the total.
        for (let i = 0; i < surroundingArray.length; i++) {
            if (typeof surroundingArray[i] === 'number') {
                total += surroundingArray[i];
            }
        }
        return total;
    }

    stateChecker = function(board, r, c, total) {
        if (board[r][c] === 1) {            // If the cell is alive,
            if (total < 2 || total > 3) {   // if less than 2 or greater than 3 live neighbors, it becomes dead;
                return 0;
            } else {
                return 1;                   // otherwise, it stays alive.
            }
        } else {                            // If the cell is dead,
            if (total === 3) {              // if exactly three live neighbors, it becomes alive;
                return 1;
            } else {
                return 0;                   // otherwise, it stays dead.
            }
        }
    }

    nextBoardState = function(initialBoardState) {
        for (let row = 0; row < initialBoardState.length; row++) {
            for (let column = 0; column < initialBoardState[row].length; column++) {
                let total = currentSurroundingTotal(initialBoardState, row, column);
                board[row][column] = stateChecker(initialBoardState, row, column, total);
                render();
            }
        }
    }

    render = function() {
        let l = 0;

        canvas.width = board[l].length * 20;
        canvas.height = board.length * 20;

        for (let k = 0; k < board[l].length; k++) {
            if (board[l][k] === 0) {
                context.fillStyle = 'white';
                context.fillRect(20 * k, 20 * l, 20, 20)
            } else {
                context.fillStyle = 'rgb(22, 20, 45)';
                context.fillRect(20 * k, 20 * l, 20, 20)
            }
    
            // If it's the end of the current row.
            if (k + 1 === board[l].length) {
                l++;
    
                // If it's the end of the entire board.
                if (l === board.length) {
                    break;
                } else {
                    k = -1;
                }
            }
        }
    }

    init();
};

let heightInputField = document.getElementById("height-input");
let widthInputField = document.getElementById("width-input");
let iterationInputField = document.getElementById("iteration-input");
let resumeButtonClicked = false;
const heightPlusButton = document.getElementById("height-plus");
const heightMinusButton = document.getElementById("height-minus");
const widthPlusButton = document.getElementById("width-plus");
const widthMinusButton = document.getElementById("width-minus");
const iterationPlusButton = document.getElementById("iteration-plus");
const iterationMinusButton = document.getElementById("iteration-minus");
heightInputField.value = 10;
widthInputField.value = 10;
iterationInputField.value = 25;

heightPlusButton.addEventListener('click', function(event) {
    if (event.target.id === 'height-plus') {
        heightInputField.value++;
        canvas.height += 20;
    }
});
heightMinusButton.addEventListener('click', function(event) {
    if (event.target.id === 'height-minus') {
        if (heightInputField.value >= 11) {
            heightInputField.value--;
            canvas.height -= 20;
        }
    }
});
widthPlusButton.addEventListener('click', function(event) {
    if (event.target.id === 'width-plus') {
        widthInputField.value++;
        canvas.width += 20;
    }
});
widthMinusButton.addEventListener('click', function(event) {
    if (event.target.id === 'width-minus') {
        if (widthInputField.value >= 11) {
            widthInputField.value--;
            canvas.width -= 20;
        }
    }
});
iterationPlusButton.addEventListener('click', function(event) {
    if (event.target.id === 'iteration-plus') {
        iterationInputField.value++;
    }
});
iterationMinusButton.addEventListener('click', function(event) {
    if (event.target.id === 'iteration-minus') {
        if (iterationInputField.value >= 26) {
            iterationInputField.value--;
        }
    }
});
const playButton = document.getElementById("play-button");
playButton.addEventListener('click', life);
const resumeButton = document.getElementById("resume-button");
resumeButton.addEventListener('click', function() {
    resumeButtonClicked =  true;
    life();
});

// load_board_state = function(chosenState) {
//     const toad = [[0,0,0,0,0,0],
//         [0,0,0,0,0,0],
//         [0,0,1,1,1,0],
//         [0,1,1,1,0,0],
//         [0,0,0,0,0,0],
//         [0,0,0,0,0,0]];

//     if (chosenState === 'toad') {
//         loadedBoardState = true;
//         board = toad;
//         life();
//         return;
//     }

//     const beacon = [[0,0,0,0,0],
//         [0,0,0,0,0],
//         [0,1,1,1,0],
//         [0,0,0,0,0],
//         [0,0,0,0,0]];

//     if (chosenState === 'beacon') {
//         loadedBoardState = true;
//         board = beacon;
//         life();
//         return;
//     }

//     const blinker = [[0,0,0,0,0,0],
//         [0,1,1,0,0,0],
//         [0,1,1,0,0,0],
//         [0,0,0,1,1,0],
//         [0,0,0,1,1,0],
//         [0,0,0,0,0,0]];

//     if (chosenState === 'blinker') {
//         loadedBoardState = true;
//         board = blinker;
//         life();
//         return;
//     }

//     const glider = [[0,0,0,0,0,0,0],
//     [0,0,1,0,0,0,0],
//     [1,0,1,0,0,0,0],
//     [0,1,1,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0]];

//     if (chosenState === 'glider') {
//         loadedBoardState = true;
//         board = glider;
//         life();
//         return;
//     }

//     const GGG = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
//     [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

//     if (chosenState === 'GGG') {
//         loadedBoardState = true;
//         board = GGG;
//         life();
//         return;
//     }
// }