# Task 1 for the Pheonix Interactive Event Visualization project

View online or use a web server to run the files.

## Loading and rotating geometry - [View](https://9inpachi.github.io/phoenix-data-visualization-tasks/task1/)
1. Used three.js to load 'Pix.obj', animated the object to rotate continuously and mapped buttons to its rotation.
2. Overlayed text over the canvas with sample text.
3. Added a click listener to the object so that on click the name set for the object can be shown along with the number of times it has been clicked.

## Particle tracking - [View 3D](https://9inpachi.github.io/phoenix-data-visualization-tasks/task2/) - [View 2D](https://9inpachi.github.io/phoenix-data-visualization-tasks/task2/index1.html)
1. Made a custom function for reading the csv files and converting them into JSON dictionary so that the data can be easily manipulated in javascript.
2. Used the JSON dictionary generated from csv to get the particles, hits for each particle and the position of each hit for both the detector data (event000000000-hits.csv) and the truth data (event000000000-truth.csv). Used the positions of these hits to visualize the track of each particle using three.js curves in both 2D (SplineCurve) and 3D (CubicBezierCurve3).
