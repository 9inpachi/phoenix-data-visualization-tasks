//MAIN PROGRAM START
var csvInJSON;
var objContainer = document.getElementById('objectContainer');
var camera, scene, renderer;
var particlesGroup = new THREE.Group();
particlesGroup.name = 'ParticlesGroup';
var overlayTxt = document.getElementById('overlayTxt');

init();
animate();
showData('detector');

objContainer.onwheel = function (e) {
    if (e.deltaY > 0) {
        camera.position.z -= 10;
    } else if (e.deltaY < 0) {
        camera.position.z += 10;
    }
}

//MAIN PROGRAM END

//FUNCTIONS
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, (window.innerWidth) / window.innerHeight, 0.1, 6000);
    camera.position.z = -2500;

    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    objContainer.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

function readCsvFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                callback(csvToJSON(allText));
            }
        }
    }
    rawFile.send(null);
}

//Show the data according to the type requested
function showData(type) {

    //Remove already existong particles group
    if (type != '') {
        scene.remove(particlesGroup);
        particlesGroup = new THREE.Group();
    }

    if (type == 'true')
        overlayTxt.innerHTML = 'Showing "True Data"';
    else if (type == 'detector')
        overlayTxt.innerHTML = 'Showing "Detector Data"';

    readCsvFile('assets/event000000000-truth.csv', function (dataTruth) {
        readCsvFile('assets/event000000000-hits.csv', function (dataHits) {
            var allParticles = [];

            //Go through all the data to give a collection of points to each particle
            for (var i = 0; i < dataTruth.length; i++) {
                var particle = {};
                var particlePoints = [];
                var particleInArr = false;

                //Check if the particle id is already there
                for (var j = 0; j < allParticles.length; j++) {
                    if (dataTruth[i].particle_id == allParticles[j].particle_id) {
                        if (type == 'true') {
                            particlePoints.push(dataTruth[i].tx);
                            particlePoints.push(dataTruth[i].ty);
                            particlePoints.push(dataTruth[i].tz);
                        } else {
                            particlePoints.push(dataHits[i].x);
                            particlePoints.push(dataHits[i].y);
                            particlePoints.push(dataHits[i].z);
                        }
                        allParticles[j]['particle_points'].push(particlePoints);
                        particleInArr = true;
                    }
                }

                //If particle is not already in array
                if (!particleInArr) {
                    particle['particle_id'] = dataTruth[i].particle_id;
                    particle['particle_points'] = [];
                    if (type == 'true') {
                        particlePoints.push(dataTruth[i].tx);
                        particlePoints.push(dataTruth[i].ty);
                        particlePoints.push(dataTruth[i].tz);
                    } else {
                        particlePoints.push(dataHits[i].x);
                        particlePoints.push(dataHits[i].y);
                        particlePoints.push(dataHits[i].z);
                    }
                    particle['particle_points'].push(particlePoints);
                    allParticles.push(particle);
                }
            }

            //Going through each particle then converting each set of points to float to create 3d vectors
            for (var i = 0; i < allParticles.length; i++) {
                var vectorArr = [];
                for (var j = 0; j < allParticles[i].particle_points.length; j++) {
                    vectorArr[j] = new THREE.Vector3(
                        parseFloat(allParticles[i].particle_points[j][0]),
                        parseFloat(allParticles[i].particle_points[j][1]),
                        parseFloat(allParticles[i].particle_points[j][2])
                    );
                }

                //Generating the curve line for each particle
                var curve = new THREE.SplineCurve(vectorArr);
                var points = curve.getPoints(50);
                var geometry = new THREE.BufferGeometry().setFromPoints(points);
                color = new THREE.Color(0xffffff);
                color.setHex(Math.random() * 0xffffff);
                var material = new THREE.LineBasicMaterial({
                    color: color
                });
                var splineObject = new THREE.Line(geometry, material);
                particlesGroup.add(splineObject);
            }
            scene.add(particlesGroup);
        });
    });
}

//  Dictionary with object with array under each header
// function csvToJSON(csvString){
//   var allLines = csvString.split('\n');
//   var headers = allLines[0].split(',');
//   var csvJSON = {};
//   for(var i=0; i<headers.length; i++){
//     csvJSON[headers[i]] = [];
//   }
//   for(var i=1; i<allLines.length-1; i++){
//     var rowArr = allLines[i].split(',');
//     for(var j=0; j<rowArr.length; j++){
//       csvJSON[headers[j]].push(parseFloat(rowArr[j]));
//     }
//   }
//   return csvJSON;
// }
