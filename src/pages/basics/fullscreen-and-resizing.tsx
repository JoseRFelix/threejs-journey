import type { NextPage } from "next";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { useEffect } from "react";

const initScene = () => {
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

  function openFullscreen() {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
      // @ts-ignore
    } else if (canvas.webkitRequestFullscreen) {
      /* Safari */
      // @ts-ignore
      canvas.webkitRequestFullscreen();
      // @ts-ignore
    } else if (canvas.msRequestFullscreen) {
      /* IE11 */
      // @ts-ignore
      canvas.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      // @ts-ignore
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      // @ts-ignore
      document.webkitExitFullscreen();
      // @ts-ignore
    } else if (document.msExitFullscreen) {
      /* IE11 */
      // @ts-ignore
      document.msExitFullscreen();
    }
  }

  window.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
      openFullscreen();
    } else {
      closeFullscreen();
    }
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
};

const Home: NextPage = () => {
  useEffect(() => {
    initScene();
  }, []);

  return <canvas className="webgl" />;
};

export default Home;
