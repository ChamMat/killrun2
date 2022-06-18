function tileEnhancement(map, mapLimites){
    // Met à jour les tiles et leurs indique leurs contour en fonction des tiles voisines

    const limiteX = Math.floor(mapLimites[0] / 32) -1;
    const limiteY = Math.floor(mapLimites[1]/32) -1;

    let Texist;
    let Rexist;
    let Bexist;
    let Lexist;
    let TLexist;
    let TRexist;
    let BRexist;
    let BLexist;

    let T = false;
    let R = false;
    let B = false;
    let L = false;
    let TL = false;
    let TR = false;
    let BR = false;
    let BL = false;
    let TLext = false;
    let TRext = false;
    let BRext = false;
    let BLext = false;

    for (let tile in map){
        const x = map[tile].x / 32;
        const y = map[tile].y / 32;

        // TOP:
        if (map[`x${x}y${y-1}`]!= undefined && map[`x${x}y${y-1}`].type != "door"){
            Texist = true;
        }else {
            Texist = false;
        }

        // TOP RIGHT
        if (map[`x${x +1 }y${y-1}`]!= undefined  && map[`x${x +1}y${y-1}`].type != "door"){
            TRexist = true;
        }else {
            TRexist = false;
        }

        // RIGHT
        if (map[`x${x +1}y${y}`]!= undefined && map[`x${x +1}y${y}`].type != "door"){
            Rexist = true;
        }else {
            Rexist = false;
        }

        // Bottom Right
        if (map[`x${x + 1}y${y + 1}`]!= undefined && map[`x${x + 1}y${y + 1}`].type != "door"){
            BRexist = true;
        }else {
            BRexist = false;
        }

        // Bottom
        if (map[`x${x}y${y + 1}`]!= undefined && map[`x${x}y${y + 1}`].type != "door"){
            Bexist = true;
        }else {
            Bexist = false;
        }

        // BOTTOM LEFT
        if (map[`x${x-1}y${y+1}`]!= undefined && map[`x${x-1}y${y+1}`].type != "door"){
            BLexist = true;
        }else {
            BLexist = false;
        }

        // LEFT
        if (map[`x${x-1}y${y}`]!= undefined && map[`x${x-1}y${y}`].type != "door"){
            Lexist = true;
        } else {
            Lexist = false;
        }

        // TOP LEFT
        if (map[`x${x-1}y${y-1}`]!= undefined && map[`x${x-1}y${y-1}`].type != "door"){
            TLexist = true;
        } else {
            TLexist = false;
        }

        Texist || y === 0 ? T = false : T = true;
        Lexist || x === 0 ? L = false : L = true;
        Bexist || y === limiteY ? B = false : B = true;
        Rexist || x === limiteX ? R = false : R = true;

        Texist && Lexist && !TLexist ? TLext = true : TLext = false;
        Texist && Rexist && !TRexist ? TRext = true : TRext = false;

        Bexist && Lexist && !BLexist ? BLext = true : BLext = false;
        Bexist && Rexist && !BRexist ? BRext = true : BRext = false;

        !Lexist && !Texist && x !== 0 && y !== 0 ? TL = true : TL = false;
        !Lexist && !Bexist && x !== 0 && y !== limiteY ? BL = true : BL = false;
        !Rexist && !Texist && x !== limiteX && y !== 0 ? TR = true : TR = false;
        !Bexist && !Rexist && x !== limiteX && y !== limiteY ? BR = true : BR = false;




        // if (!Rexist){
        //     R = true;
        // }

        // if (!Bexist){
        //     B = true;
        // }

        // if (!Lexist){
        //     L = true;
        // }

        // if (!Texist && !Lexist){
        //     TL = true;
        // }

        map[tile].setEnhancement({
            TL: TL,
            T: T,
            TR: TR,
            R: R,
            BR: BR,
            B: B,
            BL: BL,
            L: L,
            TLext: TLext,
            TRext: TRext,
            BLext: BLext,
            BRext: BRext,
        });


    }
}

export default tileEnhancement;