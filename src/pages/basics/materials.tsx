import type { NextPage } from "next";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect } from "react";
import GUI from "lil-gui";

import colorImage from "@web/assets/12-textures/door/color.jpg";
import alphaImage from "@web/assets/12-textures/door/alpha.jpg";
import ambientImage from "@web/assets/12-textures/door/ambientOcclusion.jpg";
import heightImage from "@web/assets/12-textures/door/height.jpg";
import metalnessImage from "@web/assets/12-textures/door/metalness.jpg";
import normalImage from "@web/assets/12-textures/door/normal.jpg";
import roughnessImage from "@web/assets/12-textures/door/roughness.jpg";
import matcapImage from "@web/assets/12-textures/matcaps/8.png";
import gradientImage from "@web/assets/12-textures/gradients/3.jpg";

import environmentMap1 from "@web/assets/12-textures/environmentMaps/1/px.jpg";
import environmentMap2 from "@web/assets/12-textures/environmentMaps/1/nx.jpg";
import environmentMap3 from "@web/assets/12-textures/environmentMaps/1/py.jpg";
import environmentMap4 from "@web/assets/12-textures/environmentMaps/1/ny.jpg";
import environmentMap5 from "@web/assets/12-textures/environmentMaps/1/pz.jpg";
import environmentMap6 from "@web/assets/12-textures/environmentMaps/1/nz.jpg";

const initScene = () => {
  const gui = new GUI();

  const canvas = document.querySelector("canvas.webgl") as HTMLElement;

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const scene = new THREE.Scene();

  const texturesLoader = new THREE.TextureLoader();
  const cubeTextureLoader = new THREE.CubeTextureLoader();

  const colorTexture = texturesLoader.load(colorImage.src);
  const alphaTexture = texturesLoader.load(alphaImage.src);
  const ambientTexture = texturesLoader.load(ambientImage.src);
  const heightTexture = texturesLoader.load(heightImage.src);
  const normalTexture = texturesLoader.load(normalImage.src);
  const metalnessTexture = texturesLoader.load(metalnessImage.src);
  const roughnessTexture = texturesLoader.load(roughnessImage.src);
  const matcapTexture = texturesLoader.load(matcapImage.src);
  const gradientTexture = texturesLoader.load(gradientImage.src);
  gradientTexture.magFilter = THREE.NearestFilter;
  gradientTexture.minFilter = THREE.NearestFilter;
  gradientTexture.generateMipmaps = false;

  const environmentMapTexture = cubeTextureLoader.load([
    environmentMap1.src,
    environmentMap2.src,
    environmentMap3.src,
    environmentMap4.src,
    environmentMap5.src,
    environmentMap6.src,
  ]);

  //   const material = new THREE.MeshBasicMaterial();
  //   material.map = colorTexture;
  //   material.side = THREE.DoubleSide;

  // const material = new THREE.MeshNormalMaterial();
  // material.side = THREE.DoubleSide;
  // material.flatShading = true;

  // const material = new THREE.MeshMatcapMaterial();
  // material.side = THREE.DoubleSide;
  // material.matcap = matcapTexture;

  // const material = new THREE.MeshDepthMaterial();

  // const material = new THREE.MeshLambertMaterial();

  // const material = new THREE.MeshPhongMaterial();
  // material.shininess = 100;
  // material.specular = new THREE.Color(0xff00ff);

  // const material = new THREE.MeshToonMaterial();
  // material.gradientMap = gradientTexture;

  const material = new THREE.MeshStandardMaterial();
  // material.metalness = 0.275;
  // material.roughness = 0.19;
  material.map = colorTexture;
  material.aoMap = ambientTexture;
  material.displacementMap = heightTexture;
  material.displacementScale = 0.05;
  material.metalnessMap = metalnessTexture;
  material.roughnessMap = roughnessTexture;
  material.normalMap = normalTexture;
  material.transparent = true;
  material.alphaMap = alphaTexture;

  // const material = new THREE.MeshStandardMaterial();
  // material.metalness = 0.7;
  // material.roughness = 0.2;
  // material.envMap = environmentMapTexture;

  gui.add(material, "metalness", 0, 1, 0.0001);
  gui.add(material, "roughness", 0, 1, 0.0001);
  gui.add(material, "aoMapIntensity", 0, 10, 0.2);
  gui.add(material, "displacementScale", 0, 1, 0.0001);

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
  );
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
  );
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
  );

  sphere.position.x = -1.5;
  torus.position.x = 1.5;

  sphere.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
  );
  torus.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
  );
  plane.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
  );

  scene.add(sphere, plane, torus);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(2, 3, 4);
  scene.add(pointLight);

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );

  camera.position.z = 3;
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const clock = new THREE.Clock();

  const tick = () => {
    sphere.rotation.y = 0.1 * clock.getElapsedTime();
    plane.rotation.y = 0.1 * clock.getElapsedTime();
    torus.rotation.y = 0.1 * clock.getElapsedTime();

    sphere.rotation.x = 0.15 * clock.getElapsedTime();
    plane.rotation.x = 0.15 * clock.getElapsedTime();
    torus.rotation.x = 0.15 * clock.getElapsedTime();

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };

  tick();

  const cleanup = () => {
    gui.destroy();
    renderer.clear();
  };

  return cleanup;
};

const Home: NextPage = () => {
  useEffect(() => {
    return initScene();
  }, []);

  return <canvas className="webgl" />;
};

export default Home;
