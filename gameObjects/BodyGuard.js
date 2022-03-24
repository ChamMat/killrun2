import Personnage from "./Personnnages.js";

class BodyGuard extends Personnage{
    constructor(name, id, x, y) {
        super(name, id, x, y);

        this.mental = "calme";
        this.mentalTimer = 10000;
        this.limiteMentalTimer = Math.floor(Math.random()*6000)+2000;
        this.moveSpeed = Math.floor(Math.random()*(2))+.5;
        this.interogatif = false;

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

        if (this.posName.y === hero.posName.y){

            if (this.direction){
                for (let x = 0; x < visionLimite; x +=1){
                    if (this.posName.x + x === hero.posName.x){
                        this.interogatif = true;
                        this.mental = "calme";
                        this.mentalTimer = 0;
                        this.limiteMentalTimer = tempsReaction;
                        x = visionLimite;
                    }else {
                        if (map[`x${this.posName.x + x}y${this.posName.y}`] != undefined){
                            x = visionLimite;
                        }
                    }
                }
            }
            if (!this.direction){
                for (let x = 0; x < visionLimite; x +=1){
                    if (this.posName.x - x === hero.posName.x){
                        this.interogatif = true;
                        this.mental = "calme";
                        this.mentalTimer = 0;
                        this.limiteMentalTimer = tempsReaction;
                        x = visionLimite;
                    }else {
                        if (map[`x${this.posName.x - x}y${this.posName.y}`] != undefined){
                            x = visionLimite;
                        }
                    }
                }
            }
        }

        let rand = Math.floor(Math.random()*2);

        if (this.mentalTimer >= this.limiteMentalTimer){
            if (!this.interogatif){
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
    }

}

export default BodyGuard;