import Personnage from "./Personnnages.js";

class BodyGuard extends Personnage{
    constructor(name, id, x, y) {
        super(name, id, x, y);

        this.mental = "calme";
        this.mentalTimer = 10000;
        this.limiteMentalTimer = Math.floor(Math.random()*6000)+2000;
        this.moveSpeed = Math.floor(Math.random()*(2))+.5;
        this.interogatif = false;
        this.interogatifTimer = 0;
        this.alerte = false;

    }

    update = (gameSettings, map, hero) => {
        if (this.enable){
            if (!this.death){
                this.wallPosition(map);
                this.intelligence(hero, map);
                this.gravity(gameSettings.gravity);
                this.animation(gameSettings.gameSpeed);
                this.updatePosition();  
            }else{
                this.gravity(gameSettings.gravity);
                this.animation(gameSettings.gameSpeed);
            }
        }
    }

    intelligence = (hero, map) => {
        
        const visionLimite = 10;
        const tempsReaction = 1000;
        const interogatifLimite = 25;

        // Vision du perso
        if (this.posName.y === hero.posName.y){

            if (
                (this.direction && this.posName.x < hero.posName.x) || 
                (!this.direction && this.posName.x > hero.posName.x)
            )
            {
                for (
                    let x = 0;
                    Math.abs(x) < visionLimite;
                    this.direction ? x +=1: x -=1
                    ){
                        // Le personnage vois le hero
                    if (parseInt(this.posName.x + x) === hero.posName.x){    
                        this.interogatif = true;
                        this.mental = "calme";
                        this.mentalTimer = 0;
                        this.limiteMentalTimer = tempsReaction
                        this.interogatifTimer +=1;
                        x += visionLimite
                        break;
                    }else {
                        // La vision est bloqué par un obstacle
                        if (map[`x${parseInt(this.posName.x + x)}y${this.posName.y}`] != undefined){
                            this.interogatifTimer = 0;
                            break;
                        }
                    }
                }

                if (this.interogatifTimer >= interogatifLimite || this.alerte){
                    this.alerte = true;
                }
            }

        }

        let rand = Math.floor(Math.random()*2);

        if (this.mentalTimer >= this.limiteMentalTimer){
            if (!this.interogatif && !this.alerte){
                switch(rand){
                    case 0:
                        this.mental= "calme";
                        Math.floor(Math.random()*2) === 0 ? this.direction = true: this.direction = false;
                        break;
                    case 1:
                        this.mental = "ennuie"
                        Math.floor(Math.random()*2) === 0 ? this.direction = true: this.direction = false;
                        break;
                }
            }
            this.limiteMentalTimer = Math.floor(Math.random()*6000)+2000;
            this.interogatif = false;
            this.mentalTimer = 0;
        }else{
            this.mentalTimer += 25;
        }


        switch(this.mental){
            case "calme":
                this.upLoadAction("idle");
                break;
            case "ennuie":
                this.direction && this.wallDetect.hands.right ? this.direction = false : "";
                !this.direction && this.wallDetect.hands.left ? this.direction = true : "";

                this.upLoadAction("walk");
                break;
        }


    }
    
    upLoadAction = (action) => {

        switch(action){
            case "idle":
                this.newAction = "idle"
                break;
            case "walk":
                this.newAction = "walk"
                this.direction ? this.move("right", this.moveSpeed) : this.move("left", this.moveSpeed);
                break;
            case "jump":
                this.jump = true;
                this.jumpPower = this.defaultJumpPower;
                this.wallDetect.foot.left = false;
                this.wallDetect.foot.right = false;
                break;
            default:
                this.newAction = "idle";
                break;
        }
    }

    deathFunc = () => {
        this.death = true;
        this.newAction = "death";
        this.interogatif = false;
        this.alerte = false;
    }

}

export default BodyGuard;