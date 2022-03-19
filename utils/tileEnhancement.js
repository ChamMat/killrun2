function tileEnhancement(map){
    // Met à jour les tiles et leurs indique leurs contour en fonction des tiles voisines

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
        if (map[`x${x}y${y-1}`]!= undefined){
            Texist = true;
        }else {
            Texist = false;
        }

        // TOP RIGHT
        if (map[`x${x +1 }y${y-1}`]!= undefined){
            TRexist = true;
        }else {
            TRexist = false;
        }

        // RIGHT
        if (map[`x${x +1}y${y}`]!= undefined){
            Rexist = true;
        }else {
            Rexist = false;
        }

        // Bottom Right
        if (map[`x${x + 1}y${y + 1}`]!= undefined){
            BRexist = true;
        }else {
            BRexist = false;
        }

        // Bottom
        if (map[`x${x}y${y + 1}`]!= undefined){
            Bexist = true;
        }else {
            Bexist = false;
        }

        // BOTTOM LEFT
        if (map[`x${x-1}y${y+1}`]!= undefined){
            BLexist = true;
        }else {
            BLexist = false;
        }

        // LEFT
        if (map[`x${x-1}y${y}`]!= undefined){
            Lexist = true;
        } else {
            Lexist = false;
        }

        // TOP LEFT
        if (map[`x${x-1}y${y-1}`]!= undefined){
            TLexist = true;
        } else {
            TLexist = false;
        }

        Texist ? T = false : T = true;
        Lexist ? L = false : L = true;
        Bexist ? B = false : B = true;
        Rexist ? R = false : R = true;

        Texist && Lexist && !TLexist ? TLext = true : TLext = false;
        Texist && Rexist && !TRexist ? TRext = true : TRext = false;

        Bexist && Lexist && !BLexist ? BLext = true : BLext = false;
        Bexist && Rexist && !BRexist ? BRext = true : BRext = false;

        !Lexist && !Texist ? TL = true : TL = false;
        !Rexist && !Texist ? TR = true : TR = false;
        !Bexist && !Rexist ? BR = true : BR = false;
        !Lexist && !Bexist ? BL = true : BL = false;




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