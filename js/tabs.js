/*
 * @Author: hapick 
 * @Date: 2018-04-23 17:53:52 
 * @Last Modified by: hapick
 * @Last Modified time: 2018-04-24 18:33:57
 */

class Tabs {
    /**
     * Tabs 切换组件
     * @memberof Tabs
     */
    constructor() {
        this.el = document.querySelector('.tabs')
        this.nav = this.el.querySelector('nav')
        this.views = this.el.querySelector('.tab-views')
        this.navItem = this.nav.querySelectorAll('.item')
        this.i = this.nav.querySelector('i')
        this.len = this.navItem.length
        this.leftArr = []
        this.init().clickTabs()
        this.windowResize()
    }
    /**
     * 初始化 Tab
     * @returns this
     * @memberof Tabs
     */
    init() {
        let len = this.len
        let iWidth = this.el.clientWidth / len
        let vWidth = this.el.clientWidth * len
        this.i.style.width = iWidth + 'px'
        this.views.style.width = vWidth + 'px'
        for (let i = 0; i < len; i++) {
            let ileft = i * iWidth
            this.leftArr.push(ileft)
        }
        return this
    }
    /**
     * 点击 Tab
     * @returns this
     * @memberof Tabs
     */
    clickTabs() {
        for (let i = 0; i < this.len; i++) {
            this.navItem[i].addEventListener('click', e => {
                // this.showPanes(i, this.navItem.length)
                this.changeView(i)
                this.i.style.left = this.leftArr[i] + 'px'
                this.navItem.forEach(item => item.classList.remove('active'))
                this.navItem[i].classList.add('active')
            })
        }
        return this
    }
    /**
     * 切换对应的 Tab 和 View
     * @param {any} index 参数为数字
     * @memberof Tabs
     */
    changeView(index) {
        let view = this.views.querySelector('.view')
        let w = view.clientWidth * index
        this.views.style.transform = `translate3d(-${w}px, 0px, 0px)`
    }
    /**
     * 监听窗口大小变化，重新初始化
     * @memberof Tabs
     */
    windowResize() {
        window.onresize = () => {
            this.el = document.querySelector('.tabs')
            this.nav = this.el.querySelector('nav')
            this.views = this.el.querySelector('.tab-views')
            this.navItem = this.nav.querySelectorAll('.item')
            this.i = this.nav.querySelector('i')
            this.len = this.navItem.length
            this.leftArr = []
            this.init()
        }
    }
}