var fs = require('fs');
var path = require('path')

var RollingLog = function(options) {
    this.options = options;
};

RollingLog.prototype.write = function(message) {
    var file = this.currentLogFile();

    if (fs.existsSync(file) && this.isFull(file)) {
        this.rollNow();
    }

    var fileWriter = new(require('./file.output'))(file);
    fileWriter.write(message);
};

RollingLog.prototype.currentLogFile = function() {
    var candidate = 1;
    var file = this.buildFileName(candidate);
    while (fs.existsSync(file) && this.isFull(file) && candidate < this.options.fileCount) {
        file = this.buildFileName(++candidate);
    }
    return file;
}

RollingLog.prototype.buildFileName = function(index) {
    var current = index;
    var simulate = 10;
    while (simulate <= this.options.fileCount) {
        current = '0' + current;
        simulate = simulate * 10;
    }

    return path.join(this.options.path, 'eugene.log.' + current);
};

RollingLog.prototype.isFull = function(file) {
    var stats = fs.lstatSync(file);
    return stats.size > this.options.fileSize;
};

RollingLog.prototype.rollNow = function() {
    fs.unlinkSync(this.buildFileName(1));

    for (var index = 2; index <= this.options.fileCount; index++) {
        fs.renameSync(this.buildFileName(index), this.buildFileName(index - 1));
    }
};

module.exports = RollingLog;
