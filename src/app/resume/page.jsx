"use client";

import React from 'react';
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiFlutter, SiPython, SiCplusplus, SiUnity, SiBlender } from 'react-icons/si';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const about = {
  title: 'About me',
  description: "I'm a dedicated and enthusiastic developer from India and my journey in the tech world has been shaped by a strong foundation in various programming languages and frameworks, from web development to mobile app creation and game development.",
  info: [
    { fieldName: 'Name', fieldValue: 'Amanpreet Singh' },
    { fieldName: 'Email', fieldValue: 'amanpreetsinghjhiwant7@gmail.com' },
    { fieldName: 'Phone', fieldValue: '+91 9041232480' },
    { fieldName: 'Location', fieldValue: 'Punjab, India' },
  ]
};

const experience = {
  icon: 'assets/photo-removebg-preview.png',
  title: 'Professional Experience',
  description: 'Contributed to various open-source projects, participated in Hacktoberfest, and developed applications using advanced technologies.',
  items: [
    { company: "Celebrare", position: "Worked on main IOS Celebrare app and Wow invite app (Internship)", duration: "Dec 2024 - March 2025" },
    { company: "Google", position: "Google’s Gemini API Competition", duration: "2024" },
    { company: "Government of India", position: "Smart India Hackathon", duration: "2023" },
    { company: "HacktoberFest", position: "Participated in Open source Contributions", duration: "2021 - Present" },
  ]
};

const education = {
  icon: 'assets/photo-removebg-preview.png',
  title: 'Education',
  description: 'B.E. in Computer Science and Engineering with contributions to open-source projects and participation in hackathons.',
  items: [
    { institution: "Chandigarh College of Engineering and Technology", degree: "B.E. in CSE", duration: "Dec 2021 - 2025" },
    { institution: "Shishu Niketan Model Public School", degree: "Intermediate/+2", duration: "April 2018 - 2020" },
    { institution: "Lawerance Public Senior Secondary School", degree: "Matriculation", duration: "April 2017 - 2018" }
  ]
};

const skills = {
  title: "Technical Skills",
  description: "Proficient in various programming languages, frameworks, and tools used in modern web and mobile app development.",
  skillList: [
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaCss3 />, name: "CSS3" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiFlutter />, name: "Flutter" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiCplusplus />, name: "C++" },
    { icon: <SiUnity />, name: "Unity" },
    { icon: <SiBlender />, name: "Blender" }
  ]
};

function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.4, ease: 'easeIn' } }}
      className='min-h-[80vh] flex items-center justify-center py-8 md:py-12 xl:py-0'
    >
      <div className='container mx-auto px-4'>
        <Tabs defaultValue='experience' className='flex flex-col xl:flex-row gap-8 md:gap-12 xl:gap-[60px]'>
          <TabsList className='flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-4 md:gap-6'>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>
          <div className='min-h-[70vh] w-full'>
            <TabsContent value='experience' className='w-full'>
              <div className='flex flex-col gap-6 text-center xl:text-left'>
                <h3 className='text-2xl md:text-3xl xl:text-4xl font-bold'>{experience.title}</h3>
                <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{experience.description}</p>
                <ScrollArea className='h-[400px]'>
                  <ul className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {experience.items.map((item, index) => (
                      <li key={index} className='bg-[#232329] h-[184px] py-6 px-8 md:px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1'>
                        <span className='text-accent'>{item.duration}</span>
                        <h3 className='text-lg md:text-xl max-w-[260px] min-h-[60px] text-center lg:text-left'>{item.position}</h3>
                        <div className='flex items-center gap-3'>
                          <span className='w-[6px] h-[6px] rounded-full bg-accent'></span>
                          <p className='text-white/60'>{item.company}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value='education' className='w-full'>
              <div className='flex flex-col gap-6 text-center xl:text-left'>
                <h3 className='text-2xl md:text-3xl xl:text-4xl font-bold'>{education.title}</h3>
                <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{education.description}</p>
                <ScrollArea className='h-[400px]'>
                  <ul className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {education.items.map((item, index) => (
                      <li key={index} className='bg-[#232329] h-[184px] py-6 px-8 md:px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1'>
                        <span className='text-accent'>{item.duration}</span>
                        <h3 className='text-lg md:text-xl max-w-[260px] min-h-[60px] text-center lg:text-left'>{item.degree}</h3>
                        <div className='flex items-center gap-3'>
                          <span className='w-[6px] h-[6px] rounded-full bg-accent'></span>
                          <p className='text-white/60'>{item.institution}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value='skills' className='w-full h-full'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-6 text-center xl:text-left'>
                  <h3 className='text-2xl md:text-3xl xl:text-4xl font-bold'>{skills.title}</h3>
                  <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{skills.description}</p>
                </div>
                <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 xl:gap-[30px]'>
                  {skills.skillList.map((skill, index) => (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className='w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group'>
                            <div className='text-5xl md:text-6xl group-hover:text-accent transition-all duration-300'>{skill.icon}</div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className='capitalize'>{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value='about' className='w-full'>
              <div className='flex flex-col gap-6'>
                <h3 className='text-2xl md:text-3xl xl:text-4xl font-bold'>{about.title}</h3>
                <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{about.description}</p>
                <ul className='grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0'>
                  {about.info.map((item, index) => (
                    <li key={index} className='flex items-center justify-center xl:justify-start gap-4'>
                      <span className='text-white/60'>{item.fieldName}</span>
                      <span className='text-lg md:text-xl'>{item.fieldValue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}

export default Resume;
