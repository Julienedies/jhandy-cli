/**
 * 生成通达信自定义数据
 * Created by j on 18/8/13.
 */

import fs from 'fs'
import path from 'path'
import iconv from 'iconv-lite'

import jo from './jsono'

/**
 * 创建自定义数据文件
 * @param prop {String}
 * @param index {Number}
 * @param csdPath {String} csd文件夹路径
 * @param tempFile {String} 临时使用的通达信自定义数据文件
 * @param stocks {Array} stocks list
 */
function createPropFile (prop, index, csdPath, tempFile, stocks) {

    let propFile = path.resolve(csdPath, `./${ prop }.txt`);

    let result = '';

    stocks.forEach(function (arr, i) {
        let code = arr[0];
        // 通达信自定义数据格式：北证以2标志、上证以1标志、深证以0标志；
        let szh = /^[6]/.test(code) ? 1 : /^[9]/.test(code) ? 2 : 0;
        let sjo = jo(path.resolve(csdPath, `./s/${ code }.json`));
        let _get = (name) => sjo.get(name) || '';
        let text = '';
        let SPC = '  ';

        console.log(arr[0], arr[1]);

        if (!sjo.json.code) {
            return console.log(`${ arr[0] } : ${ arr[1] } is {}`);
        }

        switch (prop) {
            case '概念':
                text = _get('概念').replace(/[，]/img, '  ') + SPC + _get('行业').replace(/^.+[—]/, '-') + SPC;
                break;
            case '概念x':
                text = _get('概念x').replace(/[&]/img, '-');
                break;
            case '概念y':
                text = _get('概念y').replace(/[-]\d+[%]/img, SPC);
                break;
            case '产品':
                text = _get('产品').replace(/[、]/img, SPC);
                break;
            case '业务':
                text = _get('业务') + SPC;
                break;
            case '概念详情':
                text = Object.keys(_get('概念详情')).join(SPC);
                break;
            default:  // 对应 =>  '全名', '备注', '概念z'
                text = _get(prop) + SPC;
        }
        result += [szh, code, index, text, '0.000'].join('|') + '\r\n';
    });

    // 创建单个自定义数据文件
    fs.writeFileSync(propFile, result);
    // 合并多个自定义数据文件
    fs.writeFileSync(tempFile, result, {encoding: 'utf8', flag: 'a'});
}

/**
 * 根据csd数据创建通达信自定义数据文件
 * @param csdPath {String} csd数据目录
 * @param tdxFile {String} default: /Volumes/C/new_jyplug/T0002/signals/extern_user.txt
 * @param props {String|Array} 默认:['概念', '概念y', '产品', '业务', '全名', '备注', '概念z', '亮点', '同业', '概念x'] => 对应通达信自定义数据
 * @param [cb] {Function} 添加自定义数据项的回调函数
 */
function _tdx (csdPath, tdxFile, props = ['概念', '概念y', '产品', '业务', '全名', '备注', '概念z', '亮点', '同业', '概念x'], cb) {

    return new Promise((resolve, reject) => {

        let absolutePathReg = /^\//;
        // windows系统绝对路径并不是以/开头
        // if (!absolutePathReg.test(csdPath) || !absolutePathReg.test(tdxFile)) {
        //     let msg = '必须提供csd数据存储路径和通达信自定义数据文件路径.';
        //     console.log(msg);
        //     return reject(new Error(msg));
        // }

        let stocks = jo(path.resolve(csdPath, './stocks.json')).json;

        // 创建文件用于临时保存自定义数据, 之后读取内容写入通达信目录
        let tempFile = path.resolve(csdPath, tdxFile.split(/[/\\]/).pop());
        fs.writeFileSync(tempFile, '');

        if (typeof props === 'string') {
            props = [props];
        }

        props.forEach((prop, index) => {
            createPropFile(prop, index + 1, csdPath, tempFile, stocks);
        });

        // 只生成特定字段数据, 用于手动更新特定字段自定义数据, 譬如只更新云财经概念
        if (props.length === 1) return resolve(path.resolve(csdPath, `${ props[0] }.txt`));

        if (cb) {
            cb(tempFile, csdPath, stocks);
        }

        // 一次性更新所有自定义数据
        fs.createReadStream(tempFile)
            .pipe(iconv.decodeStream('utf8'))
            .pipe(iconv.encodeStream('GBK'))
            .pipe(fs.createWriteStream(tdxFile));

        console.log(`****数据写入 ${ tdxFile }, 通达信自定义数据更新完成****`);

        resolve(tempFile);

    });

}


export default _tdx

// tdx用于包装_tdx, 接收对象参数
export function tdx ({csdPath, tdxFile, props}) {
    return _tdx(csdPath, tdxFile, props)
}
