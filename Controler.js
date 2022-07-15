import keyBoardController from "./userInput/keyBoardController.js";
import mouseController from "./userInput/mouseController.js";

import preloader from "./preloader.js";

import gameSettings from "./settings/gameSettings.js";
import levelDatas from "./settings/levelDatas.js";

import mapGenerator from "./utils/mapGenerator.js";
import backgroundGenerator from "./utils/backgroundGenerator.js";
import tileEnhancement from "./utils/tileEnhancement.js";

import Game from "./Game.js";
import Show from "./Show.js";
import tactilController from "./userInput/tactilController.js";
import Menu from "./Menu.js";

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
            x : -50,
            y : -50,
            lastDownX: 0,
            lastDownY: 0,
            down: false,
            up: true
        }

        this.tactilControllerDatas = {
            bool : false,
            fullScreen: false,
            x : -50,
            y : -50,
            lastDownX: 0,
            lastDownY: 0,
            down: false,
            up: true,
            keyDown:{
                up: false,
                down: false,
                left: false,
                right: false,
            },
            keyUp: {
                up: true,
                down: true,
                left: true,
                right: true,
            }
        }
        this.imgs;
        this.animations;
        this.sounds;
        this.level = 0;
        this.map;
        this.mapLimites = [0, 0];
        this.tilesDecoration;
        this.tilesExt;
        this.camera;
        this.textes;

        this.show;
        this.game;
        this.menu;
        this.gameObjects;
        this.personnages = {};
        this.secondBackground;
        this.userTerminalIsComputer = true;
        this.tape = 0;

        this.fullScreen = false;

        this.userAgent;
        this.canvas;
    }

    init = () => {
        this.canvas = document.querySelector("#GraphicsBox");
        const body = document.querySelector("body");
        const eventCatcher = document.querySelector("body");
        body.addEventListener("keydown", this.handleEvent);
        body.addEventListener("keyup", this.handleEvent);
        eventCatcher.addEventListener("mousemove", this.handleEvent);
        eventCatcher.addEventListener("mousedown", this.handleEvent);
        eventCatcher.addEventListener("mouseup", this.handleEvent);
        document.onfullscreenchange = () => {
            this.fullScreen = !this.fullScreen;
            this.tactilControllerDatas.fullScreen = this.fullScreen;
        }

        body.addEventListener("pointerdown", (evt) => {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this.handleEvent(evt)
        }, {passive:false}
        );
        body.addEventListener("pointermove", (evt) => {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this.handleEvent(evt)
        } , {passive:false});
        body.addEventListener("pointerup", this.handleEvent);

        body.addEventListener("touchstart", (evt)=> {
            evt.preventDefault();
            evt.stopImmediatePropagation();
        }, {passive:false})
        body.addEventListener("touchmove", (evt)=> {
            evt.preventDefault();
            evt.stopImmediatePropagation();
        }, {passive:false})
        body.addEventListener("touchend", (evt)=> {
            evt.preventDefault();
        }, {passive:false})

        this.preloaderStart();

        this.userAgent = navigator.userAgent;

        if( navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            ){
           this.userTerminalIsComputer = false;
           this.tactilControllerDatas.bool = true;

        }else {
            // document.querySelector("#arraw").style.display = "none"
        }
        
    }

    handleEvent = (evt) => {
        switch(evt.type){
            case "keydown":
                this.keyBoardControllerDatas = keyBoardController(this.keyBoardControllerDatas, evt);
                // if (evt.code === "KeyF"){
                //     document.querySelector("#BackgroundBox").requestFullscreen();
                //     document.querySelector("#EventCatcher").addEventListener("mousemove", this.handleEvent);
                //     document.querySelector("#EventCatcher").addEventListener("mousedown", this.handleEvent);
                //     document.querySelector("#EventCatcher").addEventListener("mouseup", this.handleEvent);
                // }
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
            case "pointerdown":
                evt.preventDefault();
                // if (!this.fullScreen && this.tape > 0){
                //     document.querySelector("#BackgroundBox").requestFullscreen();
                //     this.fullScreen = true;

                // }

                // this.tape +=1;
                this.tactilControllerDatas = tactilController(this.tactilControllerDatas, evt);
                break;
            case "pointermove":
                evt.preventDefault();
                this.tactilControllerDatas = tactilController(this.tactilControllerDatas, evt);
                break;
            case "pointerup":
                evt.preventDefault();
                this.tactilControllerDatas = tactilController(this.tactilControllerDatas, evt);
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
                this.sounds = preloader.song;
                this.show = new Show(this.imgs, this.animations, levelDatas);
                this.show.init();
                this.game = new Game(this.sounds);
                clearInterval(this.interval);
                this.startGame();
            }
        }, gameSettings.loadingSpeed);
        
    }

    startGame = () => {

        if (this.level != 0){
            this.camera = levelDatas[this.level].camera;

            this.mapLimites = [(levelDatas[this.level].map[0].length)*32, (levelDatas[this.level].map.length)*32];

            if (this.level > 0){
                const generator = mapGenerator(levelDatas[this.level].map);
                
                this.textes =  levelDatas[this.level].text;

                this.map = generator[0];
                tileEnhancement(this.map, this.mapLimites);

                this.personnages = generator[1];
                this.tilesDecoration = generator[2];
                this.tilesExt = generator[3];
                
                this.secondBackground = backgroundGenerator(levelDatas[this.level].secondBackground, this.mapLimites);

                for (let personnage in this.personnages){
                    let perso = this.personnages[personnage];
                    perso.init(this.animations[perso.name].json.frames, [levelDatas[this.level].map[0].length * 32, levelDatas[this.level].map.length *32], this.sounds);
                }

                this.game.init("game"); // Initialiser game directement au niveau du jeu (mode dev, mettre "start" en prod)
                this.camera ? this.show.upDateLimiteCamera(this.mapLimites[0], this.mapLimites[1]) : "";
                this.camera ? this.show.updateCamera(this.personnages["hero"]) : "";
            }
        
        }
        if (this.level === 0){
            this.menu = new Menu();
        }
        this.interval = setInterval(this.runGame, gameSettings.gameSpeed)
    }

    runGame = () => {

        if (this.level != 0){
            if (this.keyBoardControllerDatas.keyDown.p){
                clearInterval(this.interval);
                console.log("stop");
            }
            if (this.game.newLevel){
                this.level+=1;
                clearInterval(this.interval);
                this.game = new Game(this.sounds);
                this.startGame();
            }
            if (!this.game.deathOfHero){
                this.game.update(this.personnages, gameSettings, this.map, this.keyBoardControllerDatas, this.tactilControllerDatas, this.fullScreen ,() => {this.fullScreen = !this.fullScreen}, this.userTerminalIsComputer, this.sounds);
                this.draw();
            }else {
                clearInterval(this.interval);
                this.game = new Game(this.sounds);
                this.startGame();
            }
        }
        
        if (this.level === 0){
            this.menu.run(this.imgs["button"], this.tactilControllerDatas, () => {
                this.level = 1;
                clearInterval(this.interval);
                this.startGame();
            });

            const canva = document.querySelector("#GraphicsBox").getContext("2d");
            canva.fillStyle = "#fff";
            canva.textAlign = "left";
            canva.font = `10px "PressStart2P-Regular"`;
            canva.fillText(this.userAgent, 50, 50);
        }
        
    }

    draw = () => {
        this.camera? this.show.updateCamera(this.personnages.hero): "";
        if (this.game.map){
            
            this.show.gameBackground(this.level, this.map, this.tilesDecoration, this.secondBackground);
            this.show.personnages(this.personnages);
            this.show.gameBackgroundExt(this.tilesExt)
            this.show.writeTexte(this.textes);
            this.show.drawFullScreenButton();
            if (!this.userTerminalIsComputer){
                this.show.mobileInterface();
            }
        }
        else {
            this.show.clear();
        }
        
    }


}

export default Controler;