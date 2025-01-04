import type { ImageMetadata } from "astro";
import laurentAvatar from "../assets/people/laurent-baumann.png";
import annaAvatar from "../assets/people/anna-von-clemm.png";
import sheetalAvatar from "../assets/people/sheetal-bongale.png";
import ryanAvatar from "../assets/people/ryan-kuczka.png";
import javierAvatar from "../assets/people/javier-irigoyen.png";
import michaelAvatar from "../assets/people/michael-viscariello.png";

type Testimonial = {
  title: string;
  content: string;
  author: string;
  role: string;
  avatar: ImageMetadata;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    title: "Super fast",
    content: "I have never seen a designer this fast. We would discuss ideas, and the next day Karina would have MULTIPLE flows laid out, ready to be discussed and tweaked. I have worked with and managed many designers in the past. None of them is that fast.",
    author: "Laurent Baumann",
    role: "Director of Product Design at Nex",
    avatar: laurentAvatar,
    company: "Glue"
  },
  {
    title: "Can do it all",
    content: "Karina really shines at UX but can do everything from graphic design to video to frontend code. For example, we were short on engineers and she completely re-themed our app over the course of a few days. It's fun to give her a set of requirements and then watch her think big and never put constraints on what she can/can't do.",
    author: "Anna Von Clemm",
    role: "Product at Raptor Maps",
    avatar: annaAvatar,
    company: "Glue"
  },
  {
    title: "Deep understanding",
    content: "Karina's dedication to researching and understanding the user and their experience sets her apart. She goes above and beyond to gather user insights, ensuring that her designs are rooted in a deep understanding of their needs and expectations.",
    author: "Sheetal Bongale",
    role: "Senior Data Analyst at Upshop",
    avatar: sheetalAvatar,
    company: "Glue"
  },
  {
    title: "Technical prowess",
    content: "While Karina's focus at Rejoiner was on the product ownership and design, she had a solid grasp of the engineering that went into building the product as well. It was not uncommon for me to build out a functional, but bare-bones MVP of a feature and hand it off to Karina, only to come back the next day to a fully stylized and beautiful product.",
    author: "Ryan Kuczka",
    role: "Principal Engineer at Red Ventures",
    avatar: ryanAvatar,
    company: "Rejoiner"
  },
  {
    title: "Strategic builder",
    content: "Karina is one of the most resourceful, proactive, and capable designers I've worked with as a product leader. She's able to not only bring rapid solutions to customer problems in the form of UX prototypes and final implementations, but also to flexibly wear her PM hat anytime needed in the different phases of the product development lifecycle, making her an excellent partner to any PM.",
    author: "Javier Irigoyen R.",
    role: "Product at TikTok Shop",
    avatar: javierAvatar,
    company: "Teikametrics"
  },
  {
    title: "Action-oriented",
    content: "Karina is one of the most action oriented designers I've ever worked with; no task is too big or small. On top of providing first-class UX designs, she proactively bridged gaps between Product, Design, and Development to ensure projects were successful. Her professionalism and sense for what makes a great user experience is simply astounding.",
    author: "Michael Viscariello",
    role: "Product Leader, Data & Growth Advisor",
    avatar: michaelAvatar,
    company: "Teikametrics"
  }
];

export type { Testimonial }; 