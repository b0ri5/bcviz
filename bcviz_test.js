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
    it('does not split if same day', function(){
      var interval = {start: new Date("2013-10-05 16:14"), end: new Date("2013-10-05 18:06")};
      var intervals = bcviz.splitIntervalAtMidnight(interval);
      assert.equal(1, intervals.length);
      assert.deepEqual(intervals[0], interval);
    })
    it('splits if different days', function(){
      var interval = {start: new Date("2013-10-05 23:07"), end: new Date("2013-10-06 00:24")};
      var intervals = bcviz.splitIntervalAtMidnight(interval);
      assert.equal(2, intervals.length);
    })
  })
})

describe('bcviz', function(){
  describe('#stripToHoursAndMinutes()', function(){
    it('normalizes with respect to year/month/day', function(){
      assert.deepEqual(
          bcviz.stripToHoursAndMinutes(new Date("2013-10-12 12:34")),
          bcviz.stripToHoursAndMinutes(new Date("2013-10-10 12:34")));
      assert.deepEqual(
          bcviz.stripToHoursAndMinutes(new Date("2011-10-12 12:34")),
          bcviz.stripToHoursAndMinutes(new Date("2013-11-10 12:34")));
      assert.notDeepEqual(
          bcviz.stripToHoursAndMinutes(new Date("2013-10-12 12:34")),
          bcviz.stripToHoursAndMinutes(new Date("2013-10-10 12:35")));
      
    })
  })
})

describe('bcviz', function(){
  describe('#sortCsvObjectArray()', function(){
    it('does not modify a sorted array', function(){
      var objA = {};
      var objB = {};
      objA[bcviz.START_TIME] = '11/2/2013 07:20';
      objB[bcviz.START_TIME] = '11/1/2013 07:20';
      var csv = [objA, objB];
      assert.deepEqual(csv, bcviz.sortCsvObjectArray(csv));
    })
    it('sorts an unsorted array', function(){
      var objA = {};
      var objB = {};
      objA[bcviz.START_TIME] = '11/1/2013 07:20';
      objB[bcviz.START_TIME] = '11/2/2013 07:20';
      var csv = [objA, objB];
      assert.deepEqual([objB, objA], bcviz.sortCsvObjectArray(csv));
    })
  })
})
