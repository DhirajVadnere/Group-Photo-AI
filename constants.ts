
import { Pose, AspectRatio } from './types';

export const POSES: Pose[] = [
  {
    id: 'lineup',
    name: 'Classic Lineup',
    description: 'A traditional shoulder-to-shoulder arrangement.',
    hint: 'Best for 2-5 people. Simple and formal.',
    thumbnail: '👥',
    rules: (n) => `Arrange all ${n} people in a straight horizontal line, equal spacing, shoulders slightly overlapping or touching.`
  },
  {
    id: 'arms-around',
    name: 'Arms Around Shoulders',
    description: 'A friendly, close-knit pose.',
    hint: 'Creates a warm, familiar feel.',
    thumbnail: '🫂',
    rules: (n) => `People should lean inward towards the center. Have them put arms around each other's shoulders or waists. High proximity.`
  },
  {
    id: 'wedding',
    name: 'Wedding-style Arrangement',
    description: 'Formal staggered rows.',
    hint: 'Excellent for 4-5 people. Looks very professional.',
    rules: (n) => n >= 4 
      ? `Arrange in two rows: 2 people seated in front, ${n-2} standing directly behind.`
      : `Stagger the heights slightly; have one person slightly forward and centered, others flanking.`
    ,
    thumbnail: '🏛️'
  },
  {
    id: 'sports',
    name: 'Sports Team Pose',
    description: 'Athletic-style group framing.',
    hint: 'Dynamic and powerful.',
    rules: (n) => n >= 4 
      ? `Two people kneeling in the front row, remaining ${n-2} standing in the back row.`
      : `All subjects in a tight cluster, one person kneeling or crouching slightly to vary height.`
    ,
    thumbnail: '⚽'
  },
  {
    id: 'graduation',
    name: 'Graduation Pose',
    description: 'A tight, celebratory cluster.',
    hint: 'Best for high energy and smiles.',
    rules: (n) => `A tight cluster of ${n} people, slightly angled towards each other, joyful expressions, looking directly at the camera.`
    ,
    thumbnail: '🎓'
  },
  {
    id: 'conference',
    name: 'Conference Group',
    description: 'Semi-formal business arrangement.',
    hint: 'Great for professional headshots.',
    rules: (n) => `Staggered rows, professional posture, hands at sides or folded in front, clean spacing.`
    ,
    thumbnail: '💼'
  },
  {
    id: 'party',
    name: 'Party Pose',
    description: 'Casual, slightly angled, fun.',
    hint: 'Vibrant and relaxed.',
    rules: (n) => `Candid-style but looking at camera. Varied angles, relaxed shoulders, asymmetrical but balanced composition.`
    ,
    thumbnail: '🎉'
  },
  {
    id: 'family',
    name: 'Family Portrait',
    description: 'Centered and balanced.',
    hint: 'Classic for any group size.',
    rules: (n) => `Centered composition. Taller people in the middle-back, shorter or seated people in front or sides. Coherent and warm.`
    ,
    thumbnail: '🏠'
  }
];

export const SCENES = [
  'Studio neutral (soft grey)',
  'Outdoor sunny park',
  'Modern office lobby',
  'Luxury event backdrop',
  'Cozy living room',
  'Urban city street'
];

export const ASPECT_RATIOS: AspectRatio[] = ['1:1', '3:4', '4:3', '9:16', '16:9'];
