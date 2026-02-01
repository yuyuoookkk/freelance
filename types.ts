
export enum Section {
  WORK = 'Work',
  SHOP = 'Shop',
  ABOUT = 'About',
  CONTACT = 'Contact'
}

export interface BackgroundState {
  section: Section;
  color: string;
  accent: string;
  gravityStrength: number; // Force of the mouse (negative for repulsion)
  viscosity: number; // Movement resistance
  springStrength: number; // Return to home force
  pointColor: string;
}

export const SECTION_CONFIGS: Record<Section, BackgroundState> = {
  [Section.WORK]: {
    section: Section.WORK,
    color: '#050505',
    accent: '#00FF41', // Matrix Green
    gravityStrength: 150,
    viscosity: 0.92,
    springStrength: 0.05,
    pointColor: 'rgba(0, 255, 65, 0.4)'
  },
  [Section.SHOP]: {
    section: Section.SHOP,
    color: '#000000',
    accent: '#FF0055', // Cyber Red
    gravityStrength: -200, // Repulsion
    viscosity: 0.85,
    springStrength: 0.08,
    pointColor: 'rgba(255, 0, 85, 0.3)'
  },
  [Section.ABOUT]: {
    section: Section.ABOUT,
    color: '#020205',
    accent: '#00D4FF', // Tech Blue
    gravityStrength: 50,
    viscosity: 0.98, // Very fluid
    springStrength: 0.01, // Loose
    pointColor: 'rgba(0, 212, 255, 0.2)'
  },
  [Section.CONTACT]: {
    section: Section.CONTACT,
    color: '#080808',
    accent: '#FFFFFF',
    gravityStrength: 300,
    viscosity: 0.9,
    springStrength: 0.1,
    pointColor: 'rgba(255, 255, 255, 0.5)'
  }
};
