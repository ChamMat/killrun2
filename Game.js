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

    update = (personnages, gameSpeed, map, keyBoardController) => {
        for (let key in personnages){
            let perso = personnages[key];
            if (perso.enable){
                if (perso.name === "hero"){
                    perso.update(gameSpeed, map, keyBoardController.keyDown, personnages);
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