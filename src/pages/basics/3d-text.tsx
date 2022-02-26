import type { NextPage } from "next";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useEffect } from "react";
import GUI from "lil-gui";

import matcapImage from "@web/assets/13-textures/matcaps/8.png";

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
  const matcapTexture = texturesLoader.load(matcapImage.src);

  const fontLoader = new FontLoader();

  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("Hello World", {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    });
    textGeometry.center();

    const material = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });

    const text = new THREE.Mesh(textGeometry, material);
    scene.add(text);

    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

    for (let i = 0; i < 100; i++) {
      const donut = new THREE.Mesh(donutGeometry, material);

      donut.position.x = (Math.random() - 0.5) * 10 + 0.1;
      donut.position.y = (Math.random() - 0.5) * 10 + 0.1;
      donut.position.z = (Math.random() - 0.5) * 10;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.z = Math.random() * Math.PI;

      const scale = Math.random() + 0.5;
      donut.scale.set(scale, scale, scale);

      scene.add(donut);
    }
  });

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 2;
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
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
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
