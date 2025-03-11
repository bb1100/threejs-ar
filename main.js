// Initial three setup https://threejs.org/docs/#manual/en/introduction/Installation
// Make a scene https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// npm install --save three
// npm install --save-dev vite
// npx vite

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.xr.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

document.body.appendChild( VRButton.createButton( renderer ) );