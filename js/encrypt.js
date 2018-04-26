/*
 * @Author: hapick 
 * @Date: 2018-04-24 18:20:17 
 * @Last Modified by: hapick
 * @Last Modified time: 2018-04-26 10:51:03
 */

class Encrypt {
    constructor() {
        this.input = document.querySelector('.encrypt .input')
        this.output = document.querySelector('.encrypt .output')
        this.clearBtn = document.querySelector('.encrypt .clear')
        this.lv = document.querySelector('#encrypt-lv')
        this.btns = {
            md5: document.querySelector('.encrypt .md5'),
            sha1: document.querySelector('.encrypt .sha1'),
        }
        this.init()
    }
    init() {
        this.clear()
        this.events()
    }
    clear() {
        let btn = this.clearBtn
        btn.addEventListener('click', () => {
            this.input.value = ''
            this.output.value = ''
        })
    }
    events() {
        let md5Btn = this.btns.md5
        let sha1Btn = this.btns.sha1
        this.bindEvent(md5Btn, this.md5)
        this.bindEvent(sha1Btn, this.sha1)
    }
    bindEvent(dom, func, type = 'click') {
        dom.addEventListener(type, () => {
            let ipt = this.input.value
            let val = this.lv.value
            let opt = '加密次数必须是有效数字~'
            if (this.isNum(val)) {
                opt = func(ipt, val)
            }
            this.output.value = opt
        })
    }
    isNum(val) {
        let reg = /^\d+$/
        if (reg.test(val)) {
            return true
        } else {
            return false
        }
    }
    md5(ipt, val) {
        if (!ipt) {
            return '请输入需要加密的字符串~'
        }
        let count = Number(val)
        let res = ipt
        for (let i = 0; i < count; i++) {
            res = md5(res)
        }
        return res
    }
    sha1(ipt, val) {
        if (!ipt) {
            return '请输入需要加密的字符串~'
        }
        let count = Number(val)
        let res = ipt
        for (let i = 0; i < count; i++) {
            res = sha1(res)
        }
        return res
    }
}