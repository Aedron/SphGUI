
module.exports = [
  {
    name: 'lattice',
    value: [1, 1],
    options: ['bound', 'fluid'],
    displayOptions: ['边界', '流体']
  },
  {
    name: 'gravity',
    displayName: '重力加速度',
    value: [0, 0, -9.81],
    unit: 'm/s^2'
  },
  {
    name: 'rhop0',
    displayName: '流体参考密度',
    value: 1000,
    unit: 'kg/m^3'
  },
  {
    name: 'hswl',
    value: 0,
    auto: true,
    unit: 'metres (m)'
  },
  {
    name: 'gamma',
    value: 7,
  },
  {
    name: 'speedsystem',
    value: 0,
    auto: true,
  },
  {
    name: 'coefsound',
    value: 20,
  },
  {
    name: 'speedsound',
    value: 0,
    auto: true,
  },
  {
    name: 'coefh',
    value: 1.0,
  },
  {
    name: 'cflnumber',
    value: 0.2,
  },
  {
    name: 'b',
    value: 1.1200e+05,
    auto: false,
  }
];
