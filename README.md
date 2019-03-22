# Tasks for Pheonix - Interactive 3D Data Visualization Project

Use a web server to run the files.

# Task 1
1- Used three.js to load 'Pix.obj', animated the object to rotate continuously and mapped buttons to its rotation.
2- Overlayed text over the canvas with sample text.
3- Added a click listener to the object so that on click the name set for the object can be shown along with the number of times it has been clicked.

# Task 2
1- Made a custom function for reading the csv file and converted it into JSON dictionary so that the data can be easily manipulated in javascript.
2- Used the JSON dictionary generated from csv to get the particles, hits for each particle and the position of each hit for both the detector data (event000000000-hits.csv) and the truth data (event000000000-truth.csv). Used the positions of these hits to visualize the track of each particle using three.js curves in both 2D (SplineCurve) and 3D (CubicBezierCurve3).
