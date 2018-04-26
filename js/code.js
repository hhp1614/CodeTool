/*
 * @Author: hapick 
 * @Date: 2018-04-23 17:56:57 
 * @Last Modified by: hapick
 * @Last Modified time: 2018-04-26 10:49:48
 */

class Code {
    /**
     * 编码/解码
     * @memberof Code
     */
    constructor() {
        this.input = document.querySelector('.code .input')
        this.output = document.querySelector('.code .output')
        this.clearBtn = document.querySelector('.code .clear')
        this.btns = {
            urlEncode: document.querySelector('.code .url-encode'),
            urlDecode: document.querySelector('.code .url-decode'),
            unicodeEncode: document.querySelector('.code .unicode-encode'),
            unicodeDecode: document.querySelector('.code .unicode-decode'),
            base64Encode: document.querySelector('.code .base64-encode'),
            base64Decode: document.querySelector('.code .base64-decode'),
        }
        this.init()
    }
    /**
     * 初始化
     * @memberof Code
     */
    init() {
        this.clear()
        this.events()
    }
    /**
     * 清空
     * @memberof Code
     */
    clear() {
        let btn = this.clearBtn
        btn.addEventListener('click', () => {
            this.input.value = ''
            this.output.value = ''
        })
    }
    /**
     * 事件
     * @memberof Code
     */
    events() {
        let urlEn = this.btns.urlEncode
        let urlDe = this.btns.urlDecode
        let uniEn = this.btns.unicodeEncode
        let uniDe = this.btns.unicodeDecode
        let b64En = this.btns.base64Encode
        let b64De = this.btns.base64Decode
        this.bindEvent(urlEn, this.urlEncode)
        this.bindEvent(urlDe, this.urlDecode)
        this.bindEvent(uniEn, this.unicodeEncode)
        this.bindEvent(uniDe, this.unicodeDecode)
        this.bindEvent(b64En, this.base64Encode)
        this.bindEvent(b64De, this.base64Decode)
    }
    /**
     * 绑定事件
     * @param {dom} dom DOM元素
     * @param {function} func 绑定事件的执行函数
     * @param {string} [type='click'] 事件类型
     * @memberof Code
     */
    bindEvent(dom, func, type = 'click') {
        dom.addEventListener(type, () => {
            let ipt = this.input.value
            let opt = func(ipt)
            this.output.value = opt
        })
    }
    /**
     * URL 编码
     * @param {string} ipt value 值
     * @returns {string} 处理完成的值
     * @memberof Code
     */
    urlEncode(ipt) {
        let str = ''
        for (let i = 0; i < ipt.length; i++) {
            let temp  = ipt[i]
            let encode = encodeURIComponent(temp)
            str += temp === '\n' ? '\n' : encode
        }
        return str
    }
    /**
     * URL 解码
     * @param {string} ipt value 值
     * @returns {string} 处理完成的值
     * @memberof Code
     */
    urlDecode(ipt) {
        return decodeURIComponent(ipt)
    }
    /**
     * unicode 编码
     * @param {string} ipt value 值
     * @returns {string} 处理完成的值
     * @memberof Code
     */
    unicodeEncode(ipt) {
        let str = ''
        for (let i = 0; i < ipt.length; i++) {
            if (ipt[i] === '\n') {
                str += '\n'
            } else if (ipt[i] === ' ') {
                str += ' '
            } else {
                let r = ipt.charCodeAt(i).toString(16)
                if (r.length == 2) {
                    r = '00' + r
                } else if (r.length == 3) {
                    r = '0' + r
                } else if (r.length == 1) {
                    r = '000' + r
                }
                str += `\\u${r}`
            }
        }
        return str
    }
    /**
     * unicode 解码
     * @param {string} ipt value 值
     * @returns {string} 处理完成的值
     * @memberof Code
     */
    unicodeDecode(ipt) {
        let n = 0
        let str = ''
        for (let i = 0; i < ipt.length; i++) {
            if (ipt[i] === '\n') {
                str += '\n'
            } else if (ipt[i] === ' ') {
                str += ' '
            } else {
                let bool = ipt.charAt(i) == '\\'
                    && i + 5 < ipt.length
                    && ipt.charAt(i + 1) == 'u'
                if (bool) {
                    let temp = ipt.substr(i + 2, 4)
                    n = parseInt(temp, 16)
                    if (!isNaN(n)) {
                        str += String.fromCharCode(n)
                        i += 5
                    } else {
                        str += ipt.charAt(i)
                    }
                } else {
                    str = ipt.charAt(i)
                }
            }
        }
        return str
    }
    base64Encode(ipt) {
        let res = Base64.encode(ipt)
        return res
    }
    base64Decode(ipt) {
        let res = Base64.decode(ipt)
        return res
    }
}