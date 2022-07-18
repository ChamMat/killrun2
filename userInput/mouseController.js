const mouseController = (mouse, evt) => {

    const newMouse = mouse;

    switch(evt.type){
        case "mousemove":
            newMouse.x = evt.pageX;
            newMouse.y = evt.pageY;
            break;
        case "mousedown":
            if(newMouse.fullScreen){
                var canvas = document.querySelector('#GraphicsBox');
                let pourcentageX =  (100 *evt.pageX) / window.innerWidth;
                let pourcentageY = (100 * evt.pageY) / window.innerHeight;
                newMouse.x = Math.floor(canvas.width * (pourcentageX/100));
                newMouse.y = Math.floor(canvas.height * (pourcentageY/100));
                newMouse.lastDownX= newMouse.x;
                newMouse.lastDownY= newMouse.y;
            }else {
                newMouse.x = evt.pageX;
                newMouse.y = evt.pageY;
                newMouse.lastDownX = evt.pageX;
                newMouse.lastDownY = evt.pageY;
            }
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