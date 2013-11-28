var START_TIME = "Start Time";
var END_TIME = "End Time";
var ACTIVITY = "Activity";
var DURATION = "Duration (min)";

var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

var dateToDisplayDate = function(date) {
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

var splitIntervalAtMidnight = function(interval) {
  var dayAfterStart = new Date(interval.start.getTime() + MILLIS_PER_DAY);
  dayAfterStart.setHours(0);
  dayAfterStart.setMinutes(0);
  dayAfterStart.setMilliseconds(0);
  var endDay = new Date(interval.end);
  endDay.setHours(0);
  endDay.setMinutes(0);
  endDay.setMilliseconds(0);
  if (dayAfterStart.getTime() !== endDay.getTime()) {
    return new Array(interval);
  } else {
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
  var startDate = new Date(maradata[START_TIME]);
  var endDate = new Date(maradata[END_TIME]);
  var interval = {start: startDate, end: endDate};
  var splitIntervals = bcviz.splitIntervalAtMidnight(interval);
  console.log("For " + startDate + " to " + endDate + " we have " + splitIntervals.length + " subintervals");
  console.log(splitIntervals);
  for (var i = 0; i < splitIntervals.length; i++) {
    var subinterval = splitIntervals[i];
    console.log(subinterval);
    var displayDate = bcviz.dateToDisplayDate(subinterval.start);
    var startTime = bcviz.stripToHoursAndMinutes(subinterval.start);
    var endTime = bcviz.stripToHoursAndMinutes(subinterval.end);
    console.log("For " + displayDate + " adding " + startTime + " to " + endTime + 
        "which came from " + startDate + " to " + endDate);
    if (endTime < startTime) {
      console.log("Ignoring this one, Greg probably input it badly");
      continue;
    }
    dataTable.addRow([displayDate, activity, startTime, endTime]);
  }

}

var normalizeToHoursAndMinutes = function(date) {
  var normalized = new Date(date);
  normalized.setFullYear(2013);
  normalized.setMonth(7);
  normalized.setDate(29);
  return normalized;
}

var sortCsvObjectArray = function (csv) {
  return csv.sort(function(a, b) {
    return new Date(a[START_TIME]).getTime() - new Date(b[START_TIME]).getTime();
  });
}

var mergeSortedCsvObjectArrays = function(csvA, csvB) {
  return csvA
}

if (typeof exports == 'undefined') {
  var exports = this['bcviz'] = {};
}

exports.START_TIME = START_TIME;

exports.addCsvEntryToTable = addCsvEntryToTable;
exports.dateToDisplayDate = dateToDisplayDate;
exports.dateToTime = dateToTime;
exports.mergeSortedCsvObjectArrays = mergeSortedCsvObjectArrays;
exports.sortCsvObjectArray = sortCsvObjectArray;
exports.splitIntervalAtMidnight = splitIntervalAtMidnight;
exports.stripToHoursAndMinutes = normalizeToHoursAndMinutes;

