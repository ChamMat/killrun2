class Show {
    constructor(imgs, animations, datas){
        this.canvas;
        this.imgs = imgs;
        this.animations = animations;
        this.datas = datas;
        this.camera = {x:0, y:0};
        this.heropos = {x:0, y:0};
        this.cameraSpeedX = 0;
        this.cameraSpeedY = 0;
        this.windowSize = {w: 896, h: 592};
        this.cameraLimite = {
            min: [0, 0],
            max: [0, 0],
        };
    }

    init = () => {
        this.canvas = document.querySelector("#GraphicsBox").getContext("2d");
    }

    upDateLimiteCamera = (x,y) => {
        this.cameraLimite.max = [x - this.windowSize.w, y - this.windowSize.h];
    }

    updateCamera = (cible) => {

        let cameraFinalX = cible.x - (this.windowSize.w/2);
        let cameraFinalY = cible.y - (this.windowSize.h/2);

        this.cameraSpeedX = (cameraFinalX - this.camera.x)/15;
        this.cameraSpeedY = (cameraFinalY - this.camera.y)/15;
        
        this.camera.x = this.camera.x + this.cameraSpeedX;
        this.camera.y = this.camera.y + this.cameraSpeedY;

        this.camera.x <= this.cameraLimite.min[0] ? this.camera.x = this.cameraLimite.min[0] :"";
        this.camera.x >= this.cameraLimite.max[0] ? this.camera.x = this.cameraLimite.max[0] : "";
        this.camera.y <= this.cameraLimite.min[1] ? this.camera.y = this.cameraLimite.min[1] :"";
        this.camera.y >= this.cameraLimite.max[1] ? this.camera.y = this.cameraLimite.max[1] : "";
    }

    cameraMove = (scale, img, x, y, w , h ,sx = 0, sy = 0, sw = w, sh = h) => {
        let newX = Math.floor(x - this.camera.x);
        let newY = Math.floor(y - this.camera.y);

        if (!scale){
            this.canvas.scale(-1, 1);
            newX = (newX *(-1)) - 32 // Déplace légérement x pour que le personnage reste à la même position: ;
        }
        this.drawImage(img, newX, newY, w , h ,sx, sy, sw, sh);
    }

    secondBackgroundMove = (secondBackground) => {

        const allBuilds = secondBackground.getAllBuild();
        
        allBuilds.forEach(build => {
            let newX = Math.floor(build.x- this.camera.x/2);

            let newY = Math.floor(build.y + ((this.cameraLimite.max[1]-this.camera.y)/2));
            this.drawImage(this.imgs[build.name], newX, newY, build.w , build.h);
        })


    }

    clear = () => {
        this.canvas.fillstyle = "#000";
        this.canvas.fillRect(0,0, 896, 592);
    }

    gameBackground = (level, map, tilesDecoration, secondBackground) => {
        
        if (this.datas[level].background.length === 0){
            this.clear();
        }else{
            this.datas[level].background.forEach(background => {
                this.drawImage(this.imgs[background], 0, 0, 896, 592)
            });

            for (let key in secondBackground){

                this.secondBackgroundMove(secondBackground[key]);
            }

            this.datas[level].fog.forEach(fog => [
                this.drawImage(this.imgs[fog], 0,0,896,592)
            ])
        }

        for (let maptile in map){
            const tile = map[maptile];

            const img = this.imgs[tile.type];

            const {x, y} = tile;

            if (x > this.camera.x - 32 && x < this.camera.x + this.windowSize.w + 32)
            {

                tile.type != "door" ? this.cameraMove(true, img, x, y, 32, 32):this.cameraMove(tile.direction, img, x, y, 32, 32, tile.door ? 0:32);

                if (tile.type === "concret"){
                    if (tile.enhancement.T)this.cameraMove(true, this.imgs[`concretGroundWallT`], x, y, 32, 32);
                    if (tile.enhancement.R)this.cameraMove(true, this.imgs[`concretGroundWallR`], x, y, 32, 32);
                    if (tile.enhancement.B)this.cameraMove(true, this.imgs[`concretGroundWallB`], x, y, 32, 32);
                    if (tile.enhancement.L)this.cameraMove(true, this.imgs[`concretGroundWallL`], x, y, 32, 32);
                    if (tile.enhancement.TL)this.cameraMove(true, this.imgs[`concretGroundWallTL`], x, y, 32, 32);
                    if (tile.enhancement.TR)this.cameraMove(true, this.imgs[`concretGroundWallTR`], x, y, 32, 32);
                    if (tile.enhancement.BR)this.cameraMove(true, this.imgs[`concretGroundWallBR`], x, y, 32, 32);
                    if (tile.enhancement.BL)this.cameraMove(true, this.imgs[`concretGroundWallBL`], x, y, 32, 32);
                    if (tile.enhancement.TLext)this.cameraMove(true, this.imgs[`concretGroundWallTLext`], x, y, 32, 32);
                    if (tile.enhancement.TRext)this.cameraMove(true, this.imgs[`concretGroundWallTRext`], x, y, 32, 32);
                    if (tile.enhancement.BLext)this.cameraMove(true, this.imgs[`concretGroundWallBLext`], x, y, 32, 32);
                    if (tile.enhancement.BRext)this.cameraMove(true, this.imgs[`concretGroundWallBRext`], x, y, 32, 32);
                    
                }
            }

        }

        for (let tileDecoration in tilesDecoration){
            const deco = tilesDecoration[tileDecoration];
            if (deco.x > this.camera.x - 32 && deco.x < this.camera.x + this.windowSize.w + 32)
            {
                this.cameraMove(true, this.imgs[deco.type], deco.x, deco.y, 32, 32)
            }
        }
    }

    gameBackgroundExt = (tilesExt) => {
        for (let tileExt in tilesExt){
            const tile = tilesExt[tileExt];

            if (tile.x > this.camera.x - 32 && tile.x < this.camera.x + this.windowSize.w + 32){
                this.cameraMove(true, this.imgs[tile.type], tile.x, tile.y, 32, 32);
            }
        }
    }

    personnages = (personnages) => {
        for(let key in personnages){
            const perso = personnages[key];
            if (perso.show){
                const img = this.animations[perso.name].sprite;
                let x = perso.x;
                const y = perso.y;
                const w = 32;
                const h = 32;
                const sx = perso.json[`${perso.action}-${perso.frameNbr}`].frame.x
                const sy = perso.json[`${perso.action}-${perso.frameNbr}`].frame.y
                let scale = true;

                if(!perso.direction){
                    scale = false;
                    // this.canvas.scale(-1, 1);
                    // x = (x *(-1)) - 32 // Déplace légérement x pour que le personnage reste à la même position
                }

                if (x > this.camera.x - 32 && x < this.camera.x + this.windowSize.w + 32){
                    this.cameraMove(scale, img, x, y, 32, 32, sx, sy);
                }

                if (perso.name != "hero"){
                    if (perso.interogatif.bool && !perso.alerte.bool){
                        this.cameraMove(true, this.imgs["interogation"], x, y-32, 32, 32)
                    }
                    if (perso.alerte.bool){
                        this.cameraMove(true, this.imgs["exclamation"], x, y-32, 32, 32)
                    }

                    if(perso.death){
                        
                    }
                }
            }

        }
    }

    drawImage = (img, x, y, w , h ,sx = 0, sy = 0, sw = w, sh = h) =>{
        this.canvas.drawImage(img, sx, sy, sw, sh, x, y, w, h);
        this.canvas.setTransform(1, 0, 0, 1, 0, 0);
    }
}

export default Show;