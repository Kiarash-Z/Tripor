const predefinedDevices = [
  {
    name: 'Web',
    icon: 'tripor-computer',
    width: 1080,
    height: 1440,
    isSelected: true,
    id: 0,
  },
  {
    name: 'IPhone X',
    icon: 'tripor-mobile',
    width: 375,
    height: 812,
    isSelected: false,
    id: 1,
  },
  {
    name: 'One Plus 5T',
    width: 750,
    icon: 'tripor-mobile',
    height: 1300,
    isSelected: false,
    id: 2,
  },
  {
    name: 'Galaxy Note 8',
    icon: 'tripor-mobile',
    width: 900,
    height: 1750,
    isSelected: false,
    id: 3,
  },
  {
    name: 'Custom',
    icon: 'tripor-settings',
    width: 1000,
    height: 1000,
    isSelected: false,
    isCustom: true,
    id: 4,
  },
];

const projectDefaultName = 'Untitled';

export { predefinedDevices, projectDefaultName };
