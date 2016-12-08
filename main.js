const Atomizer = require('atomizer')
const insertCss = require('insert-css')

const acss = new Atomizer()

const _acssConfig = {}

const genCSS = function(html) {
  const classes = acss.findClassNames(html)
  const config  = acss.getConfig(classes, _acssConfig)
  const css     = acss.getCss(config)
  insertCss(css)
}

window.setAcssConfig = function(config) {
  _acssConfig = config
}

// initial parse
const root = document.getElementsByTagName('html')[0]
genCSS(root.innerHTML)

// observe the document for changes
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    genCSS(mutation.target.getAttribute('class'))
  })
})
observer.observe(root, { attributes: true, attributeFilter: ["class"], subtree: true })
