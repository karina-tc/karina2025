import type { ImageMetadata } from "astro";
import demoTropic01 from "../assets/work/tropic/demo-tropic-01.png";
import tropicBg1 from "../assets/backgrounds/abstract-5.png";
import tropicBg2 from "../assets/backgrounds/abstract-2.png";
import glueBg from "../assets/backgrounds/abstract-4.png";
import teikametricsBg from "../assets/backgrounds/abstract-3.png";


interface Project {
  title: string;
  description: string;
  mainImage: ImageMetadata;
  backgroundImage?: string;
  icon?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    title: "Tropic · Ask AI",
    description: "Shapping Tropic's AI Assistant through systems thinking",
    mainImage: demoTropic01,
    backgroundImage: tropicBg1.src,
    link: "#"
  },
  {
    title: "Tropic · Supplier Intelligence",
    description: "Building an data-driven intelligence platform of software vendors",
    mainImage: demoTropic01,
    backgroundImage: tropicBg2.src,
    link: "#"
  },
  {
    title: "Glue · Productizing Employee Sentiment",
    description: "Integrating employee sentiment data with social events in one platform.",
    mainImage: demoTropic01,
    backgroundImage: glueBg.src,
    link: "#"
  },
  {
    title: "Teikametrics · Advertising Analytics",
    description: "Helping eCommerce companies optimize their PPC campaigns.",
    mainImage: demoTropic01,
    backgroundImage: teikametricsBg.src,
    link: "#"
  }
];