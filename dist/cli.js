#!/usr/bin/env node
module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=13)}([function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("path")},function(t,e,n){"use strict";var r=n(0),o=n.n(r),c=n(1),i=n.n(c);function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}
/*!
 * Created by j on 18/11/9.
 * 把json文件包装成对象进行增删改查
 */
var s=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e=i.a.resolve(__dirname,"".concat(e)),this.jsonPath=e,o.a.existsSync(e))try{var r=o.a.readFileSync(this.jsonPath,"utf8");this.json=JSON.parse(r)}catch(t){throw new Error(t)}else this.json=n}var e,n,r;return e=t,(n=[{key:"merge",value:function(t){Object.assign(this.json,t)}},{key:"save",value:function(){o.a.writeFileSync(this.jsonPath,JSON.stringify(this.json,null,"\t"))}},{key:"get",value:function(t){if(!t)return this.json;var e=t.split(".");return function t(e,n){var r=n.shift(),o=e[r];return o&&n.length?t(e[r],n):o}(this.json,e)}},{key:"match",value:function(t){return this.get(t)}}])&&a(e.prototype,n),r&&a(e,r),t}();e.a=function(t,e){return new s(t,e)}},function(t,e){t.exports=require("iconv-lite")},function(t,e){t.exports=require("cheerio-httpcli")},function(t,e){t.exports=require("commander")},function(t,e,n){"use strict";n.d(e,"a",function(){return s});var r=n(0),o=n.n(r),c=n(3),i=n.n(c);function a(t,e,n,r){e=e||t.split(".").shift()+".json",n=(n=n||[]).map(function(t){return 1*t});var c=/\s{3,}/;return r&&(c=/[\t]+/),new Promise(function(a,s){o.a.readFile(t,function(u,l){if(u)return s(u);var f=(l=i.a.decode(l,"GBK")).split("\r\n");console.log("".concat(t,"行数是=> "),f.length);var p=1,d=[];f.forEach(function(t){var e=t.split(c);p=e.length>=p?e.length:p,d.push(e)});var h=[];d.forEach(function(t){if(p-t.length>2)return console.log("冗余行 => ",p,t.length,t.join());0===n.length?h.push(t):h.push(t.filter(function(t,e){return n.indexOf(e)>=0}))});var v=h.shift();console.log("列标题是=> ",v),console.log("有效rows length => ",h.length),r&&h.forEach(function(t){t[1]&&(t[1]=t[1].replace(/\s+/gim,"").replace("Ａ","A"))});var g=JSON.stringify(h,null,"\t");/\.js$/.test(e)&&(g="STOCKS = ".concat(g," ;")),o.a.writeFileSync(e,g),console.log("数据成功写入".concat(e,".")),a(h)})})}function s(t){return a(t.csvFile,t.jsonFile,t.cols,t.isCsdStocksJson)}e.b=a},function(t,e,n){"use strict";var r=n(1),o=n.n(r),c=n(4),i=n.n(c);var a=function(t){return t.replace(/\s+/gim,"")},s=a,u=a,l=a,f={ths_c:{url:function(t){return"http://basic.10jqka.com.cn/".concat(t,"/concept.html")},parse:function(t){var e=t("#concept table.gnContent"),n=e.find("tr td.gnName"),r=e.find("tr.extend_content"),o={};n.each(function(e){var n=s(t(this).text());o[n]=s(r.eq(e).text())});var c={"概念详情":o};return console.log(JSON.stringify(c,null,"\t")),c}},ths_new:{url:function(t){return"http://basic.10jqka.com.cn/".concat(t,"/")},parse:function(t){var e=t("#profile table"),n=e.eq(0).find("td").eq(4).text().replace("概念强弱排名：","").replace("涉及概念：","").replace("详情>>",""),r=e.eq(1).find("td").eq(3).text().replace("分类：",""),o={"概念":u(n),"分类":u(r)};return console.log(JSON.stringify(o,null,"\t")),o}},ths_p:{url:function(t){return"http://basic.10jqka.com.cn/".concat(t,"/company.html")},parse:function(t){var e=t("#detail td"),n=e.eq(1).text().replace("公司名称：",""),r=e.eq(2).text().replace("所属地域：",""),o=e.eq(4).text().replace("所属申万行业：",""),c=e.eq(7).text().replace("主营业务：",""),i=e.eq(8).text().replace("产品名称：",""),a={"全名":l(n),"地域":l(r),"行业":l(o),"业务":l(c),"产品":l(i)};return console.log(JSON.stringify(a,null,"\t")),a}},ycj:{url:function(t){return t=(/^6/.test(t)?"sh":"sz")+t,"http://www.yuncaijing.com/quote/".concat(t,".html")},parse:function(t){var e={"概念y":t(".ralate table tr").map(function(){var e=t(this).find("td a").text()||"",n=t(this).find("td small").text()||"";return e.trim()+"-"+n.trim()}).get().join("  ")};return console.log(JSON.stringify(e,null,"\t")),e}},xgb:{url:function(t){return t+=/^6/.test(t)?".SS":".SZ","https://xuangubao.cn/stock/".concat(t)},parse:function(t){var e=t(".stock-info-bkj .related-subject .related-subject-item .related-subject-item-name");return console.log(e.length,e.text()),{"概念xgb":e.map(function(){return t(this).text()||""}).get().join("  ")}}}};
/*!
 * Created by j on 18/11/25.
 * 同花顺概念页面资料解析: http://basic.10jqka.com.cn/000001/concept.html
 */i.a.set("gzip",!0),i.a.set("timeout",3e4),i.a.set("headers",{"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.34"});var p=function(t,e,n){var r=f[e];return new Promise(function(n,o){i.a.fetch(r.url(t),function(c,i,a,s){if(c)return o(c);try{var u=r.parse(i);n({result:u,source_id:e,code:t})}catch(t){o(t)}})})},d=n(2);function h(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=t[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,c=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(e,"b",function(){return x});var v,g=["ths_new","ths_p","ths_c","ycj","xgb"],m=!1,j={};function y(t,e,n,r){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(t,e){return console.log(t,e)};if(!t)throw new Error("必须提供csd数据存储路径.");if(e||(e=Object(d.a)(o.a.resolve(t,"./stocks.json")).json),"string"==typeof e&&/\.json$/.test(e)&&(e=Object(d.a)(o.a.resolve(t,e)).json),/^\d{6}$/.test(""+(n*=1)))for(var i=0;i<e.length;i++)if(1*e[i][0]===n){n=i;break}r=r||g,console.log("stocks.length is ".concat(e.length)),m=!1,function t(e,n,r,c,i){var a=e[n];if(!a)return i(j={over:!0,index:n}),console.log("fetch over, size is ".concat(n));var s=h(a,2),u=s[0],l=s[1],f=(n+1)/e.length*100;f=f.toFixed(2),f="".concat(n+1,"/").concat(e.length),i(j={name:l,code:u,index:n,progress:f});var g=r.map(function(t,e){return p(u,t,e*(Math.random()+.1)*3e3)});Promise.all(g).then(function(a){var s=Object(d.a)(o.a.resolve(c,"./s/".concat(u,".json")));s.merge({"名称":l,code:u});var f=!0,p=!1,h=void 0;try{for(var g,j=a[Symbol.iterator]();!(f=(g=j.next()).done);f=!0){var y=g.value;s.merge(y.result)}}catch(t){p=!0,h=t}finally{try{f||null==j.return||j.return()}finally{if(p)throw h}}s.save(),v=setTimeout(function(){!m&&t(e,n+1,r,c,i)},3e3*(Math.random()+.1))}).catch(function(t){console.error(t),i(j,t)})}(e,n,r,t,function(t){c(t)})}function x(t){return y(t.csdPath,t.stocks,t.index,t.sources,t.watcher)}x.stop=y.stop=function(){return console.log("clear fetch timer =>",v),clearTimeout(v),m=!0,j},x.SOURCES=y.SOURCES=g;e.a=y},function(t,e,n){"use strict";n.d(e,"b",function(){return f});var r=n(0),o=n.n(r),c=n(1),i=n.n(c),a=n(3),s=n.n(a),u=n(2);function l(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:["概念","概念y","产品","业务","全名","备注","概念z"],r=arguments.length>3?arguments[3]:void 0;return new Promise(function(c,a){var l=/^\//;if(!l.test(t)||!l.test(e)){var f="必须提供csd数据存储路径和通达信自定义数据文件路径.";return console.log(f),a(new Error(f))}var p=Object(u.a)(i.a.resolve(t,"./stocks.json")).json,d=i.a.resolve(t,e.split(/[\/\\]/).pop());if(o.a.writeFileSync(d,""),"string"==typeof n&&(n=[n]),n.forEach(function(e,n){!function(t,e,n,r,c){var a=i.a.resolve(n,"./".concat(t,".txt")),s="";c.forEach(function(r,o){var c=r[0],a=/^6/.test(c)?1:0,l=Object(u.a)(i.a.resolve(n,"./s/".concat(c,".json"))),f=function(t){return l.get(t)||""},p="";if(console.log(r[0],r[1]),!l.json.code)return console.log("".concat(r[0]," : ").concat(r[1]," is {}"));switch(t){case"概念":p=f("概念").replace(/[，]/gim,"  ")+"  "+f("行业").replace(/^.+[—]/,"-")+"  "+f("概念z")+"  ";break;case"概念y":p=f("概念y").replace(/[-]\d+[%]/gim,"  ");break;case"产品":p=f("产品").replace(/[、]/gim,"  ");break;case"业务":p=f("业务")+"  ";break;default:p=f(t)+"  "}s+=[a,c,e,p,"0.000"].join("|")+"\r\n"}),o.a.writeFileSync(a,s),o.a.writeFileSync(r,s,{encoding:"utf8",flag:"a"})}(e,n+1,t,d,p)}),1===n.length)return c(i.a.resolve(t,"".concat(n[0],".txt")));r&&r(d,t,p),o.a.createReadStream(d).pipe(s.a.decodeStream("utf8")).pipe(s.a.encodeStream("GBK")).pipe(o.a.createWriteStream(e)),console.log("****数据写入 ".concat(e,", 通达信自定义数据更新完成****")),c(d)})}function f(t){return l(t.csdPath,t.tdxFile,t.props)}e.a=l},function(t,e,n){
/*!
 * Created by j on 18/9/14.
 */
var r=n(0),o=n(1);t.exports=function(t,e){var n=r.statSync(t);n.isFile()?e(t):n.isDirectory()&&function t(e,n){r.readdir(e,function(c,i){c?console.error(c):i.forEach(function(c){var i=o.join(e,c);r.stat(i,function(e,r){if(e)console.error("获取文件stats失败");else{var o=r.isFile(),c=r.isDirectory();o&&n(i),c&&t(i,n)}})})})}(t,e)}},function(t,e){t.exports=require("cheerio")},function(t,e){t.exports=require("chardet")},,function(t,e,n){"use strict";n.r(e);var r=n(5),o=n.n(r),c=n(6),i=n(1),a=n.n(i),s=n(7),u=n(8),l=n(0),f=n.n(l),p=n(9),d=n.n(p);function h(t){var e=t.match(/\d+/g)||[];if(e.length)return 1===e.length&&e.unshift(e[0]),e.push(t),e}n(11);
/*!
 * Created by j on 18/10/1.
 */var v=n(3),g=n.n(v),m=n(10),j=n.n(m),y=n(4),x=n.n(y);var b=function(t,e){/^https?:/gim.test(t)?x.a.fetch(t,{},function(t,e,n,r){}):d()(t,function(t){console.log(t);var n,r,o=/\.html?$/;if(o.test(t)){var c=t.replace(o,".txt"),i=(n=t,r=f.a.readFileSync(n),j.a.load(g.a.decode(r,"utf8")));i(e).find("br").replaceWith("<p>^</p>");var a=i(e).text().replace(/\^+/gim,"\r\n");f.a.writeFileSync(c,a)}})};
/*!
 * Created by j on 18/10/27.
 */o.a.version("0.5.21","-v, --version").usage("<sub-command>"),o.a.command("csv").description("csv文件转为json文件, Usage: jhandy csv -s xx.txt").option("-s, --csv <csv_file>","csv文件").option("-D, --dist [json_file]","json文件").option("-c, --cols [cols]",'"0, 1, 3", 指定截取的csv列, 默认截取所有列').option("-d, --use-default","使用默认设置").action(function(t){var e=t.csv,n=t.dist,r=t.cols&&t.cols.split(/\D+/),o=t.useDefault;return e?!n&&o?"stocks.txt"===e?void Object(c.b)(e,"/Users/j/dev/csd/stocks.json",[0,1],o):"t.txt"===e?void Object(c.b)(e,"/Users/j/dev/crx-jhandy/js/data/T.js",[0,1],o):void Object(c.b)(e,e.replace(/\.\w+$/,".json"),r,o):void Object(c.b)(e,n,r,o):t.help?t.help():console.log("没有提供csv文件参数.",t)}),function(t){t.command("fetch").description('从网络爬取股票数据, Usage: jhandy fetch -s "ths_new ths_p" -c 300059').option("-s, --sources <source_id>","要爬取的数据源网页id:ths_new, ths_p, ths_c, ycj, 默认爬取全部数据源").option("-i, --index <index>","股票列表索引位置,主要用于上次爬取数据中断",function(t){return 1*t}).option("-c, --stocks <stocks>","x.json 或者 000001,000002").option("-p, --csd-path <csd-path>","csd路径").action(function(t){var e=t.sources,n=t.index,r=t.stocks,o=t.csdPath;o=o||"/Users/j/dev/csd",n=n||0,e=e?e.split(/\s+/gim):s.a.SOURCES,r&&(/\.json$/.test(r)?r=/^\//.test(r)?r:a.a.resolve(process.cwd(),r):r.match(/\d{6}/g)&&(r=(r=r.match(/\d{6}/g)).map(function(t,e){return[t,""]}))),Object(s.a)(o,r,n,e)})}(o.a),function(t){t.command("tdx").description('通达信自定义数据输出, Usage: jhandy tdx -d or jhandy tdx -p "概念z" ').option("-c, --csd-path [csd路径]","csd数据路径").option("-f, --tdx-file [extern_user.txt 路径]","通达信自定义数据文件路径").option("-p, --props [prop name]","props: ['概念', '概念y', '产品', '业务', '全名', '备注', '概念z']").option("-d, --use-default","使用default选项, 任意目录都可执行;").action(function(t){var e=t.csdPath,n=t.tdxFile,r=t.props;t.useDefault&&(e="/Users/j/dev/csd",n="/Volumes/C/new_jyplug/T0002/signals/extern_user.txt"),Object(u.a)(e,n,r&&r.split(/\s+|,/gim))})}(o.a),function(t){t.command("h2t").description('html转为txt. Usage: jhandy h2t or jhandy h2t -p "https://x.com/y.html" -q body').option("-p, --path [html文件 | 本地目录 | url地址]","可选; html文件 | 本地目录 | url地址, 默认命令行所在目录;").option("-q, --query [jquery选择符]","可选; jquery选择符;").action(function(t){var e=t.path||process.cwd(),n=t.query||"#showcontent";e=/^\//gim.test(e)?e:a.a.join(process.cwd(),e),b(e,n)})}(o.a),function(t){t.command("merge").description("合并当前目录序列文本文件到一个文件. Usage: jhandy merge").option("-p, --path [p]","目标目录. 默认命令行所在目录").action(function(t){var e=t.path||process.cwd();!function(t){console.log(t);var e=t.split("/");e=e.pop(),console.log(e),f.a.readdir(t,function(t,n){if(t)return console.error(t);for(var r,o=[],c=0;c<n.length;c+=1)r=n[c],/\.txt$/i.test(r)&&(r=h(r))&&o.push(r);o.sort(function(t,e){return 1*t[1]-1*e[1]}),console.log(o);var i="".concat(e," ( ").concat(o[0][0],"-").concat(o[o.length-1][1]," ).txt");f.a.writeFileSync(i,""),o.forEach(function(t){var e=f.a.readFileSync(t[2]);f.a.appendFile(i,e,function(t){t&&console.error(t)})})})}(e=/^\//gim.test(e)?e:a.a.join(process.cwd(),e))})}(o.a),o.a.parse(process.argv),o.a.args.length||o.a.help()}]);
//# sourceMappingURL=cli.js.map