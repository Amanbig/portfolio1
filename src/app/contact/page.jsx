"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const info = [
  {
    icon: <FaPhoneAlt />,
    title: 'Phone',
    description: '+91 9041232480'
  },
  {
    icon: <FaEnvelope />,
    title: 'Email',
    description: 'amanpreetsinghjhiwant7@gmail.com'
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Address',
    description: 'Punjab, India 140301'
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
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('');

    try {
      const response = await fetch('https://formspree.io/f/mrbzpvel', { // Replace with your Formspree form endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('Your message has been sent successfully!');
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmissionStatus('There was an error sending your message.');
      }
    } catch (error) {
      setSubmissionStatus('There was an error sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1, transition: {
      delay: 2.4, duration: 0.4, ease: 'easeIn'
    }}} className='py-6'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col xl:flex-row gap-[30px]'>
          <div className='xl:w-[54%] order-2 xl:order-none'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6 md:p-10 bg-[#27272c] rounded-xl'>
              <h3 className='text-2xl md:text-4xl text-accent'>
                Let's work together
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Input type="text" name="firstname" value={formData.firstname} onChange={handleChange} placeholder="Firstname" />
                <Input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Lastname" />
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" />
                <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
              </div>
              <Textarea name="message" value={formData.message} onChange={handleChange} className="h-[150px] md:h-[200px]" placeholder="Type your message here." />
              <Button type="submit" size="md" className='w-full md:max-w-[150px]' disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              {submissionStatus && <p className='text-white'>{submissionStatus}</p>}
            </form>
          </div>
          <div className='flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0'>
            <ul className='flex flex-col gap-8 md:gap-10'>
              {info.map((item, index) => (
                <li key={index} className='flex items-center gap-4 md:gap-6'>
                  <div className='w-[44px] h-[44px] md:w-[52px] md:h-[52px] xl:w-[72px] xl:h-[72px] bg-primary text-accent rounded-md flex items-center justify-center'>
                    <div className='text-lg md:text-xl xl:text-[28px]'>{item.icon}</div>
                  </div>
                  <div className='flex-1'>
                    <p className='text-white/60'>{item.title}</p>
                    <h3 className='text-lg md:text-xl'>{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact;
