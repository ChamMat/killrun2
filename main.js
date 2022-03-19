import Controler from "./Controler.js";

const main = () => {
    const controler = new Controler();

    controler.init();
}

document.addEventListener('DOMContentLoaded', main);
