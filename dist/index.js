module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libs_csv2json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./libs/csv2json */ "./libs/csv2json.js");
/* harmony import */ var _libs_stock_fetch_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/stock/fetch/index */ "./libs/stock/fetch/index.js");
/* harmony import */ var _libs_tdx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./libs/tdx */ "./libs/tdx.js");
/**
 * Created by Julien on 2019/2/27.
 */



/* harmony default export */ __webpack_exports__["default"] = ({
  csv: _libs_csv2json__WEBPACK_IMPORTED_MODULE_0__["default"],
  fetch: _libs_stock_fetch_index__WEBPACK_IMPORTED_MODULE_1__["default"],
  tdx: _libs_tdx__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./libs/csv2json.js":
/*!**************************!*\
  !*** ./libs/csv2json.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var iconv_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! iconv-lite */ "iconv-lite");
/* harmony import */ var iconv_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(iconv_lite__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Created by j on 18/3/10.
 */


/*
 * @todo 解析csv格式文本文件到json文件
 * @param csvFile {String}  csv文件名 必须
 * @param jsonFile  {String} json文件名
 * @param cols  {Array}  要截取的列索引，默认所有列
 * @param isCsdStocksJson  {Boolean}  要创建的文件是否是stocks.json
 * @returns {Promise<any>}
 */

/* harmony default export */ __webpack_exports__["default"] = (function (csvFile, jsonFile, cols, isCsdStocksJson) {
  jsonFile = jsonFile || csvFile.split('.').shift() + '.json';
  cols = cols || []; //console.log([].slice.call(arguments))
  // 文字类型数字转为数字类型数字

  cols = cols.map(function (v) {
    return v * 1;
  }); // 不同的分割正则

  var split_reg = /\s{3,}/; // (1:注意股票名称里包含多余的空格:'新 和 成')

  if (isCsdStocksJson) {
    // 主要处理股票列表csv: s.txt, 以退格键进行分割
    split_reg = /[\t]+/;
  }

  return new Promise(function (resolve, reject) {
    fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFile(csvFile, function (err, data) {
      if (err) return reject(err);
      data = iconv_lite__WEBPACK_IMPORTED_MODULE_1___default.a.decode(data, 'GBK');
      var rows = data.split('\r\n');
      console.log("".concat(csvFile, "\u884C\u6570\u662F=> "), rows.length); // 截取对应的列，默认全列

      var col_length = 1;
      var rows2 = [];
      rows.forEach(function (str) {
        var arr = str.split(split_reg);
        col_length = arr.length >= col_length ? arr.length : col_length; //console.log(arr.length, arr.join(' '))

        rows2.push(arr);
      });
      var rows3 = [];
      rows2.forEach(function (arr) {
        // 如果某一行的列长度小于其它列长度, 判断为冗余行, 则不加入最终json数据
        if (col_length - arr.length > 0) {
          return; //console.log('冗余行 => ',col_length, arr.length, arr.join()); // 处理冗余行 (1:注意股票名称里包含多余的空格:'新 和 成')
        }

        if (cols.length === 0) {
          rows3.push(arr);
        } else {
          rows3.push(arr.filter(function (v, i) {
            return cols.indexOf(i) >= 0;
          }));
        }
      }); // 删除列标题

      var th = rows3.shift();
      console.log('列标题是=> ', th);
      console.log('有效rows length => ', rows3.length); // 删除股票名称中的空白符

      if (isCsdStocksJson) {
        rows3.forEach(function (arr) {
          //console.log(arr.join(' '))
          arr[1] = arr[1] ? arr[1].replace(/\s+/img, '') : arr[1];
        });
      }

      var jsonStr = JSON.stringify(rows3, null, '\t'); // 如果写入js文件而不是json文件

      if (/\.js$/.test(jsonFile)) {
        jsonStr = "STOCKS = ".concat(jsonStr, " ;");
      } // 解析后的数据写入新文件


      fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(jsonFile, jsonStr);
      console.log("\u6570\u636E\u6210\u529F\u5199\u5165".concat(jsonFile, ".")); // return json object

      resolve(rows3);
    });
  });
});

/***/ }),

/***/ "./libs/jsono.js":
/*!***********************!*\
  !*** ./libs/jsono.js ***!
  \***********************/
/*! exports provided: Jo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Jo", function() { return Jo; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*!
 * Created by j on 18/11/9.
 * 把json文件包装成对象进行增删改查
 */



var Jo =
/*#__PURE__*/
function () {
  /**
   *
   * @param jsonPath {String} json file path
   */
  function Jo(jsonPath) {
    _classCallCheck(this, Jo);

    jsonPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(__dirname, "".concat(jsonPath));
    this.jsonPath = jsonPath;

    if (!fs__WEBPACK_IMPORTED_MODULE_0___default.a.existsSync(jsonPath)) {
      //fs.createWriteStream(jsonPath)
      fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(jsonPath, '{}');
      this.json = {};
    } else {
      try {
        var str = fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(this.jsonPath, 'utf8');
        this.json = JSON.parse(str);
      } catch (e) {
        throw new Error(e);
      }
    }
  }

  _createClass(Jo, [{
    key: "merge",
    value: function merge(obj) {
      Object.assign(this.json, obj);
    }
  }, {
    key: "save",
    value: function save() {
      fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(this.jsonPath, JSON.stringify(this.json, null, '\t'));
    }
  }, {
    key: "get",
    value: function get(key) {
      if (!key) return this.json;
      var keys = key.split('.');
      return function fx(namespace, keys) {
        var k = keys.shift();
        var o = namespace[k];
        if (o && keys.length) return fx(namespace[k], keys);
        return o;
      }(this.json, keys);
    }
  }, {
    key: "match",
    value: function match(key) {
      return this.get(key);
    }
  }]);

  return Jo;
}();


/* harmony default export */ __webpack_exports__["default"] = (function (jsonFile) {
  return new Jo(jsonFile);
});

/***/ }),

/***/ "./libs/stock/fetch/fetch.js":
/*!***********************************!*\
  !*** ./libs/stock/fetch/fetch.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheerio-httpcli */ "cheerio-httpcli");
/* harmony import */ var cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ths_c_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ths_c.js */ "./libs/stock/fetch/ths_c.js");
/* harmony import */ var _ths_c_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ths_c_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ths_new_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ths_new.js */ "./libs/stock/fetch/ths_new.js");
/* harmony import */ var _ths_new_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ths_new_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ths_p_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ths_p.js */ "./libs/stock/fetch/ths_p.js");
/* harmony import */ var _ths_p_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ths_p_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ycj_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ycj.js */ "./libs/stock/fetch/ycj.js");
/* harmony import */ var _ycj_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ycj_js__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Created by j on 18/8/16.
 * 从网页上获取股票信息
 */





var map = {
  ths_c: _ths_c_js__WEBPACK_IMPORTED_MODULE_1___default.a,
  ths_new: _ths_new_js__WEBPACK_IMPORTED_MODULE_2___default.a,
  ths_p: _ths_p_js__WEBPACK_IMPORTED_MODULE_3___default.a,
  ycj: _ycj_js__WEBPACK_IMPORTED_MODULE_4___default.a
};
cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0___default.a.set('gzip', true);
cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0___default.a.set('timeout', 7000);
cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0___default.a.set('headers', {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.34'
});
/**
 *
 * @param code
 * @param sourceId
 * @param delay
 * @returns {Promise<any>}
 */

function fetch(code, sourceId, delay) {
  var source = map[sourceId];
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0___default.a.fetch(source.url(code), function (err, $, res, body) {
        var result = source.parse($);
        resolve({
          result: result,
          source_id: sourceId,
          code: code
        });
      });
    }, delay || 30);
  });
} //fetch.SOURCES = ['ths_new', 'ths_p', 'ths_c', 'ycj']


/* harmony default export */ __webpack_exports__["default"] = (fetch);

/***/ }),

/***/ "./libs/stock/fetch/index.js":
/*!***********************************!*\
  !*** ./libs/stock/fetch/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch */ "./libs/stock/fetch/fetch.js");
/* harmony import */ var _jsono__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../jsono */ "./libs/jsono.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Created by j on 18/8/18.
 */



var SOURCES = ['ths_new', 'ths_p', 'ths_c']; // 暂时移除 'ycj'

var timer;
var stat = {};
/**
 * @param stocks {Array}
 * @param index {Number}
 * @param sources {Array}
 * @param csdPath {String}
 * @param watcher {Function}
 */

function start(stocks, index, sources, csdPath, watcher) {
  var arr = stocks[index];

  if (!arr) {
    stat = {
      over: true,
      index: index
    };
    watcher(stat);
    return console.log("fetch over, size is ".concat(index));
  }

  var _arr2 = _slicedToArray(arr, 2),
      code = _arr2[0],
      name = _arr2[1];

  var progress = (index + 1) / stocks.length * 100;
  progress = progress.toFixed(2);
  progress = "".concat(progress, "%");
  stat = {
    name: name,
    code: code,
    index: index,
    progress: progress
  };
  watcher(stat);
  console.log('fetch => ', code, name, index);
  var promises = sources.map(function (id, index) {
    return Object(_fetch__WEBPACK_IMPORTED_MODULE_1__["default"])(code, id, index * (Math.random() + 0.1) * 3000);
  });
  Promise.all(promises).then(function (data) {
    // console.log(typeof data,  data[0])
    var sjo = Object(_jsono__WEBPACK_IMPORTED_MODULE_2__["default"])(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(csdPath, "./s/".concat(code, ".json")));
    sjo.merge({
      "名称": name,
      "code": code
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v = _step.value;
        sjo.merge(v.result);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    sjo.save();
    timer = setTimeout(function () {
      start(stocks, index + 1, sources, csdPath, watcher);
    }, (Math.random() + 0.1) * 3000);
  }).catch(function (err) {
    throw new Error(err);
  });
}
/**
 *
 * @param csdPath {String}
 * @param stocks {Array|String} [['300059', '东方财富']]  数组或json文件路径
 * @param index {Number}
 * @param sources {Array}  ['ths_new', 'ths_p', 'ths_c']
 * @param watcher {Function}
 */


function f(csdPath, stocks, index, sources) {
  var watcher = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (stats) {
    return console.log(stats);
  };
  if (!csdPath) throw new Error('必须提供csd数据存储路径.');
  return new Promise(function (resolve, reject) {
    if (!stocks) {
      stocks = Object(_jsono__WEBPACK_IMPORTED_MODULE_2__["default"])(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(csdPath, './stocks.json')).json;
    }

    if (typeof stocks === 'string') {
      stocks = Object(_jsono__WEBPACK_IMPORTED_MODULE_2__["default"])(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(csdPath, stocks)).json;
    }

    index = index * 1;
    sources = sources || SOURCES;
    console.log("stocks.length is ".concat(stocks.length));
    start(stocks, index, sources, csdPath, function (stats) {
      watcher(stats);

      if (stats.over) {
        resolve(stats);
      }
    });
  });
}

f.stop = function () {
  console.log('clear fetch timer =>', timer);
  clearTimeout(timer);
  return stat;
};

f.SOURCES = SOURCES;
/* harmony default export */ __webpack_exports__["default"] = (f);

/***/ }),

/***/ "./libs/stock/fetch/ths_c.js":
/*!***********************************!*\
  !*** ./libs/stock/fetch/ths_c.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Created by j on 18/11/25.
 * 同花顺概念页面资料解析: http://basic.10jqka.com.cn/000001/concept.html
 */
String.prototype.j_trim = function () {
  return this.replace(/\s+/img, '');
};

module.exports = {
  url: function url(code) {
    return "http://basic.10jqka.com.cn/".concat(code, "/concept.html");
  },
  parse: function parse($) {
    var $table = $('#concept table.gnContent');
    var $gnName = $table.find('tr td.gnName');
    var $extend_content = $table.find('tr.extend_content');
    var concept = {};
    $gnName.each(function (i) {
      var name = $(this).text().j_trim();
      concept[name] = $extend_content.eq(i).text().j_trim();
    });
    return {
      '概念详情': concept
    };
  }
};

/***/ }),

/***/ "./libs/stock/fetch/ths_new.js":
/*!*************************************!*\
  !*** ./libs/stock/fetch/ths_new.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Created by j on 18/8/13.
 * 同花顺动态页面解析 http://basic.10jqka.com.cn/000001/
 */
String.prototype.j_trim = function () {
  return this.replace(/\s+/img, '');
};

module.exports = {
  url: function url(code) {
    return "http://basic.10jqka.com.cn/".concat(code, "/");
  },
  parse: function parse($) {
    var $table = $('#profile table');
    var $td = $table.eq(0).find('td');
    var concept = $td.eq(2).text().replace('概念强弱排名：', '').replace('涉及概念：', '').replace('详情>>', '').j_trim();
    var finance = $td.eq(3).text().replace('财务分析：', '').j_trim();
    var type = $table.eq(1).find('td').eq(3).text().replace('分类：', '').j_trim();
    return {
      '概念': concept,
      '财务': finance,
      '分类': type
    };
  }
};

/***/ }),

/***/ "./libs/stock/fetch/ths_p.js":
/*!***********************************!*\
  !*** ./libs/stock/fetch/ths_p.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Created by j on 18/8/16.
 * 同花顺公司资料页面解析 http://basic.10jqka.com.cn/000001/company.html
 */
String.prototype.j_trim = function () {
  return this.replace(/\s+/img, '');
};

module.exports = {
  url: function url(code) {
    return "http://basic.10jqka.com.cn/".concat(code, "/company.html");
  },
  parse: function parse($) {
    var $td = $('#detail td');
    var full_name = $td.eq(1).text().replace('公司名称：', '').j_trim();
    var position = $td.eq(2).text().replace('所属地域：', '').j_trim();
    var business = $td.eq(4).text().replace('所属行业：', '').j_trim();
    var industry = $td.eq(7).text().replace('主营业务：', '').j_trim();
    var product = $td.eq(8).text().replace('产品名称：', '').j_trim();
    return {
      '全名': full_name,
      '地域': position,
      '行业': business,
      '业务': industry,
      '产品': product
    };
  }
};

/***/ }),

/***/ "./libs/stock/fetch/ycj.js":
/*!*********************************!*\
  !*** ./libs/stock/fetch/ycj.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Created by j on 18/8/16.
 * 云财经股票页面数据解析
 */
module.exports = {
  url: function url(code) {
    code = (/^6/.test(code) ? 'sh' : 'sz') + code;
    return "http://www.yuncaijing.com/quote/".concat(code, ".html");
  },
  parse: function parse($) {
    var arr = $('.ralate table tr').map(function () {
      var s = $(this).find('td a').text() || '';
      var s2 = $(this).find('td small').text() || '';
      return s.trim() + '-' + s2.trim();
    }).get().join('  ');
    return {
      //'news': $('.tab-panel.active').html(),
      '概念y': arr
    };
  }
};

/***/ }),

/***/ "./libs/tdx.js":
/*!*********************!*\
  !*** ./libs/tdx.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var iconv_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconv-lite */ "iconv-lite");
/* harmony import */ var iconv_lite__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(iconv_lite__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jsono__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./jsono */ "./libs/jsono.js");
/**
 * Created by j on 18/8/13.
 * 创建通达信自定义数据更新
 */




/**
 *
 * @param prop {String}
 * @param index {Number}
 * @param csdPath {String} csd文件夹路径
 * @param tempFile {String} 临时使用的通达信自定义数据文件
 * @param stocks {Array} stocks list
 */

function createPropFile(prop, index, csdPath, tempFile, stocks) {
  var propFile = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(csdPath, "./".concat(prop, ".txt"));
  var result = '';
  stocks.forEach(function (arr, i) {
    var code = arr[0];
    var szh = /^6/.test(code) ? 1 : 0;
    var sjo = Object(_jsono__WEBPACK_IMPORTED_MODULE_3__["default"])(path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(csdPath, "./s/".concat(code, ".json")));
    var text = '';
    console.log(arr[0], arr[1]);

    switch (prop) {
      case '概念':
        text = sjo.get('概念').replace(/[，]/img, '  ') + '  ' + sjo.get('行业').replace(/^.+[—]/, '-') + '  ' + (sjo.get('概念z') || '') + '  ';
        break;

      case '概念y':
        text = (sjo.get('概念y') || '').replace(/[-]\d+[%]/img, '  ');
        break;

      case '产品':
        text = sjo.get('产品').replace(/[、]/img, '  ');
        break;

      case '业务':
        text = sjo.get('业务') + '  ';
        break;

      default:
        text = sjo.get(prop) + '  ';
    }

    result += [szh, code, index, text, '0.000'].join('|') + '\r\n';
  });
  fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(propFile, result);
  fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(tempFile, result, {
    encoding: 'utf8',
    flag: 'a'
  });
}
/**
 *
 * @param csdPath {String}
 * @param tdxFile {String} default: /Volumes/C/new_jyplug/T0002/signals/extern_user.txt
 * @param props {String|Array}
 */


/* harmony default export */ __webpack_exports__["default"] = (function (csdPath, tdxFile) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['概念', '概念y', '产品', '业务', '全名', '备注'];
  var absolutePathReg = /^\//;
  if (!absolutePathReg.test(csdPath) || !absolutePathReg.test(tdxFile)) throw new Error('必须提供csd数据存储路径和通达信自定义数据文件路径.');
  return new Promise(function (resolve, reject) {
    var stocks = Object(_jsono__WEBPACK_IMPORTED_MODULE_3__["default"])(path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(csdPath, './stocks.json')).json;
    var tempFile = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(csdPath, tdxFile.split(/[/\\]/).pop());
    fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(tempFile, '');

    if (typeof props === 'string') {
      props = [props];
    }

    props.forEach(function (prop, index) {
      createPropFile(prop, index + 1, csdPath, tempFile, stocks);
    }); // 一次性更新所有自定义数据 或者 更新特定字段自定义数据

    if (props.length === 1) return resolve(path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(csdPath, "".concat(props[0], ".txt")));
    fs__WEBPACK_IMPORTED_MODULE_0___default.a.createReadStream(tempFile).pipe(iconv_lite__WEBPACK_IMPORTED_MODULE_2___default.a.decodeStream('utf8')).pipe(iconv_lite__WEBPACK_IMPORTED_MODULE_2___default.a.encodeStream('GBK')).pipe(fs__WEBPACK_IMPORTED_MODULE_0___default.a.createWriteStream(tdxFile));
    console.log("****\u6570\u636E\u5199\u5165".concat(tdxFile, ";\u901A\u8FBE\u4FE1\u81EA\u5B9A\u4E49\u6570\u636E\u66F4\u65B0\u5B8C\u6210****"));
    resolve(tempFile);
  });
});

/***/ }),

/***/ "cheerio-httpcli":
/*!**********************************!*\
  !*** external "cheerio-httpcli" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cheerio-httpcli");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "iconv-lite":
/*!*****************************!*\
  !*** external "iconv-lite" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iconv-lite");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map