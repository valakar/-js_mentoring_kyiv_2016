import Foo from './hello.js';

describe('ES6 Foo', function () {

    let foo;

    beforeEach(()=>{
        console.log('test');
        foo = new Foo();
    });

    it('should return Do Something when calling doSomething', ()=>{
        console.log('test2');
        foo.doSomething().should.be.equal('Do Something1');
    });
});