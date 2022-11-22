import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// loading
const textureLoader = new THREE.TextureLoader()

const normalTexture= textureLoader.load('./textures/marstesting1.png')

// Debug
const gui = new dat.GUI()

gui.hide()
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects`
const geometry = new THREE.SphereBufferGeometry( .5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0x5fc170, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


// light2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.86,1,-1.65)
pointLight2.intensity=4
scene.add(pointLight2)

const Light1 = gui.addFolder('Light1')

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

// Light1.add(pointLight2.position, 'y').min(-3).max(-3).step(0.01)
// Light1.add(pointLight2.position, 'x').min(-3).max(6).step(0.01)
// Light1.add(pointLight2.position, 'z').min(-3).max(-3).step(0.01)
// Light1.add(pointLight2, 'intensity').min(-3).max(10).step(0.01)

// light3
const pointLight3 = new THREE.PointLight(0xe1ff, 2)
pointLight3.position.set(2.13,-3,-1.98)
pointLight3.intensity= 6
scene.add(pointLight3)

const Light2 = gui.addFolder('Light2')


// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)

Light2.add(pointLight3.position, 'y').min(-3).max(-3).step(0.01)
Light2.add(pointLight3.position, 'x').min(-3).max(6).step(0.01)
Light2.add(pointLight3.position, 'z').min(-3).max(-3).step(0.01)
Light2.add(pointLight3, 'intensity').min(-3).max(10).step(0.01)

const light2Color = {
    color : 0xff0000
}

Light2.addColor(light2Color, 'color')
    .onChange(() =>{
        pointLight3.color.set(light2Color.color)
    })


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
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth/2;
const windowY = window.innerHeight /2;

function onDocumentMouseMove (event) {
    mouseX  = (event.clientX- windowX)
    mouseY  = (event.clientY- windowY)
}

const updateSphere = (event)=>{
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll' , updateSphere)



const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
 
    sphere.rotation.y += .5 * (targetX  - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY  - sphere.rotation.x)
    sphere.position.z += -.01 * (targetY  - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// star

const preload = () => {

    let manager = new THREE.LoadingManager();
    manager.onLoad = function() { 
      const environment = new Environment( typo, particle );
    }
  
    var typo = null;
    const loader = new THREE.FontLoader( manager );
    const font = loader.load('https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json', function ( font ) { typo = font; });
    const particle = new THREE.TextureLoader( manager ).load( 'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png');
  
  }
  
  if ( document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))
    preload ();
  else
    document.addEventListener("DOMContentLoaded", preload ); 
  
  class Environment {
  
    constructor( font, particle ){ 
  
      this.font = font;
      this.particle = particle;
      this.container = document.querySelector( '#magic' );
      this.scene = new THREE.Scene();
      this.createCamera();
      this.createRenderer();
      this.setup()
      this.bindEvents();
    }
  
    bindEvents(){
  
      window.addEventListener( 'resize', this.onWindowResize.bind( this ));
      
    }
  
    setup(){ 
  
      this.createParticles = new CreateParticles( this.scene, this.font,             this.particle, this.camera, this.renderer );
    }
  
    render() {
      
       this.createParticles.render()
       this.renderer.render( this.scene, this.camera )
    }
  
    createCamera() {
  
      this.camera = new THREE.PerspectiveCamera( 65, this.container.clientWidth /  this.container.clientHeight, 1, 10000 );
      this.camera.position.set( 0,0, 100 );
  
    }
  
    createRenderer() {
  
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
  
      this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2));
  
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.container.appendChild( this.renderer.domElement );
  
      this.renderer.setAnimationLoop(() => { this.render() })
  
    }
  
    onWindowResize(){
  
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
  
    }
  }
  
  class CreateParticles {
      
      constructor( scene, font, particleImg, camera, renderer ) {
      
          this.scene = scene;
          this.font = font;
          this.particleImg = particleImg;
          this.camera = camera;
          this.renderer = renderer;
          
          this.raycaster = new THREE.Raycaster();
          this.mouse = new THREE.Vector2(-200, 200);
          
          this.colorChange = new THREE.Color();
  
          this.buttom = false;
  
          this.data = {
  
              text: 'FUTURE\nIS NOW',
              amount: 1500,
              particleSize: 1,
              particleColor: 0xffffff,
              textSize: 16,
              area: 250,
              ease: .05,
          }
  
          this.setup();
          this.bindEvents();
  
      }
  
  
      setup(){
  
          const geometry = new THREE.PlaneGeometry( this.visibleWidthAtZDepth( 100, this.camera ), this.visibleHeightAtZDepth( 100, this.camera ));
          const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true } );
          this.planeArea = new THREE.Mesh( geometry, material );
          this.planeArea.visible = false;
          this.createText();
  
      }
  
      bindEvents() {
  
          document.addEventListener( 'mousedown', this.onMouseDown.bind( this ));
          document.addEventListener( 'mousemove', this.onMouseMove.bind( this ));
          document.addEventListener( 'mouseup', this.onMouseUp.bind( this ));
          
      }
  
      onMouseDown(){
          
          this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
          this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
          const vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0.5);
          vector.unproject( this.camera );
          const dir = vector.sub( this.camera.position ).normalize();
          const distance = - this.camera.position.z / dir.z;
          this.currenPosition = this.camera.position.clone().add( dir.multiplyScalar( distance ) );
          
          const pos = this.particles.geometry.attributes.position;
          this.buttom = true;
          this.data.ease = .01;
          
      }
  
      onMouseUp(){
  
          this.buttom = false;
          this.data.ease = .05;
      }
  
      onMouseMove( ) { 
  
          this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
          this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
      }
  
      render( level ){ 
  
          const time = ((.001 * performance.now())%12)/12;
          const zigzagTime = (1 + (Math.sin( time * 2 * Math.PI )))/6;
  
          this.raycaster.setFromCamera( this.mouse, this.camera );
  
          const intersects = this.raycaster.intersectObject( this.planeArea );
  
          if ( intersects.length > 0 ) {
  
              const pos = this.particles.geometry.attributes.position;
              const copy = this.geometryCopy.attributes.position;
              const coulors = this.particles.geometry.attributes.customColor;
              const size = this.particles.geometry.attributes.size;
  
              const mx = intersects[ 0 ].point.x;
              const my = intersects[ 0 ].point.y;
              const mz = intersects[ 0 ].point.z;
  
              for ( var i = 0, l = pos.count; i < l; i++) {
  
                  const initX = copy.getX(i);
                  const initY = copy.getY(i);
                  const initZ = copy.getZ(i);
  
                  let px = pos.getX(i);
                  let py = pos.getY(i);
                  let pz = pos.getZ(i);
  
                  this.colorChange.setHSL( .5, 1 , 1 )
                  coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
                  coulors.needsUpdate = true;
  
                  size.array[ i ]  = this.data.particleSize;
                  size.needsUpdate = true;
  
                  let dx = mx - px;
                  let dy = my - py;
                  const dz = mz - pz;
  
                  const mouseDistance = this.distance( mx, my, px, py )
                  let d = ( dx = mx - px ) * dx + ( dy = my - py ) * dy;
                  const f = - this.data.area/d;
  
                  if( this.buttom ){ 
  
                      const t = Math.atan2( dy, dx );
                      px -= f * Math.cos( t );
                      py -= f * Math.sin( t );
  
                      this.colorChange.setHSL( .5 + zigzagTime, 1.0 , .5 )
                      coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
                      coulors.needsUpdate = true;
  
                      if ((px > (initX + 70)) || ( px < (initX - 70)) || (py > (initY + 70) || ( py < (initY - 70)))){
  
                          this.colorChange.setHSL( .15, 1.0 , .5 )
                          coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
                          coulors.needsUpdate = true;
  
                      }
  
                  }else{
                  
                      if( mouseDistance < this.data.area ){
  
                          if(i%5==0){
  
                              const t = Math.atan2( dy, dx );
                              px -= .03 * Math.cos( t );
                              py -= .03 * Math.sin( t );
  
                              this.colorChange.setHSL( .15 , 1.0 , .5 )
                              coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
                              coulors.needsUpdate = true;
  
                              size.array[ i ]  =  this.data.particleSize /1.2;
                              size.needsUpdate = true;
  
                          }else{
  
                              const t = Math.atan2( dy, dx );
                              px += f * Math.cos( t );
                              py += f * Math.sin( t );
  
                              pos.setXYZ( i, px, py, pz );
                              pos.needsUpdate = true;
  
                              size.array[ i ]  = this.data.particleSize * 1.3 ;
                              size.needsUpdate = true;
                          }
  
                          if ((px > (initX + 10)) || ( px < (initX - 10)) || (py > (initY + 10) || ( py < (initY - 10)))){
  
                              this.colorChange.setHSL( .15, 1.0 , .5 )
                              coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
                              coulors.needsUpdate = true;
  
                              size.array[ i ]  = this.data.particleSize /1.8;
                              size.needsUpdate = true;
  
                          }
                      }
  
                  }
  
                  px += ( initX  - px ) * this.data.ease;
                  py += ( initY  - py ) * this.data.ease;
                  pz += ( initZ  - pz ) * this.data.ease;
  
                  pos.setXYZ( i, px, py, pz );
                  pos.needsUpdate = true;
  
              }
          }
      }
  
      createText(){ 
  
          let thePoints = [];
  
          let shapes = this.font.generateShapes( this.data.text , this.data.textSize  );
          let geometry = new THREE.ShapeGeometry( shapes );
          geometry.computeBoundingBox();
      
          const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
          const yMid =  (geometry.boundingBox.max.y - geometry.boundingBox.min.y)/2.85;
  
          geometry.center();
  
          let holeShapes = [];
  
          for ( let q = 0; q < shapes.length; q ++ ) {
  
              let shape = shapes[ q ];
  
              if ( shape.holes && shape.holes.length > 0 ) {
  
                  for ( let  j = 0; j < shape.holes.length; j ++ ) {
  
                      let  hole = shape.holes[ j ];
                      holeShapes.push( hole );
                  }
              }
  
          }
          shapes.push.apply( shapes, holeShapes );
  
          let colors = [];
          let sizes = [];
                      
          for ( let  x = 0; x < shapes.length; x ++ ) {
  
              let shape = shapes[ x ];
  
              const amountPoints = ( shape.type == 'Path') ? this.data.amount/2 : this.data.amount;
  
              let points = shape.getSpacedPoints( amountPoints ) ;
  
              points.forEach( ( element, z ) => {
                          
                  const a = new THREE.Vector3( element.x, element.y, 0 );
                  thePoints.push( a );
                  colors.push( this.colorChange.r, this.colorChange.g, this.colorChange.b);
                  sizes.push( 1 )
  
                  });
          }
  
          let geoParticles = new THREE.BufferGeometry().setFromPoints( thePoints );
          geoParticles.translate( xMid, yMid, 0 );
                  
          geoParticles.setAttribute( 'customColor', new THREE.Float32BufferAttribute( colors, 3 ) );
          geoParticles.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1) );
  
          const material = new THREE.ShaderMaterial( {
  
              uniforms: {
                  color: { value: new THREE.Color( 0xffffff ) },
                  pointTexture: { value: this.particleImg }
              },
              vertexShader: document.getElementById( 'vertexshader' ).textContent,
              fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
  
              blending: THREE.AdditiveBlending,
              depthTest: false,
              transparent: true,
          } );
  
          this.particles = new THREE.Points( geoParticles, material );
          this.scene.add( this.particles );
  
          this.geometryCopy = new THREE.BufferGeometry();
          this.geometryCopy.copy( this.particles.geometry );
          
      }
  
      visibleHeightAtZDepth ( depth, camera ) {
  
        const cameraOffset = camera.position.z;
        if ( depth < cameraOffset ) depth -= cameraOffset;
        else depth += cameraOffset;
  
        const vFOV = camera.fov * Math.PI / 180; 
  
        return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
      }
  
      visibleWidthAtZDepth( depth, camera ) {
  
        const height = this.visibleHeightAtZDepth( depth, camera );
        return height * camera.aspect;
  
      }
  
      distance (x1, y1, x2, y2){
         
          return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
      }
  }
  
//   about us
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  // change the tabindex of the current tabs to -1
  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);
  }

  // if the right key is pushed, move to the next tabs on the right
  if (e.keyCode === keydownRight) {
    tabFocus++;
    if (tabFocus >= tabs.length) {
      tabFocus = 0;
    }
  }

  // if the left key is pushed, move to the next tabs on the left
  if (e.keyCode === keydownLeft) {
    tabFocus--;
    if (tabFocus < 0) {
      tabFocus = tabs.length - 1;
    }
  }

  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
}

function changeTabPanel(e) {
  const targetTab = e.target;
  console.log(targetTab);

  const targetPanel = targetTab.getAttribute("aria-controls");
  console.log(targetPanel);

  const targetImg = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode; // taking parent of targetTab in html
  console.log(tabContainer);

  const mainContainer = tabContainer.parentNode;
  console.log(mainContainer);

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  hideContent(mainContainer, "picture");
  showContent(mainContainer, [`#${targetImg}`]);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}
