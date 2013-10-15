var bcviz = require('./bcviz');
var assert = require('assert');

describe('bcviz', function(){
  describe('#bcDateTimeToDate()', function(){
    it('should only return the date', function(){
      assert.equal("2013-10-10", bcviz.bcDateTimeToDate("2013-10-10 10:46"));
    })
  })
})