const assert = require('assert');

import { add,muti } from '../add';

it('1 + 1 = 2?', function (){
  assert.equal(add(1,1), 2);
})

it('2 * 1 = 2?', function (){
  assert.equal(muti(2,1), 2);
})