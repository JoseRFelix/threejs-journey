import type { NextPage } from "next";
import NextLink from "next/link";

import { Card, CardContent, CardTitle } from "../core/components/Card";
import Layout from "../core/components/Layout";
import NavBar from "../core/components/NavBar";

const lessons = [
  {
    title: "Basic Scene",
    url: "/basics/basic-scene",
  },
  {
    title: "Transform Objects",
    url: "/basics/transform-objects",
  },
  {
    title: "Animations",
    url: "/basics/animations",
  },
  {
    title: "Cameras",
    url: "/basics/cameras",
  },
  {
    title: "Fullscreen and Resizing",
    url: "/basics/fullscreen-and-resizing",
  },
  {
    title: "Geometry",
    url: "/basics/geometry",
  },
  {
    title: "Textures",
    url: "/basics/textures",
  },
];

const Home: NextPage = () => {
  return (
    <Layout
      header={<NavBar />}
      content={
        <div className="flex flex-col space-y-6">
          <h1 className="text-xl font-bold">Basics</h1>

          <div className="grid grid-cols-5 gap-3">
            {lessons.map(({ title, url }) => (
              <Card key={title}>
                <CardTitle>{title}</CardTitle>
                <CardContent>
                  <NextLink href={url} passHref>
                    <a className="w-full px-4 py-3 text-center text-white transition-colors duration-100 ease-out rounded-md shadow-md bg-cyan-500 shadow-cyan-500/50 hover:bg-cyan-600">
                      Go to lesson
                    </a>
                  </NextLink>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default Home;
