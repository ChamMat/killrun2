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

            break;
        case "pointermove":
            newTactil.x = evt.pageX;
            newTactil.y = evt.pageY;
            break;
        case "pointerup":
            newTactil.down = false;
            newTactil.up = true;
            break;
        default:{};
    }

    return newTactil;
}

export default tactilController;