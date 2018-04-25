/**
 * loading 效果
 * 
 * @param {any} bool 参数为布尔值，参数为true时显示loading，反之则移除loading
 */
function hpLoading(bool) {
    if (bool) {
        let css = `
            <style class="hp-loading-css">
                .hp-loading {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, .5);
                    z-index: 100;
                }
                .hp-loading-icon{
                    /*固定loading*/
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    /*垂直水平居中*/
                    margin: -20px 0 0 -20px;
                    width: 40px;
                    height: 40px;
                    border: 2px solid;
                    border-color: #fff #fff transparent;
                    border-radius: 50%;
                    box-sizing: border-box;
                    /*动画时间1s，线性变化，无限循环*/
                    animation: hp-loading 1s linear infinite;
                }
                @keyframes hp-loading{
                    0%{
                        transform: rotate(0deg);
                    }
                    100%{
                        transform: rotate(360deg);
                    }
                }
            </style>
        `
        let template = `
            <div class="hp-loading">
                <div class="hp-loading-icon"></div>
            </div>
        `
        let head = document.querySelector('head')
        let body = document.querySelector('body')
        body.innerHTML += css + template
    } else {
        let css = document.querySelector('.hp-loading-css')
        let template = document.querySelector('.hp-loading')
        if (css && template) {
            css.remove()
            template.remove()
        }
    }
    return null
}