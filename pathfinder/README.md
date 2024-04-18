This project was created for two reason:
1.  To make an app to help map out my local grocery store, or any location, so that I can most efficiently find products.
2.  To make a JavaScript pathfinding algorithm that uses basic, vanilla JavaScript.

I plan to implement it in such a way that items can be added, as with a todo list, and the app will enter/exit, navigate walls, and provide an estimated time for the trip.

As it stands, there are three functions:  neighbors, breadthSearch, and pathfinder. Pathfinder is user-facing and accepts length, height, start, and goal parameters. Using length and height, we can create the grid, and using start and goal, we can iterate over that grid. breadthSearch does an entire iteration over the grid, starting from the start. It uses the neighbors function to check each node next to the current, checking left, right, up, and down in that order. If it finds a useable node, breadthSearch adds it to the returned array of nodes. The cameFrom array is the reference array which "points" back to the starting node. Each array in the cameFrom array, if used in conjunction with the returned array, will form a list of "pointer" array objects leading back to the starting node. Pathfinder will then return the list that links goal to start.
