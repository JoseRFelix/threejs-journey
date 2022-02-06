import type { NextPage } from "next";
import * as THREE from "three";

import Layout from "../../core/components/Layout";
import NavBar from "../../core/components/NavBar";
import { useEffect } from "react";

const initScene = () => {
  const scene = new THREE.Scene();

  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);

  const group = new THREE.Group();
  scene.add(group);

  const cubeA = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "red" })
  );
  const cubeB = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "red" })
  );
  const cubeC = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "red" })
  );

  group.add(cubeA, cubeB, cubeC);

  const sizes = {
    width: 800,
    height: 600,
  };

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;

  camera.lookAt(group.position);

  scene.add(camera);

  const canvas = document.querySelector(".webgl");

  if (canvas) {
    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  }
};

const Home: NextPage = () => {
  useEffect(() => {
    initScene();
  }, []);

  return <Layout header={<NavBar />} content={<canvas className="webgl" />} />;
};

export default Home;
