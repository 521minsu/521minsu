import * as THREE from 'three';
import { gsap } from 'gsap';
import Experience from "../Experience.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            // color: 0x241c25,        // Purple
            // color: 0xe5a1aa,        // Pink
            color: 0x32A4CF,        // Blue
            side: THREE.BackSide
        });

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.receiveShadow = true;
    }

    resize() {

    }

    update() {
    }

}