const tools = [
  {
    name: 'Move',
    icon: 'tripor-cursor',
    isSelected: true,
    id: 0,
  },
  {
    name: 'Frame',
    icon: 'tripor-frame',
    id: 1,
  },
  {
    name: 'Shape',
    isOpen: false,
    children: [
      {
        name: 'Rectangle',
        icon: 'tripor-square',
        id: 0,
      },
      {
        name: 'Circle',
        icon: 'tripor-circle',
        id: 1,
      }
    ],
    id: 2,
  },
  {
    name: 'Text',
    icon: 'tripor-text',
    id: 3,
  },
  {
    name: 'Hand',
    icon: 'tripor-hand',
    id: 4,
    size: '1.1em',
  },
];


export { tools };
