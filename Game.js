class Game {
    constructor(gameStatu)
    {
        this.gameStatu = "start";
        this.map = false;
        this.deathOfHero = false;
        this.newLevel = false;
    }

    init = (gameStatu) => {
        this.gameStatu = gameStatu;
        this.gameStatu === "game" ? this.map = true : this.map = false;
    }

    update = (personnages, gameSpeed, map, keyBoardController, tactilController) => {
        for (let key in personnages){
            let perso = personnages[key];
            if (perso.enable){
                if (perso.name === "hero"){
                    if (!tactilController.bool){
                        perso.update(gameSpeed, map, keyBoardController.keyDown, personnages);
                    }else {
                        // Si on est dans le tactile, transmettre les donné d'une simulation de clavier à update
                        perso.update(gameSpeed, map, tactilController.keyDown,personnages)

                        if (tactilController.x > 0 && tactilController.x < 144 ){
                            if (tactilController.y > 488 && tactilController.y < 600){
                                console.log("ok")
                            }
                        }

                        
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