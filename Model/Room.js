const combinations = require('./../winCombination.json');

class Room {
    constructor(props){      
        this.name = props.name; // Название комнаты
        this.users = []; // Название комнаты
        this.X = null; // Крестик
        this.O = null; // Нолик
        this.S = []; // Зрители
        this.grid = [
            ['','',''],
            ['','',''],
            ['','',''],
        ];
        this.turn = 'X';
        this.moveCounter = 0;
    }

    gameState () {
        return {
            grid: this.grid,
            turn: this.turn,
            end: this.endGame()
        }
    }
    makeMove (row, cell ,userId) {
        let symbol = this.userStatus(userId);
        this.grid[row][cell] = symbol;
        this.moveCounter++;
        this.checkWinCombination();
        this.nextTurn();
        return this.grid;
    }
    nextTurn () {
        this.turn = (this.turn === "X")?"O":"X";
    }
    include (userId) {
        if(!this.X){
            this.X = userId;
        }else if(!this.O){
            this.O = userId;
        }else{
            this.S.push(userId);
        }

        this.users.push(userId);
        return this.userStatus(userId);
    }
    exclude (userId) {
        if(this.X === userId) this.X = null;
        if(this.O === userId) this.O = null;
        if(this.S.includes(userId)){
            this.S = this.S.filter((s)=> s !== userId );
        }
        this.users = this.users.filter((u)=> u !== userId);
    }
    userStatus (userId){
        if(this.S.includes(userId)){
            return "S";
        }
        if(userId === this.X){
            return "X"
        }
        if(userId === this.O){
            return "O"
        }
    }

    restart (){
        this.grid = [
            ['','',''],
            ['','',''],
            ['','',''],
        ];
        this.turn = 'X';
        this.moveCounter = 0;
        return this.gameState();
    }
    endGame () {
        if(this.checkWinCombination()){
            return "Победил " + this.turn;
        }
        if(this.moveCounter === 9){
            return "Ничья"
        }
        return '';
    }
    checkWinCombination () {
        if(this.moveCounter < 3) return false;

        let win = false;
        let counter = 0;

        for(let c = 0; combinations.length > c; c++){
            for(let r = 0; combinations[c].length > r;r++){
                for( let i = 0; combinations[c][r].length > i;i++){
                    if(combinations[c][r][i] && (this.grid[r][i] === this.turn)) counter++;
                }
            }
            if(counter === 3){
                win = true;
                break;
            }
        }

        return win;
    }

}

module.exports = Room;