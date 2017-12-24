import './index.css';

import numeral from 'numeral';

const courseValue = numeral(1000).format('$0,0.00');
//console.log(`I would pay ${courseValue} for this awesome course!`);

window.ourFirstTest = function() {

  document.writeln(`I would pay ${courseValue} for this awesome course!`);

  return false;
}


