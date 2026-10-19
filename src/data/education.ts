export interface Education {
  school: string;
  degree: string;
  when: string;
  city: string;
  detail: string;
  current: boolean;
}

export const education: Education[] = [
  {
    school: "Imperial College London",
    degree: "MSc Artificial Intelligence Applications and Innovation",
    when: "Until Oct 2027",
    city: "London",
    detail:
      "Going deeper on the maths behind modern AI, from optimisation and probability to deep learning, so I can build AI systems that hold up on messy real-world data, not just in demos.",
    current: true,
  },
  {
    school: "Northeastern University",
    degree: "BS Computer Science, Economics minor",
    when: "May 2026",
    city: "Boston",
    detail: "Dean's List. Where I led my first engineering team, on PancakeOverflow.",
    current: false,
  },
];
