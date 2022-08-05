window.onload = () => {
    let othello = document.getElementById("othello");
    for (let row = 0; row < 8; row++) {
        let tr = document.createElement("tr");
        othello.appendChild(tr);
        for (let col = 0; col < 8; col++) {
            let td = document.createElement("td");
            td.addEventListener("click", { handleEvent: onClick, board: board, row: row, col: col });
            tr.appendChild(td);
        }
    }
    showboard();
}

let turn = 1;

const board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

function onClick() {

    let count = 0;
    for (const direction of directions) {
        count += check(turn, this.col, this.row, direction, board);
    }
    if (count == 0) {
        document.getElementById('message').innerHTML = "<h3>その場所には置けません</h3>";
        return;
    } else {
        board[this.row][this.col] = turn;
    }
    for(const directon of directions) {
        reverse(turn, this.col, this.row, directon, board);
    }
    if (turn === 1) {
        document.getElementById('message').innerHTML = "<h3>白の番です</h3>";
        turn = 2;
    } else {
        document.getElementById('message').innerHTML = "<h4>黒の番です</h4>";
        turn = 1;
    }
    showboard();
}

function showboard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board[row][col] === 1) {
                const td = document.getElementsByTagName("td")[row * 8 + col];
                if (td.childNodes.length === 0) {
                    td.appendChild(createBlack());
                } else {
                    td.replaceChild(createBlack(), td.firstChild);
                }
            } else if (board[row][col] === 2) {
                const td = document.getElementsByTagName("td")[row * 8 + col];
                if (td.childNodes.length === 0) {
                    td.appendChild(createWhite());
                } else {
                    td.replaceChild(createWhite(), td.firstChild);
                }
            }
        }
    }
}

function createBlack() {
    let black = document.createElement("img");
    black.src = "images/black.png";
    black.classList.add("koma");
    return black;
}
function createWhite() {
    let white = document.createElement("img");
    white.src = "images/white.png";
    white.classList.add("koma");
    return white;
}


function checkRange(x, y) {
    if (x < 0 || x >= 8 || y < 0 || y >= 8) {
        return false;
    }
    return true;
}



// 上、下、左、右、左上、左下、右上、右下 
const directions = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];

function reverse(discColor, currentX, currentY, direction, board) {

    const count = check(discColor, currentX, currentY, direction, board);
    if (count == 0) {
        return;
    }
    let x = currentX + direction[0];
    let y = currentY + direction[1];
    for (let i = 0; i < count; i++) {
        board[y][x] = discColor;
        x += direction[0];
        y += direction[1];
    }
}

function check(discColor, currentX, currentY, direction, board) {
    let x = currentX + direction[0];
    let y = currentY + direction[1];
    let count = 0;
    while (true) {
        if (!checkRange(x, y)) {
            return 0;
        }
        if (board[y][x] == 0) {
            return 0;
        }
        if (board[y][x] != discColor) {
            count++;
        }
        if (board[y][x] == discColor) {
            return count;
        }
        x += direction[0];
        y += direction[1];
    }
}


