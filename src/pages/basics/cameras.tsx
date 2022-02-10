import type { NextPage } from "next";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Layout from "../../core/components/Layout";
import NavBar from "../../core/components/NavBar";
import { useEffect } from "react";

const initScene = () => {
  const canvas = document.querySelector("canvas.webgl") as HTMLElement;

  const sizes = {
    width: 800,
    height: 600,
  };

  const cursor = {
    x: 0,
    y: 0,
  };

  canvas!.addEventListener("mousemove", (e: any) => {
    const event = e as MouseEvent;
    cursor.x = event.offsetX / sizes.width - 0.5;
    cursor.y = -(event.offsetY / sizes.height - 0.5);
  });

  const scene = new THREE.Scene();

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  scene.add(mesh);

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );

  camera.position.z = 3;
  camera.lookAt(mesh.position);
  scene.add(camera);

  if (canvas) {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      //   mesh.rotation.y = elapsedTime;
      //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
      //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
      //   camera.position.y = cursor.y * 3;
      //   camera.lookAt(mesh.position);

      controls.update();

      renderer.render(scene, camera);

      window.requestAnimationFrame(tick);
    };

    tick();
  }
};

const Home: NextPage = () => {
  useEffect(() => {
    initScene();
  }, []);

  return <Layout header={<NavBar />} content={<canvas className="webgl" />} />;
};

export default Home;
