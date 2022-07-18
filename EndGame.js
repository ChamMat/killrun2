class EndGame {
    constructor(){

        this.canvas;
        this.init();
    }

    init = () => {
        this.canvas = document.querySelector("#GraphicsBox").getContext("2d");
    }

    run = (mouseController, level) => {
        this.canvas.fillStyle = "#000"
        this.canvas.fillRect(0,0, 896, 592);

        this.canvas.fillStyle = "#FFF";
        this.canvas.textAlign = "center";
        this.canvas.font = `50px PressStart2P-Regular`;
        this.canvas.fillText("Game Over", 448, 175);
        this.canvas.font = `24px PressStart2P-Regular`;
        this.canvas.fillText("Thank you for playing my game", 448, 250);
        this.canvas.fillText("I hope you have enjoy!", 448, 300)

        
        const window = {w: 892, h: 596}
        const button = {w: 400, h: 150};
        const center = {x: 892/2, y: 450}
        const radius = 14;

        this.canvas.fillStyle = "#fff";
        this.canvas.strokeStyle = "#fff";
        
        if (
            mouseController.x > center.x - button.w/2 &&
            mouseController.x < center.x + button.w/2 &&
            mouseController.y > center.y - button.h / 2 &&
            mouseController.y < center.y + button.h / 2 
            ){

                if (mouseController.down){
                    this.canvas.fillStyle = "#999";
                    this.canvas.strokeStyle = "#999";
                    this.buttonReadyActive = true;
                }

                if (
                    mouseController.up &&
                    this.buttonReadyActive &&
                    mouseController.lastDownX > center.x - button.w/2 &&
                    mouseController.lastDownX < center.x + button.w/2 &&
                    mouseController.lastDownY > center.y - button.h / 2 &&
                    mouseController.lastDownY < center.y + button.h / 2 
                ){
                    
                    
                    level();
                }
                
            }else {
            this.buttonReadyActive = false;
            this.canvas.fillStyle = "#fff";
            this.canvas.strokeStyle = "#fff";
            
            // this.canvas.drawImage(img, center.x - button.w/2, center.y - button.h /2)


            // this.canvas.fillRect(50,50,40,40);

            
                
        }

        this.canvas.lineJoin = 'bevel';
        this.canvas.lineWidth = 10;
        this.canvas.strokeRect(center.x - button.w/2, center.y - button.h /2, button.w, button.h);
        this.canvas.textAlign = "center";
        this.canvas.font = `30px "PressStart2P-Regular"`;
        this.canvas.fillText("Restart ?", center.x, center.y+15);

    }
}

export default EndGame;