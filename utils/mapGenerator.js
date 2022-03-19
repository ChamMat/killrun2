import mapKey from "../settings/mapKey.js";
import Tiles from "../gameObjects/Tiles.js";
import Hero from "../gameObjects/Hero.js";
import BodyGuard from "../gameObjects/BodyGuard.js";

const mapGenerator = (levelDatas) => {
    let tiles = {};
    let personnages = {};
    let personnagesId = 0;
    const yLength = levelDatas.length;
    const xLength = levelDatas[0].length;
    
    for (let y = 0; y < yLength; y +=1){
        for (let x = 0; x < xLength; x+=1){
            const tileKey = levelDatas[y][x];

            let tile;
            let personnage;

            // On va regarder le chiffre des dizaines afin de connaitre la "famille" de la case
            switch(tileKey.toString()[0]){
                case "1":
                    tile = mapKey[tileKey];
                    if (tile != null){
                        tiles = {
                            ...tiles,
                            [`x${x}y${y}`]: new Tiles(`x${x}y${y}`, tile, x * 32, y * 32),
                        }
                    }
                    break;
                case "9":
                    personnage = mapKey[tileKey];

                    if (personnage != null){

                        switch (personnage){
                            case "hero":
                                personnages = {
                                    ...personnages,
                                    ["hero"]: new Hero("hero", 0, x * 32, y * 32)
                                }
                                break;
                            case "bodyGuard":
                                personnages = {
                                    ...personnages,
                                    [personnage+personnagesId]: new BodyGuard(personnage, personnagesId, x * 32, y * 32)
                                }
                                personnagesId +=1;
                                break;
                            default:{};
                        }
                    }
                    break;
            }
            
        }
    }

    return [tiles,personnages];
}

export default mapGenerator;