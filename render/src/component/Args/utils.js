
import React from 'react';
import { Popover } from 'antd';

import { data } from '../../utils';

import ConLattice from '../../static/docPics/con-lattice.png';
import ConRhop0 from '../../static/docPics/con-rhop0.png';
import ConHswl from '../../static/docPics/con-hswl.png';
import ConGamma from '../../static/docPics/con-gamma.png';
import ConSpeedSystem from '../../static/docPics/con-speedsystem.png';
import ConCoefSound from '../../static/docPics/con-coefsound.png';
import ConSpeedSound from '../../static/docPics/con-speedsound.png';
import ConCoefh1 from '../../static/docPics/con-coefh1.png';
import ConCoefh2 from '../../static/docPics/con-coefh2.png';
import ConCflnumber from '../../static/docPics/con-cflnumber.png';



const { remote } = window.require('electron');
const { dialog } = remote.require('electron');
const { fileTypes } = data;



function importFile() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
      title: '导入外部模型',
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: '外部模型', extensions: fileTypes }
      ]
    }, resolve);
  })
}

const genConDocs = (arg) => {
  const { name, displayName } = arg;
  switch (name) {
    case 'lattice': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <div>
              <p>指定要创建粒子的网格类型(单点的例子数量)</p>
              <img src={ConLattice} />
            </div>
          </div>
        )}
        title={displayName || name}>
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'rhop0': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <div>
              <p>流体的参考密度, 单位: kg/m^3</p>
              <img src={ConRhop0} />
            </div>
          </div>
        )}
        title={displayName || name}>
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'hswl': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <div>
              <p>使用coefsound来计算声速的最大静止水位, 单位: 米(m)</p>
              <img src={ConHswl} />
            </div>
          </div>
        )}
        title={displayName || name}>
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'gamma': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>状态方程中水的多变常数</p>
            <img src={ConGamma} />
          </div>
        )}
        title={displayName || name}>
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'speedsystem': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>最大系统速度（默认使用dam-break传播）</p>
            <img src={ConSpeedSystem} />
          </div>
        )}
        title={displayName || name}>
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'coefsound': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>系数乘以速度系统</p>
            <img src={ConCoefSound} />
          </div>
        )}
        title={displayName || name}>
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'speedsound': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>在模拟中使用的声音速度（默认speedofsound = coefsound * speedsystem）</p>
            <img src={ConSpeedSound} />
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'coefh': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>计算平滑长度的系数（h = coefh * sqrt（3 * dp ^ 2））</p>
            <p>一般设置为1。设为1.2或1.5可以更有利于波的传播。</p>
            <img src={ConCoefh1} />
            <img src={ConCoefh2} />
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'cflnumber': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>乘以dt的系数</p>
            <img src={ConCflnumber} />
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    default: return (
      <p className="args-item-name">{arg.displayName || arg.name}:</p>
    );
  }
};

const genParamsDocs = (p) => {
  const {name, displayName} = p;
  switch (name) {
    case 'PosDouble': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>粒子相互作用的精度</p>
            <ul>
              <li>Simple：使用位置变量的简单精度执行粒子相互作用, 当“dp”远小于容器的的大小时建议使用</li>
              <li>Double: 使用位置变量的双精度执模拟粒子相互作用，但最终位置使用单精度进行存储</li>
              <li>Uses and saves double: 使用位置变量的双精度执模拟粒子相互作用并进行存储</li>
            </ul>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'StepAlgorithm': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>单步算法</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'VerletSteps': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>Verlet算法中应用Euler时间步的步数</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'Kernel': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>内核算法</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'ViscoTreatment': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>粘度配方</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'Visco': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>粘度值</p>
            <p>推荐近似无旋流量的值0.01</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'ViscoBoundFactor': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>乘以粘度值的系数</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'DeltaSPH': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>DeltaSPH值</p>
            <p>一般为0.1，设为0时禁用</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'Shifting': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>移动模式</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'ShiftCoef': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>移位计算系数</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'ShiftTFS': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>检测自由表面的阈值</p>
            <p>对于2D，通常为1.5;</p>
            <p>对于3D，通常为2.75;</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'RigidAlgorithm': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>刚性算法</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'FtPause': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>在模拟开始时冻结浮动的时间</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'CoefDtMin': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>计算最小时间步的系数</p>
            <p>dtmin = coefdtmin * h / speedsound</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'DtIni': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>初始时间步长（默认为 h / speedsound）</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'DtMin': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>最小时间步长（默认为 coefdtmin * h / speedsound）</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'DtAllParticles': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>用于计算DT的粒子速度</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'TimeMax': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>模拟的时间</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'PartsOutMax': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>允许从容器中排除流体粒子的百分比</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'RhopOutMin': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>最小有效rhop值</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    case 'RhopOutMax': return (
      <Popover
        mouseEnterDelay={0.5}
        content={(
          <div className="doc">
            <p>最大有效rhop值</p>
          </div>
        )}
        title={displayName || name}
      >
        <p className="args-item-name">{displayName || name}:</p>
      </Popover>
    );
    default: return (
      <span className="args-item-name">{displayName || name}:</span>
    );
  }
};


export {
  importFile,
  genConDocs,
  genParamsDocs
}
