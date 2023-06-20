import * as THREE from 'three'
console.log(THREE)

//创建场景
const scene = new THREE.Scene()

//创建相机
//创建正交透视相机  模拟人眼 根据几个参数配置视椎体
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.5,1000)
camera.position.set(0,0,0)
camera.lookAt(5, 5, 5)

/**
 * 创建物体的四个步骤
 * 1、创建几何体
 * 2、指定几何体的材质，也就是一些类似颜色、透明度等等之类的属性
 * 3、利用Mesh将几何体和材质组合
 * 4、将组合好后的物体添加到场景中去
 */
const geometry = new THREE.BoxGeometry(1,1,1) //骨架
const material = new THREE.MeshBasicMaterial({color:'red'}) //皮肤
const cube = new THREE.Mesh(geometry,material) // 合体
cube.position.set(1,1,1) 
scene.add(cube) //上场


/** 需要渲染器来渲染指定好的内容 */
const render = new THREE.WebGLRenderer()
render.setSize(window.innerWidth, window.innerHeight)

render.render(scene,camera)

/**
 * 将渲染器中的canvas指定的内容添加到body中
 */
document.body.appendChild(render.domElement)


    