// Comic panel data — the single strip image is cropped into 8 panels
// using CSS object-position. The image is 4 panels wide × 2 rows.
// Row 0: panels 0-3 (top row), Row 1: panels 4-7 (bottom row)

export interface ComicPanel {
  id: number;
  label: string;
  // CSS object-position values for cropping the strip
  objectPositionX: string;
  objectPositionY: string;
  dialogue?: string;
  narration?: string;
  speaker?: 'crab' | 'shark' | 'narrator';
}

export const comicPanels: ComicPanel[] = [
  {
    id: 0,
    label: 'Panel 1',
    objectPositionX: '0%',
    objectPositionY: '0%',
    dialogue: '"Tell me something that makes me angry." — "Why?"',
    speaker: 'crab',
    narration: 'The crab asks the shark to help feel crabby.',
  },
  {
    id: 1,
    label: 'Panel 2',
    objectPositionX: '33.33%',
    objectPositionY: '0%',
    dialogue: '"I\'m not feeling crabby. Crabs need to be crabby." — "Hmmm..."',
    speaker: 'crab',
  },
  {
    id: 2,
    label: 'Panel 3',
    objectPositionX: '66.67%',
    objectPositionY: '0%',
    dialogue: '"Today\'s Megan\'s birthday, and I totally forgot about it."',
    speaker: 'shark',
  },
  {
    id: 3,
    label: 'Panel 4',
    objectPositionX: '100%',
    objectPositionY: '0%',
    dialogue: '"When she finally told me, I tried making a cake. It caught fire."',
    speaker: 'shark',
  },
  {
    id: 4,
    label: 'Panel 5',
    objectPositionX: '0%',
    objectPositionY: '100%',
    dialogue: '"Then a package arrived, and she thought I got her a present. It was my new putter."',
    speaker: 'shark',
  },
  {
    id: 5,
    label: 'Panel 6',
    objectPositionX: '33.33%',
    objectPositionY: '100%',
    dialogue: '"None of that makes me angry." — "Oh, well."',
    speaker: 'crab',
  },
  {
    id: 6,
    label: 'Panel 7',
    objectPositionX: '66.67%',
    objectPositionY: '100%',
    dialogue: '"Your wife must be furious."',
    speaker: 'crab',
  },
  {
    id: 7,
    label: 'Panel 8',
    objectPositionX: '100%',
    objectPositionY: '100%',
    dialogue: '"She\'s fit to be tied."',
    speaker: 'shark',
  },
];

export const TOTAL_PANELS = comicPanels.length;
