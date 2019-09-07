(function(modules){
            function r( filename ){
                var fn = modules[filename];
                var module = { exports : {}};

                fn(r,module,module.exports)
                return module.exports
            }
            r('/Users/prief/i/vscode/simplepack/src/index.js')
        })( {'/Users/prief/i/vscode/simplepack/src/index.js': function(require,module,exports){ "use strict";

var _hello = require("./hello.js");

document.write((0, _hello.hello)('cpf')); },'./hello.js': function(require,module,exports){ "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hello = hello;

function hello(name) {
  return 'hello' + name;
} },})