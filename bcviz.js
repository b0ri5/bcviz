var bcDateTimeToDate = function(bcDateTime) {
  return bcDateTime.substring(0, 10);
}

if(typeof exports == 'undefined'){
    var exports = this['bcviz'] = {};
}
exports.bcDateTimeToDate = bcDateTimeToDate;
