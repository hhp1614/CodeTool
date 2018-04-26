/*
 * @Author: hapick 
 * @Date: 2018-04-26 11:30:14 
 * @Last Modified by: hapick
 * @Last Modified time: 2018-04-26 18:27:53
 */

class FileHash {
    constructor() {
        this.ipt = document.querySelector('#file')
        this.content = document.querySelector('#file-content')
        this.btn = document.querySelector('.select-file')
        this.fileInfo = document.querySelector('.file-info')
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
                let size = this.fileSize(file.size)
                this.fileInfo.innerHTML = `
                    <div>文件名：${file.name}</div>
                    <div>文件类型：${file.type}</div>
                    <div>文件大小：${size}</div>
                `
                // person 进度
                this.calculate(file, this.content)
            }
        })
    }
    calculate(file, content) {
        // content = document.querySelector('#file-content')
        // file = this.ipt.files[0]
        let fileReader = new FileReader()
        let fp = File.prototype
        let fpSlice = fp.mozSlice || fp.webkitSlice || fp.slice
        let spark = new SparkMD5()
        let chunkSize = 2097152 // read in chunks of 2MB
        let chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0

        fileReader.onload = e => {
            log('读取文件进度：', currentChunk + 1, ' / ', chunks);
            spark.appendBinary(e.target.result); // append binary string
            currentChunk++;
            if (currentChunk < chunks) {
                loadNext();
            } else {
                log('加载完成');
                content.innerText = 'MD5 hash值：' + spark.end();
                // log('computed hash', spark.end()); // compute hash
            }
        }

        function loadNext() {
            let start = currentChunk * chunkSize
            let end = (start + chunkSize >= file.size)
                ? file.size
                : start + chunkSize
            fileReader.readAsBinaryString(fpSlice.call(file, start, end));
        }
        loadNext()
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

const fileInput = document.querySelector('#file')
// const btn = document.querySelector('#file-btn')
// const fileText = document.querySelector('#file-text')

// fileInput.addEventListener('change', calculate)

// function calculate() {
//     const box = document.getElementById('box')
//     const file = document.getElementById("file").files[0]
//     const fileReader = new FileReader()
//     let fp = File.prototype
//     const blobSlice = fp.mozSlice || fp.webkitSlice || fp.slice
//     const spark = new SparkMD5()
//     const chunkSize = 2097152 // read in chunks of 2MB
//     const chunks = Math.ceil(file.size / chunkSize)
//     let currentChunk = 0

//     fileReader.onload = (e) => {
//         log("read chunk nr", currentChunk + 1, "of", chunks);
//         spark.appendBinary(e.target.result); // append binary string
//         currentChunk++;

//         if (currentChunk < chunks) {
//             loadNext();
//         } else {
//             log("finished loading");
//             box.innerText = 'MD5 hash:' + spark.end();
//             log("computed hash", spark.end()); // compute hash
//         }
//     };

//     function loadNext() {
//         let start = currentChunk * chunkSize
//         let end = (start + chunkSize >= file.size)
//             ? file.size
//             : start + chunkSize
//         fileReader.readAsBinaryString(blobSlice.call(file, start, end));
//     };

//     loadNext();
// }  