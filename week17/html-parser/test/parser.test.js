const assert = require('assert');

import { parseHTML } from '../src/parser';

describe('parser html: ', () => {
  it('<a></a>', () => {
    let tree = parseHTML('<a></a>');
    
    assert.equal(tree.children[0].tagName,'a');
    assert.equal(tree.children[0].children.length,0);
  })

  it('<a href="http://www.baidu.com"></a>', () => {
    let tree = parseHTML('<a href="http://www.baidu.com"></a>');
    
    assert.equal(tree.children[0].children.length, 0);
    assert.equal(tree.children.length, 1);
  })

  it('<a href></a>', () => {
    let tree = parseHTML('<a href></a>');
    
    assert.equal(tree.children[0].children.length, 0);
    assert.equal(tree.children.length, 1);
  })

  it('<a href id></a>', () => {
    let tree = parseHTML('<a href id></a>');
    
    assert.equal(tree.children[0].children.length, 0);
    assert.equal(tree.children.length, 1);
  })

  it('<a href="abc" id></a>', () => {
    let tree = parseHTML('<a href="abc" id></a>');
    
    assert.equal(tree.children[0].children.length, 0);
    assert.equal(tree.children.length, 1);
  })

  it('<a href="abc" id=abc></a>', () => {
    let tree = parseHTML('<a href="abc" id=abc></a>');
    
    assert.equal(tree.children[0].children.length, 0);
    assert.equal(tree.children.length, 1);
  })

  it('<a id=abc />', () => {
    let tree = parseHTML('<a id=abc />');
    
    assert.equal(tree.children.length, 0);
  })

  it('<a id=\'abc\' />', () => {
    let tree = parseHTML('<a id=\'abc\' />');
    
    assert.equal(tree.children.length, 0);
  })

  it('<a />', () => {
    let tree = parseHTML('<a />');
    
    assert.equal(tree.children.length, 0);
  })

  it('<A /> upper case', () => {
    let tree = parseHTML('<A />');
    assert.equal(tree.children.length, 0);
  })

  it('<>', () => {
    let tree = parseHTML('<>');
    console.log(tree);
    assert.equal(tree.children.length, 0);
    // assert.equal(tree.children[0].type, 'text');
  })
})