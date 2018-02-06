const tools = [
  {
    name: 'Move',
    icon: 'tripor-cursor',
    shortcutKey: 'V',
    isSelected: true,
    id: 0,
  },
  {
    name: 'Frame',
    icon: 'tripor-frame',
    shortcutKey: 'F',
    id: 1,
  },
  {
    name: 'Shape',
    isOpen: false,
    children: [
      {
        name: 'Rectangle',
        shortcutKey: 'R',
        icon: 'tripor-square',
        id: 0,
      },
      {
        name: 'Ellipse',
        shortcutKey: 'O',
        icon: 'tripor-circle',
        id: 1,
      }
    ],
    id: 2,
  },
  {
    name: 'Text',
    icon: 'tripor-text',
    shortcutKey: 'T',
    id: 3,
  },
  {
    name: 'Hand',
    icon: 'tripor-hand',
    shortcutKey: 'Space',
    id: 4,
    size: '1.1em',
  },
];


export { tools };
