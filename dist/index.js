module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=13)}([function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("path")},function(t,e,n){"use strict";var r=n(0),o=n.n(r),c=n(1),i=n.n(c);function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}
/*!
 * Created by j on 18/11/9.
 * 把json文件包装成对象进行增删改查
 */
var u=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e=i.a.resolve(__dirname,"".concat(e)),this.jsonPath=e,o.a.existsSync(e))try{var r=o.a.readFileSync(this.jsonPath,"utf8");this.json=JSON.parse(r)}catch(t){throw new Error(t)}else this.json=n}var e,n,r;return e=t,(n=[{key:"merge",value:function(t){Object.assign(this.json,t)}},{key:"save",value:function(){o.a.writeFileSync(this.jsonPath,JSON.stringify(this.json,null,"\t"))}},{key:"get",value:function(t){if(!t)return this.json;var e=t.split(".");return function t(e,n){var r=n.shift(),o=e[r];return o&&n.length?t(e[r],n):o}(this.json,e)}},{key:"match",value:function(t){return this.get(t)}}])&&a(e.prototype,n),r&&a(e,r),t}();e.a=function(t,e){return new u(t,e)}},function(t,e){t.exports=require("iconv-lite")},function(t,e){t.exports=require("cheerio-httpcli")},,function(t,e,n){"use strict";n.d(e,"a",function(){return u});var r=n(0),o=n.n(r),c=n(3),i=n.n(c);function a(t,e,n,r){e=e||t.split(".").shift()+".json",n=(n=n||[]).map(function(t){return 1*t});var c=/\s{3,}/;return r&&(c=/[\t]+/),new Promise(function(a,u){o.a.readFile(t,function(s,l){if(s)return u(s);var f=(l=i.a.decode(l,"GBK")).split("\r\n");console.log("".concat(t,"行数是=> "),f.length);var h=1,p=[];f.forEach(function(t){var e=t.split(c);h=e.length>=h?e.length:h,p.push(e)});var v=[];p.forEach(function(t){if(h-t.length>2)return console.log("冗余行 => ",h,t.length,t.join());0===n.length?v.push(t):v.push(t.filter(function(t,e){return n.indexOf(e)>=0}))});var d=v.shift();console.log("列标题是=> ",d),console.log("有效rows length => ",v.length),r&&v.forEach(function(t){t[1]&&(t[1]=t[1].replace(/\s+/gim,"").replace("Ａ","A"))});var g=JSON.stringify(v,null,"\t");/\.js$/.test(e)&&(g="STOCKS = ".concat(g," ;")),o.a.writeFileSync(e,g),console.log("数据成功写入".concat(e,".")),a(v)})})}function u(t){return a(t.csvFile,t.jsonFile,t.cols,t.isCsdStocksJson)}e.b=a},function(t,e){String.prototype.j_trim=function(){return this.replace(/\s+/gim,"")}},function(t,e,n){"use strict";var r=n(1),o=n.n(r),c=n(4),i=n.n(c),a=(n(7),{ths_c:{url:function(t){return"http://basic.10jqka.com.cn/".concat(t,"/concept.html")},parse:function(t){var e=t("#concept table.gnContent"),n=e.find("tr td.gnName"),r=e.find("tr.extend_content"),o={};return n.each(function(e){var n=t(this).text().j_trim();o[n]=r.eq(e).text().j_trim()}),{"概念详情":o}}},ths_new:{url:function(t){return"http://basic.10jqka.com.cn/".concat(t,"/")},parse:function(t){var e=t("#profile table"),n=e.eq(0).find("td");return{"概念":n.eq(2).text().replace("概念强弱排名：","").replace("涉及概念：","").replace("详情>>","").j_trim(),"财务":n.eq(3).text().replace("财务分析：","").j_trim(),"分类":e.eq(1).find("td").eq(3).text().replace("分类：","").j_trim()}}},ths_p:{url:function(t){return"http://basic.10jqka.com.cn/".concat(t,"/company.html")},parse:function(t){var e=t("#detail td");return{"全名":e.eq(1).text().replace("公司名称：","").j_trim(),"地域":e.eq(2).text().replace("所属地域：","").j_trim(),"行业":e.eq(4).text().replace("所属行业：","").j_trim(),"业务":e.eq(7).text().replace("主营业务：","").j_trim(),"产品":e.eq(8).text().replace("产品名称：","").j_trim()}}},ycj:{url:function(t){return t=(/^6/.test(t)?"sh":"sz")+t,"http://www.yuncaijing.com/quote/".concat(t,".html")},parse:function(t){return{"概念y":t(".ralate table tr").map(function(){var e=t(this).find("td a").text()||"",n=t(this).find("td small").text()||"";return e.trim()+"-"+n.trim()}).get().join("  ")}}}});i.a.set("gzip",!0),i.a.set("timeout",7e3),i.a.set("headers",{"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.34"});var u=function(t,e,n){var r=a[e];return new Promise(function(o,c){setTimeout(function(){i.a.fetch(r.url(t),function(n,c,i,a){var u=r.parse(c);o({result:u,source_id:e,code:t})})},n||30)})},s=n(2);function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=t[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,c=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(e,"b",function(){return g});var f,h=["ths_new","ths_p","ths_c","ycj"],p=!1,v={};function d(t,e,n,r){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(t){return console.log(t)};if(!t)throw new Error("必须提供csd数据存储路径.");return new Promise(function(i,a){if(e||(e=Object(s.a)(o.a.resolve(t,"./stocks.json")).json),"string"==typeof e&&(e=Object(s.a)(o.a.resolve(t,e)).json),/^\d{6}$/.test(""+(n*=1)))for(var d=0;d<e.length;d++)if(1*e[d][0]===n){n=d;break}r=r||h,console.log("stocks.length is ".concat(e.length)),p=!1,function t(e,n,r,c,i){var a=e[n];if(!a)return i(v={over:!0,index:n}),console.log("fetch over, size is ".concat(n));var h=l(a,2),d=h[0],g=h[1],m=(n+1)/e.length*100;m=m.toFixed(2),m="".concat(n+1,"/").concat(e.length),i(v={name:g,code:d,index:n,progress:m}),console.log("fetch => ",d,g,n);var j=r.map(function(t,e){return u(d,t,e*(Math.random()+.1)*3e3)});Promise.all(j).then(function(a){var u=Object(s.a)(o.a.resolve(c,"./s/".concat(d,".json")));u.merge({"名称":g,code:d});var l=!0,h=!1,v=void 0;try{for(var m,j=a[Symbol.iterator]();!(l=(m=j.next()).done);l=!0){var y=m.value;u.merge(y.result)}}catch(t){h=!0,v=t}finally{try{l||null==j.return||j.return()}finally{if(h)throw v}}u.save(),f=setTimeout(function(){!p&&t(e,n+1,r,c,i)},3e3*(Math.random()+.1))}).catch(function(t){throw new Error(t)})}(e,n,r,t,function(t){c(t),t.over&&i(t)})})}function g(t){return d(t.csdPath,t.stocks,t.index,t.sources,t.watcher)}g.stop=d.stop=function(){return console.log("clear fetch timer =>",f),clearTimeout(f),p=!0,v},g.SOURCES=d.SOURCES=h;e.a=d},function(t,e,n){"use strict";n.d(e,"b",function(){return f});var r=n(0),o=n.n(r),c=n(1),i=n.n(c),a=n(3),u=n.n(a),s=n(2);function l(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:["概念","概念y","产品","业务","全名","备注","概念z"];return new Promise(function(r,c){var a=/^\//;if(!a.test(t)||!a.test(e)){var l="必须提供csd数据存储路径和通达信自定义数据文件路径.";return console.log(l),c(new Error(l))}var f=Object(s.a)(i.a.resolve(t,"./stocks.json")).json,h=i.a.resolve(t,e.split(/[\/\\]/).pop());if(o.a.writeFileSync(h,""),"string"==typeof n&&(n=[n]),n.forEach(function(e,n){!function(t,e,n,r,c){var a=i.a.resolve(n,"./".concat(t,".txt")),u="";c.forEach(function(r,o){var c=r[0],a=/^6/.test(c)?1:0,l=Object(s.a)(i.a.resolve(n,"./s/".concat(c,".json"))),f=function(t){return l.get(t)||""},h="";if(console.log(r[0],r[1]),!l.json.code)return console.log("".concat(r[0]," : ").concat(r[1]," is {}"));switch(t){case"概念":h=f("概念").replace(/[，]/gim,"  ")+"  "+f("行业").replace(/^.+[—]/,"-")+"  "+f("概念z")+"  ";break;case"概念y":h=f("概念y").replace(/[-]\d+[%]/gim,"  ");break;case"产品":h=f("产品").replace(/[、]/gim,"  ");break;case"业务":h=f("业务")+"  ";break;default:h=f(t)+"  "}u+=[a,c,e,h,"0.000"].join("|")+"\r\n"}),o.a.writeFileSync(a,u),o.a.writeFileSync(r,u,{encoding:"utf8",flag:"a"})}(e,n+1,t,h,f)}),1===n.length)return r(i.a.resolve(t,"".concat(n[0],".txt")));o.a.createReadStream(h).pipe(u.a.decodeStream("utf8")).pipe(u.a.encodeStream("GBK")).pipe(o.a.createWriteStream(e)),console.log("****数据写入 ".concat(e,", 通达信自定义数据更新完成****")),r(h)})}function f(t){return l(t.csdPath,t.tdxFile,t.props)}e.a=l},,,,function(t,e,n){"use strict";n.r(e);var r=n(6);n.d(e,"csv",function(){return r.a});var o=n(8);n.d(e,"fetch",function(){return o.b});var c=n(9);n.d(e,"tdx",function(){return c.b}),e.default={csv:r.b,fetch:o.a,tdx:c.a}}]);
//# sourceMappingURL=index.js.map