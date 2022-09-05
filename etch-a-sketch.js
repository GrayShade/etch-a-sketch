function createGrid(gridSize, e = undefined) {

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

}

function removePreviousGrid() {
    const subContainer = document.querySelectorAll('.subContainer');

    subContainer.forEach(squareRow => {

        document.querySelector('#grid').removeChild(squareRow);

    });
}

createGrid(16);

const BtnCreateGrid = document.getElementById('BtnCreateGrid');
BtnCreateGrid.addEventListener('click', (e) => {

    let gridSize = document.getElementById('gridText').value;
    // debugger;
    if (gridSize == null || gridSize == '') {
        gridSize = 16;
    }
    
    removePreviousGrid();
    createGrid(gridSize, e);

    //  emptying grid
    document.getElementById('gridText').value = ''


})

// BtnCrea
// const 
// createGrid(16);




