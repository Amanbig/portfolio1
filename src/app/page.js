"use client"

import { motion } from "framer-motion";
import Photo from "@/components/Photo";
import { portfolioData } from "@/data/portfolio";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FiDownload } from 'react-icons/fi';

export default function Home() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const { personalInfo } = portfolioData;

  useEffect(() => {
    // Only fetch if resumeUrl is a valid path that needs to be fetched
    // Otherwise we can just use the url directly in the anchor tag if it's external or static
    // The previous logic fetched it as a blob. Let's keep it if the user wants that behavior,
    // but simplified to use the config url.
    const fetchPdf = async () => {
      try {
        const response = await fetch(personalInfo.resumeUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        // Fallback to direct URL if fetch fails (e.g. if it's an external link)
        setPdfUrl(personalInfo.resumeUrl);
      }
    };

    if (personalInfo.resumeUrl) {
      fetchPdf();
    }
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="h-full"
    >
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">{personalInfo.role}</span>
            <h1 className="h1 mb-6">
              Hello I'm<br /> <span className="text-accent">{personalInfo.name}</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              {personalInfo.bio}
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                {pdfUrl ? (
                  <a href={pdfUrl} download="Amanpreet_singh.pdf" className="flex items-center gap-2">
                    <span>Download CV</span>
                    <FiDownload className="text-xl" />
                  </a>
                ) : (
                  <span>Loading...</span>
                )}
              </Button>
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
