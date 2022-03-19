class Tiles {
    constructor(name, type, x, y){
        this.x = x;
        this.y = y;
        this.type = type;
        this.name = name;
        this.enhancement = {
            TL : false,
            T: false,
            TR: false,
            R: false,
            BR: false,
            B: false,
            BL: false,
            L: false,
            TLext: false,
            TRext: false,
            BLext: false,
            BRext: false,
        };
    }

    setEnhancement = (enhancement) => {
        this.enhancement = enhancement;
    }

    
}

export default Tiles;