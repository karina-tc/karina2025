import avatar1 from "../assets/avatars/avatar-1.png";
import avatar2 from "../assets/avatars/avatar-2.png";
import avatar3 from "../assets/avatars/avatar-3.png";
import avatar4 from "../assets/avatars/avatar-4.png";
import avatar5 from "../assets/avatars/avatar-5.png";

export interface TimelineItem {
  title: string;
  company: string;
  companyUrl?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  avatar: ImageMetadata;
  categories: string[];
}

export const timelineItems: TimelineItem[] = [
  {
    title: "Fractional Product Designer",
    company: "Renumerate",
    startDate: "2024",
    endDate: "Present",
    description:
      "Currently working on setting Renumerate with the right initial branding and design product strategy on their quest to a pre-seed round and beyond.",
    avatar: avatar1,
    categories: ["AI", "eCommerce"],
  },
  {
    title: "Lead Product Designer",
    company: "Tropic App",
    companyUrl: "https://tropicapp.io",
    startDate: "2023",
    endDate: "Present",
    description: `Currently leading design and product strategy on Tropic's new Procurement Intelligence product and AI efforts.

    I have also worked on the engineering side through front-end code helping push polish into our application.`,
    avatar: avatar1,
    categories: ["AI", "FinTech"],
  },
  {
    title: "Senior Product Designer",
    company: "Glue",
    companyUrl: "https://glue.com",
    startDate: "2023",
    endDate: "2022",
    description:
      "I was responsible for the product design and branding of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app.",
    avatar: avatar2,
    categories: ["HR Tech"],
  },
  {
    title: "Staff Product Designer",
    company: "Teikametrics",
    companyUrl: "https://teikametrics.com",
    startDate: "2020",
    endDate: "2022",
    description:
      "I was the lead product designer at Tropic App. I was responsible for the product design and branding of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app.",
    avatar: avatar3,
    categories: ["MarTech", "AI", "eCommerce", "Advertising"],
  },
  {
    title: "Product Owner",
    company: "Rejoiner",
    companyUrl: "https://rejoiner.com",
    startDate: "2014",
    endDate: "2020",
    description:
      "I was the lead product designer at Tropic App. I was responsible for the product design and branding of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app.",
    avatar: avatar4,
    categories: ["eCommerce", "Email Marketing"],
  },
  {
    title: "Lead Designer",
    company: "Venly",
    companyUrl: "https://venly.com",
    startDate: "2013",
    endDate: "2014",
    description:
      "I was the lead product designer at Tropic App. I was responsible for the product design and branding of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app. I was also responsible for the design of the app.",
    avatar: avatar5,
    categories: ["Local Commerce"],
  },
]; 
