class Game {
    constructor(gameStatu)
    {
        this.gameStatu = "start";
        this.map = false;
        this.deathOfHero = false;
        this.newLevel = false;
        this.buttonFullScreenActive = false;
    }

    init = (gameStatu) => {
        this.gameStatu = gameStatu;
        this.gameStatu === "game" ? this.map = true : this.map = false;
    }

    update = (personnages, gameSpeed, map, keyBoardController, tactilController, fullScreen, fullScreenChange, userTerminalIsComputer) => {
        
        if (tactilController.x > 15 && tactilController.x < 50){
            if (tactilController.y > 50 && tactilController.y < 95){
                if (tactilController.down){
                    this.buttonFullScreenActive = true;
                }
                if (tactilController.up && this.buttonFullScreenActive){
                    this.buttonFullScreenActive = false;
                    if (!fullScreen){
                        // if( navigator.userAgent.match(/iPhone/i)
                        //     || navigator.userAgent.match(/webOS/i)
                        //     || navigator.userAgent.match(/iPad/i)
                        //     || navigator.userAgent.match(/iPod/i)
                        //     ){
                        //         let canvasContainer = document.querySelector('#BackgroundBox');
                        //         canvasContainer.style.width = "100%";
                        //         canvasContainer.style.height = "100%"
                        //         fullScreenChange();
                        //     }else {
                                document.querySelector("#BackgroundBox").requestFullscreen();
                            // }
                        
                    }else {
                        // if( navigator.userAgent.match(/iPhone/i)
                        //     || navigator.userAgent.match(/webOS/i)
                        //     || navigator.userAgent.match(/iPad/i)
                        //     || navigator.userAgent.match(/iPod/i)
                        //     ){
                        //         let canvasContainer = document.querySelector('#BackgroundBox');
                        //         canvasContainer.style.width = "896px";
                        //         canvasContainer.style.height = "592px";
                        //         fullScreenChange();
                        //     }else {
                                document.exitFullscreen();
                            // }
                    }
                }
            }
        }
        

        for (let key in personnages){
            let perso = personnages[key];
            if (perso.enable){
                if (perso.name === "hero"){

                    if (userTerminalIsComputer){
                        perso.update(gameSpeed, map, keyBoardController.keyDown, personnages);
                    }else {
                        perso.update(gameSpeed, map, tactilController.keyDown, personnages);
                    }

                    if (perso.death){
                        setTimeout(() => {this.deathOfHero = true}, 1000);
                    }
                    if (perso.hadTheFlag){
                        for (let key2 in personnages){
                            if (personnages[key2].ennemy && !personnages[key2].death){
                                const ennemy = personnages[key2];
                                ennemy.interogatif.bool = false;
                                ennemy.alerte.bool = false;
                                // ennemy.deathFunc();
                                ennemy.alternateDeathFunc()
                            }
                        }
                        setTimeout(()=> {this.newLevel = true}, 1000);
                    }
                }else{
                    let ia = {
                        up:false,
                        down:false,
                        left:false,
                        right:false,
                    }
                    perso.update(gameSpeed, map, personnages);
                }
            }
            // if (perso.name === "bodyGuard"){
            //     perso.update(gameSpeed, map)
            // }
        }
    }

}

export default Game;