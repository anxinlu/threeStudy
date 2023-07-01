import * as THREE from 'three'

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap from 'gsap'


// 引入需要的工具
// const { Scene,BoxGeometry,Mesh,MeshBasicMaterial,PerspectiveCamera } = THREE
//初始化场景
const scene = new THREE.Scene()
//创建骨架
const geometry = new THREE.BoxGeometry(1,1,1)
//设置纹理
const texture = new THREE.TextureLoader().load( './textures/xiaoxin.png' );
//创建皮肤
const material = new THREE.MeshBasicMaterial({color:'white', map:texture, transparent: true, opacity: 1})
// 将骨架和皮肤融合
const cube = new THREE.Mesh(geometry,material)

texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4)



//设置摆放的位置    如果没进行设置的话 默认是在原点
cube.position.set(0,0,0)

//将模型放置到场景中去
scene.add(cube)

//设置正交透视摄像机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.5, 1000)

// 设置照相机的位置
camera.position.set(2,2,2)

camera.lookAt(0,0,0)

//创建渲染器
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)  //先设置渲染器的大小之后再进行渲染

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

controls.enableDamping = true;    // 设置阻尼系数

// const axesHelper = new THREE.AxesHelper(15)
// scene.add(axesHelper)
// Clock 类可以用来 
// const clock = new THREE.Clock()  

// gsap.to(
//     cube.position, 
//     {
//         x:5, 
//         duration:10,  // 动画执行的时长
//         repeat:-1,
//         yoyo:true,
//         onStart: () => {
//             console.log('动画开始')
//         },
//         onComplete:() => {
//             console.log('动画结束')
//         }
//     }
// )

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


// gsap.to(
//     cube.position, 
//     {
//         y:5, 
//         duration:10,  // 动画执行的时长
//         repeat:-1,
//         yoyo:true,
//         onStart: () => {
//             console.log('动画开始')
//         },
//         onComplete:() => {
//             console.log('动画结束')
//         }
//     }
// )

// gsap.to(
//     cube.position, 
//     {
//         z:-50, 
//         duration:10,  // 动画执行的时长
//         repeat:-1,
//         yoyo:true,
//         onStart: () => {
//             console.log('动画开始')
//         },
//         onComplete:() => {
//             console.log('动画结束')
//         }
//     }
// )


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

window.addEventListener('resize',() => {
    console.log('resize')

    camera.aspect = window.innerWidth / window.innerHeight; // 重新设置横向的aspect 主要是置换矩阵依赖 这个参数
    camera.updateProjectionMatrix() // 重新更新矩阵的信息 主要是用来裁剪

    // 根据画布的大小重新渲染渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)

    //设置渲染器的像素比 -> 主要是根据设备的像素比来进行设置渲染 -> 否则可能会导致渲染的画布占不满整个屏幕
    // 可以尝试切换成手机屏幕试下效果
    renderer.setPixelRatio()
})

window.addEventListener('dblclick', () => {
    console.log('用户点击了双击')
    // 假设此时没有全局的dom元素
    if(!document.fullscreenElement){
      renderer.domElement.requestFullscreen()
    }else{
        // 如果此时有全屏的元素存在则退出全屏
        document.exitFullscreen()
    }
})