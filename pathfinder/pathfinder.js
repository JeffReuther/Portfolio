"use strict";

function getLocation (item) {
    for (let i = 0; i < itemList.length; i++) {
        // Starts at the first string.
        for (let j = 2; j < itemList[i].length; j++) {
            // Returns the array node.
            if (itemList[i][j] === item) {
                return itemList[i][1];
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

    locationNodes.unshift([8, 49]);
    locationNodes.push([8, 49]);
    for (let j = 1; j < locationNodes.length; j++) {
        const result = singlePath(locationNodes[j - 1], locationNodes[j]);
        fullPath = [...fullPath, ...result];
    }
    render(fullPath, destinationNodes);
}

function checkIfRepeat(repeatPath, path, index) {
    for (let i = 0; i < repeatPath.length; i++) {
        if (repeatPath[i] === path[index] + "") {
            return true;
        }
    }
    return false;
}

function render(path, destinationNodes) {
    const repeatPath = [];
    let i = 0;
    let repeat = false;
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

    if (path !== undefined) {
        for (let k = 0; k < path.length; k++) {
            setTimeout(function(index) {
                return function() {

                    // If the path reaches one of the destination tiles.
                    if (path[index] + "" === destinationNodes[0] + "") {
                        let itemName;

                        // Find the name of the destination item.
                        for (let l = 0; l < itemList.length; l++) {
                            if (itemList[l][1] + "" === destinationNodes[0] + "") {
                                itemName = itemList[l][2];
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
                    } else {
                        context.fillStyle = "red";
                    }

                    // If a path "walks" over a node more than once, it will alternate red and partial red.
                    repeat = checkIfRepeat(repeatPath, path, index);
                    if (repeat === true) {
                        context.fillRect(20 * path[index][1] + 1, 20 * path[index][0] + 1, 18, 18);
                        context.clearRect(20 * path[index][1] + 1, 20 * path[index][0] + 1, 9, 18);
                        repeatPath.splice(repeatPath.indexOf(path[index] + ""), 1);
                        repeat = false;
                    } else {
                        context.fillRect(20 * path[index][1] + 1, 20 * path[index][0] + 1, 18, 18);
                        repeatPath.push(path[index] + "");
                    }
                };
            }(k), 250 * k);
        }
    }
}

function renderTodoList(todoText) {
    const todo = document.createElement("li");
    todo.setAttribute("class", "todo-item");
    todo.completed = false;
  
    // In case I ever need to update the text via toggle.
    const text = document.createElement("span");
    text.setAttribute("class", "todo-text");
    text.appendChild(document.createTextNode(todoText));
  
    const toggleButton = document.createElement("input");
    toggleButton.setAttribute("type", "checkbox");
    toggleButton.setAttribute("class", "todo-toggle-button");
    toggleButton.addEventListener("click", function() { toggleTodo(todo) });
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("class", "todo-delete-button");
    // Note:  This also updates the itemsToDisplay list, or rather, the canvas display.
    deleteButton.addEventListener("click", function() {
        itemsToDisplay.splice(itemsToDisplay.indexOf(todo), 1);
        deleteTodo(todo);
    });
  
    todoList.appendChild(todo);
    todo.appendChild(toggleButton);
    todo.appendChild(text);
    todo.appendChild(deleteButton);
}
  
function addTodo() {
    const newTodoText = input.value.trim();
    if (newTodoText) {
        if (!itemsToDisplay.includes(newTodoText)) {
            itemsToDisplay.push(newTodoText);
            renderTodoList(newTodoText);
        }
        input.value = "";
    }
}

function deleteTodo(todo) {
    todoList.removeChild(todo);
}

function toggleTodo(todo) {
    todo.completed = !todo.completed;
    if (todo.completed === false) {
        todo.getElementsByClassName("todo-text")[0].style.textDecoration = "solid";
    } else {
        todo.getElementsByClassName("todo-text")[0].style.textDecoration = "line-through";
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

var itemsToDisplay = [];

// DOM references.
var input = document.getElementById("newItemSelect");
var canvas = document.getElementById("pathfinder-canvas");
var context = canvas.getContext("2d");  // Context used in render function.
var searchButton = document.getElementById("searchButton");
// Todo list.
var todoList = document.getElementById("todo-list");
var addButton = document.getElementById("addTodo");

searchButton.addEventListener("click", function(event) {
    if (event.target.id === "searchButton") {
        multiPath(itemsToDisplay);
    }
});

addButton.addEventListener("click", function() {
    addTodo();
});
// input.addEventListener("keyup", function(event) {
//   if (document.activeElement === input && event.key === "Enter" && input.value !== "") {
//     addTodo();
//   }
// });

render();