/*
 * @Author: hapick 
 * @Date: 2018-04-26 11:30:14 
 * @Last Modified by: hapick
 * @Last Modified time: 2018-04-27 11:30:07
 */

class FileHash {
    constructor() {
        this.ipt = document.querySelector('#file')
        this.fileMD5 = document.querySelector('.file-md5')
        this.btn = document.querySelector('.select-file')
        this.info = document.querySelector('.file-info')
        this.person = document.querySelector('.file-person')
        this.init()
    }
    init() {
        this.btn.addEventListener('click', () => {
            this.ipt.click()
        })
        this.ipt.addEventListener('change', () => {
            let files = this.ipt.files
            // console.dir(ipt)
            if (files.length) {
                let file = files[0]
                let name = file.name
                let extname = /\.[^\.]+$/.exec(name)
                let type = file.type
                let size = this.fileSize(file.size)
                if (type) {
                    type = `(${type})`
                }
                this.info.innerHTML = `
                    <div>文件名：${name}</div>
                    <div>文件类型：${extname} ${type}</div>
                    <div>文件大小：${size}</div>
                `
                this.calculate(file, this.content)
            }
        })
    }
    calculate(file, content) {
        let fileReader = new FileReader()
        let fp = File.prototype
        let fpSlice = fp.mozSlice || fp.webkitSlice || fp.slice
        let spark = new SparkMD5()
        let chunkSize = 2097152 // 读取速度 2MB
        let chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        fileReader.onload = e => {
            let person = parseInt((currentChunk + 1) / chunks * 100) + '%'
            this.showPerson('读取文件进度：', 'red', person)
            spark.appendBinary(e.target.result) // 添加二进制数
            currentChunk++
            if (currentChunk < chunks) {
                loadNext()
            } else {
                let end = spark.end()
                this.showPerson('', 'green', '读取文件完成')
                this.showfileMD5('red', end)
            }
        }
        fileReader.onerror =  () => {
            alert('error')
        }
        function loadNext() {
            let start = currentChunk * chunkSize
            let end = (start + chunkSize >= file.size)
                ? file.size
                : start + chunkSize
            fileReader.readAsBinaryString(fpSlice.call(file, start, end))
        }
        loadNext()
    }
    showPerson(title, color, msg) {
        this.person.innerHTML = `
            ${title}<span style="color: ${color}">${msg}</span>
        `
    }
    showfileMD5(color, msg) {
        this.fileMD5.innerHTML = `
            MD5 Hash值：<span style="color: ${color}">${msg}</span>
        `
    }
    fileSize(value) {
        if (null == value || value == '') {
            return '0 Bytes'
        }
        let unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        let index = 0
        let srcsize = parseFloat(value)
        index = Math.floor(Math.log(srcsize) / Math.log(1024))
        let size = srcsize / Math.pow(1024, index)
        size = size.toFixed(2)
        return size + unitArr[index]
    }
}

new FileHash()