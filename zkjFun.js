/**
 * 功能：去除字符串空格
 * @param str 一段字符串
 * @param type type 1-所有空格  2-前后空格  3-前空格 4-后空格
 * @returns 去除空格之后的字符串
 */
//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
//trim('  1235asd',1)
//result：1235asd
//这个方法有原生的方案代替，但是考虑到有时候开发PC站需要兼容IE8，所以就还是继续保留
function trim(str, type) {
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

/**
 * 功能：字母大小写转换
 * @param str 一段英文字符串
 * @param type  1:首字母大写, 
 *              2：首页母小写
 *              3：大小写转换
 *              4：全部大写
 *              5：全部小写
 * @returns 转换后的字符串
 */
// changeCase('as dAsd id', 1)
// result：Asdasd
function changeCase(str, type) {
    function ToggleCase(str) {
        var itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                } else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                } else {
                    itemText += item;
                }
            });
        return itemText;
    }
    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

/**
 * 功能：字符替换
 * @param str string 类型
 * @param regArr  截取格式 
 * @param type  0 代表从左向右、1 相反
 * @param ARepText 替换的字符,默认是 *
 * @returns 转换后的字符串
 */
//replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
//ecDo.replaceStr('18819322663',[3,5,3],0)
//result：188*****663
//ecDo.replaceStr('asdasdasdaa',[3,5,3],1)
//result：***asdas***
//ecDo.replaceStr('1asd88465asdwqe3',[5],0)
//result：*****8465asdwqe3
//ecDo.replaceStr('1asd88465asdwqe3',[5],1,'+')
//result："1asd88465as+++++"
function replaceStr(str, regArr, type, ARepText) {
    var regtext = '',
        Reg = null,
        replaceText = ARepText || '*';
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    else if (regArr.length === 3 && type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
        Reg = new RegExp(regtext);
        var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
        var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    else if (regArr.length === 1 && type === 0) {
        regtext = '(^\\w{' + regArr[0] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
    else if (regArr.length === 1 && type === 1) {
        regtext = '(\\w{' + regArr[0] + '}$)'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
}

/**
 * 功能：检测密码强度
 * @param str string 类型
 * @returns 强度等级
 */
// checkPwd('123abcABC')
// result：3(强度等级为3)
function checkPwd(str) {
    var nowLv = 0;
    if (str.length < 6) {
        return nowLv
    }
    if (/[0-9]/.test(str)) {
        nowLv++
    }
    if (/[a-z]/.test(str)) {
        nowLv++
    }
    if (/[A-Z]/.test(str)) {
        nowLv++
    }
    if (/[\.|-|_]/.test(str)) {
        nowLv++
    }
    return nowLv;
}

/**
 * 功能：随机码
 * @param count number 类型。取值范围  2 - 36
 * @returns 随机码
 */
// ecDo.randomWord(10)
// result："2584316588472575"
// ecDo.randomWord(14)
// result："9b405070dd00122640c192caab84537"
// randomWord(36)
// result："83vhdx10rmjkyb9"
function randomWord(count) {
    return Math.random().toString(count).substring(2);
}

/**
 * 功能：查找字符出现的次数
 * @param str string 类型
 * @param strSplit  需要查找的字符 string类型
 * @returns 查找到的次数
 */
// var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
// countStr(strTest,'blog')
// result：6
function countStr(str, strSplit) {
    return str.split(strSplit).length - 1
}

/**
 * 功能：过滤字符串(html标签，表情，特殊字符)
 * @param str string 类型
 * @param type  html
 * @param restr 过滤到的字符替换成什么
 * @param spstr 排除什么不过滤
 * @returns 过滤后的字符串
 */
// 过滤字符串(html标签，表情，特殊字符)
// 字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
// 如果需要过滤多种字符，type参数使用,分割，如下栗子
// 过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
// var str = 'asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\'#@!()*/-())_\'":"{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程';
// console.log(filterStr(str, 'html,WORD,chinese,special', '*', '%?'))
// result："asd    654a**sasdasd*********6d5#%^*^&*^%^&*$\"'#@!()*/-())_'":"{}?*****************"
function filterStr(str, type, restr, spstr) {
    var typeArr = type.split(','), _str = str;
    for (var i = 0, len = typeArr.length; i < len; i++) {
        //是否是过滤特殊符号
        if (typeArr[i] === 'special') {
            var pattern, regText = '$()[]{}?\|^*+./\"\'+';
            //是否有哪些特殊符号需要保留
            if (spstr) {
                var _spstr = spstr.split(""), _regText = "[^0-9A-Za-z\\s";
                for (var j = 0, len1 = _spstr.length; j < len1; j++) {
                    if (regText.indexOf(_spstr[j]) === -1) {
                        _regText += _spstr[j];
                    }
                    else {
                        _regText += '\\' + _spstr[j];
                    }
                }
                _regText += ']'
                pattern = new RegExp(_regText, 'g');
            }
            else {
                pattern = new RegExp("[^0-9A-Za-z\\s]", 'g')
            }
        }
        var _restr = restr || '';
        switch (typeArr[i]) {
            case 'special':
                _str = _str.replace(pattern, _restr);
                break;
            case 'html':
                _str = _str.replace(/<\/?[^>]*>/g, _restr);
                break;
            case 'emjoy':
                _str = _str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, _restr);
                break;
            case 'word':
                _str = _str.replace(/[a-z]/g, _restr);
                break;
            case 'WORD':
                _str = _str.replace(/[A-Z]/g, _restr);
                break;
            case 'number':
                _str = _str.replace(/[0-9]/g, _restr);
                break;
            case 'chinese':
                _str = _str.replace(/[\u4E00-\u9FA5]/g, _restr);
                break;
        }
    }
    return _str;
}

/**
 * 功能：格式化字符串
 * @param str string 类型
 * @param size  隔几个字符分割。默认是 3
 * @param delimiter 用什么分割。默认是 ,
 * @returns 格式化后的字符串
 */
// formatText('1234asda567asd890')
// result："12,34a,sda,567,asd,890"
// formatText('1234asda567asd890',4,' ')
// result："1 234a sda5 67as d890"
// formatText('1234asda567asd890',4,'-')
// result："1-234a-sda5-67as-d890"
function formatText(str, size, delimiter) {
    var _size = size || 3, _delimiter = delimiter || ',';
    var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
    var reg = new RegExp(regText, 'g');
    return str.replace(reg, _delimiter);
}

/**
 * 功能：获取一段英文段落中最长的单词，还有他的length
 * @param str 一段字符串
 * @param splitType  以什么标准开始测试，默认是空格
 * @returns array 类型，最长的单词和他的 length
 */
// longestWord('Find the Longest word in a String')
// result：7 Longest
// longestWord('Find|the|Longest|word|in|a|String','|')
// result：7 Longest
function longestWord(str, splitType) {
    var _splitType = splitType || /\s+/g,
        _max = 0, _item = '';
    var strArr = str.split(_splitType);
    strArr.forEach(function (item) {
        if (_max < item.length) {
            _max = item.length
            _item = item;
        }
    })
    return { el: _item, max: _max };
}

/**
 * 功能：数组中的最大值和最小值
 * @param arr 一段字符串
 * @returns 最大的值
 */
//数组最大值
function maxArr(arr) {
    return Math.max.apply(null, arr);
}
//数组最小值
function minArr(arr) {
    return Math.min.apply(null, arr);
}

/**
 * 功能：这一块的封装，主要是针对数字类型的数组，求和，平均值
 * @param arr 一算数字类型的数组
 * @returns 和，平均值
 */
//求和
function sumArr(arr) {
    return arr.reduce(function (pre, cur) {
        return pre + cur
    })
}
//数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活！
function covArr(arr) {
    return this.sumArr(arr) / arr.length;
}

/**
 * 功能：随机获取数组中某一项
 * @param arr array 类型 
 * @returns 随机的某一项的值
 */
// randomOne([1,2,3,6,8,5,4,2,6])
// 2
function randomOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 功能：获取一个字符出现的次数
 * @param obj string array 类型都行 
 * @param ele 需要检测那个值
 * @returns 返回出现的次数
 */
// getEleCount('asd56+asdasdwqe','a')
// result：3
// getEleCount([1,2,3,4,5,66,77,22,55,22],22)
// result：2
function getEleCount(obj, ele) {
    var num = 0;
    for (var i = 0, len = obj.length; i < len; i++) {
        if (ele === obj[i]) {
            num++;
        }
    }
    return num;
}

/**
 * 功能：字符串全局替换
 * @param str 一段字符串
 * @param AFindText  需要替换的关键字
 * @param ARepText  替换成什么样的关键字
 * @returns 替换后的字符串
 */
// replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州')
// result："这里是广州，中国第三大城市，广东省省会，简称穗，"
function replaceAll(str, AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return str.replace(raRegExp, ARepText);
}

/**
 * 功能：返回数组（字符串）出现最多的几次元素和出现次数
 * @param str 一段字符串
 * @param rank  规定一个字符出现的次数超过几次，就显示几次就返回在返回值中
 * @param ranktype  检测到之后是按照升序排还是降序排。默认是降序
 * @returns array 数组，返回当前元素和出现的次数
 */
// arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
// 返回值：el->元素，count->次数
// ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
// 默认情况，返回所有元素出现的次数
// result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2},{"el":"4","count":1},{"el":"5","count":1},{"el":"6","count":1}]
// ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
// 传参（rank=3），只返回出现次数排序前三的
// result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2}]
// ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
// 传参（ranktype=1,rank=null），升序返回所有元素出现次数
// result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1},{"el":"3","count":2},{"el":"1","count":4},{"el":"2","count":6}]
// getCount([1, 2, 3, 1, 2, 5, 2, 4, 1, 2, 6, 2, 1, 3, 2], 3, 1)
// 传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
// result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1}]
function getCount(arr, rank, ranktype) {
    var obj = {},
        k, arr1 = []
    //记录每一元素出现的次数
    for (var i = 0, len = arr.length; i < len; i++) {
        k = arr[i];
        if (obj[k]) {
            obj[k]++;
        } else {
            obj[k] = 1;
        }
    }
    //保存结果{el-'元素'，count-出现次数}
    for (var o in obj) {
        arr1.push({ el: o, count: obj[o] });
    }
    //排序（降序）
    arr1.sort(function (n1, n2) {
        return n2.count - n1.count
    });
    //如果ranktype为1，则为升序，反转数组
    if (ranktype === 1) {
        arr1 = arr1.reverse();
    }
    var rank1 = rank || arr1.length;
    return arr1.slice(0, rank1);
}

/**
 * 功能：删除值为'val'的数组元素
 * @param arr 数组
 * @param val 删除指定的值
 * @param type 精确匹配还是模糊匹配,默认是模糊匹配
 * @returns 过滤后的数组
 */
// removeArrayForValue(['test','test1','test2','test','aaa'],'test',true)
// result：["aaa"]   带有'test'的都删除
// removeArrayForValue(['test','test1','test2','test','aaa'],'test')
// result：["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
function removeArrayForValue(arr, val, type) {
    return arr.filter(function (item) {
        return type ? item.indexOf(val) === -1 : item !== val
    })
}

/**
 * 功能：获取对象数组某些项
 * @param arr 数组
 * @param keys 获取那个值，多个值以 , 隔开
 * @returns 获取指定的组成的数组
 */
// var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
// getOptionArray(arr,'a,c')
// result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
// getOptionArray(arr,'b')
// result：[2, 3, 9, 2, 5]
function getOptionArray(arr, keys) {
    var newArr = []
    if (!keys) {
        return arr
    }
    var _keys = keys.split(','), newArrOne = {};
    //是否只是需要获取某一项的值
    if (_keys.length === 1) {
        for (var i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i][keys])
        }
        return newArr;
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var j = 0, len1 = _keys.length; j < len1; j++) {
            newArrOne[_keys[j]] = arr[i][_keys[j]]
        }
        newArr.push(newArrOne);
    }
    return newArr
}

/**
 * 功能：删除对象数组某些项 
 * @param arr 数组
 * @param keys 获取那个值，多个值以 , 隔开
 * @returns 获取删除后组成的数组
 */
// var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
// filterOptionArray(arr,'a')
// result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
// filterOptionArray(arr,'a,c')
// result：[{b:2},{b:3},{b:9},{b:2},{b:5}]
function filterOptionArray(arr, keys) {
    var newArr = []
    var _keys = keys.split(','), newArrOne = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var key in arr[i]) {
            //如果key不存在排除keys里面,添加数据
            if (_keys.indexOf(key) === -1) {
                newArrOne[key] = arr[i][key];
            }
        }
        newArr.push(newArrOne);
    }
    return newArr
}


/**
 * 功能：[{},{}] 数组对象排序
 * @param arr 数组对象 => 格式 [{}, {}]
 * @param sotrText 根据对象中的哪个为准排序，多个用 , 隔开
 * @returns 排序后的数据
 */
// var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
// arraySort(arr,'a,b')a是第一排序条件，b是第二排序条件
function arraySort(arr, sortText) {
    if (!sortText) {
        return arr
    }
    var _sortText = sortText.split(',').reverse(), _arr = arr.slice(0);
    for (var i = 0, len = _sortText.length; i < len; i++) {
        _arr.sort(function (n1, n2) {
            return n1[_sortText[i]] - n2[_sortText[i]]
        })
    }
    return _arr;
}

/**
 * 功能：平铺数组
 * @param arr 数组，不管是几维数组
 * @returns 平铺后的数组
 */
//ecDo.steamroller([1,2,[4,5,[1,23]]])
//[1, 2, 4, 5, 1, 23]
function steamroller(arr) {
    var newArr = [],_this=this;
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // 如果是数组，调用(递归)steamroller 将其扁平化
            // 然后再 push 到 newArr 中
            newArr.push.apply(newArr, _this.steamroller(arr[i]));
        } else {
            // 不是数组直接 push 到 newArr 中
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

/**
 * 功能：现金额大写转换函数
 * @param n number 类型
 * @returns 现金额大写转换后的值
 */
// upDigit(123456789)
// result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
// upDigit(1682)
// result："人民币壹仟陆佰捌拾贰元整"
// upDigit(-1693)
// result："欠人民币壹仟陆佰玖拾叁元整"
function upDigit(n) {
    var fraction = ['角', '分', '厘'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠人民币' : '人民币';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        //s = p + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

/**
 * 功能：设置url参数
 * @param obj Obj 类型
 * @returns 返回 a=1&b=2 形式的值
 */
// setUrlPrmt({'a':1,'b':2})
// result：a=1&b=2
function setUrlPrmt(obj) {
    var _rs = [];
    for (var p in obj) {
        if (obj[p] != null && obj[p] != '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
}

/**
 * 功能：获取url参数
 * @param url url 值
 * @returns 参数一对象的形式返回
 */
// window.location.href; 获取地址栏中的值 
// getUrlPrmt('test.com/write?draftId=122000011938&id=213')
//result：Object{draftId: "122000011938", id: "213"}
function getUrlPrmt(url) {
    url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1),
        _arrS = _pa.split('&'),
        _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        var name = _arrS[i].substring(0, pos),
            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

/**
 * 功能：随机返回范围内的数字
 * @param n1 最小返回
 * @param n2 最大返回
 * @returns 随机返回的值
 */
// randomNumber(5,10)
// 返回5-10的随机整数，包括5，10
// randomNumber(10)
// 返回0-10的随机整数，包括0，10
// randomNumber()
// 返回0-255的随机整数，包括0，255
function randomNumbe(n1, n2) {
    if (arguments.length === 2) {
        return Math.round(n1 + Math.random() * (n2 - n1));
    }
    else if (arguments.length === 1) {
        return Math.round(Math.random() * n1)
    }
    else {
        return Math.round(Math.random() * 255)
    }
}

/**
 * 功能：到某一个时间的倒计时
 * @param endTime 指定从哪个事件结束
 * @returns 剩余的天数
 */
// getEndTime('2017/12/22 16:0:0')
// result："剩余时间6天 2小时 28 分钟20 秒"
function getEndTime(endTime) {
    var startDate = new Date(); //开始时间，当前时间
    var endDate = new Date(endTime); //结束时间，需传入时间参数
    var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
}

/**
 * 功能：关键字加标签
 * @param str 一段字符串
 * @param key 要添加标签的关键字(对个关键字用空格隔开)
 * @param el 为关键字添加什么标签
 * @returns 一段原字符串添加标签之后的字段
 */
// 这两个函数多用于搜索的时候，关键词高亮
//创建正则字符
//ecDo.createKeyExp([前端，过来])
//result:(前端|过来)/g
function createKeyExp(strArr) {
    var str = "";
    for (var i = 0; i < strArr.length; i++) {
        if (i != strArr.length - 1) {
            str = str + strArr[i] + "|";
        } else {
            str = str + strArr[i];
        }
    }
    return "(" + str + ")";
}
//关键字加标签（多个关键词用空格隔开）
// findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')
// "<i>守侯</i>我oaks接到了来自下次你离<i>开</i>快乐吉祥留在<i>开</i>城侯"
function findKey(str, key, el) {
    var arr = null,
        regStr = null,
        content = null,
        Reg = null,
        _el = el || 'span';
    arr = key.split(/\s+/);
    //alert(regStr); //    如：(前端|过来)
    regStr = this.createKeyExp(arr);
    content = str;
    //alert(Reg);//        /如：(前端|过来)/g
    Reg = new RegExp(regStr, "g");
    //过滤html标签 替换标签，往关键字前后加上标签
    content = content.replace(/<\/?[^>]*>/g, '')
    return content.replace(Reg, "<" + _el + ">$1</" + _el + ">");
}

/**
 * 功能：数据类型判断
 * @param o 需要判断的数据
 * @param type 数据类型
 * @returns 判断后的 Boolenas
 */
// istype([], 'array')
// true
// istype([])
// '[object Array]'
function istype(o, type) {
    if (type) {
        var _type = type.toLowerCase();
    }
    switch (_type) {
        case 'string':
            return Object.prototype.toString.call(o) === '[object String]';
        case 'number':
            return Object.prototype.toString.call(o) === '[object Number]';
        case 'boolean':
            return Object.prototype.toString.call(o) === '[object Boolean]';
        case 'undefined':
            return Object.prototype.toString.call(o) === '[object Undefined]';
        case 'null':
            return Object.prototype.toString.call(o) === '[object Null]';
        case 'function':
            return Object.prototype.toString.call(o) === '[object Function]';
        case 'array':
            return Object.prototype.toString.call(o) === '[object Array]';
        case 'object':
            return Object.prototype.toString.call(o) === '[object Object]';
        case 'nan':
            return isNaN(o);
        case 'elements':
            return Object.prototype.toString.call(o).indexOf('HTML') !== -1
        default:
            return Object.prototype.toString.call(o)
    }
}

/**
 * 功能：判断手机类型
 * @param type 未知(待研究)
 * @returns 判断后的 Boolenas
 */
function browserInfo(type) {
    switch (type) {
        case 'android':
            return navigator.userAgent.toLowerCase().indexOf('android') !== -1
        case 'iphone':
            return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
        case 'ipad':
            return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
        case 'weixin':
            return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
        default:
            return navigator.userAgent.toLowerCase()
    }
}

/**
 * 功能：判断时间格式
 * @param dateString 时间
 * @returns 正确没反应，不正确有提示
 */
// var data = '2017-11-21'
// isDate(data)
function isDate(dateString) {
    if (dateString.trim() == "") return true;
    //年月日正则表达式
    var r = dateString.match(/^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
        alert("请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例    如：2008-08-08\n\r");
        return;
    }
};
