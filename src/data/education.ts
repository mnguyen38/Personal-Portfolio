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
    when: "Expected 2027",
    city: "London",
    detail: "Modules: Mathematics for Machine Learning, Machine Learning, Deep Learning",
    current: true,
  },
  {
    school: "Northeastern University",
    degree: "BS Computer Science, Economics minor",
    when: "Graduated May 2026",
    city: "Boston",
    detail: "GPA 3.48 · Dean's List",
    current: false,
  },
];
