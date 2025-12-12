
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiFlutter, SiPython, SiCplusplus, SiUnity, SiBlender } from 'react-icons/si';

export const portfolioData = {
    personalInfo: {
        name: 'Amanpreet Singh',
        phone: '+91 9041232480',
        email: 'amanpreetsinghjhiwant7@gmail.com',
        address: 'Punjab, India 140301',
        role: 'Full Stack Developer',
        bio: 'I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.',
        resumeUrl: '/resume/Amanpreet_singh.pdf'
    },

    navLinks: [
        { name: "home", path: "/" },
        { name: "resume", path: "/resume" },
        { name: "work", path: "/work" },
        { name: "contact", path: "/contact" },
    ],

    stats: {
        useGithub: true, // Set to false to use manual 'value' properties below
        technologies: [
            'JavaScript', 'React', 'Next.js', 'Node.js', 'TypeScript',
            'Python', 'Tailwind CSS', 'Git', 'HTML', 'CSS', 'MongoDB',
            'Express.js', 'SQL', 'GraphQL', 'Docker', 'AWS', 'Jest'
        ],
        items: [
            { text: "Projects Completed", suffix: "", value: 15 },
            { text: "Technologies Mastered", suffix: "", value: 12 },
            { text: "Code Commits", suffix: "", value: 500 },
            { text: "Pull Requests", suffix: "", value: 80 },
            { text: "Stars Received", suffix: "", value: 10 },
            { text: "Lines of Code", suffix: "k", value: 25 },
        ]
    },

    resume: {
        about: {
            title: 'About Me',
            description: "I'm a passionate developer from India, skilled in web, mobile, and game development. My journey in tech is driven by curiosity and a commitment to building impactful solutions.",
            info: [
                { fieldName: 'Name', fieldValue: 'Amanpreet Singh' },
                { fieldName: 'Email', fieldValue: 'amanpreetsinghjhiwant7@gmail.com' },
                { fieldName: 'Phone', fieldValue: '+91 9041232480' },
                { fieldName: 'Location', fieldValue: 'Punjab, India' },
            ],
        },
        experience: {
            title: 'Professional Experience',
            description: 'Contributed to open-source projects, hackathons, and professional internships, leveraging modern technologies to deliver robust applications.',
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
        },
        education: {
            title: 'Education',
            description: 'Pursued a B.E. in Computer Science while actively participating in hackathons and open-source communities.',
            items: [
                { institution: 'Chandigarh College of Engineering and Technology', degree: 'B.E. in Computer Science', duration: '2021 - 2025' },
                { institution: 'Shishu Niketan Model Public School', degree: 'Intermediate (+2)', duration: '2018 - 2020' },
                { institution: 'Lawrence Public Senior Secondary School', degree: 'Matriculation', duration: '2017 - 2018' },
            ],
        },
        skills: {
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
        },
    },

    projects: [
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
    ],

    contact: {
        info: [
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
        ]
    }
};
