const mouseController = (mouse, evt) => {

    const newMouse = mouse;

    switch(evt.type){
        case "mousemove":
            newMouse.x = evt.pageX;
            newMouse.y = evt.pageY;
            break;
        case "mousedown":
            newMouse.down = true;
            newMouse.up = false;
            newMouse.lastDownX = evt.pageX;
            newMouse.lastDownY = evt.pageY;
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