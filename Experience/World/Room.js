import * as THREE from 'three';
import { gsap } from 'gsap';
import Experience from "../Experience.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            speed: 0.1,
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();


    }

    setModel() {
        this.actualRoom.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group) {
                child.children.forEach(groupchild=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            if(child.name === "Screen") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                })
            }
        });

        this.scene.add(this.actualRoom);
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        //this.anim = this.mixer.clipAction(this.actualRoom.animations[0]);
        //this.anim.play();
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = (e.clientX - window.innerWidth / 2)*2 / window.innerWidth;
            this.lerp.target = this.rotation * 0.05;
        })
    }

    resize() {

    }

    update() {
        //this.mixer.update(this.time.delta * 0.001);
        this.lerp.current = gsap.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.speed
        );
        // console.log(this.lerp.current);
        // this.actualRoom.rotation.y = this.lerp.current;
    }

}