/**
 * Created by j on 24/3/24.
 * 选股宝概念： https://flash-api.xuangubao.cn/api/stage2/plates_by_any_stock?symbol=600973.SS&fields=core_avg_pcp,plate_name
 */

import superagent from 'superagent';

export default function (code) {

    return new Promise((resolve, reject) => {

        let code2 = code + (/^6/.test(code) ? '.SS' : '.SZ');
        let url = `https://flash-api.xuangubao.cn/api/stage2/plates_by_any_stock?symbol=${ code2 }&fields=core_avg_pcp,plate_name`;

        superagent.get(url).accept('json').end((err, res) => {
            if (err) return reject(err);

            let k = '概念x';
            let k2 = '概念xgb';

            try {
                let result = {};
                let data = res.body.data;
                if (data === undefined) {
                    console.log('没有选股宝概念', code);
                    return resolve({result, source_id: 'xgb2', code});
                }

                let map = {};
                let arr = [];
                for (let i in data) {
                    let item = data[i];
                    let plate_name = item.plate_name;
                    arr.push(plate_name);
                    map[plate_name] = item.reason;
                }


                result[k] = arr.join('   ');
                result[k2] = map;

                console.log(JSON.stringify(result, 'null', '\t'));

                resolve({result, source_id: 'xgb2', code});

            } catch (err) {
                console.log('xgb2 catch', err);
                reject(err);
            }

        });

    });
}

