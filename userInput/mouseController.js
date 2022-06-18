const mouseController = (mouse, evt) => {

    const newMouse = mouse;

    switch(evt.type){
        case "mousemove":
            newMouse.x = evt.clientX;
            newMouse.y = evt.clientY;
            break;
        case "mousedown":
            newMouse.down = true;
            newMouse.up = false;
            newMouse.lastDownX = evt.clientX;
            newMouse.lastDownY = evt.clientY;
            break;
        case "mouseup":
            newMouse.down = false;
            newMouse.up = true;
            break;
        default:{};
    }

    return newMouse;
}

export default mouseController;