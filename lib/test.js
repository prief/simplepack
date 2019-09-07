const {getAST,getDeps,transformFromAst} = require('./parser')
const path = require('path')
let ast = getAST(path.join(__dirname,'../src/index.js'));
const deps = getDeps(ast);
const source = transformFromAst(ast);
console.log(source)