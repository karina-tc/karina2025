import paper from "../assets/other/paper.png";
import notion from "../assets/logos/notion.png";
import figma from "../assets/logos/figma.png";
import cursor from "../assets/logos/cursor.png";
import loom from "../assets/logos/loom.png";
import walking from "../assets/other/walking.png";

import sketching from "../assets/other/sketch.gif";
import cat from "../assets/other/cat.gif";
import rectangles from "../assets/other/rectangles.gif";
import hackers from "../assets/other/hacking.gif";
import garage from "../assets/other/garage.gif";
import walks from "../assets/other/walks.gif";

export const tools = [
  {
    icon: paper,
    iconSize: "w-9 h-9",
    name: "Pen & Paper",
    description: "To quickly jot down first ideas and take notes.",
    gif: sketching
  },
  {
    icon: notion,
    iconSize: "w-6 h-6",
    name: "Notion",
    description: "This is how I keep myself organized because I have too much ADHD, y'all.",
    gif: cat
  },
  {
    icon: figma,
    iconSize: "w-4",
    name: "Figma",
    description: "This is where I push rectangles left and right. I use this as a mid-fidelity canvas.",
    gif: rectangles
  },
  {
    icon: cursor,
    iconSize: "w-9",
    name: "Cursor",
    description: "This is where I flesh out ideas and build in-depth prototypes.",
    gif: hackers
  },
  {
    icon: loom,
    iconSize: "w-7",
    name: "Loom",
    description: "This is how I share ideas and build with the garage open.",
    gif: garage
  },
  {
    icon: walking,
    iconSize: "w-9",
    name: "Walks",
    description: "Aside of needing to get my steps in, I like to walk, step away from my desk and think.",
    gif: walks
  }
]; 