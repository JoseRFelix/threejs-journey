import type { NextPage } from "next";
import NextLink from "next/link";

import { Card, CardContent, CardTitle } from "../core/components/Card";
import Layout from "../core/components/Layout";
import NavBar from "../core/components/NavBar";

const allLessons = [
  {
    name: "Basics",
    lessons: [
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
        title: "Debug UI",
        url: "/basics/debug-ui",
      },
      {
        title: "Textures",
        url: "/basics/textures",
      },
      {
        title: "Materials",
        url: "/basics/materials",
      },
      {
        title: "3D Text",
        url: "/basics/3d-text",
      },
      {
        title: "Lights",
        url: "/classic-techniques/lights",
      },
    ],
  },
  {
    name: "Classic Techniques",
    lessons: [
      {
        title: "Lights",
        url: "/classic-techniques/lights",
      },
    ],
  },
];

const Home: NextPage = () => {
  return (
    <Layout
      header={<NavBar />}
      content={
        <div className="flex flex-col space-y-12">
          {allLessons.map(({ name, lessons }) => (
            <div className="space-y-3" key={name}>
              <h1 className="text-xl font-bold">{name}</h1>

              <div className="grid grid-cols-5 gap-6">
                {lessons.map(({ title, url }) => (
                  <Card key={title}>
                    <CardTitle>{title}</CardTitle>
                    <CardContent>
                      <NextLink href={url} passHref>
                        <a className="w-full px-4 py-3 text-center text-white transition-colors duration-100 ease-out bg-blue-600 rounded-md shadow-md shadow-blue-500/50 hover:bg-blue-700">
                          Go to lesson
                        </a>
                      </NextLink>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default Home;
