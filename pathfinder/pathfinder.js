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
        // If the neighboring node is within the bounds of the grid.
        if (calculation[0] >=0 && calculation[1] >= 0 && calculation[0] < 9 && calculation[1] < 56) {
            // If the neighboring node is not a wall.
            if (grid[calculation[0]][calculation[1]] === 0) {
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

    locationNodes.unshift([8, 49]);
    locationNodes.push([8, 49]);
    for (let j = 1; j < locationNodes.length; j++) {
        const result = singlePath(locationNodes[j - 1], locationNodes[j]);
        fullPath = [...fullPath, ...result];
    }
    return fullPath;
}

// Note:  Entrance starts at [8, 49].
const grid = [
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
const itemList = [
    ['aisle_a', [3,55,0], 'precooked'],
//  ['aisle_a_2], [0,55,01], 'fish'],
    ['aisle_b', [3,52,1], 'produce'],
    ['aisle_c', [3,49,2], 'bakery'],
    ['aisle_1', [3,46,3], 'gluten'],
    ['aisle_2', [3,44,4], 'superfoods'],
    ['aisle_3', [3,42,5], 'vitamins'],
    ['aisle_4', [3,40,6], 'diapers'],
    ['aisle_5', [3,38,7], 'card shop_a'],
    ['aisle_6', [3,36,8], 'card shop_b'],
    ['aisle_7', [3,34,9], 'cookware'],
    ['aisle_8', [3,32,10], 'candles'],
    ['aisle_9', [3,30,11], 'beer_a'],
    ['aisle_10', [3,28,12], 'beer_b'],
    ['aisle_11', [3,26,13], 'beer_c'],
    ['aisle_12', [3,24,14], 'wine'],
    ['aisle_13', [3,22,15], 'candy'],
    ['aisle_14', [3,20,16], 'trail mix'],
    ['aisle_15', [3,18,17], 'cookies'],
    ['aisle_16', [3,16,18], 'soda_a'],
    ['aisle_17', [3,14,19], 'seltzer'],
    ['aisle_18', [3,12,20], 'soda_b'],
    ['aisle_19', [3,10,21], 'energy drinks'],
    ['aisle_20', [3,8,22], 'coffee'],
    ['aisle_21', [3,6,23], 'baking'],
    ['aisle_22', [3,4,24], 'dish soap'],
    ['aisle_23', [3,2,25], 'cleaning'],
    ['aisle_24', [3,0,26], 'paper towels']
];