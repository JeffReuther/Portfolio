// Wrote the dead_state function.
    // The hint was the set of arrays to represent a grid.
    // Printed out a set of arrays to a specific height and width.
// Wrote the random_state function.
    // The hint was randomization of numbers.
// Wrote the render function.
    // The hint was a visualization of how it should look.

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
                
                next_board_state(initialBoardState);
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
    
    next_board_state = function(initialBoardState) {
        let currentSurroundingTotal;
    
        for (let m = 0; m < initialBoardState.length; m++) {
            for (let n = 0; n < initialBoardState[m].length; n++) {
                if (m === 0 && n === 0) {
                    /*
                        O # #
                        # # #
                        # # # 
                    */
                    currentSurroundingTotal = initialBoardState[m][n + 1] + initialBoardState[m + 1][n] + initialBoardState[m + 1][n + 1];
                    // If top-left is alive, if it's underpopulated, it becomes dead.
                    if (initialBoardState[m][n] === 1 && currentSurroundingTotal < 2) {
                        board[m][n] = 0;
                    // If top-left is dead, if it's reproduced, it becomes alive.
                    } else if (initialBoardState[m][n] === 0 && currentSurroundingTotal === 3) {
                        board[m][n] = 1;
                    } else if (initialBoardState[m][n] === 1) {
                        board[m][n] = 1;
                    }
                } else if (m === 0 && n === initialBoardState[m].length - 1) {
                    /*
                        # # O
                        # # #
                        # # # 
                    */
                    currentSurroundingTotal = initialBoardState[m][n - 1] + initialBoardState[1][n - 1] + initialBoardState[m + 1][n];
                    // If top-right is alive, if it's underpopulated, it becomes dead.
                    if (initialBoardState[m][n] === 1 && currentSurroundingTotal < 2) {
                        board[m][n] = 0;
                    // If top-right is dead, if it's reproduced, it becomes alive.
                    } else if (initialBoardState[m][n] === 0 && currentSurroundingTotal === 3) {
                        board[m][n] = 1;
                    } else if (initialBoardState[m][n] === 1) {
                        board[m][n] = 1;
                    }
                } else if (m === initialBoardState.length - 1 && n === 0) {
                    /*
                        # # #
                        # # #
                        O # # 
                    */
                    currentSurroundingTotal = initialBoardState[m - 1][n] + initialBoardState[m - 1][n + 1] + initialBoardState[m][n + 1];
                    // If bottom-left is alive, if it's underpopulated, it becomes dead.
                    if (initialBoardState[m][n] === 1 && currentSurroundingTotal < 2) {
                        board[m][n] = 0;
                    // If bottom-left is dead, if it's reproduced, it becomes alive.
                    } else if (initialBoardState[m][n] === 0 && currentSurroundingTotal === 3) {
                        board[m][n] = 1;
                    } else if (initialBoardState[m][n] === 1) {
                        board[m][n] = 1;
                    }
                } else if (m === initialBoardState.length - 1 && n === initialBoardState[m].length - 1) {
                    /*
                        # # #
                        # # #
                        # # O 
                    */
                    currentSurroundingTotal = initialBoardState[m - 1][n - 1] + initialBoardState[m - 1][n] + initialBoardState[m][n - 1];
                    // If bottom-right is alive, if it's underpopulated, it becomes dead.
                    if (initialBoardState[m][n] === 1 && currentSurroundingTotal < 2) {
                        board[m][n] = 0;
                    // If bottom-right is dead, if it's reproduced, it becomes alive.
                    } else if (initialBoardState[m][n] === 0 && currentSurroundingTotal === 3) {
                        board[m][n] = 1;
                    } else if (initialBoardState[m][n] === 1) {
                        board[m][n] = 1;
                    }
                } else if (m === 0) {
                    /*
                        # O #
                        # # #
                        # # # 
                    */
                    currentSurroundingTotal = initialBoardState[m][n - 1] + initialBoardState[m][n + 1] + initialBoardState[m + 1][n - 1] + initialBoardState[m + 1][n] + initialBoardState[m + 1][n + 1];
                    if (initialBoardState[m][n] === 1 && currentSurroundingTotal < 2) {
                        board[m][n] = 0;
                    } else if (initialBoardState[m][n] === 0 && currentSurroundingTotal === 3) {
                        board[m][n] = 1;
                    } else if (initialBoardState[m][n] === 1 && currentSurroundingTotal > 3) {
                        board[m][n] = 0;
                    } else if (initialBoardState[m][n] === 1) {
                        board[m][n] = 1;
                    }
                } else if (n === 0) {
                    /*
                        # # #
                        O # #
                        # # # 
                    */
                    currentSurroundingTotal = initialBoardState[m - 1][n] + initialBoardState[m - 1][n + 1] + initialBoardState[m][n + 1] + initialBoardState[m + 1][n + 1] + initialBoardState[m + 1][n];
                    if (initialBoardState[m][n] === 1 && currentSurroundingTotal < 2) {
                        board[m][n] = 0;
                    } else if (initialBoardState[m][n] === 0 && currentSurroundingTotal === 3) {
                        board[m][n] = 1;
                    } else if (initialBoardState[m][n] === 1 && currentSurroundingTotal > 3) {
                        board[m][n] = 0;
                    } else if (initialBoardState[m][n] === 1) {
                        board[m][n] = 1;
                    }
                } else if (n === initialBoardState[m].length - 1) {
                    /*
                        # # #
                        # # O
                        # # # 
                    */
                    currentSurroundingTotal = initialBoardState[m - 1][n] + initialBoardState[m - 1][n - 1] + initialBoardState[m][n - 1] + initialBoardState[m + 1][n - 1] + initialBoardState[m + 1][n];
                    if (initialBoardState[m][n] === 1 && currentSurroundingTotal < 2) {
                        board[m][n] = 0;
                    } else if (initialBoardState[m][n] === 0 && currentSurroundingTotal === 3) {
                        board[m][n] = 1;
                    } else if (initialBoardState[m][n] === 1 && currentSurroundingTotal > 3) {
                        board[m][n] = 0;
                    } else if (initialBoardState[m][n] === 1) {
                        board[m][n] = 1;
                    }
                } else if (m === initialBoardState.length - 1) {
                    /*
                        # # #
                        # # #
                        # O # 
                    */
                    currentSurroundingTotal = initialBoardState[m][n - 1] + initialBoardState[m - 1][n - 1] + initialBoardState[m - 1][n] + initialBoardState[m - 1][n + 1] + initialBoardState[m][n + 1];
                    if (initialBoardState[m][n] === 1 && currentSurroundingTotal < 2) {
                        board[m][n] = 0;
                    } else if (initialBoardState[m][n] === 0 && currentSurroundingTotal === 3) {
                        board[m][n] = 1;
                    } else if (initialBoardState[m][n] === 1 && currentSurroundingTotal > 3) {
                        board[m][n] = 0;
                    } else if (initialBoardState[m][n] === 1) {
                        board[m][n] = 1;
                    }
                } else {
                    /*
                        # # #
                        # O #
                        # # # 
                    */
                    currentSurroundingTotal = initialBoardState[m - 1][n - 1] + initialBoardState[m - 1][n] + initialBoardState[m - 1][n + 1] + initialBoardState[m][n - 1] + initialBoardState[m][n + 1] + initialBoardState[m + 1][n - 1] + initialBoardState[m + 1][n] + initialBoardState[m + 1][n + 1];
                    if (initialBoardState[m][n] === 1 && currentSurroundingTotal < 2) {
                        board[m][n] = 0;
                    } else if (initialBoardState[m][n] === 0 && currentSurroundingTotal === 3) {
                        board[m][n] = 1;
                    } else if (initialBoardState[m][n] === 1 && currentSurroundingTotal > 3) {
                        board[m][n] = 0;
                    } else if (initialBoardState[m][n] === 1) {
                        board[m][n] = 1;
                    }
                }
    
            }
        }
        render();
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