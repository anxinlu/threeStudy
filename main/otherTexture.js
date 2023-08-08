import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建渲染器



const scene =  new THREE.Scene()

// 首先设置骨架
const geometry = new THREE.SphereGeometry(2,32,16)

const  textureLoader = new THREE.TextureLoader()

const metalnessTexture = textureLoader.load('./textures/TerrazzoSlab028_METALNESS_2K_METALNESS.png')

const texture = textureLoader.load('./textures/TerrazzoSlab028_Sphere.png')

const aoTexture = textureLoader.load('./textures/TerrazzoSlab028_AO_2K_METALNESS.png')

const bumpTexture = textureLoader.load('./textures/TerrazzoSlab028_BUMP_2K_METALNESS.png')

const rougnTexture = textureLoader.load('./textures/TerrazzoSlab028_ROUGHNESS_2K_METALNESS.png')


/**
 * 用于创建法线贴图的纹理
 */
const normalTexture = textureLoader.load('./textures/TerrazzoSlab028_NRM_2K_METALNESS.png')

texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;


//设置皮肤
const sphereMaterial = new THREE.MeshStandardMaterial({
    map: texture, 
    side: THREE.DoubleSide,
    shininess: 20, //高光部分的亮度，默认30
    // transparent:true,
    color:"#ffffff",
    metalness:0.1,
    metalnessMap:metalnessTexture,
    normalMap:normalTexture,
    aoMap:aoTexture,
    bumpMap:bumpTexture,
    aoMapIntensity:1,
    roughnessMap:rougnTexture
})


const sphereObj = new THREE.Mesh(geometry, sphereMaterial)

sphereObj.position.set(0,0,0)

scene.add(sphereObj)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000)

camera.position.set(10,10,10)

camera.lookAt(0,0,0)


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)



const controls = new OrbitControls(camera, renderer.domElement)

controls.enableDamping = true;    // 设置阻尼系数

const axesHelper = new THREE.AxesHelper(15)
scene.add(axesHelper)

const light = new THREE.DirectionalLight(0x404040,20)
light.position.set(2,2,0)
scene.add(light)



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