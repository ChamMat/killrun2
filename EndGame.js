class EndGame {
    constructor(){

        this.canvas;
        this.init();
    }

    init = () => {
        this.canvas = document.querySelector("#GraphicsBox").getContext("2d");
    }

    run = () => {
        this.canvas.fillStyle = "#000"
        this.canvas.fillRect(0,0, 896, 592);

        this.canvas.fillStyle = "#FFF";
        this.canvas.textAlign = "center";
        this.canvas.font = `50px PressStart2P-Regular`;
        this.canvas.fillText("Game Over", 448, 175);
        this.canvas.font = `24px PressStart2P-Regular`;
        this.canvas.fillText("Thank you for playing my game", 448, 250);
        this.canvas.fillText("I hope you have enjoy!", 448, 300)

    }
}

export default EndGame;