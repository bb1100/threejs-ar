// Initial three setup https://threejs.org/docs/#manual/en/introduction/Installation
// Make a scene https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// npm install --save three
// npm install --save-dev vite
// npx vite
//  glitch.com/intro-to-webxr

import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.xr.enabled = true;
document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 5;

document.body.appendChild( ARButton.createButton( renderer ) );

scene.add( new THREE.HemisphereLight( 0xa5a5a5, 0x898989, 3 ) );
const light = new THREE.DirectionalLight( 0xffffff, 3 );
light.position.set( 1, 1, 1 ).normalize();
scene.add( light );

function setLighting(){

    new RGBELoader()
        .setDataType( THREE.HalfFloatType )
        .setPath( 'https://threejs.org/examples/textures/equirectangular/' )
        .load( 'royal_esplanade_1k.hdr', function ( texture ) {

        var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

        // scene.background = envMap;
        scene.environment = envMap;

        texture.dispose();
        pmremGenerator.dispose();
    })
    var pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileEquirectangularShader();

}
setLighting();


function animate() {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );


const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

loader.load(
	'./public/models/hand_still.glb',
	function ( gltf ) {
        const model = gltf.scene;
        model.scale.set(0.01, 0.01, 0.01);
        model.rotation.set(0, 3.14, 0);
        
		scene.add( model );
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( error );
	}
);