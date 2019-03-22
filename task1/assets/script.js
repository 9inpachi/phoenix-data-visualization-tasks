var objContainer = document.getElementById('objectContainer');
var theObject, camera, scene, renderer, clickCounter = 0;
var objectInfo = document.getElementById('objectInfo');
var overlayTxt = document.getElementById('overlayTxt');

function objectClickHandler() {
    objectInfo.innerHTML = "The clicked object name is: " + this.name;
    overlayTxt.innerHTML = "The object has been clicked: " + (++clickCounter) + " times.";
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, (window.innerWidth) / window.innerHeight, 0.1,
        6000);
    camera.position.z = -4000;

    //Adding lightening for better visibility
    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);
    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);

    scene.add(camera);

    //Initializing texture to add to the object
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('assets/texture.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);

    //Creating Object3D group to add the object to make it accessible outside the callback
    theObject = new THREE.Object3D();
    //Adding the object / Loading the geometry
    var loader = new THREE.OBJLoader();
    loader.load('assets/Pix.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.position.set(0, 0, 0);
        object.traverse(function (child) {
            if (child.isMesh){
                child.material.side = THREE.DoubleSide;
                child.material.map = texture;
            }
        });
        //Initially rotating this object for better position
        object.rotation.y = Math.PI / 2;
        object.name = 'Pix Object';
        object.callback = objectClickHandler;
        theObject.add(object);
        scene.add(theObject);
    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function (err) {
        console.error(err);
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    objContainer.appendChild(renderer.domElement);
}

function animate() {
    theObject.rotation.z += 0.001;
    theObject.rotation.y += 0.001;
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

//Task 1 - 1 | Rotating the object (with buttons)
var rotateY = document.getElementById('rotateY');
rotateY.onclick = function () {
    if (theObject) {
        theObject.rotation.y += 0.2;
    }
}
var rotateX = document.getElementById('rotateX');
rotateX.onclick = function () {
    if (theObject) {
        theObject.rotation.x += 0.2;
    }
}
var rotateZ = document.getElementById('rotateZ');
rotateZ.onclick = function () {
    if (theObject) {
        theObject.rotation.z += 0.2;
    }
}

window.onload = function () {

    init();
    animate();

    objContainer.onwheel = function (e) {
        if (e.deltaY > 0) {
            camera.position.z -= 50;
        } else if (e.deltaY < 0) {
            camera.position.z += 50;
        }
    }

    var mouse = new THREE.Vector2();
    var raycaster = new THREE.Raycaster();

    //Task 1 - 3 | Display info on object click
    function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            intersects[0].object.parent.callback();
        }
    }

    function onDocumentMouseMove(event) {
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        var canvas = document.body.getElementsByTagName('canvas')[0];
        if (intersects.length > 0) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }
    }
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}