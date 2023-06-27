import * as THREE from 'three'

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap from 'gsap'


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

const controls = new OrbitControls(camera, renderer.domElement)

controls.enableDamping = true;    // 设置阻尼系数

const axesHelper = new THREE.AxesHelper(15)
scene.add(axesHelper)
// Clock 类可以用来 
// const clock = new THREE.Clock()  

gsap.to(
    cube.position, 
    {
        x:5, 
        duration:10,  // 动画执行的时长
        repeat:-1,
        yoyo:true,
        onStart: () => {
            console.log('动画开始')
        },
        onComplete:() => {
            console.log('动画结束')
        }
    }
)

gsap.to(
    cube.rotation, 
    {
        x:2 * Math.PI, 
        duration:10,  // 动画执行的时长
        repeat:-1,
        yoyo:true,
        onStart: () => {
            console.log('动画开始')
        },
        onComplete:() => {
            console.log('动画结束')
        }
    }
)


gsap.to(
    cube.position, 
    {
        y:5, 
        duration:10,  // 动画执行的时长
        repeat:-1,
        yoyo:true,
        onStart: () => {
            console.log('动画开始')
        },
        onComplete:() => {
            console.log('动画结束')
        }
    }
)

gsap.to(
    cube.position, 
    {
        z:-50, 
        duration:10,  // 动画执行的时长
        repeat:-1,
        yoyo:true,
        onStart: () => {
            console.log('动画开始')
        },
        onComplete:() => {
            console.log('动画结束')
        }
    }
)


const animate = () => {
    // cube.rotation.x+= 0.01
    // cube.rotation.y+= 0.01
    // cube.rotation.z+= 0.01
    // const elapsedTime = clock.getElapsedTime()
    // const offsetX = elapsedTime * 1   // 时间 * 单位时间挪动的像素
    // cube.position.x = offsetX % 5
    // 这个可以指定动画的轨迹以及运动的方式  及  渲染的时长

    // 设置阻尼系数后需要再每一帧调用轨道控制器的update
    controls.update()

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()