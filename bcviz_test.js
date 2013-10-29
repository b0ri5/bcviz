var bcviz = require('./bcviz');
var assert = require('assert');

describe('bcviz', function(){
  describe('#dateToDisplayDate()', function(){
    it('should only return the date', function(){
      assert.equal("2013-10-10", bcviz.dateToDisplayDate(new Date("2013-10-10 23:59")));
      assert.equal("2013-10-11", bcviz.dateToDisplayDate(new Date("2013-10-11 00:00")));
    })
  })
})

describe('bcviz', function(){
  describe('#splitIntervalAtMidnight()', function(){
    it('does not modify non-midnight interval', function(){
      var interval = {start: new Date("2013-10-10 10:46"), end: new Date("2013-10-10 11:30")};
      var intervals = bcviz.splitIntervalAtMidnight(interval);
      assert.equal(1, intervals.length);
      assert.equal(interval, intervals[0]);
    })
  })
})

describe('bcviz', function(){
  describe('#splitIntervalAtMidnight()', function(){
    it('splits interval on midnight', function(){
      var interval = {start: new Date("2013-10-10 10:46"), end: new Date("2013-10-11 11:30")};
      var intervals = bcviz.splitIntervalAtMidnight(interval);
      assert.equal(2, intervals.length);

      assert.deepEqual(interval.start, intervals[0].start);
      var startEnd = intervals[0].end;
      startEnd.setSeconds(0);
      startEnd.setMilliseconds(0);
      assert.deepEqual(new Date("2013-10-10 23:59"), startEnd);

      assert.deepEqual(new Date("2013-10-11 00:00"), intervals[1].start);
      assert.deepEqual(interval.end, intervals[1].end);
    })
  })
})
