"use client";

import React from 'react';
import { portfolioData } from "@/data/portfolio";
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { ScrollArea } from '@radix-ui/react-scroll-area';

// Data objects
const { about, experience, education, skills } = portfolioData.resume;

// Reusable components
const SectionHeader = ({ title, description }) => (
  <div className="flex flex-col gap-4 text-center xl:text-left font-mono">
    <div className="text-sm text-accent opacity-80">
      <span className="text-white/50">~/portfolio/</span>{title.toLowerCase().replace(" ", "_")}
    </div>
    <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold flex items-center justify-center xl:justify-start gap-2">
      <span className="text-accent text-xl animate-pulse">$</span> {title}
    </h2>
    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{description}</p>
  </div>
);

const ExperienceEducationCard = ({ item, type }) => (
  <motion.li
    whileHover={{ scale: 1.02, backgroundColor: "#27272c" }}
    transition={{ duration: 0.3 }}
    className="bg-[#232329] h-[184px] py-6 px-6 md:px-8 rounded-xl flex flex-col justify-center items-center lg:items-start gap-2 cursor-pointer font-mono border-l-2 border-transparent hover:border-accent"
  >
    <span className="text-accent text-sm md:text-base font-bold">// {item.duration}</span>
    <h3 className="text-base md:text-lg font-medium max-w-[260px] min-h-[40px] text-center lg:text-left">
      {type === 'experience' ? item.position : item.degree}
    </h3>
    <div className="flex items-center gap-3">
      <span className="w-2 h-2 rounded-full bg-accent" />
      <p className="text-white/60 text-sm md:text-base">{type === 'experience' ? item.company : item.institution}</p>
    </div>
  </motion.li>
);

const SkillCard = ({ skill }) => (
  <motion.li
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="w-full h-[100px] md:h-[120px] bg-[#232329] rounded-xl flex justify-center items-center group relative overflow-hidden">
          <div className="absolute top-2 right-2 text-xs text-white/20 font-mono">.{skill.name.toLowerCase()}</div>
          <div className="text-4xl md:text-5xl group-hover:text-accent transition-all duration-300">{skill.icon}</div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#232329] text-white p-2 rounded">
          <p className="capitalize">{skill.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </motion.li>
);

const AboutInfo = ({ info }) => (
  <div className="max-w-[620px] mx-auto xl:mx-0 font-mono text-sm md:text-base bg-[#1e1e1e] p-6 rounded border border-white/10 relative shadow-xl">
    <div className="text-yellow-300">{"{"}</div>
    {info.map((item, index) => (
      <div key={index} className="pl-6 md:pl-8 my-1">
        <span className="text-blue-300">"{item.fieldName}"</span>: <span className="text-green-400">"{item.fieldValue}"</span>
        {index < info.length - 1 && <span className="text-white">,</span>}
      </div>
    ))}
    <div className="text-yellow-300">{"}"}</div>
  </div>
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