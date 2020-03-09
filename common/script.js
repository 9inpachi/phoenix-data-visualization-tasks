// Miscellaneous

// Move actions box on drag

var actionsTitle = document.getElementById('actionsHead');
var actionsBox = document.getElementsByClassName('left-actions')[0];

var initX, initY, mouseX, mouseY;
actionsTitle.addEventListener('mousedown', function (emd) {
    initX = actionsBox.offsetLeft;
    initY = actionsBox.offsetTop;
    mouseX = emd.clientX;
    mouseY = emd.clientY;
    
    window.addEventListener('mousemove', moveActions, false);

    window.addEventListener('mouseup', function () {
        window.removeEventListener('mousemove', moveActions, false);
    });

});

function moveActions (e) {
    var xVal = initX + e.clientX - mouseX;
    var yVal = initY + e.clientY - mouseY;
    var rightLimit = window.innerWidth - actionsBox.clientWidth - 5;
    var bottomLimit = window.innerHeight - actionsBox.clientHeight - 5;
    
    if (!(xVal < 5) && !(xVal > rightLimit)) {
        actionsBox.style.left = xVal + 'px';
    }
    if (!(yVal < 5) && !(yVal > bottomLimit)) {
        actionsBox.style.top = yVal + 'px';
    }
}