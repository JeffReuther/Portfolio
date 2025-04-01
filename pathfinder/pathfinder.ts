const getLocation = (item: string): number => {
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
  const reached = [start];
  const queue = [start];
  const cameFrom = [];
  while (queue.length > 0) {
      // As long as queue is greater than zero, each neighbor will be compared and either added
          // to reached, if it's not reached yet, or discarded.
      const currentNode: number[] = queue.shift();
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
  // Removes the first element from the reached array, since it's the "start" node.
  reached.shift();
  return [reached, cameFrom];
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