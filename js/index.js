const log = console.log.bind(console)

/**
 * tabs 切换组件
 */
class Tabs {
    constructor(el = null) {
        this.el = el || document.querySelector('.tabs')
        this.nav = this.el.querySelector('nav')
        this.views = this.el.querySelector('.tab-views')
        this.navItem = this.nav.querySelectorAll('.item')
        this.i = this.nav.querySelector('i')
        this.len = this.navItem.length
        this.leftArr = []
        this.init().clickTabs()
    }
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
    }
    changeView(index) {
        let view = this.views.querySelector('.view')
        let w = view.clientWidth * index
        log(typeof index, typeof view.clientWidth)
        this.views.style.transform = `translate3d(-${w}px, 0px, 0px)`
    }
}

new Tabs()