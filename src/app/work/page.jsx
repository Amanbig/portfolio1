"use client";

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsGithub } from 'react-icons/bs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import Link from 'next/link';
import Image from 'next/image';
import WorkSliderBtns from '@/components/WorkSliderBtns';

const projects = [
  {
    num: '01',
    category: "Full Stack",
    title: 'Aora',
    description: "An app that allows users to authenticate, save posts that include a video with a thumbnail image, title, and prompt description. Users can also search for posts.",
    stack: [
      { name: "React-Native" },
      { name: "JavaScript" },
      { name: "Node.js" },
      { name: "Appwrite" },
      { name: "Tailwind-CSS" }
    ],
    image: '/projects/project1/images.jpg',
    github: 'https://github.com/Amanbig/Aora'
  },
  {
    num: '02',
    category: "Full Stack",
    title: 'Gem AI App',
    description: "A versatile application that allows users to generate various types of creative content, including songs, stories, and paragraphs, and chat with AI.",
    stack: [
      { name: "Dart" },
      { name: "Flutter" },
      { name: "Gemini API" },
      { name: "Firebase" }
    ],
    image: '/projects/project2/homepage.png',
    github: 'https://github.com/Amanbig/Gemini_app'
  },
  {
    num: '03',
    category: "Full Stack",
    title: 'URL Short Generator',
    description: "A versatile application that allows users to generate short url for their websites links according to what the link should be like and also keep track of uses of links",
    stack: [
      { name: "EJS" },
      { name: "Node.Js" },
      { name: "Express.Js" },
      { name: "Mongodb" }
    ],
    image: '/projects/project3/image.png',
    github: 'https://github.com/Amanbig/URL-SHORT'
  },
  {
    num: '04',
    category: "Frontend",
    title: 'Calculator',
    description: "This the samsung Calculator clone App which is a modern and versatile calculator built with Flutter, designed to handle both basic and advanced mathematical operations. The app features a user-friendly interface with support for scientific functions, power operations, and special constants.",
    stack: [
      { name: "Dart" },
      { name: "Flutter" },
    ],
    image: '/projects/project4/image2.png',
    github: 'https://github.com/Amanbig/samsung_calculator_clone/'
  },
];

function Work() {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } }}
      className='min-h-[80vh] flex flex-col justify-center py-12 xl:px-0'
    >
      <div className='container mx-auto px-4'>
        <div className='flex flex-col xl:flex-row xl:gap-[30px]'>
          <div className='w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none'>
            <div className='flex flex-col gap-[20px] xl:gap-[30px] h-full xl:h-[50%]'>
              <div className='text-5xl xl:text-8xl leading-none font-extrabold text-transparent text-outline'>
                {project.num}
              </div>
              <h2 className='text-[32px] xl:text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize'>
                {project.category} project
              </h2>
              <p className='text-white/60'>{project.description}</p>
              <ul className='flex gap-2 flex-wrap'>
                {project.stack.map((item, index) => (
                  <li key={index} className='text-base xl:text-xl text-accent'>
                    {item.name}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              <div className='border border-white/20 my-4'></div>
              <div className='flex items-center gap-4'>
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className='w-[50px] h-[50px] xl:w-[70px] xl:h-[70px] rounded-full bg-white/5 flex justify-center items-center group'>
                        <BsGithub className='text-white text-2xl xl:text-3xl group-hover:text-accent' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className='w-full xl:w-[50%]'>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              onSlideChange={handleSlideChange}
              className='relative h-[320px] xl:h-[460px] w-full overflow-hidden'
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index} className='w-full flex items-center justify-center'>
                  <div className='relative w-full h-full flex items-center justify-center bg-pink-5/20'>
                    <div className='absolute inset-0 bg-black/10 z-10'></div>
                    <div className='relative w-full h-full max-w-full max-h-full flex items-center justify-center'>
                      <Image
                        src={project.image}
                        alt={project.title}
                        layout="fill"
                        className="object-contain" // Ensure the image scales properly without cropping
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-4 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Work;
