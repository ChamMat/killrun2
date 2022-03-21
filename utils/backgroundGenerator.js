import SecondBackground from "../gameObjects/SecondBackground.js";

const backgroundGenerator = (backgroundName, limite) => {

    const secondBackground = [];

    const limiteX = Math.floor(limite[0]/16);
    let id=0;

    for (let x = 0; x < limiteX; x){
        const buildNbrX = Math.floor((Math.random()*3)+3);
        const buildNbrY = Math.floor((Math.random()*7)+4);
        // const buildNbrY = 10
        const leftSpace = Math.floor((Math.random()*3));

        secondBackground.push(new SecondBackground(id, backgroundName, x, buildNbrX, buildNbrY, leftSpace * 16, limite[1]));

        id +=1;
        x += buildNbrX*2 + 1 + leftSpace;
    }

    return secondBackground;
}

export default backgroundGenerator;