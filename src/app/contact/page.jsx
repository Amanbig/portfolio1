"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { portfolioData } from "@/data/portfolio";
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const contactInfo = portfolioData.contact.info;

function Contact() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mrbzpvel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully!");
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        toast.error("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      toast.error("Connection error. Please check your internet and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: 'easeIn',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='py-8 md:py-16'
    >
      <Toaster position="top-center" />
      <div className='container mx-auto px-4 sm:px-6'>
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">Get In Touch</h2>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
        </motion.div>

        <div className='flex flex-col xl:flex-row gap-8 md:gap-12'>
          {/* Contact Form (First on mobile) */}
          <motion.div
            variants={itemVariants}
            className='w-full xl:w-[60%] order-1'
          >
            <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 bg-gradient-to-br from-[#27272c] to-[#1f1f23] rounded-xl md:rounded-2xl shadow-lg'
            >
              <h3 className='text-xl sm:text-2xl md:text-3xl font-semibold text-accent mb-1 sm:mb-2'>
                Let's work together
              </h3>
              <p className="text-white/70 text-sm mb-2 md:mb-4">Fill in the form below to start a conversation</p>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                <div>
                  <Input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First name *"
                    className={`text-sm sm:text-base h-10 sm:h-12 input-glow ${errors.firstname ? "border-red-500" : ""}`}
                  />
                  {errors.firstname && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstname}</p>}
                </div>
                <div>
                  <Input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="text-sm sm:text-base h-10 sm:h-12 input-glow"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address *"
                    className={`text-sm sm:text-base h-10 sm:h-12 input-glow ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number (optional)"
                    className="text-sm sm:text-base h-10 sm:h-12 input-glow"
                  />
                </div>
              </div>

              <div>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`h-28 sm:h-36 md:h-48 text-sm sm:text-base input-glow ${errors.message ? "border-red-500" : ""}`}
                  placeholder="Tell me about your project or inquiry *"
                />
                {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <Button
                  type="submit"
                  className='px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-accent hover:bg-accent/90 text-primary text-sm sm:text-base font-medium transition-all duration-300'
                  disabled={isSubmitting}
                >
                  {isSubmitting ?
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div> :
                    'Send Message'
                  }
                </Button>
                {isSubmitting && <p className="text-white/70 text-xs sm:text-sm">Please wait...</p>}
              </div>
            </form>
          </motion.div>

          {/* Contact Info (Second on mobile) */}
          <motion.div
            variants={itemVariants}
            className='w-full xl:w-[40%] order-2 flex flex-col justify-center'
          >
            <div className="bg-[#1e1e1e] p-6 sm:p-8 rounded-xl md:rounded-2xl border border-white/10 font-mono text-sm md:text-base relative overflow-hidden shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-white/50 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2">contact.js</span>
              </div>

              <div className="text-pink-500 mb-2">const <span className="text-yellow-300">CONTACT_CONFIG</span> = <span className="text-yellow-300">{"{"}</span></div>
              <div className="flex flex-col gap-3 pl-4 sm:pl-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="group flex flex-wrap">
                    <span className="text-blue-300 min-w-[80px]">"{item.title.toLowerCase()}"</span>: <a href={item.href} target={item.title === 'Address' ? '_blank' : undefined} rel="noopener noreferrer" className="text-green-400 hover:text-accent hover:underline transition-all break-all sm:break-normal ml-2">"{item.description}"</a>
                    {index < contactInfo.length - 1 && <span className="text-white">,</span>}
                  </div>
                ))}
              </div>
              <div className="text-yellow-300 mt-2">{"};"}</div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center sm:text-left">
                <div className="text-white/40 text-xs mb-3">// Social Connections</div>
                <div className="flex gap-4 justify-center sm:justify-start">
                  {/* Social Icons updated to fit text */}
                  <a href='https://github.com/Amanbig/' target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent transition-colors">
                    <div className="px-4 py-2 rounded bg-white/5 flex items-center justify-center border border-white/10 hover:border-accent hover:bg-white/10 transition-all text-xs sm:text-sm">
                      Github
                    </div>
                  </a>
                  <a href='https://www.linkedin.com/in/amanpreet-singh-9a1929211' target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent transition-colors">
                    <div className="px-4 py-2 rounded bg-white/5 flex items-center justify-center border border-white/10 hover:border-accent hover:bg-white/10 transition-all text-xs sm:text-sm">
                      LinkedIn
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;