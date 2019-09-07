
const {getAST,getDeps,transformFromAst} = require('./parser')
const path = require('path')
const fs = require('fs')
module.exports = class Compiler {
    constructor(options){
        const {entry , output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = []
    }
    run(){
        const entryModule = this.buildModule(this.entry,true)
        this.modules.push(entryModule);
        this.modules.map((_module)=>{
            _module.deps.map((deps)=>{
                this.modules.push(this.buildModule(deps))
            })
        })
       // console.log(this.modules)
       this.emitFiles()
    }
    buildModule(filename,isEntry){
        let ast;
        if(isEntry){
            ast = getAST(filename)
        }else{
            ast = getAST(path.join(process.cwd(),'src',filename))
        }
        return {
            filename,
            deps:getDeps(ast),
            source:transformFromAst(ast)
        }
    }
    emitFiles(){
        const outputPath = path.join(this.output.path,this.output.filename)

        let modules = '';

        this.modules.map((_module)=>{
            modules += `'${ _module.filename}': function(require,module,exports){ ${_module.source} },`
        })

        const bundle = `(function(modules){
            function r( filename ){
                var fn = modules[filename];
                var module = { exports : {}};

                fn(r,module,module.exports)
                return module.exports
            }
            r('${this.entry}')
        })( {${ modules }})`;
        console.log(bundle);
        fs.writeFileSync(outputPath,bundle,'utf-8')
    }
}