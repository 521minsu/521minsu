import * as THREE from 'three';
import Experience from "./Experience.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35, 
            this.sizes.aspect, 
            0.1, 
            1000  
        );
        
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(15,13,26);
        this.perspectiveCamera.updateProjectionMatrix();
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (this.sizes.aspect * this.sizes.frustrum) / -2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            this.sizes.frustrum / -2,
            -50,
            50       
        );

        this.orthographicCamera.position.set(3,3,3);
        // console.log(this.orthographicCamera);
        this.orthographicCamera.lookAt(0, 1.5, 0);
        this.orthographicCamera.zoom = 0.75;

        
        this.orthographicCamera.updateProjectionMatrix();
        
        this.scene.add(this.orthographicCamera);

        const size = 20;
        const divisions = 20;
        
        this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);

        const gridHelper = new THREE.GridHelper( size, divisions );
        const axesHelper = new THREE.AxesHelper( 10 );

        // this.scene.add( axesHelper );
        // this.scene.add( gridHelper );
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    resize() {
        // Updating Perspective Camera on resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        // Updating Ortographic Camera on resize
        this.orthographicCamera.left = (this.sizes.aspect * this.sizes.frustrum) / -2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = this.sizes.frustrum / -2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();

        // console.log(this.perspectiveCamera.position);
        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.rotation.copy(this.orthographicCamera.rotation);
    }

}