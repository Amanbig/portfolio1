"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Toaster, toast } from '@/components/ui/sonner';

const contactInfo = [
  {
    icon: <FaPhoneAlt />,
    title: 'Phone',
    description: '+91 9041232480',
    href: 'tel:+919041232480'
  },
  {
    icon: <FaEnvelope />,
    title: 'Email',
    description: 'amanpreetsinghjhiwant7@gmail.com',
    href: 'mailto:amanpreetsinghjhiwant7@gmail.com'
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Address',
    description: 'Punjab, India 140301',
    href: 'https://maps.google.com/?q=Punjab,India,140301'
  },
];

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
                    className={`text-sm sm:text-base h-10 sm:h-12 ${errors.firstname ? "border-red-500" : ""}`}
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
                    className="text-sm sm:text-base h-10 sm:h-12"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address *"
                    className={`text-sm sm:text-base h-10 sm:h-12 ${errors.email ? "border-red-500" : ""}`}
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
                    className="text-sm sm:text-base h-10 sm:h-12"
                  />
                </div>
              </div>

              <div>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`h-28 sm:h-36 md:h-48 text-sm sm:text-base ${errors.message ? "border-red-500" : ""}`}
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
            <div className="bg-gradient-to-br from-primary/20 to-accent/10 p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl backdrop-blur-sm">
              <h3 className='text-xl sm:text-2xl font-semibold text-white mb-5 sm:mb-6 md:mb-8'>Contact Information</h3>
              <ul className='flex flex-col gap-4 sm:gap-6 md:gap-8'>
                {contactInfo.map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className='flex items-center gap-4 sm:gap-6 group'
                  >
                    <a
                      href={item.href}
                      className="w-full flex items-center gap-3 sm:gap-4"
                      target={item.title === 'Address' ? '_blank' : undefined}
                      rel={item.title === 'Address' ? 'noopener noreferrer' : undefined}
                    >
                      <div className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/30 text-accent rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-300'>
                        <div className='text-base sm:text-lg md:text-xl'>{item.icon}</div>
                      </div>
                      <div className='flex-1 truncate'>
                        <p className='text-white/60 text-xs sm:text-sm'>{item.title}</p>
                        <h3 className='text-white text-sm sm:text-base md:text-lg group-hover:text-accent transition-colors duration-300 break-words'>
                          {item.title === 'Email' ? (
                            <span className="block truncate sm:inline">{item.description}</span>
                          ) : item.description}
                        </h3>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 sm:mt-10 md:mt-12">
                <h4 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4">Connect with me</h4>
                <div className="flex gap-3 sm:gap-4">
                  <a href='https://github.com/Amanbig/' target="_blank" rel="noopener noreferrer">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/30 flex items-center justify-center hover:bg-accent hover:text-primary cursor-pointer transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                    </svg>
                  </div>
                  </a>
                  <a href='https://www.linkedin.com/in/amanpreet-singh-9a1929211' target="_blank" rel="noopener noreferrer">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/30 flex items-center justify-center hover:bg-accent hover:text-primary cursor-pointer transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </div>
                  </a>
                  <a href='https://github.com/Amanbig/' target="_blank" rel="noopener noreferrer">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/30 flex items-center justify-center hover:bg-accent hover:text-primary cursor-pointer transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
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