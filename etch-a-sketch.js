// e is an optional parameter here.

let typeFlag = 'singleColor';

function createGrid(gridSize) {

    for (let i = 1; i <= gridSize; i++) {

        const subContainer = document.createElement('div');
        subContainer.setAttribute('class', 'subContainer');
        document.querySelector('#grid').appendChild(subContainer);

        for (let i = 1; i <= gridSize; i++) {
            const square = document.createElement('div');
            square.setAttribute('class', 'square');
            subContainer.appendChild(square);
        }

    }

    fillSquares();

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

function changeButtonColor(e) {

    switch (e.target.id) {
        case 'btnSingle':
        case 'inputColor':
            {
                const buttonPencil = document.getElementById('btnSingle');
                buttonPencil.style.background = '#3D9970';
                const buttonEraser = document.getElementById('btnEraser');
                buttonEraser.style.background = '#FF851B';
                const buttonRainbow = document.getElementById('btnRandom');
                buttonRainbow.style.background = '#FF851B';
                break;
            }
        case 'btnEraser':
            {
                const buttonPencil = document.getElementById('btnSingle');
                buttonPencil.style.background = '#FF851B';
                const buttonEraser = document.getElementById('btnEraser');
                buttonEraser.style.background = '#3D9970';
                const buttonRainbow = document.getElementById('btnRandom');
                buttonRainbow.style.background = '#FF851B';
                break;
            }
        case 'btnRandom':
            {
                const buttonPencil = document.getElementById('btnSingle');
                buttonPencil.style.background = '#FF851B';
                const buttonEraser = document.getElementById('btnEraser');
                buttonEraser.style.background = '#FF851B';
                const buttonRainbow = document.getElementById('btnRandom');
                buttonRainbow.style.background = '#3D9970';
                break;
            }
    }

}

function fillSquares(e = undefined, count = 0) {

    const inputColorNode = document.getElementById('inputColor').value;
    const getSquares = document.querySelectorAll('.square');
    //  Below listener is in a function to be called again & 
    // again whenever we are creating grid without page refresh because 
    // when squares are removed on creating a new grid, below related 
    // listener does not work & has to be created again. 
    getSquares.forEach(squareNod => {
        squareNod.addEventListener('mousemove', (e) => {
            // "The mousemove event is fired when a pointing device (usually a mouse) 
            // is moved while over an element." When you're dragging the element, mouse 
            // is not moving over it - instead it moves synchronously with the element. 
            // https://stackoverflow.com/questions/46186173/are-mousemove-events-disabled-while-dragging-an-element
            // So, to prevent drag on trying to hold and move mouse :
            // e.preventDefault();
            // works by preventing default handling of event i think. But documentation mentions default action prevention. 
            //  We are preventing drag on mousemove on squares here.
            e.preventDefault();
        });
        squareNod.addEventListener('mouseover', (e) => {

            if (e.buttons == 1) { // only fill if left click is pressed during move

                switch (typeFlag) {
                    case 'singleColor':
                    case 'selectedColor':
                        // to choose whether to use color pencil or simple
                        // could call the inputColor function here, but it would have called that function 
                        // again & again instead of just getting color at color input.
                        squareNod.style.background = inputColorNode;
                        break;

                    case 'randomColor':
                        squareNod.style.background = createRandomHsl();
                        count += 1;
                        // console.log(count);
                        if (count == 10) {
                            //  Black square on every 10th square:
                            squareNod.style.background = '#111111';
                            count = 0;
                        }
                        break;

                    case 'eraser':
                        squareNod.style.background = '#FFFFFF';
                        break;
                }
            }
        });
        //  to also allow actions on the simple click & starting pressed square too:

        squareNod.addEventListener('mousedown', (e) => {

            switch (typeFlag) {
                case 'singleColor':
                case 'selectedColor':
                    squareNod.style.background = inputColorNode;
                    break;
                case 'randomColor':
                    squareNod.style.background = createRandomHsl();
                    count += 1;
                    if (count == 10) {
                        squareNod.style.background = '#111111';
                        count = 0;
                    }
                    break;
                case 'eraser':
                    squareNod.style.background = '#FFFFFF';
                    break;

            }

        });


    });

}

//  default grid at start:
createGrid(16);

const getGridSlider = document.getElementById('gridSlider');

const getGridText = document.getElementById('gridText');

getGridSlider.value = 16;
document.getElementById('gridText').value = 16;

getGridText.addEventListener('input', (e) => {
    const input = e.target.value
    if (input == null || input > 64 || input < 0 || typeof(+input) !== 'number') {
        getGridText.value = 1;
    }

    removePreviousGrid();
    if (getGridText.value == '') {
    getGridSlider.value = 0;
    }else
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
    if (getGridSlider.value < 1) {
        getGridSlider.value = 0;
    }
    
    removePreviousGrid();
    createGrid(getGridSlider.value);

});

const inputColorNode = document.getElementById('inputColor');
// oninput event occurs immediately after the value of an element has changed, 
// while onchange occurs when the element loses focus, after the content has been changed.
// inputColorNode.oninput = (e) => fillSquares(e);

inputColorNode.addEventListener('input', e => {
    typeFlag = 'selectedColor';
    // changing button colors to indicate active button & remove 
    //  previously active button:
    changeButtonColor(e);
    fillSquares(e)
});

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

//  below flag is used to alternate between simple, eraser & color modes: 

const buttonPencil = document.getElementById('btnSingle');
buttonPencil.addEventListener('click', e => {

    typeFlag = 'singleColor';
    // changing button colors to indicate active button & remove 
    //  previously active button:
    changeButtonColor(e);
    fillSquares(e)
});


const buttonRainbow = document.getElementById('btnRandom');
buttonRainbow.addEventListener('click', e => {
    let count = 0;
    typeFlag = 'randomColor';
    changeButtonColor(e);
    fillSquares(e, count);
});

const buttonEraser = document.getElementById('btnEraser');
buttonEraser.addEventListener('click', e => {
    typeFlag = 'eraser';
    changeButtonColor(e);
    fillSquares(e);
});








