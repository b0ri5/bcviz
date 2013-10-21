var START_TIME = "Start Time";
var END_TIME = "End Time";
var ACTIVITY = "Activity";
var DURATION = "Duration (min)";

var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

var bcDateTimeToDate = function(bcDateTime) {
  return bcDateTime.substring(0, 10);
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

var addCsvEntryToTable(maradata, dataTable) {
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
