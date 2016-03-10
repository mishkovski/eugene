var expect = require('chai').expect;
var eugene = require('./lib/eugene');

describe('Eugene', function() {

    beforeEach(function() {
        eugene.output = require('./support/in.memory.output')();
        eugene.logAllCategories();
    });

    it('has a default renderer', function() {
        expect(eugene.renderer).not.to.equal(undefined);
    });

    it('uses renderer when logging messages', function() {
        eugene.renderer = function(category, message) {
            return category + ": " + message;
        };
        eugene.log('Yoda', 'your father he is');

        expect(eugene.output.messages).to.deep.equal(['Yoda: your father he is']);
    });
});
