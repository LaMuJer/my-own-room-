import './style.css'
import './responsiveForPh.css'
import './responsiveForTab.css'
import {gsap} from "gsap"; 
import * as THREE from 'three'
import * as dat from 'dat.gui'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import pic2 from "/textures/pic2.png"
import pic1 from "/textures/cool.png"
import {books,movies,projects} from './constant.js'

let webgl = document.querySelector('.webgl')
let pitches = document.querySelector('.pitches')
let audio = document.getElementById('audio')
let bts = document.getElementById('bts')
let hai = document.getElementById('hai')
let textColor = [...document.querySelectorAll('.textColor')]
let body = document.querySelector('body')
let musicBox = document.querySelector('.music-box')
let list1 = [...document.querySelectorAll('.list1 > h3')]
const vd = document.getElementById('video')
let mm = gsap.matchMedia()

let pitchTimeLine = gsap.timeline()
    .to('.pitches > span', {
        y: 10,
        stagger:{
            from: 'center',
            each: .1,
            repeat: -1,
            yoyo: true
        }
    })
pitchTimeLine.pause()

let pitchBool = true
pitches.addEventListener('click', () => {
    if (pitchBool) {
        pitchTimeLine.play()
        musicBoxAni.play()
        listAni.play()
        pitchBool = false
    } else {
        pitchTimeLine.pause()
        audio.pause()
        vd.pause()
        musicBoxAni.reverse()
        // listAni.reverse()
        pitchBool = true
    }
})
let musicNav = document.querySelector('.music-nav')
function destroyMusicNav(){
    gsap.to(musicNav, {
        delay: 1,
        duration: 1,
        y: -100,
        opacity: 0,
        scale: 0,
        display: 'none',
        ease: 'power1'
    })
}

let musicBoxAni = gsap.timeline()
musicBoxAni.to(musicBox, {
    duration:.2,
    display: 'block',
    xPercent: -80,
    ease: "power2"
})
musicBoxAni.pause()
function changeMusicBox(bgC){
    musicBoxAni.to(musicBox,{
        backgroundColor: bgC,
    })
}
let listAni = gsap.timeline()
list1.forEach((list) => {
    listAni
        .to(list, {
            y:  -65,
            opacity: 1,
            scale: 1,
            stagger: {
              amount: .1,
            },
            ease: "power3.inOut"
        })
})
listAni.pause()

let bodyColorChangeTimeline = gsap.timeline({paused: true})
    .to(body, {
        backgroundColor: "#000"
    })

let titleTimeline = gsap.timeline({paused: true, delay: 1,})
    .from('.textColor',{
        duration: 1,
        yPercent: 250,
        stagger: .2,
        ease: 'power1'
    })
    .from('#up' , {
        duration: 1,
        skewY: 60,
        yPercent: 160,
        stagger:{
            amount: 1,
            from: 'edges'
        },
        ease: 'power1.inOut'
    },+.1)
    .from('#down' , {
        duration: 1,
        skewY: -60,
        yPercent: -160,
        stagger:{
            amount: 1,
            from: 'edges'
        },
        ease: 'power1.inOut'
    },+.1)

function textDisappear(){
    gsap.to('.textDisAbt', {
        display: 'none'
    })
}

let exploreTimeLine = gsap.timeline({paused: true})
    exploreTimeLine.from('.explore-div', {
        opacity: 0,
        yPercent: 100,
        display: 'none',
        ease: 'power1'
    })
    exploreTimeLine.to('#exploreText', {
        duration: 40,
        xPercent: -70,
        repeat: -1,
        yoyo: true,
        ease: 'linear'
    })
function destroyExplore() {
    gsap.to('.explore-div' , {
        y: 100,
        display: 'none',
        ease: "power1"
    })
}
function exploreAfterAbtClose() {
    gsap.to('.explore-div' , {
        y: 0,
        display: 'block',
        ease: "power1"
    })
}


/**
 * Base
 */
// Debug
const gui = new dat.GUI({
    width: 400
})
gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color('#DBD3BE')
// scene.background = new THREE.Color('#000')

/**
 * Loaders
 */
// Texture loader
const loadingManager = new THREE.LoadingManager(
    () => {
        gsap.to('.loaderText',{
            delay: .5,
            duration: 2,
            skewY: '10px',
            transformOrigin: 'left',
            y: 200,
            ease: 'power1'
        })
        gsap.to('.loading',{
            delay: .5,
            duration: 1,
            opacity: 0,
            display: 'none',
            ease: 'power1'
        })
        titleTimeline.play()
        exploreTimeLine.play()
        loaderGltfSceneAni.play()
    },
    (itemsUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = (itemsLoaded / itemsTotal) * 100
        gsap.to('.loaderText',{
            backgroundImage: `linear-gradient(90deg, var(--left) 0%, var(--left) ${progressRatio}%, var(--right) ${progressRatio}%)`,
            stagger: .2,
            ease: 'power1'
        })
    }
)
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader(loadingManager)
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const bakedTexture = textureLoader.load('textures/combineBake.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const floorBakedTexture = textureLoader.load('textures/floorBake.jpg')
floorBakedTexture.flipY = false
floorBakedTexture.encoding = THREE.sRGBEncoding

const pic2Texture = textureLoader.load(pic2)
pic2Texture.encoding = THREE.sRGBEncoding

const pic1Texture = textureLoader.load(pic1)
pic1Texture.encoding = THREE.sRGBEncoding

const vdTexture = new THREE.VideoTexture(vd)

function clickChangeColor(color, bgColor) {
    textColor.forEach((text) => {
        text.style.color = color
    })
    gsap.to(body, {
        duration: 2,
        opacity: 1,
        scale: 1,
        background: bgColor,
        ease: "power2"
    })
}

function exploreTextColor(color,bgC,createColor){
    musicBoxAni.to('#exploreText' ,{
        color: color,
    })
    musicBoxAni.to('.explore-div', {
        background: bgC,
        filter: `drop-shadow(4px 4px 10px ${bgC})`,
        boxShadow: `inset 10px 10px 10px ${bgC},
                    0px 0px 5px ${bgC},
                    0px 0px 5px ${bgC},
                    inset -10px -10px 15px ${bgC}`
    })
    musicBoxAni.to('.createdBy > h3' ,{
        color: createColor
    })

}

function changeTitle(color) {
    titleTimeline.to('.title', {
        color: color
    })
}

bts.addEventListener('click' , () => {
    audio.src = 'music/bts.mp3'
    vd.src = "textures/bts.mp4"
    audio.play()
    changeTitle('#f5f5ef')
    clickChangeColor('#f5f5ef' , '#990011')
    changeMusicBox('#eaebea')
    exploreTextColor('#202120','#eaebea','#eaebea')
})

hai.addEventListener('click' , () => {
    audio.src = 'music/hai.mp3'
    vd.src = "textures/hai.mp4"
    audio.play()
    changeTitle('#fcedda')
    clickChangeColor('#e5e5e5' , '#ee4e34')
    changeMusicBox('#ddc3a5 ')
    exploreTextColor('#201e20','#ddc3a5','#201e20')
})

function socialReveal(){
    gsap.to('.social-link' , {
        delay: 3,
        duration: 1,
        stagger: .2,
        opacity: 1,
        scale: 1,
        display: 'block',
        ease: 'power1'
    })
}

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
const floorMaterial = new THREE.MeshBasicMaterial({
    map: floorBakedTexture,
})
const pic2Material = new THREE.MeshBasicMaterial({
    map: pic2Texture,
})
const pic1Material = new THREE.MeshBasicMaterial({
    map: pic1Texture,
})
const screenMaterial = new THREE.MeshBasicMaterial({
    map: vdTexture
})

/**
 * Model
 */
let gltfSceneAni = gsap.timeline({paused: true, })
let loaderGltfSceneAni = gsap.timeline({paused: true, })
gltfLoader.load(
    'models/finalBakedRoomA.glb',
    (gltf) =>
    {
        const bakedMesh = gltf.scene.children.find(child => child.name === "baked")
        bakedMesh.material = bakedMaterial

        const floorMesh = gltf.scene.children.find(child => child.name === "floorWall")
        floorMesh.material = floorMaterial

        const pic2Mesh = gltf.scene.children.find(child => child.name === "picture2")
        pic2Mesh.material = pic2Material

        const pic1Mesh = gltf.scene.children.find(child => child.name === "picture")
        pic1Mesh.material = pic1Material

        const screenMesh = gltf.scene.children.find(child => child.name === "Screen")
        screenMesh.rotation.z = -Math.PI
        screenMesh.position.y = 7.15
        screenMesh.material = screenMaterial

        gui.add(screenMesh.position,'y' , 5.5, 7.5, 0.001).name('screen')
        gui.add(gltf.scene.position,'x' , -5 , 5 , 0.0001)
        gui.add(gltf.scene.position,'y' , -5 , 5 , 0.001)
        gui.add(gltf.scene.position,'z' , -5 , 5 , 0.001)
        gui.add(gltf.scene.rotation,'x' , -5 , 5 , 0.0001).name('rotateX')
        gui.add(gltf.scene.rotation,'y' , -5 , 5 , 0.001).name('rotateY')
        gui.add(gltf.scene.rotation,'z' , -5 , 5 , 0.001).name('rotateZ')

        gltf.scene.position.set(-0.1963, -0.782 , 1.864)
        gltf.scene.scale.set(0.01,0.01,0.01)
        // gltf.scene.rotation.set(0, 0.78 , 0)

        loaderGltfSceneAni.to(gltf.scene.scale,{
            delay: .5,
            duration: 1,
            x: 0.06,
            y: 0.06,
            z: 0.06,
            ease: 'power1'
        })
        loaderGltfSceneAni.to(gltf.scene.rotation,{
            duration: 1,
            x: 0,
            y: 0.78 ,
            z: 0,
            ease: 'power1'
        })

        scene.add(gltf.scene)

        gltfSceneAni.to(gltf.scene.position,{
            x: -1.9281,
            y: -1.693,
            z: -0.916,
        })
        gltfSceneAni.to(gltf.scene.scale,{
            x: 0.15,
            y: 0.15,
            z: 0.15,
        })
        gltfSceneAni.to(webgl,{
            zIndex: 1,
        })
        gltfSceneAni.to(gltf.scene.rotation, {
            x: -.001,
            y: 1,
            z: -0.001,
        })
        mm.add('(max-width: 500px)' , () => {
            gltfSceneAni.to(webgl,{
                zIndex: 1,
                maxWidth: '100vw',
                maxHeight: '100vh',
                top: '70%',
            })
            gltfSceneAni.to(gltf.scene.position,{
                x: -0.3,
                y: -1.693,
                z: -0.916,
            })
            gltfSceneAni.to(gltf.scene.scale,{
                x: 0.1,
                y: 0.1,
                z: 0.1,
            })
        })
        mm.add('(min-width: 768px) and (max-width: 1112px)' , () => {
            gltfSceneAni.to(webgl,{
                zIndex: 1,
                maxWidth: '100vw',
                maxHeight: '100vh',
                top: '70%',
        })
            gltfSceneAni.to(gltf.scene.position,{
                x: -0.3,
                y: -1.693,
                z: -0.916,
            })
            gltfSceneAni.to(gltf.scene.scale,{
                x: 0.13,
                y: 0.13,
                z: 0.13,
            })
        })
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 6
scene.add(camera)

let closePoint = document.querySelector('.closePoint')
let abtClose = document.querySelector('.abtClose')
closePoint.addEventListener('click', () => {
    gsap.to(camera.position, {
        duration: 1.5,
        x: 0,
        y: 0,
        z: 6,
        ease: 'power1',
    })
    gsap.to(camera.scale, {
        duration: 1.5,
        x: 1,
        y: 1,
        z: 1,
        ease: 'power1',
    })
    pointAss.reverse()
})
abtClose.addEventListener('click', () => {
    exploreAfterAbtClose()
    gsap.to('.abt-container' , {
        y: -100,
        opacity: 0,
        scale: 0,
        ease: 'power1'
    })

})

gui.add(camera.position, 'x', -20, 20, 0.001).name('cameraX')
gui.add(camera.position, 'y', -10, 10, 0.001).name('cameraY')
gui.add(camera.position, 'z', -10, 10, 0.001).name('cameraZ')
gui.add(camera.scale, 'x', -10, 10, 0.001).name('cameraScaleX')
gui.add(camera.scale, 'y', -10, 10, 0.001).name('cameraScaleY')
gui.add(camera.scale, 'z', -10, 10, 0.001).name('cameraScaleZ')

function cartoon (event) {
    gsap.to('.emoji-img-div', {
        x: event.clientX ,
        y: event.clientY  ,
        stagger: {
            amount: .3,
        },
        ease: 'power1'
    })
}
function destroyCartoon () {
    gsap.to('.emoji-img-div' , {
        stagger: .5,
        ease: 'power1',
        display: 'none'
    })
}

let mouse = new THREE.Vector2(0,0)
window.addEventListener('mousemove', event => onMouseMove(event))
function onMouseMove(event){
    gsap.to(mouse,{
        x: (event.clientX / sizes.width) * 2 - 1 ,
        y: -(event.clientY / sizes.height) * 2 + 1
    })
    cartoon(event)
}

// Points
const rayCaster = new THREE.Raycaster()
const points = [
    {
        position : new THREE.Vector3(-2, 0.8 , -1.04),
        mPosition: new THREE.Vector3(0,0,0),
        element: document.querySelector('.point0'),
        cameraPos : new THREE.Vector3(8.069,-1.564,6 ),
        cameraScaleZ: new THREE.Vector3(1,1,7.548 ),
    },
    {
        position : new THREE.Vector3(-3.5, -0.5 , -1.04),
        mPosition: new THREE.Vector3(0,0,0),
        element: document.querySelector('.point1'),
        cameraPos : new THREE.Vector3(10.671,4.033,5.075),
        cameraScaleZ: new THREE.Vector3(1,1,12 ),
    },
    {
        position : new THREE.Vector3(0, 0.2 , -1.04),
        mPosition: new THREE.Vector3(0,0,0),
        element: document.querySelector('.point2'),
        cameraPos : new THREE.Vector3(-4.43,-0.002,7.028 ),
        cameraScaleZ: new THREE.Vector3(1,1,2.602 ),
    }
]
let pointClickLowerDiv = document.querySelector('.pointClickLowerDiv')
let pointAss = gsap.timeline({paused: true})

points.forEach((point,index) => {
    point.element.addEventListener('click', () => {
        pointAss.play()
        gsap.to(camera.position, {
            duration: 2,
            x: point.cameraPos.x ,
            y: point.cameraPos.y,
            z: point.cameraPos.z,
            ease: 'power1'
        })
        gsap.to(camera.scale,   {
            duration: 2,
            x: point.cameraScaleZ.x,
            y: point.cameraScaleZ.y,
            z: point.cameraScaleZ.z,
            ease: 'power1'
        })
        pointAss.to('.pointClickContainer', {
            delay: .5,
            duration: 1,
            scale: 1,
            opacity: 1,
            visibility: 'visible',
            ease: 'power1',
        })
        switch (index) {
            case 0 : {
                return pointFun(books,'b')
            }
            case 1 : {
                return pointFun(movies,'m')
            }
            case 2 : {
                return pointFun(projects,'p')
            }
        }
    })
})

function revealPoints(){
    gsap.to('.point' , {
        delay: 1,
        display: 'block',
        y: 10,
        stagger: .1,
        ease: 'power1'
    })
}

function intersectPointAppear(){
    gsap.to('.point', {
        duration: 1,
        opacity: 1,
        stagger: .1,
        ease: 'power1'
    })
}
function intersectPointDisappear(){
    gsap.to('.point', {
        duration: 1,
        opacity: 0,
        stagger: .1,
        ease: 'power1'
    })
}

function welcomeTo (className, each) {
    gsap.to(className, {
        display: 'block',
    })
    gsap.from(className, {
        delay: 2,
        duration: 2,
        skewY: 20,
        transformOrigin: 'left',
        x: -100,
        y: 100,
        stagger: {
          each: each,
          from: "start",
          ease: 'power2'
        },
        ease: 'power1'
    })
}

let aboutTl = gsap.timeline({paused:true})
let aboutId = document.getElementById('about')
aboutId.addEventListener('click', () => {
    destroyExplore()
    gsap.to('.abt-container', {
        opacity: 1,
        scale: 1,
        display: 'block',
        y: -250,
        ease: 'power1',
    })
})

// Click explore
let exploreDiv = document.querySelector('#exploreText')
exploreDiv.addEventListener('click', (e) => {
    destroyExplore()
    titleTimeline.reverse()
    bodyColorChangeTimeline.play()
    gltfSceneAni.play()
    destroyCartoon()
    socialReveal()
    textDisappear()
    welcomeTo('.welcomeText', .5)
    welcomeTo('.welcomeSmallText', .2)
    destroyMusicNav()
    revealPoints()
    musicBoxAni.reverse()
})

const pointFun = (point, kind) => {
    point.forEach((book,i) => {
        pointClickLowerDiv.innerHTML = `
        <div class="pointClickJsDiv">
            <div class="pointClickPhoto" >           
                <img class="pointClickPhotoImg" src='textures/${kind}${i+1}.jpg' alt="bookImg"/> 
                <img class="pointClickPhotoImg" src='textures/${kind}${i}.jpg' alt="bookImg"/> 
                <img class="pointClickPhotoImg" src='textures/${kind}${i-1}.jpg' alt="bookImg"/> 
            </div>                
        </div>                
    `
    })
    pointAss.from('.pointClickPhotoImg', {
        yPercent: 100,
        opacity: 0,
        scale: 0,
        stagger: .1,
        ease: 'power1'
    }, +1)
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0xffffff,0 )
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableRotate = true
controls.rotateSpeed = .1
controls.maxPolarAngle = 90
controls.maxDistance = 6

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    // alpha: 1,
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.physicallyCorrectLights = true
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0xffffff,0 )

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    for (const point of points) {
        const screenPos = point.position.clone()
        screenPos.project(camera)

        rayCaster.setFromCamera(screenPos, camera)
        const intersects = rayCaster.intersectObjects(scene.children, true)

        if (intersects.length === 0){
            intersectPointAppear()
        } else {
            const intersectionDistance = intersects[0].distance
            const pointDistance = point.position.distanceTo(camera.position)

            if (intersectionDistance < pointDistance){
                intersectPointDisappear()
            } else {
                intersectPointAppear()
            }
        }

        const translateX = (screenPos.x * sizes.width * 0.5).toFixed(2)
        const translateY = (- (screenPos.y * sizes.height * 0.5)).toFixed(2)

        gsap.to(point.element,{
            transform: `translate(${translateX}px, ${translateY}px)`,
            ease: "power1"
        })
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()