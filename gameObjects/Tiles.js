class Tiles {
    constructor(name, type, x, y, block, direction = true){
        this.x = x;
        this.y = y;
        this.type = type;
        this.name = name;
        this.block = block;
        this.door = true;
        this.direction = direction;
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
        this.interval = 0;
        this.timer = 0;
    }

    openDoor = () => {
        this.door = false;
        this.block = false;
        this.interval = setInterval(()=>{
            this.door = true;
            this.block = true;
            clearInterval(this.interval);
        }, 2000);
    }

    setEnhancement = (enhancement) => {
        this.enhancement = enhancement;
    }

    
}

export default Tiles;