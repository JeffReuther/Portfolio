// Sets up the grid.
function createGrid(length, height) {
    const allNodes = [];
    for (let x = 0; x < length; x++) {
        for (let y = 0; y < height; y++) {
            allNodes.push([x,y]);
        }
    }
    return allNodes;
}

// Returns an array of all possible grid nodes neighboring an input node. Four directions.
function neighbors(node, length, height) {
    const dirs = [[1,0], [0,1], [-1,0], [0,-1]];
    const result = [];
    for (const dir of dirs) {
        const calculation = [node[0] + dir[0], node[1] + dir[1]];
        // Removes options for numbers representing nodes outside of the grid (negative or too large).
        if (calculation[0] >=0 && calculation[1] >= 0 && calculation[0] < length && calculation[1] < height) {
            result.push(calculation);
        }
    }
    return result;
}

function breadthSearch(length, height, grid) {
    const reached = [];
    const frontier = [];
    const cameFrom = [];
    // Sets up the "starting" node; for now, top-left.
    frontier.push(grid[0]);
    reached.push(grid[0]);
    while (!(frontier.length === 0)) {
        // As long as frontier is not zero, each neighbor will be compared and either added
            // to reached, if it's not reached yet, or discarded.
        const currentNode = frontier.shift();
        const currentNeighbors = neighbors(currentNode, length, height);
        for (let i = 0; i < currentNeighbors.length; i++) {
            if (!
                (reached.some(arr => JSON.stringify(arr) === JSON.stringify(currentNeighbors[i])))
            ) {
                reached.push(currentNeighbors[i]);
                frontier.push(currentNeighbors[i]);
                // cameFrom will keep a separate array for each distinct node, one for each parent.
                cameFrom.push(currentNode);
                // console.log(`${currentNeighbors[i]} came from ${currentNode}`);
            }
        }
    }
    // Removes the first element from the reached array, since it's the "start" node.
    reached.shift();
    return [reached, cameFrom];
}

function pathfinder(length, height, start, goal) {
    const grid = createGrid(length, height);
    // breadth returns two arrays, one with all of the reached nodes, one with all of the cameFrom (reference) nodes.
    const breadth = breadthSearch(length, height, grid);
    const path = [];
    let current = goal;
    let currentIndex;
    while (current !== start) {
        // Look at the current (goal). Figure out which index it is.
        // Compare that index to the same array in cameFrom (breadth[1]).
        // Find the reached (breadth[0]) equivalent array. If it's not start, then repeat.
        // breadth[0] = reached, breadth[1] = cameFrom
        // Finds the index of the current node.
        for (let i = 0; i < breadth[0].length; i++) {
            if (breadth[0][i][0] === current[0] && breadth[0][i][1] === current[1]) {
                currentIndex = i;
                break;
            }
        }
        // For the entire length of the reached array.
        for (let j = 0; j < breadth[1].length; j++) {
            // If the cameFrom reference of the current node is found in the reached array.
            if (breadth[0][j][0] === breadth[1][currentIndex][0] && breadth[0][j][1] === breadth[1][currentIndex][1]) {
                // If we found the correct starting node, success!
                if (start[0] === breadth[1][currentIndex][0] && start[1] === breadth[1][currentIndex][1]) {
                    path.push(breadth[0][j]);
                    return path;
                } else {
                    path.push(breadth[0][j]);
                    current = breadth[0][j];
                }
            }
        }

    }
    return path;
}