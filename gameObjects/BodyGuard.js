import Personnage from "./Personnnages.js";

class BodyGuard extends Personnage{
    constructor(name, id, x, y) {
        super(name, id, x, y);

        this.mental = "calme";
        this.mentalTimer = 10000;
        this.limiteMentalTimer = Math.floor(Math.random()*6000)+2000;
        this.moveSpeed = Math.floor(Math.random()*(3))+.5;
        this.interogatif = {
            bool: false,
            timer: 0,
            limite: 15,
            forgotTimer: 0,
            forgotLimit: 45,
        }
        this.alerte = {
            bool: false,
            show: false,
            timer: 0,
            limite: 100,
        }
        this.heroEnVu = false;
        this.ennemy = true;
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
                this.wallPosition(map);
                this.gravity(gameSettings.gravity);
                this.newAction = "death";
                this.animation(gameSettings.gameSpeed);
                this.updatePosition();
            }
        }
    }

    look = (hero, map, visionLimite = 10) => {
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
                        return true;
                    }else {
                        // La vision est bloqué par un obstacle
                        if (map[`x${parseInt(this.posName.x + x)}y${this.posName.y}`] != undefined &&
                            map[`x${parseInt(this.posName.x + x)}y${this.posName.y}`].block
                        ){
                            return false;
                            // break;
                        }
                    }
                }

                return false;
            }
        }
    }

    intelligence = (hero, map) => {

        this.heroEnVu = this.look(hero, map);

       

        if (this.heroEnVu){
           this.heroDetecte();
        }

        this.calmeMove();

        switch(this.mental){
            case "calmeIdle":
                this.upLoadAction("idle");
                break;
            case "calmeMarche":
                this.direction && (this.wallDetect.hands.right || !this.wallDetect.foot.right)? this.direction = false : "";
                !this.direction && (this.wallDetect.hands.left || !this.wallDetect.foot.left) ? this.direction = true : "";

                this.upLoadAction("walk");
                break;
            case "alerte":
                if (this.direction){
                        if (map[`x${this.posName.x + 1}y${this.posName.y}`] === undefined ||
                            map[`x${this.posName.x + 1}y${this.posName.y}`].type === "door"
                        ){
                            this.upLoadAction("walk");
                        }else {
                            if (
                                Math.floor(Math.random()*2) === 0 &&
                                map[`x${this.posName.x + 1}y${this.posName.y - 1}`] != undefined
                            ){
                                this.direction = false;
                                this.upLoadAction("walk");
                            }else {
                                this.upLoadAction("jump");
                            }
                        }
                }
                if (!this.direction){
                        if (map[`x${this.posName.x - 1}y${this.posName.y}`] === undefined ||
                            map[`x${this.posName.x - 1}y${this.posName.y}`].type === "door"
                        ){
                            this.upLoadAction("walk");
                        }else {
                            if (
                                Math.floor(Math.random()*2) === 0 &&
                                map[`x${this.posName.x - 1}y${this.posName.y - 1}`] != undefined
                            ){
                                this.direction = true;
                                this.upLoadAction("walk");
                            }else {
                                this.upLoadAction("jump");
                            }
                        }
                }
            break;
        }


    }

    calmeMove = () => {
                // Il a vu le hero mais ne le vois plus. Il est calme
                if (this.interogatif.bool && !this.heroEnVu){
                    this.interogatif.forgotTimer +=1;
                    if (this.interogatif.forgotTimer >= this.interogatif.forgotLimit){
                        this.interogatif.bool = 0;
                        this.interogatif.timer = 0;
                        this.mentalTimer = this.limiteMentalTimer;
                    }
                }
        
                if (!this.interogatif.bool && !this.alerte.bool){
                    let rand;
                    if (this.interogatif.forgotTimer === 0){
                        rand = Math.floor(Math.random()*2);
                    }else {
                        rand = 1;
                    }
        
                    if (this.mentalTimer >= this.limiteMentalTimer){
                        if (!this.interogatif.bool && !this.alerte.bool){
                            switch(rand){
                                case 0:
                                    this.mental= "calmeIdle";
                                    if (this.interogatif.forgotTimer === 0){
                                        Math.floor(Math.random()*2) === 0 ? this.direction = true: this.direction = false;
                                    }else {
                                        this.interogatif.forgotTimer = 0;
                                    }
                                    break;
                                case 1:
                                    this.mental = "calmeMarche"
                                    if (this.interogatif.forgotTimer === 0){
                                        Math.floor(Math.random()*2) === 0 ? this.direction = true: this.direction = false;
                                    }else {
                                        this.interogatif.forgotTimer = 0;
                                    }
                                    break;
                            }
                        }
                        this.limiteMentalTimer = Math.floor(Math.random()*6000)+2000;
                        this.interogatif.bool = false;
                        this.mentalTimer = 0;
                    }else{
                        this.mentalTimer += 25;
                    }
                }
    }

    heroDetecte = () => {
        this.mentalTimer = 0;
        if(!this.alerte.bool){
            this.interogatif.bool = true;
            this.mental = "calmeIdle";
            this.interogatif.timer +=1;
            this.interogatif.forgotTimer = 0;
            if (this.interogatif.timer >= this.interogatif.limite){
                this.interogatif.timer = 0;
                this.interogatif.bool = false;
                this.alerte.bool = true;
                this.moveSpeed += 2;
            }
        }

        if (this.alerte.bool){
            this.mental = "alerte";
            this.alerte.show = true;
            this.alerte.timer = 0;
            
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
        this.interogatif.bool = false;
        this.alerte.bool = false;
        this.jump = false;
        this.jumpPower = 0;
    }

}

export default BodyGuard;