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
const projects = [
  {
    num: '01',
    category: 'Full Stack',
    title: 'Rag based Chatbot for JAC Chandigarh',
    description:
      'A chatbot built with the RAG (Retrieval-Augmented Generation) approach, leveraging the power of Langchain. (Currently only code for frontend in github)',
    stack: ['Next', 'React', 'Node.js', 'Shadcn UI', 'FastAPI', 'Langchain', 'OpenAI', 'OpenRouter'],
    image: '/projects/project5/image.png',
    github: 'https://github.com/Amanbig/jac_chat_bot',
  },
  {
    num: '02',
    category: 'Full Stack',
    title: 'Meeting Summarizer',
    description:
      'This project is a Meetings Summarizer built with FastAPI on the backend and a React frontend. It allows users to upload video or audio files, transcribe content, summarize it, ask contextual questions, and convert summaries to audio.',
    stack: ['Next', 'React', 'Node.js', 'Shadcn UI', 'FastAPI', 'Langchain', 'GROQ AI', 'Speech TO Text'],
    image: '/projects/project6/image.png',
    github: 'https://github.com/Amanbig/meetings_app',
  },
  {
    num: '03',
    category: 'Full Stack',
    title: 'Aora',
    description:
      'A mobile app enabling user authentication, video post creation with thumbnails, titles, and descriptions, plus post search functionality.',
    stack: ['React Native', 'JavaScript', 'Node.js', 'Appwrite', 'Tailwind CSS'],
    image: '/projects/project1/images.jpg',
    github: 'https://github.com/Amanbig/Aora',
  },
  {
    num: '04',
    category: 'Full Stack',
    title: 'Gem AI App',
    description:
      'A creative AI app for generating songs, stories, and paragraphs, with interactive chat features powered by Gemini API.',
    stack: ['Dart', 'Flutter', 'Gemini API', 'Firebase'],
    image: '/projects/project2/homepage.png',
    github: 'https://github.com/Amanbig/Gemini_app',
  },
  {
    num: '05',
    category: 'Full Stack',
    title: 'URL Shortener',
    description:
      'A tool for generating custom short URLs, tracking link usage, and managing redirects with a user-friendly dashboard.',
    stack: ['EJS', 'Node.js', 'Express.js', 'MongoDB'],
    image: '/projects/project3/image.png',
    github: 'https://github.com/Amanbig/URL-SHORT',
  },
  {
    num: '06',
    category: 'Frontend',
    title: 'Samsung Calculator Clone',
    description:
      'A Flutter-based calculator app replicating Samsung’s design, supporting basic and scientific operations with a sleek, intuitive interface.',
    stack: ['Dart', 'Flutter'],
    image: '/projects/project4/image2.png',
    github: 'https://github.com/Amanbig/samsung_calculator_clone',
  },

];

// Reusable components
const ProjectHeader = ({ num, category, title }) => (
  <div className="flex flex-col gap-2">
    <span className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">
      {num}
    </span>
    <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white group-hover:text-accent transition-all duration-300 capitalize">
      {category} Project: {title}
    </h2>
  </div>
);

const ProjectDetails = ({ description, stack, github }) => (
  <div className="flex flex-col gap-4">
    <p className="text-white/70 text-sm md:text-base">{description}</p>
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech, index) => (
        <li key={index} className="text-accent text-sm md:text-base">
          {tech}
          {index < stack.length - 1 && ','}
        </li>
      ))}
    </ul>
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
  <div className="relative w-full h-full rounded-xl overflow-hidden">
    <div className="absolute inset-0 bg-black/20 z-10" />
    <Image
      src={image}
      alt={`${title} screenshot`}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority
    />
  </div>
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