import './style.css'
import {gsap} from "gsap"; 
import * as THREE from 'three'
import * as dat from 'dat.gui'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import pic2 from "/textures/pic2.png"
import pic1 from "/textures/cool.png"
import gp from '/textures/gp2.jpg'

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

let musicBoxAni = gsap.timeline()
musicBoxAni.to(musicBox, {
    duration:.2,
    xPercent: -130,
    ease: "power2"
})
musicBoxAni.pause()

function changeMusicBox(bgC){
    musicBoxAni.to(musicBox,{
        backgroundColor: bgC,
        filter: `drop-shadow(4px 4px 10px ${bgC})`,
        boxShadow: `inset 10px 10px 10px ${bgC},
                    0px 0px 5px ${bgC},
                    0px 0px 5px ${bgC},
                    inset -10px -10px 15px ${bgC}`
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

let titleTimeline = gsap.timeline()
    .from('.textColor',{
        yPercent: 180,
        stagger: .2,
        ease: 'power1'
    })
    .from('#up' , {
        duration: 1,
        skewY: 60,
        yPercent: 140,
        stagger:{
            amount: 1,
            from: 'edges'
        },
        ease: 'power1'
    },+.1)
    .from('#down' , {
        duration: 1,
        skewY: -60,
        yPercent: -140,
        stagger:{
            amount: 1,
            from: 'edges'
        },
        ease: 'power1'
    },+.1)

    // .to('.emoji-div',{
    //     y: 0,
    //     stagger: {
    //         amount: 1,
    //         from: 'start'
    //     },
    //     ease: 'power1'
    // })


let exploreTimeLine = gsap.timeline()
    .from('.explore-div', {
        opacity: 0,
        yPercent: 100,
        ease: 'power1'
    })
    .to('#exploreText', {
        duration: 40,
        xPercent: -70,
        repeat: -1,
        yoyo: true,
        ease: 'linear'
    })

/**
 * Base
 */
// Debug
const gui = new dat.GUI({
    width: 400
})
// gui.hide()

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
const textureLoader = new THREE.TextureLoader()
let gpTexture = textureLoader.load(gp)
// gpTexture.encoding = THREE.sRGBEncoding

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
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

bts.addEventListener('click' , () => {
    audio.src = 'music/bts.mp3'
    vd.src = "textures/bts.mp4"
    audio.play()
    clickChangeColor('#e0aaff' , '#7b2cbf')
    changeMusicBox('#9d4edd')
    exploreTextColor('#e0aaff','#240046','#c77dff')
})

hai.addEventListener('click' , () => {
    audio.src = 'music/hai.mp3'
    vd.src = "textures/hai.mp4"
    audio.play()
    clickChangeColor('#e5e5e5' , '#fb8500')
    changeMusicBox('#ffb703')
    exploreTextColor('#000000','#ffb703','#e5e5e5')
})

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
// Helpers
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );
//
// const size = 10;
// const divisions = 10;
// const gridHelper = new THREE.GridHelper( size, divisions );
// scene.add( gridHelper );

/**
 * Model
 */
let gltfSceneAni = gsap.timeline({paused: true, })
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
        gltf.scene.scale.set(0.06,0.06,0.06)
        gltf.scene.rotation.set(0, 0.78 , 0)
        scene.add(gltf.scene)

        gltfSceneAni.to(gltf.scene.position,{
            x: -2.3446,
            y: -1.693,
            z: -0.916,
        })
        gltfSceneAni.to(gltf.scene.scale,{
            x: 0.2,
            y: 0.2,
            z: 0.2,
        })
        gltfSceneAni.to(webgl,{
            zIndex: 2,
        })
        gltfSceneAni.to(gltf.scene.rotation, {
            x: -.001,
            y: 1,
            z: -0.001,
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 6
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableRotate = true
controls.rotateSpeed = .1
controls.maxPolarAngle = 90

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

let mouseMove = new THREE.Vector2(0,0)
window.addEventListener('mousemove', event => onMouseMove(event))

function onMouseMove(event){
    // gsap.to(mouseMove, {
    //     x: event.clientX ,
    // })
    gsap.to('.emoji-img-div', {
        x: event.clientX ,
        y: event.clientY  ,
        stagger: {
            amount: 1,
        },
        ease: 'power1'
    })
}

const planeGeo = new THREE.PlaneBufferGeometry(1, 1, 16, 16)
const planeMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
        uSrc: {value: gpTexture},
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(sizes.width, sizes.height) },
        uMouse: { value: mouseMove },
        uProgress: { value: 0 },
    },
    vertexShader: `               
                uniform float uTime;
                uniform vec2 uMouse;
                varying vec2 vUv;
                varying float vWave;
                uniform float uProgress;    
                            
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
                float snoise(vec3 v){
                    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
                
                    // First corner
                    vec3 i  = floor(v + dot(v, C.yyy) );
                    vec3 x0 =   v - i + dot(i, C.xxx) ;
                
                    // Other corners
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min( g.xyz, l.zxy );
                    vec3 i2 = max( g.xyz, l.zxy );
                
                    //  x0 = x0 - 0. + 0.0 * C
                    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
                    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
                    vec3 x3 = x0 - 1. + 3.0 * C.xxx;
                
                    // Permutations
                    i = mod(i, 289.0 );
                    vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                
                    // Gradients
                    // ( N*N points uniformly over a square, mapped onto an octahedron.)
                    float n_ = 1.0/7.0; // N=7
                    vec3  ns = n_ * D.wyz - D.xzx;
                
                    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)
                
                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
                
                    vec4 x = x_ *ns.x + ns.yyyy;
                    vec4 y = y_ *ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);
                
                    vec4 b0 = vec4( x.xy, y.xy );
                    vec4 b1 = vec4( x.zw, y.zw );
                
                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));
                
                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                
                    vec3 p0 = vec3(a0.xy,h.x);
                    vec3 p1 = vec3(a0.zw,h.y);
                    vec3 p2 = vec3(a1.xy,h.z);
                    vec3 p3 = vec3(a1.zw,h.w);
                
                    //Normalise gradients
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                    p0 *= norm.x;
                    p1 *= norm.y;
                    p2 *= norm.z;
                    p3 *= norm.w;
                
                    // Mix final noise value
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                    dot(p2,x2), dot(p3,x3) ) );
                }
                
                void main()
                {
                    vec3 pos = position;
                    float noiseFreq = 2.5;
                    float noiseAmp = 0.04;
                
                    vec3 noisePos = vec3(sin(pos.x * noiseFreq + uTime),
                                            pos.y ,
                                            pos.z  );
                    pos.x += snoise(noisePos) * noiseAmp ;
                    pos.z += snoise(noisePos) * noiseAmp ;
                
                    vUv = uv;
                    vWave = sin(pos.z);
                
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos , 1.);
                }
            `,
    fragmentShader: `
                uniform float uTime;
                uniform float uProgress;
                uniform vec2 uMouse;
                varying vec2 vUv;
                varying float vWave;
                uniform sampler2D uSrc;               
                void main()
                {                
                    float wave = vWave * 0.7;                               
                    float r = texture2D(uSrc, vUv + wave).r;
                    float g = texture2D(uSrc, vUv).g;
                    float b = texture2D(uSrc, vUv).b ;                
                    vec3 texture = vec3(r, g, b);                
                    gl_FragColor = vec4(texture, 1.0);
                }                
            `
})
const plane = new THREE.Mesh(planeGeo, planeMaterial)

const createPlane = (texture, w, h, d, pos, rx, ry, rz) => {
    plane.scale.set(w,h,d)
    plane.rotation.set(rx, ry, rz)

    gui.add(plane.position, 'x' , -10 , 10 , 0.001).name('px')
    gui.add(plane.position, 'y' , 0.001 , Math.PI , 0.001).name('py')
    gui.add(plane.position, 'z' , 0.001 , Math.PI , 0.001).name('pz')
    gui.add(plane.rotation, 'x' , 0.001 , Math.PI , 0.001).name('rx')
    gui.add(plane.rotation, 'y' , 0.001 , Math.PI , 0.001).name('ry')
    gui.add(plane.rotation, 'z' , 0.001 , Math.PI , 0.001).name('rz')
    gui.add(plane.scale, 'x' , 1 , 10 , 0.001).name('sx')
    gui.add(plane.scale, 'y' , 1 , 10 , 0.001).name('sy')
    gui.add(plane.scale, 'z' , 1 , 10 , 0.001).name('sz')

    plane.position.copy(pos)
    scene.add(plane)
}

createPlane(gpTexture,
    4.445, 7.022, 0.008 ,
    {x: -4.169, y: -.1, z: -2},
    0.0,
    0.0,
    0.0
)

// Click explore
let exploreDiv = document.querySelector('#exploreText')

exploreDiv.addEventListener('click', (e) => {
    exploreTimeLine.reverse()
    titleTimeline.reverse()
    bodyColorChangeTimeline.play()
    gltfSceneAni.play()


// createPlane(gp2Texture,
//     2.6, 4, 0.01 ,
//     {x: 0, y: -.3, z: -4},
//     0.001,
//     0.003,
//     0.001
// )
//     createPlane(gp1Texture,
//         2.08, 4, 0.008 ,
//         {x: 3.8, y: -.1, z: -2},
//         -0.001,
//         -0.631,
//         -0.001
//     )
})

//  Gsap Progress Animation
let tl = gsap.timeline()
let bodyDom = document.querySelector('body')
bodyDom.addEventListener('click' , () => {
    if (bodyDom.classList.contains("done")){
        tl.to(planeMaterial.uniforms.uProgress  , {
            duration: 1,
            value: 0,
        })
        bodyDom.classList.remove('done')
    } else {
        tl.to(planeMaterial.uniforms.uProgress  , {
            duration: 1,
            value: 1,
        })
        bodyDom.classList.add('done')
    }
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    planeMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()