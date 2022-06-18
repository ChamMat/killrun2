const tactilController = (tactil, evt) => {

    const newTactil = tactil;

    switch(evt.type){
        case "touchstart":
            newTactil.x = evt.clientX;
            newTactil.y = evt.clientY;
            break;
        case "touchmove":
            newTactil.down = true;
            newTactil.up = false;
            newTactil.lastDownX = evt.clientX;
            newTactil.lastDownY = evt.clientY;
            break;
        case "touchend":
            newTactil.down = false;
            newTactil.up = true;
            break;
        default:{};
    }

    return newTactil;
}

export default tactilController;