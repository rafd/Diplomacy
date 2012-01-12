// (c) 2011 Daniel Stocks
// hedgehog may be freely distributed under the MIT license.
// For all details and documentation:
// https://github.com/danielstocks/hedgehog

var
  hogan = require('hogan.js'),
  mkdirp = require('mkdirp').mkdirp,
  fs = require('fs'),
  watcher = require('watch-tree'),
  // The directory from where the script is run
  pwd = process.cwd() + "/";

function Hedgehog(options) {

  var self = this;

  // Options can be configured
  // but they all have sensible defaults
  self.options = options || {};
  self.conf = {}
  self.setup({
    namespace : 'window.T',
    input_path : './templates',
    output_path : './templates/compiled',
    output_file : null,
    extension : '.mustache'
  });

  // Initialize watchTree utility
  var watch = watcher.watchTree(pwd + self.conf.input_path, {
    'sample-rate' : 30
  });

  // Listen for a file modified event
  watch.on('fileModified', function(path, stats) {
    // Exit if it's not a "template" file that changed
    if(path.split(".").pop() != self.conf.extension.substr(1)) {
      return;
    }

    // Read all files, compile and package together

    fs.readdir(pwd + self.conf.input_path, function(e, files){
      var files_to_use = [];
      files.forEach(function(path){
        if(path.length > 0 && path.split(".").pop() == self.conf.extension.substr(1)){
          files_to_use.push(pwd + self.conf.input_path + "/" + path);
        }
      });
      self.compile(files_to_use);
    });
  });
}

Hedgehog.prototype = {

  _setOption: function(option, def) {
    this.conf[option] = (typeof this.options[option] == "undefined") ? def : this.options[option];
  },

  setup: function(defaults) {
    var self = this;
    Object.keys(defaults).forEach(function(key) {
      self._setOption(key, defaults[key]);
    });
  },

  filesToProcess: 0,
  finalOutput: "",

  addToFinalOutput: function(path, data){
    var self = this;

    var compiled = hogan.compile(data.toString(), {asString: true});
    var relative_path = path.substr(pwd.length + self.conf.input_path.length);
    var template_path = relative_path.replace(self.conf.extension, '').substr(1);
    var output = 
      self.conf.namespace + '["' + template_path + '"] = new HoganTemplate();\n'
      + self.conf.namespace + '["' + template_path + '"].r = ' + compiled + '\n';

    self.finalOutput += output;

    self.filesToProcess -= 1;

    if(self.filesToProcess == 0){
      self.finalize();
    }

  },

  compile: function(files) {
    var self = this;
    self.filesToProcess = files.length;
  
    files.forEach(function(path){
      var path = path;
      fs.readFile(path, function(e, data){
        if (e) throw e;
        self.addToFinalOutput(path, data);
      });
    });

  },

  finalize: function() {
    var self = this;
    self.finalOutput = '(function() {\n'
          + self.conf.namespace + ' = ' + self.conf.namespace + ' || {};\n'
          + self.finalOutput
          + '\n})();';

    fs.writeFile(pwd + self.conf.output_file, self.finalOutput, function (e) {
      if (e) throw e;
      self.finalOutput = "";
      console.log('Compiled and saved: ' + self.conf.output_file);
    });
  }
}

// Export the hedgehog constructor for Node.js and CommonJS.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Hedgehog;
} else if (typeof exports !== 'undefined') {
  exports.Hedgehog = Hedgehog;
}
