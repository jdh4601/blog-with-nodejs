const resumeData = {
    name: "Donghyun Jeong",
    email: "jdh9490@gmail.com",
    phone: "(+82) 10-4601-9782",
    location: "Seoul, South Korea",
    
    experiences: [
        {
            title: "Class of 2022",
            company: "Likelion (part-time)",
            startDate: "Mar 2022",
            endDate: "Dec 2022",
            responsibilities: [
                "Proficient in front-end technologies: HTML, CSS, JavaScript, React.js.",
                "Experienced with Figma for wireframing and prototyping.",
                "Built responsive websites and web apps, focusing on user-friendly interfaces and optimized performance."
            ]
        },
				{
						title: "ESG College fellowship",
						company: "Hyundai Motor Chung Mong-Koo Foundation (part-time)",
						startDate: "Jul 2022",
						endDate: "Oct 2022",
						responsibilities: [
								"Participated in group presentation competitions, showcasing teamwork and communication skills.",
								"Conducted research on global issues, including climate-tech, AI, and business, while engaging with experts to gain deeper insights.",
								"Delivered team presentations on LLM solutions for equitable access to stock market information."
						]
				},
				{
						title: "Co-founder & CTO",
						company: "Roveroad Inc (part-time)",
						startDate: "June 2022",
						endDate: "Jan 2023",
						responsibilities: [
								"Developed minimum viable products.",
								"Learned business plan & financial modeling.",
								"Participated in design thinking and innovation seminars."
						]
				},			
    ],
    
    projects: [
        {
            name: "[Hyundai Mobis] Vehicle-to-vehicle electricity sharing platform service",
            description: [
						"Collaborated in a cross-functional team to develop a car-sharing solution using a map API for locating nearby vehicles.",
						"Designed and implemented responsive React components to enhance user experience.",
						"Contributed to the review registration and feedback feature for user engagement.",
						"Focused on user-centered UI design principles."
						],
						startDate: "Dec 2022",
						endDate: "Feb 2023",
            technologies: ["React", "React-query", "Figma", "CSS"],
            // link: "https://"
        }
    ],
    
    education: [
        {
            degree: "Bachelor of Industrial Engineering",
            institution: "Incheon National University",
						startDate: "March 2022",
						endDate: "Present"
            // gpa: "x.x/4.5"
        }
    ],
    
    certifications: [
        {
            name: "Machine Learning Specialization",
            organization: "Deeplearning.AI",
            dateEarned: "Dec 2024",
						link: "https://coursera.org/share/e602ff745bdf81641b96c76f96cb36a0"
        },					
        {
            name: "AWS Certified Cloud Practitioner",
            organization: "Amazon Web Services",
            dateEarned: "Oct 2024",
            // validUntil: "Oct 2027",
						link: "https://www.credly.com/badges/7a04f09e-5e11-42b6-838e-ee5af58ec955/public_url"
        },	
    ]
};

module.exports = resumeData;