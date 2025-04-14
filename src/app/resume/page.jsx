"use client";

import React from 'react';
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiFlutter, SiPython, SiCplusplus, SiUnity, SiBlender } from 'react-icons/si';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { ScrollArea } from '@radix-ui/react-scroll-area';

// Data objects
const about = {
  title: 'About Me',
  description:
    "I'm a passionate developer from India, skilled in web, mobile, and game development. My journey in tech is driven by curiosity and a commitment to building impactful solutions.",
  info: [
    { fieldName: 'Name', fieldValue: 'Amanpreet Singh' },
    { fieldName: 'Email', fieldValue: 'amanpreetsinghjhiwant7@gmail.com' },
    { fieldName: 'Phone', fieldValue: '+91 9041232480' },
    { fieldName: 'Location', fieldValue: 'Punjab, India' },
  ],
};

const experience = {
  title: 'Professional Experience',
  description:
    'Contributed to open-source projects, hackathons, and professional internships, leveraging modern technologies to deliver robust applications.',
  items: [
    {
      company: 'Celebrare',
      position: 'iOS App Development Intern (Celebrare & Wow Invite Apps)',
      duration: 'Dec 2024 - Mar 2025',
    },
    { company: 'Google', position: 'Gemini API Competition Participant', duration: '2024' },
    { company: 'Government of India', position: 'Smart India Hackathon Participant', duration: '2023' },
    { company: 'HacktoberFest', position: 'Open Source Contributor', duration: '2021 - Present' },
  ],
};

const education = {
  title: 'Education',
  description: 'Pursued a B.E. in Computer Science while actively participating in hackathons and open-source communities.',
  items: [
    { institution: 'Chandigarh College of Engineering and Technology', degree: 'B.E. in Computer Science', duration: '2021 - 2025' },
    { institution: 'Shishu Niketan Model Public School', degree: 'Intermediate (+2)', duration: '2018 - 2020' },
    { institution: 'Lawrence Public Senior Secondary School', degree: 'Matriculation', duration: '2017 - 2018' },
  ],
};

const skills = {
  title: 'Technical Skills',
  description: 'Proficient in modern programming languages, frameworks, and tools for web, mobile, and game development.',
  skillList: [
    { icon: <FaHtml5 />, name: 'HTML5' },
    { icon: <FaCss3 />, name: 'CSS3' },
    { icon: <FaJs />, name: 'JavaScript' },
    { icon: <FaReact />, name: 'React' },
    { icon: <FaNodeJs />, name: 'Node.js' },
    { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
    { icon: <SiNextdotjs />, name: 'Next.js' },
    { icon: <SiFlutter />, name: 'Flutter' },
    { icon: <SiPython />, name: 'Python' },
    { icon: <SiCplusplus />, name: 'C++' },
    { icon: <SiUnity />, name: 'Unity' },
    { icon: <SiBlender />, name: 'Blender' },
  ],
};

// Reusable components
const SectionHeader = ({ title, description }) => (
  <div className="flex flex-col gap-4 text-center xl:text-left">
    <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold">{title}</h2>
    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{description}</p>
  </div>
);

const ExperienceEducationCard = ({ item, type }) => (
  <li className="bg-[#232329] h-[184px] py-6 px-6 md:px-8 rounded-xl flex flex-col justify-center items-center lg:items-start gap-2">
    <span className="text-accent text-sm md:text-base">{item.duration}</span>
    <h3 className="text-base md:text-lg font-medium max-w-[260px] min-h-[40px] text-center lg:text-left">
      {type === 'experience' ? item.position : item.degree}
    </h3>
    <div className="flex items-center gap-3">
      <span className="w-2 h-2 rounded-full bg-accent" />
      <p className="text-white/60 text-sm md:text-base">{type === 'experience' ? item.company : item.institution}</p>
    </div>
  </li>
);

const SkillCard = ({ skill }) => (
  <li>
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="w-full h-[100px] md:h-[120px] bg-[#232329] rounded-xl flex justify-center items-center group">
          <div className="text-4xl md:text-5xl group-hover:text-accent transition-all duration-300">{skill.icon}</div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#232329] text-white p-2 rounded">
          <p className="capitalize">{skill.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </li>
);

const AboutInfo = ({ info }) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 max-w-[620px] mx-auto xl:mx-0">
    {info.map((item, index) => (
      <li key={index} className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-2">
        <span className="text-white/60 font-medium">{item.fieldName}:</span>
        <span className="text-base md:text-lg break-all">{item.fieldValue}</span>
      </li>
    ))}
  </ul>
);

function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-[80vh] flex items-center justify-center py-8 md:py-12"
    >
      <div className="container mx-auto px-4">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-6 md:gap-8 xl:gap-12"
        >
          <TabsList
            className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-3 bg-[#232329] p-4 rounded-xl"
            aria-label="Resume sections"
          >
            {['experience', 'education', 'skills', 'about'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="w-full py-3 px-4 text-left rounded-lg capitalize transition-all duration-300 data-[state=active]:bg-accent data-[state=active]:text-white hover:bg-white/10"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="w-full">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-6">
                <SectionHeader title={experience.title} description={experience.description} />
                <ScrollArea className="h-[400px] pr-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {experience.items.map((item, index) => (
                      <ExperienceEducationCard key={index} item={item} type="experience" />
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-6">
                <SectionHeader title={education.title} description={education.description} />
                <ScrollArea className="h-[400px] pr-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {education.items.map((item, index) => (
                      <ExperienceEducationCard key={index} item={item} type="education" />
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-6">
                <SectionHeader title={skills.title} description={skills.description} />
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {skills.skillList.map((skill, index) => (
                    <SkillCard key={index} skill={skill} />
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="about" className="w-full">
              <div className="flex flex-col gap-6">
                <SectionHeader title={about.title} description={about.description} />
                <AboutInfo info={about.info} />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}

export default Resume;