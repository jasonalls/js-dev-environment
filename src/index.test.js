import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

const { JSDOM } = jsdom;

describe('Our first test', function() {
  it('should pass', function() {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('should say hello', (done) => {
    const index = fs.readFileSync('./src/index.html')
    const { document } = (new JSDOM(index)).window;
    const h1 = document.getElementsByTagName('h1')[0];
    expect(h1.innerHTML).to.equal("Hello World!");
    done();
    document.close();
  });
});
