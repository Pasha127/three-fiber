import logo from './logo.svg';
import './App.css';
import React, { Suspense, useMemo, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls,Stars, useTexture } from '@react-three/drei';
import { Physics, useBox, useConvexPolyhedron, useCylinder, useHeightfield, usePlane, useTrimesh } from '@react-three/cannon';
import * as THREE from "three";
import {Mesh} from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const pi= Math.PI;




/* const handleArrowKeys = (e)=>{
  switch(e.keyCode){
    case 32://space
      api.velocity.set(0,3,0)
      break;
    case 37://left arrow
      api.velocity.set(1,0,0)
      break;
    
    case 38://up arrow
      api.velocity.set(0,0,1)
      break;
    
    case 39://right arrow
      api.velocity.set(-1,0,0)
      break;
    
    case 40://down arrow
      api.velocity.set(0,0,-1)
      break;
    
      default:
        break;
      } 
}*/



THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());


/* const Asset = () => {
  
  const object = useLoader(OBJLoader, "astronaut002/z2_spacesuit.obj");
  const texture = useTexture({
    map: "astronaut002/z2_spacesuit/suit_baseColor.png",
    metalMap: "astronaut002/z2_spacesuit/suit_metallic.png",
    normalMap: "astronaut002/z2_spacesuit/suit_normal.png",
    roughnessMap: "astronaut002/z2_spacesuit/suit_roughness.png"
  })
  const geometry = useMemo(() => {
    let g;
    object.traverse((c) => {g = c.geometry;});
    return g;
  }, [object]);

  return (
    <mesh geometry={geometry} scale={0.01}>
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};
 */
function ObjToPrimitive({ url, mat }) {
  const [obj, setObj] = useState();
  useMemo(() => new OBJLoader().load(url, setObj), [url]);
  if (obj) {
    obj.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = mat;
      }
    });
    return <primitive object={obj} />;
  }
  return null;
}

const Asset = () => {
  const [ref, api] = useBox(()=>({
    mass:1,
    position: [0,5,0],
    rotation:[-pi/3,-pi/3,0]
  }));

  

  const mat = new THREE.MeshPhysicalMaterial({
    map: new THREE.TextureLoader().load("astronaut002/z2_spacesuit/suit_baseColor.png"),
    metalnessMap:new THREE.TextureLoader().load("astronaut002/z2_spacesuit/suit_metallic.png"),
    roughnessMap:new THREE.TextureLoader().load("astronaut002/z2_spacesuit/suit_roughness.png"),
    normalMap:new THREE.TextureLoader().load("astronaut002/z2_spacesuit/suit_normal.png")
  })
  return (


    <mesh scale={.01} position={[0, 0, 0]} ref={ref} onClick={()=>{
      api.velocity.set(0,10,0);
      api.applyTorque([15,0,0])
    }} 
  >
      {ObjToPrimitive({ url: "astronaut002/z2_spacesuit.obj", mat })}
    </mesh>
  );
};


function Asset2() {
  const [ref, api] = useBox(()=>({
    mass:1,
    position: [0,10,0],
    rotation:[-pi/3,-pi/3,0]
  }));

  
  const fbx = useLoader(FBXLoader, '/Sci-fi Rifle 2.fbx')
  return (
  <mesh ref={ref} onClick={()=>{
    api.velocity.set(0,10,0);
    api.applyTorque([15,0,0])
  }} >
    <primitive scale={.01} object={fbx} />
    </mesh>)
    
}


function Box() {

  const [ref, api] = useBox(()=>({
    mass:1,
    position: [0,5,0],
    rotation:[-pi/3,-pi/3,0]
  }));
  
  return(
<mesh onClick={()=>{
  api.velocity.set(0,10,0);
  api.applyTorque([15,0,0])
}} 

ref={ref} position={[0,5,0]}>
  <boxBufferGeometry attach="geometry" args={[1,1]}/>
  <meshLambertMaterial attatch="material" color="white"/>
</mesh>
  );
}
function Box1() {

  const [ref, api] = useBox(()=>({
    mass:1,
    position: [3,4,2],
    rotation:[-pi/3,-1,0]
  }));
  
  return(
<mesh onClick={()=>{
  api.velocity.set(0,10,0);
  api.applyTorque([15,0,0])
}} 

ref={ref} position={[0,5,0]}>
  <boxBufferGeometry attach="geometry" args={[1,1]}/>
  <meshLambertMaterial attatch="material" color="white"/>
</mesh>
  );
}
function Box2() {

  const [ref, api] = useBox(()=>({
    mass:1,
    position: [1,1,2],
    rotation:[2,-pi/3,0]
  }));
  
  return(
<mesh onClick={()=>{
  api.velocity.set(0,10,0);
  api.applyTorque([15,0,0])
}} 

ref={ref} position={[0,5,0]}>
  <boxBufferGeometry attach="geometry" args={[1,1]}/>
  <meshLambertMaterial attatch="material" color="white"/>
</mesh>
  );
}
function Box3() {

  const [ref, api] = useBox(()=>({
    mass:1,
    position: [0,6,1],
    rotation:[-pi/3,1,1]
  }));
  
  return(
<mesh onClick={()=>{
  api.velocity.set(0,10,0);
  api.applyTorque([15,0,0])
}} 

ref={ref} position={[0,5,0]}>
  <boxBufferGeometry attach="geometry" args={[1,1]}/>
  <meshLambertMaterial attatch="material" color="white"/>
</mesh>
  );
}
function Plane() {
  const [ref] = usePlane(()=>({
    position:[0,-1,0],
    rotation:[-pi/2,0,0]
  }));
  return(
<mesh ref={ref} position={[0,-1,0]} rotation={[-pi/2,0,0]}>
  <planeBufferGeometry attach="geometry" args={[10,10]}/>
  <meshLambertMaterial attatch="material" color="white"/>
</mesh>
  );
}

function Plane1() {
  const [ref] = usePlane(()=>({
    position:[0,1,-5],
    rotation:[pi/1.5,pi,0]
  }));
  return(
<mesh ref={ref} position={[0,1,-5]} rotation={[-pi/2,0,0]}>
  <planeBufferGeometry attach="geometry" args={[10,3]}/>
  <meshLambertMaterial attatch="material" color="white"/>
</mesh>
  );
}
function Plane2() {
  const [ref] = usePlane(()=>({
    position:[5,1,0],
    rotation:[pi/2,10,pi/2]
  }));
  return(
<mesh ref={ref} position={[5,1,0]} rotation={[-pi/2,0,0]}>
  <planeBufferGeometry attach="geometry" args={[10,3]}/>
  <meshLambertMaterial attatch="material" color="white"/>
</mesh>
  );
}
function Plane3() {
  const [ref] = usePlane(()=>({
    position:[-5,1,0],
    rotation:[0,pi/2,0]
  }));
  return(
<mesh ref={ref} position={[0,-1,0]} rotation={[-pi/2,0,0]}>
  <planeBufferGeometry attach="geometry" args={[10,3]}/>
  <meshLambertMaterial attatch="material" color="white"/>
</mesh>
  );
}
function Plane4() {
  const [ref] = usePlane(()=>({
    position:[0,1,5],
    rotation:[-pi/1.5,0,0]
  }));
  return(
<mesh ref={ref} position={[0,-1,0]} rotation={[-pi/2,0,0]}>
  <planeBufferGeometry attach="geometry" args={[10,3]}/>
  <meshLambertMaterial attatch="material" color="white"/>
</mesh>
  );
}


function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>

        <OrbitControls/>
        {/* <Stars/> */}
        <Environment preset="warehouse" background="only"/>
        <ambientLight intensity={0.2}/>
        <spotLight position={[2,8,5]} angle={0.3} color="white" intensity={1}/>
        <spotLight position={[-6,8,5]} angle={0.3} color="white"/>
        <Physics>
        <Asset/>
        <Asset2/>
        <Box/>
        <Box1/>
        <Box2/>
        <Box3/>
        <Plane/>
        <Plane1/>
        <Plane2/>
        <Plane3/>
        <Plane4/>
        </Physics>

        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
