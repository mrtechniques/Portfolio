import { SkillsData } from '@/types';
import fs from 'fs';
import path from 'path';

export function getSkillsData(): SkillsData {
  try {
    const filePath = path.join(process.cwd(), 'data', 'skills.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading skills.json:', error);
    return {
      radarAxes: [
        { label: 'Frontend / UX', value: 94, fullMark: 100, key: 'frontend' },
        { label: 'Backend Systems', value: 88, fullMark: 100, key: 'backend' },
        { label: 'AI & Machine Learning', value: 92, fullMark: 100, key: 'aiml' },
        { label: 'Computer Vision', value: 90, fullMark: 100, key: 'vision' },
        { label: 'Cinematography', value: 98, fullMark: 100, key: 'cinema' },
        { label: 'Color Grading / VFX', value: 95, fullMark: 100, key: 'post' },
      ],
      categories: ['Languages', 'Frameworks', 'AI/ML', 'Tools', 'Creative Tools'],
      skills: [],
    };
  }
}
