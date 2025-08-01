import * as THREE from 'three';
import Experience from "../Experience.js";
import EventEmitter from 'events';

export default class MeshSelect extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.renderer = this.experience.renderer;

        this.raycast();
    }

    raycast() {

        const interestedObjects = [
            "Drawer",
            "Monitor",
            "Quadruped"
        ];

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        this.clicked = false;
        this.selected = "";

        
        window.addEventListener("mousedown", (ev) => {
            // Only handle clicks if they're on the 3D canvas area
            const canvas = this.experience.canvas;
            const rect = canvas.getBoundingClientRect();
            
            // Check if click is within the canvas bounds
            if (ev.clientX < rect.left || ev.clientX > rect.right || 
                ev.clientY < rect.top || ev.clientY > rect.bottom) {
                return; // Click is outside canvas, don't handle it
            }
            
            pointer.x = ( ev.clientX / window.innerWidth ) * 2 - 1;
            pointer.y = - ( ev.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera( pointer, this.camera.orthographicCamera );
            const intersects = raycaster.intersectObjects( this.scene.children );
            
            // console.log(intersects);
            for (let j = 0; j <= intersects.length; j++) {           
                for (let i = 0; i < interestedObjects.length; i++) {
                    if (  intersects.length > 0 && intersects[j] && intersects[j].object.name.includes(interestedObjects[i]) ) {
                    
                        this.clicked = true;
                        this.selected = interestedObjects[i];
                        
                        // console.log("clicked on: ", interestedObjects[i]);
                        // console.log(getComputedStyle(document.querySelector(':root')).getPropertyValue('--transparency'));
                        // console.log("clicked emitted!");

                        this.emit("clicked"); 
                        break;
                    }
                }
                if (this.clicked) break;
            }
        });

        window.addEventListener("mouseup", (e) => {
            
            // console.log("released emitted!");
            if (this.clicked) {
                this.selected = "";
                this.clicked = false;
                this.emit("released");
            }
        });

    }

    resize() {
    }

    update() {
    }

}