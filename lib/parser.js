const babylon = require('babylon');
const fs = require('fs');
const {transformFromAst} = require('@babel/core')
const babelTraverse = require('babel-traverse').default
module.exports = {
    getAST:(path)=>{
        const source =  fs.readFileSync(path,'utf-8');
        return babylon.parse(source,{
            sourceType:'module'
        })
    },
    getDeps:(ast)=>{
        const deps = [];
        babelTraverse(ast,{
            ImportDeclaration:({node})=>{
                deps.push(node.source.value);
            }
        })
        return deps;
    },
    transformFromAst:(ast)=>{
        const {code} = transformFromAst(ast,null,{
            presets:['@babel/preset-env']
        })
        return code;
    }
}