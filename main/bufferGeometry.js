import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap  from 'gsap';


// 创建场景
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement)


// 创建骨架

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );



// const axesHelper = new THREE.AxesHelper(15)
// scene.add(axesHelper)


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;    // 设置阻尼系数


for(let i=0; i<2; i++){
    const geometry = new THREE.BufferGeometry()
    const arr = new Float32Array(12)

    for(let j=0;j<12;j++){
        arr[j] =  Math.random() * 5
    }

    const color = new THREE.Color(Math.random(), Math.random(), Math.random())

   //创建皮肤
    const material = new THREE.MeshBasicMaterial({ color, transparent:true, opacity: Math.random()})

    geometry.setAttribute("position", new THREE.BufferAttribute( arr, 4 ))

//     const drawCount = 2; // draw the first 2 points, only
// geometry.setDrawRange( 0, drawCount );

    const cube = new THREE.Mesh(geometry, material) 
    console.log('cube', cube)
    scene.add(cube)

    gsap.to(cube.rotation,{
        x: Math.PI * 2,
        y:Math.PI,
        duration:10,
        yoyo:true,
        repeat:-1
    })
}


// 将皮肤和骨架组装到一起



// 将cube添加到场景中去





// 创建正交投影相机

camera.position.set(10, 10, 10)

camera.lookAt(0,0,0)




/** 配置轨道控制器后需要控制每一帧的渲染才能起作用 */

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

animate()

window.addEventListener('resize', () => {
    camera.aspect =  window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio()
})



