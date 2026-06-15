export interface Testimonial {
  id: string
  name: string
  role: string
  school: string
  avatar: string
  content: string
  saved: string
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Computer Science",
    school: "MIT",
    avatar: "PS",
    content: "I saved over $500 on software tools in my first semester alone. JetBrains and GitHub Copilot being free for students is insane.",
    saved: "$500+",
  },
  {
    id: "2",
    name: "James Wilson",
    role: "Design Major",
    school: "RISD",
    avatar: "JW",
    content: "The Figma education license and Adobe Creative Cloud discount saved me from spending $600+/year on design tools. This site is a goldmine.",
    saved: "$600+/yr",
  },
  {
    id: "3",
    name: "Aisha Patel",
    role: "Data Science",
    school: "UC Berkeley",
    avatar: "AP",
    content: "Azure for Students ($100 free, no credit card) is unbeatable. I built my entire capstone project on it. The cloud credit guide was spot on.",
    saved: "$1,200+",
  },
  {
    id: "4",
    name: "Marcus Johnson",
    role: "Business & Economics",
    school: "London School of Economics",
    avatar: "MJ",
    content: "I didn't know about 50% off Spotify and Apple Music until I found this site. Saving $120/year on music alone. Highly recommend.",
    saved: "$120+/yr",
  },
]
