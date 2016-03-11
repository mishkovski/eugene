var expect = require('chai').expect;
var eugene = require('./lib/eugene');

describe('Eugene', function() {

    beforeEach(function() {
        eugene.output = require('./support/in.memory.output')();
        eugene.renderer = require('./support/render.only.the.message');;
    });

    it('accepts strings', function() {
        eugene.log('this category', 'will be logged');

        expect(eugene.output.messages).to.deep.equal(['will be logged']);
    });

    it('accepts options', function() {
        eugene.log({ category:'this category', message:'will be logged' });

        expect(eugene.output.messages).to.deep.equal(['will be logged']);
    });

    it('priorited string-based message', function() {
        eugene.log({ category:'this category', message: 'will not be logged' }, 'will be logged');

        expect(eugene.output.messages).to.deep.equal(['will be logged']);
    });

    it('delegates actual writing to the given output', function() {
        var sinon = require('sinon');
        require('chai').use(require('sinon-chai'));
        eugene.output = { write: sinon.spy() };
        eugene.log('Yoda', 'Your father he is');

        expect(eugene.output.write).to.have.been.calledWith('Your father he is', 'Yoda');
    });
});