import type { NextPage } from "next";
import * as THREE from "three";

import Layout from "../../core/components/Layout";
import NavBar from "../../core/components/NavBar";
import { useEffect } from "react";

const initScene = () => {
  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const sizes = {
    width: 800,
    height: 600,
  };

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
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
