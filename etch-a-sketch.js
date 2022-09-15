// e is an optional parameter here.
function createGrid(gridSize) {

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
    const inputColorNode = document.getElementById('inputColor').value;
    fillSelectedColor(inputColorNode);
    // eraserWorking();
}



function fillSelectedColor(inputColorNode = '#111111') { // <== use black color if none selected

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
            // So, to prevent drag on trying to hold and move mouse :
            e.preventDefault();
            // works by preventing default handling of event i think. But documentation mentions default action prevention.  
            if (e.buttons == 1) {
                // could call the inputColor function here, but it would have called that function 
                // again & again instead of just at changing color at color input.
                squareNod.style.background = inputColorNode;
            }
        });
        //  to also allow color fill on the simple click too:
        squareNod.addEventListener('click', (e) => {
            e.preventDefault();
            squareNod.style.background = inputColorNode;
        })


    });

}

function fillRandomColors() {
        // listener does not work & has to be created again. 
        const getSquares = document.querySelectorAll('.square');
        getSquares.forEach(squareNod => {
            squareNod.addEventListener('mousemove', (e) => {

                e.preventDefault();

                if (e.buttons == 1) {
                    squareNod.style.background = createRandomHsl();
                    // squareNod.removeEventListener('mousemove', e);
                }
            });

            squareNod.addEventListener('click', (e) => {

                squareNod.style.background = createRandomHsl();
                // squareNod.removeEventListener('click', e);
            });
    
    
        });
}

function createRandomHsl() {
    const randomHsl = `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
    return randomHsl;
}

function removePreviousGrid() {

    const gridNode = document.querySelector('#grid');

    while (gridNode.lastElementChild) {
        gridNode.removeChild(gridNode.lastElementChild);
    }

}

function pencilWorking() {
    // changing button colors to indicate active button & remove 
    //  previously active button:
    const buttonPencil = document.getElementById('btnPencil');
    buttonPencil.style.background = '#3D9970';
    const buttonEraser = document.getElementById('btnEraser');
    buttonEraser.style.background = '#FF851B';


    const getSquares = document.querySelectorAll('.square');
    getSquares.forEach(squareNod => {
        squareNod.addEventListener('mousemove', (e) => {

            e.preventDefault();

            if (e.buttons == 1) {
                debugger;
                const inputColorNode = document.getElementById('inputColor').value;
                squareNod.style.background = inputColorNode;
                
            }
        });

        squareNod.addEventListener('click', (e) => {

            // e.preventDefault();

            if (e.buttons == 1) {
                debugger;
                const inputColorNode = document.getElementById('inputColor').value;
                squareNod.style.background = inputColorNode;
                // debugger;
            }
        });

    });

    // const inputColorNode = document.getElementById('inputColor').value;
    // fillSelectedColor(inputColorNode);
}

function eraserWorking() {

    const buttonEraser = document.getElementById('btnEraser');
    buttonEraser.style.background = '#3D9970';
    const buttonPencil = document.getElementById('btnPencil');
    buttonPencil.style.background = '#FF851B';

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

const inputColorNode = document.getElementById('inputColor');
//  if input color is other than black, then add the listener with that instead. 
inputColorNode.onchange = (e) => fillSelectedColor(inputColorNode.value);

const buttonResetGrid = document.getElementById('btnResetGrid');
buttonResetGrid.addEventListener('click', () => {

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

const buttonRainbow = document.getElementById('btnRainbow');
buttonRainbow.addEventListener('click', fillRandomColors)

function fillSquares(inputColor = '#111111', colorPencil = 'false') {
    // for default sketch...
    const inputColorNode = document.getElementById(inputColor);
    const getSquares = document.querySelectorAll('.square');
    getSquares.forEach(squareNod => {
        squareNod.addEventListener('mousemove', (e) => {
            // "The mousemove event is fired when a pointing device (usually a mouse) 
            // is moved while over an element." When you're dragging the element, mouse 
            // is not moving over it - instead it moves synchronously with the element. 
            // https://stackoverflow.com/questions/46186173/are-mousemove-events-disabled-while-dragging-an-element
            // So, to prevent drag on trying to hold and move mouse :
            e.preventDefault();
            // works by preventing default handling of event i think. But documentation mentions default action prevention.  
            if (e.buttons == 1) {
                // could call the inputColor function here, but it would have called that function 
                // again & again instead of just at changing color at color input.
                squareNod.style.background = inputColorNode;
            }
        });
        //  to also allow color fill on the simple click too:
        squareNod.addEventListener('click', (e) => {
            e.preventDefault();
            squareNod.style.background = inputColorNode;
        })


    });

}






