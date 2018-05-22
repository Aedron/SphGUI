
module.exports = [
  {
    name: 'PosDouble',
    value: 0,
    disable: false,
    options: {
      0: 'Simple',
      1: 'Double',
      2: 'Uses and saves double'
    }
  },
  {
    name: 'StepAlgorithm',
    value: 1,
    disable: false,
    options: {
      0: 'Verlet',
      1: 'Symplectic'
    }
  },
  {
    name: 'VerletSteps',
    value: 40,
    disable: false,
  },
  {
    name: 'Kernel',
    value: 2,
    disable: false,
    options: {
      1: 'Cubic Spline',
      2: 'Wendland'
    }
  },
  {
    name: 'ViscoTreatment',
    value: 1,
    disable: false,
    options: {
      1: 'Artificial (人造)',
      2: 'Laminar + SPS (层流 + SPS)'
    }
  },
  {
    name: 'Visco',
    value: 0.01,
    disable: false,
  },
  {
    name: 'ViscoBoundFactor',
    value: 1,
    disable: false,
  },
  {
    name: 'DeltaSPH',
    value: 0,
    disable: false,
  },
  {
    name: 'Shifting',
    value: 0,
    disable: true,
    options: {
      0: '无',
      1: 'Ignore bound (忽略绑定)',
      2: 'Ignore fixed (忽略固定)',
      3: 'Full (不忽略)'
    }
  },
  {
    name: 'ShiftCoef',
    value: -2,
    disable: true,
  },
  {
    name: 'ShiftTFS',
    value: 0,
    disable: true,
  },
  {
    name: 'RigidAlgorithm',
    value: 1,
    disable: false,
    options: {
      1: 'SPH',
      2: 'DEM'
    }
  },
  {
    name: 'FtPause',
    value: 0,
    disable: false,
    unit: 'seconds'
  },
  {
    name: 'CoefDtMin',
    value: 0.05,
    disable: false,
  },
  {
    name: 'DtIni',
    value: 0.0001,
    disable: true,
    unit: 'seconds'
  },
  {
    name: 'DtMin',
    value: 0.00001,
    disable: true,
    unit: 'seconds'
  },
  {
    name: 'DtFixed',
    value: 'DtFixed.dat',
    disable: true,
  },
  {
    name: 'DtAllParticles',
    value: 0,
    disable: false,
    options: {
      0: '仅流体/浮动',
      1: '全部'
    }
  },
  {
    name: 'TimeMax',
    value: 5,
    disable: false,
    unit: 'seconds'
  },
  {
    name: 'TimeOut',
    value: 0.02,
    disable: false,
    unit: 'seconds'
  },
  {
    name: 'IncZ',
    value: 0.2,
    disable: false,
    unit: 'decimal'
  },
  {
    name: 'PartsOutMax',
    value: 1,
    disable: false,
    unit: 'decimal'
  },
  {
    name: 'RhopOutMin',
    value: 700,
    disable: false,
    unit: 'kg/m^3'
  },
  {
    name: 'RhopOutMax',
    value: 1300,
    disable: false,
    unit: 'kg/m^3'
  }
];
