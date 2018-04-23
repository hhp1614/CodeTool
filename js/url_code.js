/*
 * @Author: hapick 
 * @Date: 2018-04-23 17:56:57 
 * @Last Modified by: hapick
 * @Last Modified time: 2018-04-23 18:29:31
 */

const log = console.log.bind(console)

class Code {
    constructor() {
        this.input = document.querySelector('.code .input')
        this.output = document.querySelector('.code .output')
        this.clearBtn = document.querySelector('.code .clear')
        this.dom = {
            urlEncode: document.querySelector('.code .url-encode'),
            urlDecode: document.querySelector('.code .url-decode'),
        }
        this.init()
    }
    init() {
        this.clear()
        this.urlEncode()
        this.urlDecode()
    }
    urlEncode() {
        let dom = this.dom
        let btn = dom.urlEncode
        btn.onclick = () => {
            let ipt = this.input.value
            let opt = encodeURIComponent(ipt)
            this.output.value = opt
        }
    }
    urlDecode() {
        let dom = this.dom
        let btn = dom.urlDecode
        btn.onclick = () => {
            let ipt = this.input.value
            let opt = decodeURIComponent(ipt)
            this.output.value = opt
        }
    }
    clear() {
        let btn = this.clearBtn
        btn.onclick = () => {
            this.input.value = ''
            this.output.value = ''
        }
    }
}

new Code()