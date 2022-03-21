class SecondBackground {
    constructor(id, name,x, buildNbrX, buildNbrY, leftSpace, bottom){
        this.id = id;
        this.name = name;
        this.posX = x * 16;
        this.buildNbrX = buildNbrX;
        this.buildNbrY = buildNbrY;
        this.leftSpace = leftSpace;
        this.bottom = bottom;
    }

    getAllBuild = () => {
        let builds = [];
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.buildNbrX; i+=1){
            x = i === 0 ? (i * 48) + this.leftSpace + this.posX : (i * 48) + this.leftSpace + this.posX - (16*i);
            
            for (let j = 0; j < this.buildNbrY; j+=1){
                y = j === 0 ? j * 64: (j * 64)- (16*j);

                builds.push(this.build(x, y))
            }
            
        }

        return builds;
    }

    build = (x, y) => (
        {
            name: this.name,
            x: x,
            y: this.bottom - y,
            w: 48,
            h: 64,
        }
    )
}

export default SecondBackground;