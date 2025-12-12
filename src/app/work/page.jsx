"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BsGithub } from 'react-icons/bs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import Link from 'next/link';
import Image from 'next/image';
import WorkSliderBtns from '@/components/WorkSliderBtns';

// Project data
import { portfolioData } from "@/data/portfolio";

const projects = portfolioData.projects;

// Reusable components
const ProjectHeader = ({ num, category, title }) => (
  <div className="flex flex-col gap-2 font-mono">
    <div className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-white opacity-80">
      <span className="text-white/30 text-4xl mr-2">//</span>{num}
    </div>
    <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white group-hover:text-accent transition-all duration-300 capitalize">
      <span className="text-accent">&lt;</span>{title} <span className="text-accent">/&gt;</span>
    </h2>
    <p className="text-white/60 text-sm">{category} Project</p>
  </div>
);

const ProjectDetails = ({ description, stack, github }) => (
  <div className="flex flex-col gap-4 font-mono">
    <div className="text-white/70 text-sm md:text-base bg-[#1e1e1e] p-4 rounded border border-white/10 relative mt-2">
      <span className="absolute -top-3 left-4 bg-[#1e1e1e] px-2 text-xs text-accent border border-white/10 rounded">/* Description */</span>
      {description}
    </div>

    <div className="text-sm md:text-base text-accent flex flex-wrap items-center gap-1">
      <span className="text-pink-500">const</span> <span className="text-blue-400">stack</span> = <span className="text-yellow-300">[</span>
      {stack.map((tech, index) => (
        <span key={index} className="text-green-400">
          "{tech}"{index < stack.length - 1 && <span className="text-white">, </span>}
        </span>
      ))}
      <span className="text-yellow-300">]</span>;
    </div>
    <div className="border-t border-white/20 pt-4">
      <Link href={github} aria-label={`View ${github.split('/').pop()} on GitHub`}>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex justify-center items-center group transition-all duration-300 hover:bg-accent">
              <BsGithub className="text-white text-xl md:text-2xl group-hover:text-white" />
            </TooltipTrigger>
            <TooltipContent className="bg-[#232329] text-white p-2 rounded">
              <p>GitHub Repository</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    </div>
  </div>
);

const ProjectImage = ({ image, title }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.5 }}
    className="relative w-full h-full rounded-xl overflow-hidden cursor-pointer group"
  >
    <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/0 transition-all duration-500" />
    <Image
      src={image}
      alt={`${title} screenshot`}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority
    />
  </motion.div>
);

function Work() {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    setProject(projects[swiper.activeIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-[80vh] flex flex-col justify-center py-8 md:py-12"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
          <div className="w-full xl:w-1/2 flex flex-col gap-6 order-2 xl:order-none">
            <ProjectHeader num={project.num} category={project.category} title={project.title} />
            <ProjectDetails description={project.description} stack={project.stack} github={project.github} />
          </div>
          <div className="w-full xl:w-1/2">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              onSlideChange={handleSlideChange}
              className="relative h-[280px] md:h-[360px] xl:h-[460px] rounded-xl"
            >
              {projects.map((proj, index) => (
                <SwiperSlide key={index} className="w-full">
                  <ProjectImage image={proj.image} title={proj.title} />
                </SwiperSlide>
              ))}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-4 bottom-4 z-20 w-max"
                btnStyles="bg-accent hover:bg-accent-hover text-white text-lg w-10 h-10 flex justify-center items-center rounded-full transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Work;