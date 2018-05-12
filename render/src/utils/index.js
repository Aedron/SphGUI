
import * as hoc from './hoc';
import * as data from './data';


function genTimeLine(items) {
  let start = 0;
  return (items || []).map((item, index) => {
    if (index === 0) start = 0;
    const i = {
      ...item,
      start: start
    };
    start += i.duration;
    return i;
  });
}


export {
  hoc,
  data,
  genTimeLine
}
