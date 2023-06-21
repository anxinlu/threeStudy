import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// 引入需要的工具
// const { Scene,BoxGeometry,Mesh,MeshBasicMaterial,PerspectiveCamera } = THREE

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color:'skyblue'})
const cube = new THREE.Mesh(geometry,material)
cube.position.set(0,0,0)
scene.add(cube)

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.5, 1000)

camera.position.set(10,10,10)
camera.lookAt(0,0,0)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)  //先设置渲染器的大小之后再进行渲染

document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
let scale = 1
const animate = () => {
    cube.rotation.x+= 0.01
    cube.rotation.y+= 0.01
    cube.rotation.z+= 0.01
    
    if(cube.position.x >= 5){
        cube.position.x = 0
        scale = 1
    }else if(0< cube.position.x <5){
        scale+= 0.005
        cube.position.x+= 0.01
    }
    cube.scale.set(scale,scale,scale)
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()