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
  
  function breadthSearch(length, height, start) {
    const reached = [start];
    const queue = [start];
    const cameFrom = [];
    while (queue.length > 0) {
        // As long as queue is greater than zero, each neighbor will be compared and either added
            // to reached, if it's not reached yet, or discarded.
        const currentNode = queue.shift();
        const currentNeighbors = neighbors(currentNode, length, height);
        for (let i = 0; i < currentNeighbors.length; i++) {
            if (!
                (reached.some(arr => JSON.stringify(arr) === JSON.stringify(currentNeighbors[i])))
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
  
  function pathfinder(length, height, start, goal) {
    // breadthSearch returns two arrays, one with all of the reached nodes, one with all of the cameFrom (reference) nodes.
    const [reached, cameFrom] = breadthSearch(length, height, start);
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