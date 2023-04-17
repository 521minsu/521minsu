import * as THREE from 'three';
import Experience from "../Experience.js";

export default class Evnironment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();


    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 1);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-1, 3, -3);

        this.studioLight = new THREE.DirectionalLight("#ffffff", 0.3);
        this.studioLight.castShadow = true;
        this.studioLight.shadow.camera.far = 20;
        this.studioLight.shadow.mapSize.set(2048, 2048);
        this.studioLight.shadow.normalBias = 0.05;
        this.studioLight.position.set(4, 7, 3);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 0.3);

        //const helper = new THREE.CameraHelper(this.studioLight.shadow.camera);
        //this.scene.add(helper);

        this.scene.add(this.studioLight);
        this.scene.add(this.ambientLight);
        this.scene.add(this.sunLight);
    }

    resize() {

    }

    update() {

    }

}