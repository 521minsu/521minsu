import * as THREE from 'three';
import { gsap } from 'gsap/all';
import Experience from "../Experience.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.room = this.experience.world.room.actualRoom;
        this.select = this.experience.select;

        this.back = true;
        this.home = document.getElementById("top");

        
        this.viewCont = {
            current: 0,
            target: 0,
            speed: 0.1,
        }

        this.roomRot = {
            current: 0,
            target: 0,
            speed: 0.1,
        }

        // this.onWheel();
        this.onClick();
        this.onMouseMove();
    }

    onClick() {
        this.select.on("clicked", () => {
            // console.log("onClick: clicked");

            this.flag = true;
            this.selected = this.select.selected;
            this.back = false;
        });
        this.select.on("released", () => {
            // console.log("onClick: released");
            this.releaseFlag = true;
            this.back = true;
            
        });
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = (e.clientX - window.innerWidth / 2)*2 / window.innerWidth;
            this.roomRot.target = this.rotation * 0.05;
        })
    }
    

    quadrupedView() {
        this.camera.orthographicCamera.zoom = gsap.utils.interpolate(0.75, 3, this.viewCont.current);
        this.camera.orthographicCamera.lookAt(
                                                0, 
                                                gsap.utils.interpolate(1.5, 0.25, this.viewCont.current), 
                                                0
            );
        if (this.flag) {
            this.quadBlank = document.getElementById("quad");
            if (this.quadBlank) this.quadBlank.scrollIntoView({behavior: "instant"});
            this.flag = false;
        }
    }

    monitorView() { 
        this.camera.orthographicCamera.zoom = gsap.utils.interpolate(0.75, 2.75, this.viewCont.current);
        this.camera.orthographicCamera.lookAt(
                                                gsap.utils.interpolate(0, -0.25, this.viewCont.current), 
                                                gsap.utils.interpolate(1.5, 2, this.viewCont.current), 
                                                0
            );
        if (this.flag) {
            
            this.quadBlank = document.getElementById("monitor");
            if (this.quadBlank) this.quadBlank.scrollIntoView({behavior: "instant"});
            this.flag = false;
        }
    }

    drawerView() {


        this.camera.orthographicCamera.zoom = gsap.utils.interpolate(0.75, 2.75, this.viewCont.current);
        this.camera.orthographicCamera.lookAt(
                                                gsap.utils.interpolate(0, -0.25, this.viewCont.current), 
                                                gsap.utils.interpolate(1.5, 2, this.viewCont.current), 
                                                0
            );
        if (this.flag) {
        
            this.quadBlank = document.getElementById("aboutMe");
            if (this.quadBlank) this.quadBlank.scrollIntoView({behavior: "instant"});
            this.flag = false;
        }
    }

    resize() {

    } 

    update() {

        this.viewCont.current = gsap.utils.interpolate(
            this.viewCont.current,
            this.viewCont.target,
            this.viewCont.speed
        );

        this.roomRot.current = gsap.utils.interpolate(
            this.roomRot.current,
            this.roomRot.target,
            this.roomRot.speed
        );

        if(this.back && this.viewCont.target != 1) { this.viewCont.target -= 0.005; }
        else { this.viewCont.target += 0.007; }
        
        // Stops the camera from going out of bounds
        this.viewCont.target = gsap.utils.clamp(0, 1, this.viewCont.target);
        this.viewCont.current = gsap.utils.clamp(0, 1, this.viewCont.current);
        

        this.room.rotation.y = -this.viewCont.current * 0.5 + this.roomRot.current;
        
        if (this.viewCont.current < 0.001) {
            // console.log(this.viewCont.current);
            if (this.releaseFlag) { this.home.scrollIntoView({behavior: "instant"}); this.releaseFlag = false;}
        }

        document.querySelector(':root').style.setProperty('--transparency', this.viewCont.current);
        // console.log(this.viewCont.current);
        if (this.selected == "Quadruped" && this.viewCont.current > 0.0001) { this.quadrupedView(); }
        else if (this.selected == "Monitor") { this.monitorView(); }
        else if (this.selected == "Drawer") { this.drawerView(); }
        

        this.camera.orthographicCamera.updateProjectionMatrix();

        
        
    }

}
