export interface Project {
    href: string;
    title: string;
    tags: string[];
    delayClass: string;
}

export const projects: Project[] = [
    {
        href: "/case/sierra",
        title: "Sierra",
        tags: ["Website", "Narrative", "Development"],
        delayClass: "delay-[200ms]",
    },
    {
        href: "/case/deepmind",
        title: "Google Deepmind",
        tags: ["Narrative", "Motion Design", "AI"],
        delayClass: "delay-[400ms]",
    },
    {
        href: "/case/ramp",
        title: "Ramp",
        tags: ["Design System", "Narrative", "Motion Design"],
        delayClass: "delay-[600ms]",
    },
    {
        href: "/case/ramp",
        title: "Ramp",
        tags: ["Design System", "Narrative", "Motion Design"],
        delayClass: "delay-[600ms]",
    },
];