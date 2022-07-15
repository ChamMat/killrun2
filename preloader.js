import animationList from "./lib/animationList.js";
import imagesList from "./lib/imagesList.js";
import soundList from "./lib/soundList.js";

const preloader = {

    imgs : {},
    animations: {},
    song: {},
    nombreSongsTotal: 0,
    nombreImagesTotal: 0,
    nombreAnimTotal: 0,
    font: {},

    init : () => {
        preloader.chargementImage();
        preloader.chargementAnimations();
        preloader.chargementFont();
        preloader.chargementSons();

    },

    chargementFont: () => {
        preloader.font = new FontFace('PressStart2P-Regular', 'url(./lib/fonts/PressStart2P-Regular.ttf)');
        preloader.font.load().then(response => {
            document.fonts.add(response);
        });
    },

    chargementImage : () => {
        for(let i in imagesList){
            imagesList[i].forEach(imgData => {
                const img = document.createElement("img");
                img.setAttribute("src", `./lib/images/${i}/${imgData}.png`);
                preloader.imgs = {
                    ...preloader.imgs,
                    [imgData]: img
                }
                preloader.nombreImagesTotal +=1; // Compte le nombre d'image sencé êtré chargé pour la verif
            });
        }
    },

    chargementSons: () => {
        for(let i in soundList){
            preloader.song = {
                ...preloader.song,
                [soundList[i]]: new Audio(`./lib/sound/${soundList[i]}.wav`)
            }

            preloader.nombreSongsTotal += 1;
        }
    },

    chargementAnimations : () => {
        for(let i in animationList){
            animationList[i].forEach(animData => {
                const img = document.createElement("img");
                img.setAttribute("src", `./lib/animation/${i}/${animData}.png`);


                preloader.animations = {
                    ...preloader.animations,
                    [animData]: {
                        sprite: img,
                        json: null,
                    }
                }

                preloader.nombreAnimTotal +=1; // Compte le nombre d'animation sencé êtré chargé pour la verif

                fetch(`./lib/animation/${i}/${animData}.json`)
                .then(response => response.json())
                .then(response => preloader.animations[animData].json = response)
            })
        }
    },

    statuDuPreloader : () => {
        if (
            preloader.verificationChargementImage()
            && preloader.verificationChargementAnimation()
            && preloader.verificationChargementSons()
            ){
            return true;
        }else {
            return false;
        } 
    },

    verificationChargementImage : () => {
        let imagesCharges = 0;

        for (let name in preloader.imgs){
            if (preloader.imgs[name].complete){
                imagesCharges +=1;
            }
        }

        return preloader.nombreImagesTotal === imagesCharges ? true : false;
    },

    verificationChargementAnimation: () => {
        let animationCharge = 0;
        let jsonCharge = 0;

        for (let name in preloader.animations){
            
            if(preloader.animations[name].sprite.complete){
                animationCharge +=1;
            }
            if(preloader.animations[name].json != null){
                jsonCharge +=1;
            }
           
        }

        // console.log(animationCharge, jsonCharge)

        return animationCharge === preloader.nombreAnimTotal && jsonCharge === preloader.nombreAnimTotal ? true : false;
    },

    verificationChargementSons: () => {
        let sonCharge = 0;

        for (let i in preloader.song){
            if (preloader.song[i].readyState === 4){
                sonCharge +=1;
            }
        }

        return sonCharge === preloader.nombreSongsTotal;
    }

}

export default preloader;