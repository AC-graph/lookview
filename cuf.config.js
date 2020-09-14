
const fs = require('fs');
const path = require('path');

module.exports = {

    // 当前配置文件的相对路径上下文
    path: __dirname,

    // package.json路径
    pkg: '.',

    // 注册任务
    task: {

        // 添加打包后的banner
        banner: function (cuf, pkg, rootPath) {

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

        },

        // 复制依赖库的types
        types: function (cuf, pkg, rootPath) {

                cuf.copySync(
                    path.join(rootPath, './node_modules/image2d/types'),
                    path.join(rootPath, './types/image2d'),
                    true
                );

        }

    }

};