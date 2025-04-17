const getLocation = (item: string): number | undefined => {
  for (let i = 0; i < itemList.length; i++) {
    // Starts at the first string.
    for (let j = 2; j < itemList[i].length; j++) {
      // Returns the array node.
      if (itemList[i][j] === item) {
        const location = itemList[i][1];
        if (Array.isArray(location) && typeof location[0] === 'number') {
          return location[0];
        }
      }
    }
  }
  return undefined; // Explicitly return undefined if no match is found.
}

const neighbors = (node: number[]): number[][] => {
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

const breadthSearch = (start: number[]): number[][][] => {
  const reached: number[][] = [start];
  const queue: number[][] = [start];
  const cameFrom: number[][] = [];
  for (let j: number = queue.length; j > 0; j++) {
      // As long as queue is greater than zero, each neighbor will be compared and either added
          // to reached, if it's not reached yet, or discarded.
      const currentNode: number[] = queue[j];
      if (typeof currentNode === "number") {
        const currentNeighbors: number[][] = neighbors(currentNode);
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
  }
  // Removes the first element from the reached array, since it's the "start" node.
  reached.shift();
  return [reached, cameFrom];
}

function singlePath(start: number[], goal: number[]) {
  // breadthSearch returns two arrays, one with all of the reached nodes, one with all of the cameFrom (reference) nodes.
  const [reached, cameFrom] = breadthSearch(start);
  const path = [];
  let current = goal;
  let currentIndex: number = 0;
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