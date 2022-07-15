import Personnage from "./Personnnages.js";

class BodyGuard extends Personnage{
    constructor(name, id, x, y) {
        super(name, id, x, y);

        this.mental = "calme";
        this.mentalTimer = 10000;
        this.limiteMentalTimer = Math.floor(Math.random()*6000)+2000;
        this.moveSpeed = Math.floor(Math.random()*(2))+.5;
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
        this.alternateDeath = false;
    }

    update = (gameSettings, map, personnages,song) => {
        if (this.enable){
            if (!this.death){
                this.wallPosition(map);
                this.intelligence(personnages, map);
                this.gravity(gameSettings.gravity,song);
                this.animation(gameSettings.gameSpeed);
                this.updatePosition();  
            }else{
                this.wallPosition(map);
                this.gravity(gameSettings.gravity,song);
                this.alternateDeath ? this.newAction = "alternateDeath" : this.newAction = "death";
                this.animation(gameSettings.gameSpeed);
                this.updatePosition();
            }
        }
    }

    look = (personnages, map, visionLimite = 12) => {
         // Vision du perso
         if (this.posName.y === personnages.hero.posName.y){

            if (
                (this.direction && this.posName.x < personnages.hero.posName.x) || 
                (!this.direction && this.posName.x > personnages.hero.posName.x)
            )
            {
                for (
                    let x = 0;
                    Math.abs(x) < visionLimite;
                    this.direction ? x +=1: x -=1
                    ){
                        // Le personnage vois le hero
                    if (parseInt(this.posName.x + x) === personnages.hero.posName.x){
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

    intelligence = (personnages, map) => {

        this.heroEnVu = this.look(personnages, map);

       

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

                for (let key in personnages){
                    const perso = personnages[key];
                    try{
                        if (
                            !perso.death &&
                            perso.name != "hero" &&
                            perso.id != this.id &&
                            !perso.alerte.bool &&
                            perso.ennemy &&
                            perso.posName.x === this.posName.x &&
                            perso.posName.y === this.posName.y
                        ){
                            perso.interogatif.timer = 0;
                            perso.interogatif.bool = false;
                            perso.alerte.bool = true;
                            perso.moveSpeed += 4;
                            perso.mental = "alerte";
                        }
                    }catch(e){
                        perso.name
                    }
                }
                if (this.direction){
                        if (map[`x${this.posName.x + 1}y${this.posName.y}`] === undefined ||
                            map[`x${this.posName.x + 1}y${this.posName.y}`].type === "door"
                        ){
                            if (
                                map[`x${this.posName.x + 1}y${this.posName.y -1}`] === undefined &&
                                map[`x${this.posName.x + 1}y${this.posName.y}`] === undefined &&
                                map[`x${this.posName.x + 1}y${this.posName.y + 1}`] === undefined &&
                                this.jumpPower === 0 && this.chuteSpeed === 0
                                ){
                                    Math.floor(Math.random()*2) === 1 ? this.direction = false : this.upLoadAction("jump");
                            }else {
                                this.upLoadAction("walk");
                            }
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
                            if (
                                map[`x${this.posName.x - 1}y${this.posName.y -1}`] === undefined &&
                                map[`x${this.posName.x - 1}y${this.posName.y}`] === undefined &&
                                map[`x${this.posName.x - 1}y${this.posName.y + 1}`] === undefined &&
                                this.jumpPower === 0 && this.chuteSpeed === 0
                                ){
                                    Math.floor(Math.random()*2) === 1 ? this.direction = true : this.upLoadAction("jump");
                                }else {
                                    this.upLoadAction("walk");
                                }
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
                this.moveSpeed += 4;
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

    deathFunc = (song) => {
        this.sounds.sfx_damage_hit10.volume = .1
        this.sounds.sfx_damage_hit10.play();
        this.death = true;
        this.newAction = "death";
        this.interogatif.bool = false;
        this.alerte.bool = false;
        this.jump = false;
        this.jumpPower = 0;
    }

    alternateDeathFunc = () => {
        this.death = true;
        this.newAction = "alternateDeath";
        this.alternateDeath = true;
        this.interogatif.bool = false;
        this.alerte.bool = false;
        this.jump = false;
        this.jumpPower = 0;
    }

}

export default BodyGuard;