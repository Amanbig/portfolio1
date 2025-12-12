"use client"

import { motion } from "framer-motion";
import Photo from "@/components/Photo";
import { portfolioData } from "@/data/portfolio";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FiDownload } from 'react-icons/fi';

const Typewriter = ({ text, delay = 100, infinite = true }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
    } else if (infinite) {
      // Optional: Reset logic if needed
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <span>{currentText}</span>;
};

export default function Home() {
  const { personalInfo } = portfolioData;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="h-full"
    >
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl font-mono text-accent">
              &lt;{personalInfo.role} /&gt;
            </span>
            <h1 className="h1 mb-6">
              Hello I'm<br /> <span className="text-accent">{personalInfo.name}</span>
            </h1>

            {/* Code Block Bio */}
            <div className="max-w-[500px] mb-9 mx-auto xl:mx-0 bg-[#1e1e1e] p-4 rounded-lg border border-white/10 font-mono text-sm text-white/80 relative group hover:border-accent/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-6 bg-[#252526] rounded-t-lg flex items-center px-2 gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="mt-4">
                <span className="text-pink-500">const</span> <span className="text-blue-400">developer</span> = <span className="text-yellow-300">{"{"}</span><br />
                &nbsp;&nbsp;<span className="text-blue-300">bio</span>: <span className="text-green-400">"{personalInfo.bio}"</span><br />
                <span className="text-yellow-300">{"}"}</span>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a
                href={personalInfo.resumeUrl}
                download="Amanpreet_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
              </a>
              <div className="mb-8 xl:mb-0">
                <Socials containerStyles="flex gap-6" iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500" />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </motion.section>
  );
}
