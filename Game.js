class Game {
    constructor(gameStatu)
    {
        this.gameStatu = "start";
        this.map = false;
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
                }else{
                    let ia = {
                        up:false,
                        down:false,
                        left:false,
                        right:false,
                    }
                    perso.update(gameSpeed, map, personnages.hero);
                }
            }
            // if (perso.name === "bodyGuard"){
            //     perso.update(gameSpeed, map)
            // }
        }
    }
}

export default Game;