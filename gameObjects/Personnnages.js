class Personnage {
    constructor(name, id, x, y){
        this.name = name;
        this.id = id;
        this.x = x;
        this.y = y;
        this.json;
        this.action = "idle";
        this.newAction = "idle";
        this.frameNbr = 0;
        this.timer = 0;
        this.enable = true;
        this.show = true;
        this.death = false;
        this.posName = `x${Math.floor(x * 32)}y${Math.floor(y*32)}`;

        this.headPosition = {
            left: {x: x+15, y: y+2},
            right: {x: x+17, y: y+2}
        }

        this.sholderPosition = {
            left: {x: x+6, y: y+14},
            right: {x: x+25, y: y+14}
        }

        this.handPosition = {
            left: {x: x+6, y: y+25},
            right: {x: x+25, y: y+25}
        }

        this.footPosition = {
            left: {x: x+13, y: y + 31},
            right: {x: x+18, y: y + 31},
        }

        this.wallDetect = {
            head:{
                left: false,
                right: false,
            },
            sholders: {
                left: false,
                right: false,
            },
            hands: {
                left: false,
                right: false,
            },
            foot: {
                left: false,
                right: false,
            }
        }

        this.mapLimite = [0,0];

        this.chuteSpeed = 0;
        this.chuteLimiteSpeed = 11;

        this.jump = false;
        this.jumpPower = 0;
        this.defaultJumpPower = 18;
        this.jumpIncrement = 1;
        this.killJump = 14;

        this.direction = true;
    }

    init = (datas, mapLimite)=> {
        this.json = datas;
        this.mapLimite[0] = mapLimite[0] - 32;
        this.mapLimite[1] = mapLimite[1];
    }

    update = (gameSettings, map, intelligence) => {
        if (this.enable){
            if (!this.death){
                this.wallPosition(map);
                this.intelligence(intelligence);
                this.gravity(gameSettings.gravity);
                this.animation(gameSettings.gameSpeed);
                this.updatePosition();  
            }else{
                this.gravity(gameSettings.gravity);
                this.animation(gameSettings.gameSpeed);
            }
        }
    }

    wallPosition = (map) => {

        const testingPosition = (coordonate, direction, map) => {
            let x = Math.floor(coordonate.x /32);
            let y = Math.floor(coordonate.y / 32);

            const tile = map[`x${x}y${y}`];
            // switch(direction){
            //     case "up":
            //         y -=1;
            //         break;
            //     case "down":
            //         y +=1;
            //         break;
            //     case "left":
            //         x -=1;
            //         break;
            //     case "right":
            //         x +=1;
            //         break;
            //     default:{}
            // }

            if (tile != undefined && tile.block){
                if (this.name === "hero" && (direction === "left" || direction === "right") && tile.type === "door"){
                    tile.openDoor();
                    return false;
                }
                return true;
            }

            return false;
        
        }
        this.wallDetect.foot.right = testingPosition(this.footPosition.right, "down", map);
        this.wallDetect.foot.left = testingPosition(this.footPosition.left, "down", map);
        this.wallDetect.foot.left && this.wallDetect.foot.right ? this.y = Math.floor((this.y/32)*32) : "";


        this.wallDetect.head.left = testingPosition(this.headPosition.left, "up", map);
        this.wallDetect.head.right = testingPosition(this.headPosition.right, "up", map);
        this.wallDetect.sholders.right = testingPosition(this.sholderPosition.right, "right", map);
        this.wallDetect.sholders.left = testingPosition(this.sholderPosition.left, "left", map);
        this.wallDetect.hands.right = testingPosition(this.handPosition.right, "right", map);
        this.wallDetect.hands.left = testingPosition(this.handPosition.left, "left", map);
        
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
        
    }

    gravity = (gravity) => {
        
        if (this.wallDetect.foot.left || this.wallDetect.foot.right){
            this.y = Math.floor(this.y /32)*32 +1;
            this.chuteSpeed = 0;
            this.jumpPower = 0;
        }else if (!this.onWallRight && !this.onWallLeft){
            this.newAction = "jump";
            this.chuteSpeed < this.chuteLimiteSpeed ? this.chuteSpeed += gravity : this.chuteSpeed = this.chuteLimiteSpeed;
        }

        this.jumpPower >0 ? this.jumpPower -= this.jumpIncrement : this.jumpPower = 0;

        // Collision avec la tête
        if (this.wallDetect.head.left || this.wallDetect.head.right){
            this.jumpPower = 0;
        }

        this.move("down", this.chuteSpeed - this.jumpPower);
        
    }

    animation = (gameSpeed) => {
        // Si la nouvelle action est différente de l'ancienne, on réinitialise les animations
        if (this.action != this.newAction){
            this.frameNbr = 0;
            this.timer = 0;
        }

        this.action = this.newAction;

        if (!this.death){
            if (this.json[this.action + "-" + this.frameNbr].duration < this.timer){
                if (this.json[this.action + "-" + (this.frameNbr + 1)] != undefined){
                    this.frameNbr +=1;
                }else {
                    this.frameNbr = 0;
                }
                this.timer = 0;
            }
            this.timer += gameSpeed;
        }else {
            if (this.json[this.action + "-" + this.frameNbr].duration < this.timer){
                if (this.json[this.action + "-" + (this.frameNbr + 1)] != undefined){
                    this.frameNbr +=1;
                }else{
                    this.enable = false;
                }
                this.timer = 0;
            }
            this.timer += gameSpeed;
        }
    }

    updatePosition = () => {
        this.headPosition = {
            left: {x: this.x+10, y: this.y+2},
            right: {x: this.x+21, y: this.y+2}
        }

        this.sholderPosition = {
            left: {x: this.x+6, y: this.y+14},
            right: {x: this.x+25, y: this.y+14}
        }

        this.handPosition = {
            left: {x: this.x+6, y: this.y+25},
            right: {x: this.x+25, y: this.y+25}
        }

        this.footPosition = {
            left: {x: this.x + 10, y: this.y + 31},
            right: {x: this.x + 21, y: this.y + 31},
        }

        this.posName = `x${Math.floor(this.x * 32)}y${Math.floor(this.y*32)}`;
    }

    upLoadAction = (action) => {
        this.newAction = "idle";
    }

    move = (move, speed) => {
        switch(move){
            case "up":
                this.y - speed > 0 ? this.y -= speed : "";
                break;
            case "down":
                // this.y += speed;
                this.y + speed < this.mapLimite[1] ? this.y += speed : "";
                if (this.y > this.mapLimite[1] - 35){
                    this.show = false;
                    this.death = true;
                    this.enable = false;
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

    
    

}

export default Personnage;