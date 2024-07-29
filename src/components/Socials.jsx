"use client";
import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa';

const socials = [
    {
        icon: <FaGithub />,
        path: 'https://github.com/Amanbig',
    },
    {
        icon: <FaLinkedin />,
        path: 'https://www.linkedin.com/in/amanpreet-singh-9a1929211',
    },
    {
        icon: <FaYoutube />,
        path: 'https://youtube.com/@beard-hv5qj?si=nJjPxEhrupNgVweI',
    },
];

function Socials({ containerStyles, iconStyles }) {
  return (
    <div className={containerStyles}>
        {socials.map((item, index) => (
            <Link key={index} href={item.path} className={iconStyles}>
                {item.icon}
            </Link>
        ))}
    </div>
  );
}

export default Socials;
