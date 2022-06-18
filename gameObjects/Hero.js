import Personnage from "./Personnnages.js"

import testCollisionKill from "../utils/testCollisionKill.js";

class Hero extends Personnage{
    constructor(name, id, x, y) {
        super(name, id, x, y);

        this.onWallRight = false;
        this.onWallLeft = false;

        this.moveSpeed = 5;
        this.personnages;
        this.hasKillAEnnemy = false;
        this.hadTheFlag = false;

    }

    update = (gameSettings, map, intelligence, personnages) => {
        this.personnages = personnages;
        this.wallPosition(map);
        if (!this.death){
            this.intelligence(intelligence);
            this.combat(personnages);
        }
        this.gravity(gameSettings.gravity);
        if (this.death){
            this.newAction = "death";
        }
        this.animation(gameSettings.gameSpeed);
        this.updatePosition();  
    }

    combat = (personnages) => {
        for(let key in personnages){
            if (key != "hero"){
                if (
                    !personnages[key].death &&
                    personnages[key].posName.x === this.posName.x &&
                    personnages[key].posName.y === this.posName.y
                ){
                    if (!this.hasKillAEnnemy && personnages[key].ennemy){
                        this.death = true;
                        this.newAction = "death"
                    }

                    if (personnages[key].name === "flag"){
                        this.hadTheFlag = true;
                    }
                }
            }
        }
    }

    intelligence = (intelligence) => {

        // IDLE
        if (
            !intelligence.right &&
            !intelligence.left &&
            !intelligence.down &&
            (this.wallDetect.foot.left ||
            this.wallDetect.foot.right)
            ){
                this.upLoadAction("idle");
            }

        // RESET ONWALL
        if (this.onWallLeft && !this.wallDetect.hands.left){
            this.onWallLeft = false;
        }

        if (this.onWallRight && !this.wallDetect.hands.right){
            this.onWallRight = false
        }

        // WALK
        if (intelligence.right){
            this.upLoadAction("walkRight");            
        }

        if (intelligence.left){
            this.upLoadAction("walkLeft");
        }

        // SAUT
        if (intelligence.up && (!this.onWallLeft && !this.onWallRight)){
            if (!this.jump){
                this.upLoadAction("jump")
            }
        }else if (this.wallDetect.foot.left || this.wallDetect.foot.right){
            this.jump = false;
        }

        // ONWALL
        if (
            (!this.wallDetect.foot.left && !this.wallDetect.foot.right) && 
            this.wallDetect.hands.right &&
            intelligence.right
            )
        {
            this.upLoadAction("onWallRight");
            
        }

        if (
            (!this.wallDetect.foot.left && !this.wallDetect.foot.right) && 
            this.wallDetect.hands.left &&
            intelligence.left
            )
        {
            this.upLoadAction("onWallLeft");
            
        }

        if (
            (this.onWallLeft || this.onWallRight) &&
            !intelligence.up &&
            !intelligence.down
        ){
            this.upLoadAction("onWall");
        }

         // CLIMB
         if (
            (this.onWallLeft || this.onWallRight) &&
            intelligence.up
        ){
            this.upLoadAction("climbUp");
        }

        if (
            (this.onWallLeft || this.onWallRight) &&
            intelligence.down
        ){
            this.upLoadAction("climbDown");
        }

        
    }

    upLoadAction = (action) => {

        switch(action){
            case "idle":
                this.newAction = "idle"
                break;
            case "walkLeft":
                this.newAction = "walk"
                this.direction = false;
                this.wallDetect.hands.left && this.wallDetect.sholders.left? this.x = (Math.floor(this.x/32)*32)+25: this.move("left", this.moveSpeed);
                this.onWallRight ? this.onWallRight = false : "";
                break;
            case "walkRight":
                this.newAction = "walk"
                this.direction = true;
                this.wallDetect.hands.right && this.wallDetect.sholders.right? this.x = (Math.floor(this.x/32)*32)+7:this.move("right", this.moveSpeed);
                this.onWallLeft ? this.onWallLeft = false : "";
                break;
            case "jump":
                this.jump = true;
                this.jumpPower = this.defaultJumpPower;
                this.wallDetect.foot.left = false;
                this.wallDetect.foot.right = false;
                break;
            case "climbDown":
                this.newAction = "climb";
                this.move("down", this.moveSpeed * 0.7);
                break;
            case "climbUp":
                this.newAction = "climb";
                this.wallDetect.head.left && this.wallDetect.head.right ? "" : this.move("up", this.moveSpeed * 0.7);
                break;
            case "onWallRight":
                this.newAction = "onWall"
                this.onWallRight = true;
                this.jumpPower = 0;
                this.jump = false;
                this.chuteSpeed = 0;
                break;
            case "onWallLeft":
                this.newAction = "onWall";
                this.onWallLeft = true;
                this.jumpPower = 0;
                this.jump = false;
                this.chuteSpeed = 0;
                break;
            case "onWall":
                this.newAction ="onWall"
                break;
            default:
                this.newAction = "idle";
        }
    }

    move = (move, speed) => {

        if (move != "right" && move != "left") this.testKill(speed);

        switch(move){
            case "up":
                this.y - speed > 0 ? this.y -= speed : "";
                break;
            case "down":
                // this.y += speed;
                this.y + speed < this.mapLimite[1] ? this.y += speed : "";
                if (this.y > this.mapLimite[1] - 35){
                    this.show = false;
                    this.enable = false;
                    console.log("mort")
                }
                break;
            case "right":
                this.x + speed < this.mapLimite[0] ? this.x += speed : "";
                break;
            case "left":
                this.x - speed > 0 ? this.x -= speed : "";
                break;
        }
    }

    testKill = (speed) => {
        if (this.action === "jump" && this.y + speed > this.y){
            for (let ennemy in this.personnages){
                const perso = this.personnages[ennemy];
                if (!perso.death){
                    if (perso.ennemy){
                        if (testCollisionKill(
                            this.footPosition.left.x,
                            this.footPosition.right.x,
                            this.footPosition.left.y,
                            perso.headPosition.left.x,
                            perso.headPosition.right.x,
                            perso.headPosition.left.y
                        )){
                            perso.deathFunc();
                            this.jumpPower = this.killJump;
                            this.chuteSpeed = 0;
                            this.hasKillAEnnemy = true;
                            setTimeout(()=> {
                                this.hasKillAEnnemy = false;
                            }, 100)
                            break;
                        }
                        
                    }
                }
            }
        }
    }
}

export default Hero;