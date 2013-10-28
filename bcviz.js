var START_TIME = "Start Time";
var END_TIME = "End Time";
var ACTIVITY = "Activity";
var DURATION = "Duration (min)";

var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

var bcDateTimeToDate = function(bcDateTime) {
  return bcDateTime.substring(0, 10);
}

var splitIntervalAtMidnight = function(interval) {
  var startEpochDays = Math.floor(interval.start.getTime() / MILLIS_PER_DAY);
  var endEpochDays = Math.floor(interval.end.getTime() / MILLIS_PER_DAY);
  if (startEpochDays == endEpochDays) {
    return new Array(interval);
  }
  if (endEpochDays - startEpochDays == 1) {
    var startEnd = new Date(interval.start);
    startEnd.setHours(23);
    startEnd.setMinutes(59);
    startEnd.setSeconds(59);
    startEnd.setMilliseconds(999);
    var endStart = new Date(interval.end);
    endStart.setHours(0);
    endStart.setMinutes(0);
    endStart.setSeconds(0);
    endStart.setMilliseconds(0);
    return new Array({start: interval.start, end: startEnd},
		     {start: endStart, end: interval.end});
  }
}

var splitIntervalOnDay = function(start, end, callback) {
  var startDay = start.getTime() / MILLIS_PER_DAY;
  var endDay = start.getTime() / MILLIS_PER_DAY;
  if (startDay === endDay) {
    callback(start, end);
  } else if (endDay - startDay == 1) {
    callback(Date.parse(start), Date.parse(endDay));
    callback(Date.parse(endDay), Date.parse(end));
  } else {
    console.log('Too many days!');
  }
}

var dateToTime = function(date) {
  console.log(date);
  var timeOfDay = new Date(date.getTime() % MILLIS_PER_DAY);
  console.log(timeOfDay);
  return timeOfDay;
}

var addCsvEntryToTable = function(maradata, dataTable) {
  var activity = maradata[ACTIVITY];
  if (activity !== 'Sleep') {
    return;
  }
  var startTime = maradata[START_TIME];
  var endTime = maradata[END_TIME];
  
  var startDate;
  var endDate;
  // TODO(eerbiceanu): set startDate and endDate
  // and do anything else that needs to be done here.
  
  dataTable.addRow([bcviz.bcDateTimeToDate(startTime),
                    activity,
                    startDate, endDate])
}

if (typeof exports == 'undefined') {
  var exports = this['bcviz'] = {};
}
exports.bcDateTimeToDate = bcDateTimeToDate;
exports.splitIntervalOnDay = splitIntervalOnDay;
exports.dateToTime = dateToTime;
exports.addCsvEntryToTable = addCsvEntryToTable;
exports.splitIntervalAtMidnight = splitIntervalAtMidnight;
