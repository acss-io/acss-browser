const Atomizer = require('atomizer')
const insertCss = require('insert-css')

const acss = new Atomizer()

const _acssConfig = acssConfig || {}

const genCSS = function(html) {
  const classes = acss.findClassNames(html)
  const config  = acss.getConfig(classes, _acssConfig)
  const css     = acss.getCss(config)
  insertCss(css)
}

// initial parse
genCSS(document.getElementsByTagName('html')[0].innerHTML)

const nodes = document.querySelectorAll('*')

nodes.forEach(function(node) {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      genCSS(mutation.target.getAttribute('class'))
    })
  })
  observer.observe(node, { attributes: true, attributeFilter: ["class"]})
})
