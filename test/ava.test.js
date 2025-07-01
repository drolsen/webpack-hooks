const test = require('ava');
const fs = require('fs');
const path = require('path');
 
test('Basic comment injection into bundled assets', t => {
  let writeTest = true;
  const testData = fs.readFileSync(path.resolve(__dirname, '../dist/basic/test.js'), 'utf8');
  
  if (testData.toString().indexOf('THIS IS A TEST COMMENT') === -1) {
    writeTest = false;
  }

  if (writeTest) {
    t.pass();
  } else {
    t.fail();
  }
});
