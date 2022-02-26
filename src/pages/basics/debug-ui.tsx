import type { NextPage } from "next";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import { useEffect } from "react";
import gsap from "gsap";

const initScene = () => {
  const gui = new GUI();
  const debugParameters = {
    color: 0xffff00,
    spin: () => {
      gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
    },
  };

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

  const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
  const material = new THREE.MeshBasicMaterial({
    color: debugParameters.color,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Elevation");
  gui.add(mesh, "visible").name("Visible");
  gui.add(material, "wireframe").name("Wireframe");
  gui.addColor(debugParameters, "color").onChange(() => {
    material.color.set(debugParameters.color);
  });
  gui.add(debugParameters, "spin").name("Spin");

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );

  camera.position.z = 3;
  camera.lookAt(mesh.position);
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const tick = () => {
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
