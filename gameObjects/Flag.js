import Personnage from "./Personnnages.js";

class Flag extends Personnage{
    constructor(name, id, x, y){
        super (name, id, x, y)
    }

    update = (gameSettings, map, intelligence) => {
        if (this.enable){
            this.newAction = "idle";
            this.animation(gameSettings.gameSpeed);
        }
    }
}

export default Flag;