// e is an optional parameter here.
function createGrid(gridSize, e = undefined, pencilOrEraser) {

    for (let i = 1; i <= gridSize; i++) {

        const subContainer = document.createElement('div');
        subContainer.setAttribute('class', 'subContainer');
        // subContainer.setAttribute('draggable', false);
        document.querySelector('#grid').appendChild(subContainer);

        for (let i = 1; i <= gridSize; i++) {
            const square = document.createElement('div');
            square.setAttribute('class', 'square');
            // square.setAttribute('draggable', false);
            subContainer.appendChild(square);
        }

    }
    fillSquareColor();
    // eraserWorking();
}

function fillSquareColor() {
    //  Below listener is in a function to be called again & 
    // again whenever we are creating grid without page refresh because 
    // when squares are removed on creating a new grid, below related 
    // listener does not work & has to be created again. 
    const getSquares = document.querySelectorAll('.square');
    getSquares.forEach(squareNod => {
        squareNod.addEventListener('mousemove', (e) => {
    // "The mousemove event is fired when a pointing device (usually a mouse) 
    // is moved while over an element." When you're dragging the element, mouse 
    // is not moving over it - instead it moves synchronously with the element. 
    // https://stackoverflow.com/questions/46186173/are-mousemove-events-disabled-while-dragging-an-element
    // So, to prevent drag:
            e.preventDefault(); 
            // works by preventing default handling of event i think. But documentation mentions default action prevention.  
            if (e.buttons == 1) {

                squareNod.style.background = 'black';
            }
        });

    });

}

function removePreviousGrid() {

    const gridNode = document.querySelector('#grid');

    while (gridNode.lastElementChild) {
        gridNode.removeChild(gridNode.lastElementChild);
    }

}

function pencilWorking() {

    const getSquares = document.querySelectorAll('.square');
    getSquares.forEach(squareNod => {
        squareNod.addEventListener('mousemove', (e) => {
            e.preventDefault(); 

            if (e.buttons == 1) {

                squareNod.style.background = 'black';
            }
        });

    });
}

function eraserWorking() {
    // debugger;
    const getSquares = document.querySelectorAll('.square');
    getSquares.forEach(squareNod => {
        squareNod.addEventListener('mousemove', (e) => {
            e.preventDefault(); 

            if (e.buttons == 1) {

                squareNod.style.background = '#FFFFFF';
            }
        });

    });
}

//  default grid at start:
createGrid(16);

const getGridSlider = document.getElementById('gridSlider');

const getGridText = document.getElementById('gridText');
getGridText.addEventListener('input', (e) => {
   
    if (e.target.value == null || e.target.value == '' || e.target.value > 100) {
        getGridText.value = 16;
    }

    removePreviousGrid();
    getGridSlider.value = getGridText.value;
    createGrid(getGridText.value);
    
});

// The input event is fired every time the value of the element changes. 
// This is unlike the change event, which only fires when the value is committed, 
// such as by pressing the enter key, selecting a value from a list of options, and the like.
getGridSlider.addEventListener('input', () => {
    // How below line was working? Also with const!
    // const sliderSize = document.getElementById('gridText').value = e.target.value;

    // <<e>> is an object of event giving information about it & <<target>> represents element itself:
    // let sliderSize = e.target.value;

    getGridText.value = getGridSlider.value;
    removePreviousGrid();
    createGrid(getGridSlider.value);

});

const buttonResetGrid = document.getElementById('btnResetGrid');
buttonResetGrid.addEventListener('click', () => {
    // debugger;
    removePreviousGrid();
    createGrid(16);
    getGridSlider.value = 16;
    document.getElementById('gridText').value = 16;
});

const buttonRandomGrid = document.getElementById('btnRandomGrid');
buttonRandomGrid.addEventListener('click', (e) => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    removePreviousGrid();
    createGrid(randomNum);
    getGridSlider.value = randomNum;
    document.getElementById('gridText').value = randomNum;
});

const buttonPencil = document.getElementById('btnPencil');
buttonPencil.addEventListener('click', pencilWorking);
const buttonEraser = document.getElementById('btnEraser');
buttonEraser.addEventListener('click', eraserWorking);






