class Menu {
    constructor(){
        this.canva;
        this.init();
        this.buttonReadyActive = false;
    }

    init = () => {
        this.canva = document.querySelector("#GraphicsBox").getContext("2d");
    }

    run = (img, mouseController, level) => {

        this.canva.fillStyle = "#000";
        this.canva.fillRect(0,0,892,589);
        
        const window = {w: 892, h: 596}
        const button = {w: 300, h: 150};
        const center = {x: 892/2, y: 596/2}
        const radius = 14;

        this.canva.fillStyle = "#fff";
        this.canva.strokeStyle = "#fff";
        
        if (
            mouseController.x > center.x - button.w/2 &&
            mouseController.x < center.x + button.w/2 &&
            mouseController.y > center.y - button.h / 2 &&
            mouseController.y < center.y + button.h / 2 
            ){

                if (mouseController.down){
                    this.canva.fillStyle = "#999";
                    this.canva.strokeStyle = "#999";
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
            this.canva.fillStyle = "#fff";
            this.canva.strokeStyle = "#fff";
            
            // this.canva.drawImage(img, center.x - button.w/2, center.y - button.h /2)


            // this.canva.fillRect(50,50,40,40);

            
                
        }

        this.canva.lineJoin = 'bevel';
        this.canva.lineWidth = 10;
        this.canva.strokeRect(center.x - button.w/2, center.y - button.h /2, button.w, button.h);
        this.canva.textAlign = "center";
        this.canva.font = `30px "PressStart2P-Regular"`;
        this.canva.fillText("Ready?", center.x, center.y+15);

        

        // console.log(mouseController)

        

    }
}

export default Menu;