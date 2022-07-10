const tactilController = (tactil, evt) => {

    const newTactil = tactil;

    switch(evt.type){
        case "pointerdown":
            if(newTactil.fullScreen){
                var canvas = document.querySelector('#GraphicsBox');
                let pourcentageX =  (100 *evt.pageX) / window.innerWidth;
                let pourcentageY = (100 * evt.pageY) / window.innerHeight;
                newTactil.x = Math.floor(canvas.width * (pourcentageX/100));
                newTactil.y = Math.floor(canvas.height * (pourcentageY/100));
                newTactil.lastDownX= newTactil.x;
                newTactil.lastDownY= newTactil.y;
            }else {
                newTactil.x = evt.pageX;
                newTactil.y = evt.pageY;
                newTactil.lastDownX = evt.pageX;
                newTactil.lastDownY = evt.pageY;
            }

            newTactil.up = false;
            newTactil.down = true;

            if (
                newTactil.x > 0
                && newTactil.x < 144
                && newTactil.y > 488
                && newTactil.y < 488 + 144 
                ){
                    newTactil.keyDown.left = true;
                    newTactil.keyUp.left = false;
                }

            if (
                newTactil.x > 150
                && newTactil.x < 150 + 144
                && newTactil.y > 488
                && newTactil.y < 488 + 144 
                ){
                    newTactil.keyDown.right = true;
                    newTactil.keyUp.right = false;
                }

            if (
                newTactil.x > 755
                && newTactil.x < 755 + 144
                && newTactil.y > 488
                && newTactil.y < 488 + 144 
                ){
                    newTactil.keyDown.down = true;
                    newTactil.keyUp.down = false;
                }

            if (
                newTactil.x > 755
                && newTactil.x < 755 + 144
                && newTactil.y > 355
                && newTactil.y < 355 + 144 
                ){
                    newTactil.keyDown.up = true;
                    newTactil.keyUp.up = false;
                }

            break;
        case "pointermove":
            newTactil.x = evt.pageX;
            newTactil.y = evt.pageY;
            break;
        case "pointerup":
            newTactil.down = false;
            newTactil.up = true;

            if (
                newTactil.x > 0
                && newTactil.x < 144
                && newTactil.y > 488
                && newTactil.y < 488 + 144 
                ){
                    newTactil.keyDown.left = false;
                    newTactil.keyUp.left = true;
                }

            if (
                newTactil.x > 150
                && newTactil.x < 150 + 144
                && newTactil.y > 488
                && newTactil.y < 488 + 144 
                ){
                    newTactil.keyDown.right = false;
                    newTactil.keyUp.right = true;
                }

            if (
                newTactil.x > 755
                && newTactil.x < 755 + 144
                && newTactil.y > 488
                && newTactil.y < 488 + 144 
                ){
                    newTactil.keyDown.down = false;
                    newTactil.keyUp.down = true;
                }

            if (
                newTactil.x > 755
                && newTactil.x < 755 + 144
                && newTactil.y > 355
                && newTactil.y < 355 + 144 
                ){
                    newTactil.keyDown.up = false;
                    newTactil.keyUp.up = true;
                }
            break;
        default:{};
    }



    return newTactil;
}

export default tactilController;