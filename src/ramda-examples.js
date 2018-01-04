/* eslint-disable */
import R, {map} from 'ramda';
 
const position = Object.freeze({ x: 5, y: 9 });
var isString = R.is(String);

window.onload = function()  {
    console.log(`Your position is: ${position.x}, ${position.y}`);
    console.log(`'foo' isString: ${isString('foo')}`)
}