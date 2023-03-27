import * as Kalidokit from "kalidokit";
import { animateVRM } from './AnimateVRM'
import { socket } from './WebSocket'

/* THREEJSの設定 */
let firstModel;
let secondModel;

// renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// camera
const orbitCamera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
orbitCamera.position.set(0.0, 1.4, 0.7);

// controls
const orbitControls = new THREE.OrbitControls(orbitCamera, renderer.domElement);
orbitControls.screenSpacePanning = true;
orbitControls.target.set(0.0, 1.4, 0.0);
orbitControls.update();

// scene
const scene = new THREE.Scene();

// light
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1.0, 1.0, 1.0).normalize();
scene.add(light);

// Main Render Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    if (firstModel && secondModel) {
        // Update model to render physics
        firstModel.update(clock.getDelta());
        secondModel.update(clock.getDelta());
    }
    renderer.render(scene, orbitCamera);
}
animate();

// VRMモデルを読み込む
const loader = new THREE.GLTFLoader();
loader.crossOrigin = "anonymous";
// Import model from URL, add your own model here
//1つ目のモデルを読み込み
loader.load(
    "https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAshtra.vrm?v=1630342336981",

    (gltf) => {
        THREE.VRMUtils.removeUnnecessaryJoints(gltf.scene);

        THREE.VRM.from(gltf).then((vrm) => {
            scene.add(vrm.scene);
            firstModel = vrm;
            firstModel.scene.position.set(-1, 0, 0);
            firstModel.scene.rotation.y = Math.PI; // Rotate model 180deg to face camera
        });
    },

    (progress) => console.log("Loading model...", 100.0 * (progress.loaded / progress.total), "%"),

    (error) => console.error(error)
);

//2つ目のモデルを読み込み
loader.load(
    "../src/models/sample.vrm",

    (gltf) => {
        THREE.VRMUtils.removeUnnecessaryJoints(gltf.scene);

        THREE.VRM.from(gltf).then((vrm) => {
            scene.add(vrm.scene);
            secondModel = vrm;
            secondModel.scene.position.set(1, 0, 0);
            secondModel.scene.rotation.y = Math.PI; // Rotate model 180deg to face camera
        });
    },

    (progress) => console.log("Loading model...", 100.0 * (progress.loaded / progress.total), "%"),

    (error) => console.error(error)
);

//DOMを読み込み
let videoElement = document.querySelector(".input_video");

//WebSocketでモーションデータとターゲットを受けた時の処理
socket.on('receiveMotion', (target, results) => {
    //ターゲットに応じて動かすモデルを変える
    if (target === 'First') {
        //モデルを動かす
        animateVRM(firstModel, results, videoElement);
    } else {
        animateVRM(secondModel, results, videoElement);
    }
});

