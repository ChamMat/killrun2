const tactilController = (tactil, evt) => {

    const newTactil = tactil;

    switch(evt.type){
        case "touchstart":
            newTactil.x = evt.pageX;
            newTactil.y = evt.pageY;
            // console.log(evt.touches[0])
                switch(evt.target.id){
                    case "leftArraw":
                        newTactil.keyDown.left = true;
                        newTactil.keyUp.left = false;
                        break;
                    case "rightArraw":
                        newTactil.keyDown.right = true;
                        newTactil.keyUp.right = false;
                        break;
                    case "upArraw":
                        newTactil.keyDown.up = true;
                        newTactil.keyUp.up = false;
                        break;
                    case "downArraw":
                        newTactil.keyDown.down = true;
                        newTactil.keyUp.down = false;
                        break;
                    
                }
            break;
        case "touchmove":
            newTactil.down = true;
            newTactil.up = false;
            newTactil.lastDownX = evt.pageX;
            newTactil.lastDownY = evt.pageY;
            break;
        case "touchend":
            newTactil.down = false;
            newTactil.up = true;

            switch(evt.target.id){
                case "leftArraw":
                    newTactil.keyDown.left = false;
                    newTactil.keyUp.left = true;
                    break;
                case "rightArraw":
                    newTactil.keyDown.right = false;
                    newTactil.keyUp.right = true;
                    break;
                case "upArraw":
                    newTactil.keyDown.up = false;
                    newTactil.keyUp.up = true;
                    break;
                case "downArraw":
                    newTactil.keyDown.down = false;
                    newTactil.keyUp.down = true;
                    break;
            }
            break;
        default:{};
    }

    return newTactil;
}

export default tactilController;