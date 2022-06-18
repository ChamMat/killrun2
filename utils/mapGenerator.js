import mapKey from "../settings/mapKey.js";
import Tiles from "../gameObjects/Tiles.js";
import Hero from "../gameObjects/Hero.js";
import BodyGuard from "../gameObjects/BodyGuard.js";
import Flag from "../gameObjects/Flag.js";

const mapGenerator = (levelDatas) => {
    let tiles = {};
    let tilesDecoration = {};
    let tilesExt = {};
    let personnages = {};
    let personnagesId = 0;
    const yLength = levelDatas.length;
    const xLength = levelDatas[0].length;

    // Chargement des "tiles"
    for (let y = 0; y < yLength; y +=1){
        for (let x = 0; x < xLength; x+=1){
            const tileKey = levelDatas[y][x];

            let tile;
            let tileDecoration;
            let tileExt;
            let personnage;

            // On va regarder le chiffre des dizaines afin de connaitre la "famille" de la case
            switch(tileKey.toString()[0]){
                case "1":
                    // Tiles de mur ou de sol
                    if (mapKey[tileKey] != null){
                    
                        tile = mapKey[tileKey];
                        tile === "doorLeft" ? tiles = {
                            ...tiles,
                            [`x${x}y${y}`]: new Tiles(`x${x}y${y}`, "door", x * 32, y * 32, true, tile === "door"? true : false),
                        } :
                        tiles = {
                            ...tiles,
                            [`x${x}y${y}`]: new Tiles(`x${x}y${y}`, tile, x * 32, y * 32, true, tile === "door"? true : false),
                        };
                    }
                    break;
                case "2":
                    // Tiles décoratives
                    tileDecoration = mapKey[tileKey];
                    if (tileDecoration != null){
                        tilesDecoration = {
                            ...tilesDecoration,
                            [`x${x}y${y}`]: new Tiles(`x${x}y${y}`, tileDecoration, x * 32, y * 32, false),
                        }
                    }
                    break;
                case "3":
                    // Tiles décorative ext (affiché par dessu les personnages)
                    tileExt = mapKey[tileKey];
                    if (tileExt != null){
                        tilesExt = {
                            ...tilesExt,
                            [`x${x}y${y}`]: new Tiles(`x${x}y${y}`, tileExt, x * 32, y * 32, false),
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
                            case "flag":
                                personnages = {
                                    ...personnages,
                                    ["flag"]: new Flag("flag", 0, x * 32, y* 32)
                                }
                                break;
                            default:{};
                        }
                    }
                    break;
            }
            
        }
    }

    return [tiles,personnages, tilesDecoration, tilesExt];
}

export default mapGenerator;