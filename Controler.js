import keyBoardController from "./userInput/keyBoardController.js";
import mouseController from "./userInput/mouseController.js";

import preloader from "./preloader.js";

import gameSettings from "./settings/gameSettings.js";
import levelDatas from "./settings/levelDatas.js";

import mapGenerator from "./utils/mapGenerator.js";
import tileEnhancement from "./utils/tileEnhancement.js";

import Game from "./Game.js";
import Show from "./Show.js";

class Controler {
    constructor(){
        this.interval;
        this.keyBoardControllerDatas = {
            keyDown:{
                up: false,
                down: false,
                left: false,
                right: false,
                p: false,
            },
            keyUp: {
                up: true,
                down: true,
                left: true,
                right: true,
                p: true,
            }
        }
        this.mouseControllerDatas = {
            x : 450,
            y : 300,
            lastDownX: 0,
            lastDownY: 0,
            down: false,
            up: true
        }
        this.imgs;
        this.animations;
        this.level = 1;
        this.map;

        this.show;
        this.game;
        this.gameObjects;
        this.personnages;
    }

    init = () => {
        const body = document.querySelector("body");
        const eventCatcher = document.querySelector("#EventCatcher");
        body.addEventListener("keydown", this.handleEvent);
        body.addEventListener("keyup", this.handleEvent);
        eventCatcher.addEventListener("mousemove", this.handleEvent);
        eventCatcher.addEventListener("mousedown", this.handleEvent);
        eventCatcher.addEventListener("mouseup", this.handleEvent);

        eventCatcher.addEventListener("touchstart", this.handleEvent);
        this.preloaderStart();
    }

    handleEvent = (evt) => {
        switch(evt.type){
            case "keydown":
                this.keyBoardControllerDatas = keyBoardController(this.keyBoardControllerDatas, evt);
                break;
            case "keyup":
                this.keyBoardControllerDatas = keyBoardController(this.keyBoardControllerDatas, evt);
                break;
            case "mousemove":
                this.mouseControllerDatas = mouseController(this.mouseControllerDatas, evt);
                break;
            case "mousedown":
                this.mouseControllerDatas = mouseController(this.mouseControllerDatas, evt);
                break;
            case "mouseup":
                this.mouseControllerDatas = mouseController(this.mouseControllerDatas, evt);
                break;
            case "touchstart":
                this.keyBoardControllerDatas.keyDown.up = false;
                this.keyBoardControllerDatas.keyUp.up = true;
                break;
            default:{}
        }
    }

    preloaderStart = () => {

        preloader.init();

        this.interval = setInterval(()=> {
            if(preloader.statuDuPreloader()){
                this.imgs = preloader.imgs;
                this.animations = preloader.animations;
                this.show = new Show(this.imgs, this.animations, levelDatas);
                this.show.init();
                this.game = new Game();
                clearInterval(this.interval);
                this.startGame();
            }
        }, gameSettings.loadingSpeed);
        
    }

    startGame = () => {

        if (this.level > 0){
            const generator = mapGenerator(levelDatas[this.level].map);

            this.map = generator[0];
            tileEnhancement(this.map);

            this.personnages = generator[1];
        }

        for (let personnage in this.personnages){
            let perso = this.personnages[personnage];
            perso.init(this.animations[perso.name].json.frames, [levelDatas[this.level].map[0].length * 32, levelDatas[this.level].map.length *32]);
        }

        this.game.init("game"); // Initialiser game directement au niveau du jeu (mode dev, mettre "start" en prod)
        this.show.upDateLimiteCamera((levelDatas[this.level].map[0].length)*32, (levelDatas[this.level].map.length)*32);
        this.show.updateCamera(this.personnages["hero"]);
        this.interval = setInterval(this.runGame, gameSettings.gameSpeed)
    }

    runGame = () => {
        if (this.keyBoardControllerDatas.keyDown.p){
            clearInterval(this.interval);
            console.log("stop");
        }
        this.game.update(this.personnages, gameSettings, this.map, this.keyBoardControllerDatas);
        this.draw();
    }

    draw = () => {
        this.show.updateCamera(this.personnages.hero)
        this.game.map ? this.show.gameBackground(this.level, this.map) : this.show.clear();
        this.show.personnages(this.personnages);
        
    }


}

export default Controler;