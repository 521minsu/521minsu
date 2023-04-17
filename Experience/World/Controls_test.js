import * as THREE from 'three';
import { gsap } from 'gsap';
import Experience from "../Experience.js";

export default class ControlsTest {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.camera = this.experience.camera;
        this.actualRoom = this.room.scene;

        this.progress = 0;

        this.lerp = {
            current: 0,
            target: 0,
            speed: 0.1,
        }

        this.position = new THREE.Vector3(0,0,0);
        this.lookAtPos = new THREE.Vector3(0,0,0);

        this.directionalVector = new THREE.Vector3(0,0,0);
        this.staticVector = new THREE.Vector3(0,1,0);
        this.crossVector = new THREE.Vector3(0,0,0);

        this.setPath();
        this.onWheel();
    }

    setPath() {
        //Create a closed wavey loop
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -5, 2, 0 ),
            new THREE.Vector3( 0, 2, -5 ),
            new THREE.Vector3( 5, 2, 0 ),
            new THREE.Vector3( 0, 2, 5 )
        ], true );



        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

        // Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add(curveObject);
    }

    onWheel() {
        window.addEventListener("wheel", (e) => {
            // console.log(e);
            if(e.deltaY > 0) {
                this.lerp.target += 0.05;
                // this.back = false;
            } else {
                this.lerp.target -= 0.05;
                // this.back = true;
            }
        });
    }

    resize() {

    }

    update() {
        this.lerp.current = gsap.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.speed
        );

        // Allows the camera to move in the direction of the latest scroll
        // if(this.back) { this.lerp.target -= 0.001; }
        // else { this.lerp.target += 0.001; }
        
        // -------------------------------------------------------------------- //
        // Stops the camera from going out of bounds
        // this.lerp.target = gsap.utils.clamp(0, 1, this.lerp.target);
        // this.lerp.current = gsap.utils.clamp(0, 1, this.lerp.current);

        // Get the position of the camera & Direction
        // this.curve.getPointAt(this.lerp.current % 1, this.position);
        // this.curve.getPointAt(this.lerp.current % 1 + 0.01, this.lookAtPos);
        
        // Set the camera position & Direction to look ahead
        // this.camera.orthographicCamera.position.copy(this.position); 
        // this.camera.orthographicCamera.lookAt(this.lookAtPos);
        // -------------------------------------------------------------------- //

        // -------------------------------------------------------------------- //
        // Direct camera to look at the center of the curve
        if (this.lerp.current < 0) { this.lerp.current = 1; this.lerp.target = 1; }

        this.curve.getPointAt(this.lerp.current % 1, this.position);
        this.camera.orthographicCamera.position.copy(this.position); 

        // console.log(this.lerp.current % 1);

        

        this.directionalVector.subVectors( 
            this.curve.getPointAt( ((this.lerp.current % 1) + 0.01) % 1), 
            this.position
        );
        this.directionalVector.normalize();
        this.crossVector.crossVectors(this.staticVector, this.directionalVector);
        this.crossVector.multiplyScalar(10000);
        this.camera.orthographicCamera.lookAt(this.crossVector);
    }

}