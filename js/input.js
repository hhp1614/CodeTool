class Input {
    constructor() {
        let doms = document.querySelectorAll('.input-field')
        doms.forEach(item => {
            let input = item.querySelector('input')
            let label = item.querySelector('label')
            input.addEventListener('focus', () => {
                label.classList.add('active')
            })
            let pla = input.placeholder
            let val = input.value
            this.hasPlaceholder(pla, val, input, label)
        })
    }
    hasPlaceholder(placeholder, value, input, label) {
        if (placeholder || value) {
            label.classList.add('active')
        }
        input.addEventListener('blur', () => {
            if (input.value) {
                label.classList.add('active')
            } else {
                label.classList.remove('active')
            }
        })
    }
}