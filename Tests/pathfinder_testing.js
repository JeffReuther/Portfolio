"use strict";

function getLocation (item) {
    for (let i = 0; i < itemList.length; i++) {
        // Starts at the first string.
        for (let j = 2; j < itemList[i].length; j++) {
            // Returns the array node.
            if (itemList[i][j] === item) {
                return itemList[i][1].slice();
            }
        }
    }
}

function neighbors(node) {
    const dirs = [[1,0], [0,1], [-1,0], [0,-1]];
    const result = [];
    for (const dir of dirs) {
        const calculation = [node[0] + dir[0], node[1] + dir[1]];
        // If the neighboring node is within the bounds of the gridArray.
        if (calculation[0] >=0 && calculation[1] >= 0 && calculation[0] < 9 && calculation[1] < 56) {
            // If the neighboring node is not a wall.
            if (gridArray[calculation[0]][calculation[1]] === 0) {
                result.push(calculation);
            }
        }
    }
    return result;
}
  
function breadthSearch(start) {
const reached = [start];
const queue = [start];
const cameFrom = [];
while (queue.length > 0) {
    // As long as queue is greater than zero, each neighbor will be compared and either added
        // to reached, if it's not reached yet, or discarded.
    const currentNode = queue.shift();
    const currentNeighbors = neighbors(currentNode);
    for (let i = 0; i < currentNeighbors.length; i++) {
        if (!
            (reached.some(arr => (arr + "") === (currentNeighbors[i] + "")))
        ) {
            reached.push(currentNeighbors[i]);
            queue.push(currentNeighbors[i]);
            // cameFrom will keep a separate array for each distinct node, one for each parent.
            cameFrom.push(currentNode);
        }
    }
}
// Removes the first element from the reached array, since it's the "start" node.
reached.shift();
return [reached, cameFrom];
}

function singlePath(start, goal) {
    // breadthSearch returns two arrays, one with all of the reached nodes, one with all of the cameFrom (reference) nodes.
    const [reached, cameFrom] = breadthSearch(start);
    const path = [];
    let current = goal;
    let currentIndex;
    // If current is not the starting node, repeat.
    while ((current + "") !== (start + "")) {
        // Finds the index of the current node.
        for (let i = 0; i < reached.length; i++) {
            if ((reached[i] + "") === (current + "")) {
                currentIndex = i;
                break;
            }
        }
        // For the entire length of the reached array.
        for (let j = 0; j < cameFrom.length; j++) {
            // If we found the correct starting node, success!
            if ((start + "") === (cameFrom[currentIndex] + "")) {
                path.push(start);
                path.reverse();
                return path;
            }
            // If the cameFrom reference of the current node is found in the reached array.
            if ((reached[j] + "") === (cameFrom[currentIndex] + "")) {
                // Continue the path and update the current node.
                path.push(reached[j]);
                current = reached[j];
                break;
            }
        }

    }
    path.push(start);
    path.reverse();
    return path;
}

function multiPath(items) {
    if (items.length === 0) {
        return;
    }

    // Gathers up each start and goal points.
    const locationNodes = [];
    let fullPath = [];
    for (const item of items) {
        // Returns an array node for the item string.
        const location = getLocation(item);
        locationNodes.push(location);
    }
    locationNodes.sort((a, b) => a[2] - b[2]);

    for (let i = 0; i < locationNodes.length; i++) {
        locationNodes[i].pop();
    }

    // Used for keeping track of the item locations to visit (gold tile).
    const destinationNodes = locationNodes.slice();
    localStorage.setItem("destination-nodes", JSON.stringify(destinationNodes));

    locationNodes.unshift([8, 49]);
    locationNodes.push([8, 49]);
    for (let j = 1; j < locationNodes.length; j++) {
        const result = singlePath(locationNodes[j - 1], locationNodes[j]);
        fullPath = [...fullPath, ...result];
    }
    // For testing purposes, just return the fullPath.
    return fullPath;
    //localStorage.setItem("path", JSON.stringify(fullPath));
    //updateDOM(fullPath, destinationNodes);
}

function checkIfRepeat(repeatPath, path, index) {
    for (let i = 0; i < repeatPath.length; i++) {
        if (repeatPath[i] === path[index] + "") {
            return true;
        }
    }
    return false;
}

function renderCanvas() {
    let i = 0;
    canvas.width = gridArray[i].length * 20;
    canvas.height = gridArray.length * 20;

    for (let j = 0; j < gridArray[i].length; j++) {
        if (gridArray[i][j] === 0) {
            context.fillRect(20 * j, 20 * i, 20, 20);
            context.clearRect(20 * j + 1, 20 * i + 1, 18, 18);
        } else {
            context.fillRect(20 * j, 20 * i, 20, 20);
        }

        // If it's the end of the current row.
        if (j + 1 === gridArray[i].length) {
            i++;

            // If it's the end of the entire gridArray.
            if (i === gridArray.length) {
                break;
            } else {
                j = -1;
            }
        }
    }
}

function renderTodoList() {
    if (JSON.parse(localStorage.getItem("itemsToDisplay"))) {
        const itemsToDisplay = JSON.parse(localStorage.getItem("itemsToDisplay"));

        for (let i = 0; i < itemsToDisplay.length; i++) {
            addTodo(itemsToDisplay[i]);
        }
    }
}

function addTodo(storedTodo) {
    let newTodoText, itemsToDisplay;
    let includes = false;

    // If it's not just refreshing the todo list.
    if (!storedTodo) {
        newTodoText = input.value.trim();
    } else {
        newTodoText = storedTodo;
    }

    // If it's not just refreshing the todo list.
    if (!storedTodo) {
        // If this isn't the first todo item, set up itemsToDisplay.
        if (JSON.parse(localStorage.getItem("itemsToDisplay"))) {
            itemsToDisplay = JSON.parse(localStorage.getItem("itemsToDisplay"));
            // If newTodoText is not in itemsToDisplay, the rest of the code runs.
            for (let i = 0; i < itemsToDisplay.length; i++) {
                if (itemsToDisplay[i] === newTodoText) {
                    includes = true;
                }
            }
            if (!includes) {
                // Grab the old value for the itemsToDisplay localStorage object and push the newTodoText.
                itemsToDisplay.push(newTodoText);
                // Then reset the itemsToDisplay object key.
                localStorage.setItem("itemsToDisplay", JSON.stringify(itemsToDisplay));
            }
        // If this is the first todo item, set up itemsToDisplay.
        } else {
            localStorage.setItem("itemsToDisplay", JSON.stringify([newTodoText]));
            itemsToDisplay = JSON.parse(localStorage.getItem("itemsToDisplay"));
        }
    }

    if (!includes) {
        const todo = document.createElement("li");
        todo.setAttribute("class", "todo-item");
        todo.completed = false;
    
        const text = document.createElement("span");
        text.setAttribute("class", "todo-text");
        text.appendChild(document.createTextNode(newTodoText));
    
        const toggleButton = document.createElement("input");
        toggleButton.setAttribute("type", "checkbox");
        toggleButton.setAttribute("class", "todo-toggle-button");
        toggleButton.addEventListener("click", function() { toggleTodo(todo) });
    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("class", "todo-delete-button");
        deleteButton.addEventListener("click", function() {
            itemsToDisplay = JSON.parse(localStorage.getItem("itemsToDisplay"));
            itemsToDisplay.splice(itemsToDisplay.indexOf(newTodoText), 1);
            localStorage.setItem("itemsToDisplay", JSON.stringify(itemsToDisplay));
            deleteTodo(todo, itemsToDisplay);
        });
    
        //todoList.appendChild(todo);
        todo.appendChild(toggleButton);
        todo.appendChild(text);
        todo.appendChild(deleteButton);
        // Just for testing purposes, return the todo.
        return todo;
    }
}

function deleteTodo(todo, itemsToDisplay) {
    todoList.removeChild(todo);
    if (itemsToDisplay.length === 0) {
        localStorage.removeItem("itemsToDisplay");
    }
}

function toggleTodo(todo) {
    todo.completed = !todo.completed;
    if (todo.completed === false) {
        todo.getElementsByClassName("todo-text")[0].style.textDecoration = "solid";
    } else {
        todo.getElementsByClassName("todo-text")[0].style.textDecoration = "line-through";
    }
}

function updateDOM(path, destinationNodes) {
    // Deep copy of the item list.
    const itemListCopy = JSON.parse(JSON.stringify(itemList));
    let repeatPath = JSON.parse(localStorage.getItem("repeat-path"));
    let repeat = false;
    startTime = Date.now();
    for (let k = 0; k < path.length; k++) {
        const timeoutId = setTimeout(function(index) {
            return function() {
                // If the path reaches one of the destination tiles.
                if (path[index] + "" === destinationNodes[0] + "") {
                    let itemName;

                    // Find the name of the destination item.
                    for (let l = 0; l < itemListCopy.length; l++) {
                        const removedValue = itemListCopy[l][1].pop();
                        if (itemListCopy[l][1] + "" === destinationNodes[0] + "") {
                            itemName = itemListCopy[l][2];
                            break;
                        } else {
                            itemListCopy[l][1].push(removedValue);
                        }
                    }

                    // Update the todo-list DOM to indicate the item is found.
                    for (let m = 0; m < document.getElementsByClassName("todo-text").length; m++) {
                        if (itemName === document.getElementsByClassName("todo-text")[m].innerHTML) {
                            document.getElementsByClassName("todo-text")[m].style.textDecoration = "line-through";
                            document.getElementsByClassName("todo-text")[m].parentElement.completed = "true";
                            document.getElementsByClassName("todo-text")[m].parentElement.children[0].checked = "true";
                        }
                    }

                    // Update the canvas DOM color to gold to indicate the item is found.
                    context.fillStyle = "gold";
                    destinationNodes.shift();
                    localStorage.setItem("destination-nodes", JSON.stringify(destinationNodes));
                } else {
                    context.fillStyle = "red";
                }

                // If a path "walks" over a node that isn't a destinationNode more than once, it will alternate red and partial red.
                if (context.fillStyle === "red" || context.fillStyle === "#ff0000") {
                    repeat = checkIfRepeat(repeatPath, path, index);
                    if (repeat === true) {
                        context.fillRect(20 * path[index][1] + 1, 20 * path[index][0] + 1, 18, 18);
                        context.clearRect(20 * path[index][1] + 1, 20 * path[index][0] + 1, 9, 18);
                        // Removes repeated node from repeatPath.
                        repeatPath.splice(repeatPath.indexOf(path[index] + ""), 1);
                        localStorage.setItem("repeat-path", JSON.stringify(repeatPath));
                        repeat = false;
                    } else {
                        context.fillRect(20 * path[index][1] + 1, 20 * path[index][0] + 1, 18, 18);
                        // Adds repeated node to repeatPath.
                        repeatPath.push(path[index] + "");
                        localStorage.setItem("repeat-path", JSON.stringify(repeatPath));
                    }
                } else {
                    context.fillRect(20 * path[index][1] + 1, 20 * path[index][0] + 1, 18, 18);
                }
            };
        }(k), 250 * k);
        timeouts.push(timeoutId);
    }
}

// Note:  Entrance starts at [8, 49].
var gridArray = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1] 
];

// Third element in the internal array in the section number (for sorting).
var itemList = [
    ["aisle_a", [3,55,0], "Precooked"],
//  ["aisle_a_2], [0,55,01], "Fish"],
    ["aisle_b", [3,52,1], "Produce"],
    ["aisle_c", [3,49,2], "Bakery"],
    ["aisle_1", [3,46,3], "Gluten"],
    ["aisle_2", [3,44,4], "Superfoods"],
    ["aisle_3", [3,42,5], "Vitamins"],
    ["aisle_4", [3,40,6], "Diapers"],
    ["aisle_5", [3,38,7], "Birthday Cards"],
    ["aisle_6", [3,36,8], "Get Well Cards"],
    ["aisle_7", [3,34,9], "Cookware"],
    ["aisle_8", [3,32,10], "Candles"],
    ["aisle_9", [3,30,11], "General Beer"],
    ["aisle_10", [3,28,12], "International Beer"],
    ["aisle_11", [3,26,13], "IPA Beer"],
    ["aisle_12", [3,24,14], "Wine"],
    ["aisle_13", [3,22,15], "Candy"],
    ["aisle_14", [3,20,16], "Trail Mix"],
    ["aisle_15", [3,18,17], "Cookies"],
    ["aisle_16", [3,16,18], "Off-brand Sodas"],
    ["aisle_17", [3,14,19], "Seltzer Water"],
    ["aisle_18", [3,12,20], "Sodas"],
    ["aisle_19", [3,10,21], "Energy Drinks"],
    ["aisle_20", [3,8,22], "Coffee"],
    ["aisle_21", [3,6,23], "Baking"],
    ["aisle_22", [3,4,24], "Dish Soap"],
    ["aisle_23", [3,2,25], "Cleaning"],
    ["aisle_24", [3,0,26], "Paper Towels"]
];

// DOM references.
var input = document.getElementById("newItemSelect");
var canvas = document.getElementById("pathfinder-canvas");
var context = canvas.getContext("2d");  // Context used in render function.
var searchButton = document.getElementById("searchButton");
var refreshButton = document.getElementById("refreshButton");
var pauseButton = document.getElementById("pauseButton");
var timeouts = [];
var startTime, elapsedTime, remainingPaths;
var paused = false;
// Todo list.
var todoList = document.getElementById("todo-list");
var addButton = document.getElementById("addTodo");

addButton.addEventListener("click", function() {
    addTodo();
});

// DOM buttons.
searchButton.addEventListener("click", function(event) {
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    timeouts = [];

    localStorage.setItem("repeat-path", '[]');
    if (event.target.id === "searchButton") {
        if (JSON.parse(localStorage.getItem("itemsToDisplay")) !== null) {
            renderCanvas();
            multiPath(JSON.parse(localStorage.getItem("itemsToDisplay")));
        }
    }
});

refreshButton.addEventListener("click", function() {
    for (let i = 0; i < todoList.children.length; ) {
        todoList.removeChild(todoList.children[i]);
    }
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    localStorage.setItem("path", "[]");
    localStorage.setItem("destination-nodes", "[]");
    localStorage.setItem("repeat-path", "[]");
    renderTodoList();
    renderCanvas();
})

pauseButton.addEventListener("click", function() {
    // Clear all timeouts.
    if (paused === false) {
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = [];

        // Removes the paths already traversed from the localStorage path.
        remainingPaths = JSON.parse(localStorage.getItem("path"));
        elapsedTime = Date.now() - startTime;
        while (elapsedTime >= 250) {
            remainingPaths.shift();
            elapsedTime -= 250;
        }
        // Removes the current "paused at" node.
        remainingPaths.shift();
        localStorage.setItem("path", JSON.stringify(remainingPaths));
        paused = true;
    } else {
        // Clear all timeouts.
        paused = false;
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = [];

        // Updates DOM without the paths already traversed.
        if (remainingPaths.length > 0) {
            updateDOM(remainingPaths, JSON.parse(localStorage.getItem("destination-nodes")));
        }
    }
});

renderTodoList();
renderCanvas();