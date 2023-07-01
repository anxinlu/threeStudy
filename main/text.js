import * as THREE from 'three'
import { BoxGeometry, MeshBasicMaterial, PerspectiveCamera, WebGLRenderer } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';
import { AxesHelper } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/fontloader';

const scene = new THREE.Scene()
let  textGeometry 
const fontLoader = new FontLoader().load('./fonts/helvetiker_regular.typeface.json', function(font){
    textGeometry = new TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelSegments: 5
	} );
})


scene.background = new THREE.Color(Math.random(), Math.random(), Math.random())




const picTexture = new THREE.TextureLoader().load('./textures/xiaoxin.png')
const material = new THREE.MeshPhongMaterial({color:'red'})

const cube = new THREE.Mesh(textGeometry, material)
cube.position.set(0,0,0)
scene.add(cube)

const renderer = new WebGLRenderer()

const axesHelper = new AxesHelper(10)
scene.add(axesHelper)

const camera = new PerspectiveCamera(75, window.innerWidth, window.innerHeight, 0.5, 1000)

camera.position.set(2,2,2)

camera.lookAt(0,0,0)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true //阻尼系数

renderer.setSize(window.innerWidth, window.innerHeight)




document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
    camera.aspect =  window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio()
})


function animate(){

    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()