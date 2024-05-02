// Grid nodes coordinated as:  height, grid[y]; width, grid[y][x]
// Note:  Entrance starts at [8, 49].
const grid = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1] 
];

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

function pathfinder(start, goal) {
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