export interface Education {
  degree: string;
  institution: string;
  duration: string;
  description: string;
  logo?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  image: string;
  url?: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  live?: string;
  technologies: string[];
  category: 'AI' | 'ML' | 'Web Dev' | 'Full Stack';
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  points: string[];
  skills: string[];
}

export interface Internship {
  title: string;
  startDate: string;
  endDate: string;
  myName: string;
  certificateName: string;
  certificate: string;
  url: string;
}
