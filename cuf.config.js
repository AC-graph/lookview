
const fs = require('fs');
const path = require('path');

module.exports = {

    // 当前配置文件的相对路径上下文
    path: __dirname,

    // package.json路径
    pkg: '.',

    // 注册任务
    task(cuf, pkg, rootPath) {

        let banner = `
/*!
* lookview - ${pkg.description}
* https://github.com/AC-graph/lookview
*
* Includes image2D.js
* https://yelloxing.gitee.io/image2d
* 
* author ${pkg.author}
*
* version ${pkg.version}
* 
* build Fri Sep 04 2020
*
* Copyright 心叶
* Released under the ${pkg.license} license
* 
* Date:${new Date()}
*/
        `;

        [
            path.join(rootPath, './dist/lookview.js'),
            path.join(rootPath, './dist/lookview.min.js')
        ].forEach(targetPath => {

            fs.writeFileSync(targetPath, banner + "\n" + fs.readFileSync(targetPath));

        });

    }
};