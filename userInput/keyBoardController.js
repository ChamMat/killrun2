const keyBoardController = (keyboard, evt) => {

    const newKeyboardValue = keyboard;

    switch(evt.type){
        case "keyup":

            switch(evt.code){
                case "KeyA":
                    newKeyboardValue.keyDown.left = false;
                    newKeyboardValue.keyUp.left = true;
                    break;
                case "KeyW":
                    newKeyboardValue.keyDown.up = false;
                    newKeyboardValue.keyUp.up = true;
                    
                    break;
                case "KeyD":
                    newKeyboardValue.keyDown.right = false;
                    newKeyboardValue.keyUp.right = true;
                    
                    break;
                case "KeyS":
                    newKeyboardValue.keyDown.down = false;
                    newKeyboardValue.keyUp.down = true;
                    
                    break;
                case "KeyP":
                    newKeyboardValue.keyDown.p = false;
                    newKeyboardValue.keyUp.p = true;
                    break;
                case "KeyF":
                    document.querySelector("#GraphicsBox").requestFullscreen();
                    break;
                default:{}
            }

            break;

        case "keydown":

            switch(evt.code){
                case "KeyA":
                    if (keyboard.keyUp.left){
                        newKeyboardValue.keyDown.left = true;
                        newKeyboardValue.keyUp.left = false;
                    }
                    break;
                case "KeyW":
                    if (keyboard.keyUp.up){
                        newKeyboardValue.keyDown.up = true;
                        newKeyboardValue.keyUp.up = false;
                    }
                    
                    break;
                case "KeyD":
                    if (keyboard.keyUp.right){
                        newKeyboardValue.keyDown.right = true;
                        newKeyboardValue.keyUp.right = false;
                    }
                    
                    break;
                case "KeyS":
                    if (keyboard.keyUp.down){
                        newKeyboardValue.keyDown.down = true;
                        newKeyboardValue.keyUp.down = false;
                    }
                    
                    break;
                case "KeyP":
                    if (keyboard.keyUp.p){
                        newKeyboardValue.keyDown.p = true;
                        newKeyboardValue.keyUp.p = false;
                    }
                    
                    break;
                default:{}
            }

            break;

        default:{}
    }

    return newKeyboardValue;
    
    
}

export default keyBoardController;