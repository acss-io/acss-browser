var Atomizer = require('atomizer')
var insertCss = require('insert-css')
var MutationSummary = require('mutation-summary')

var acss = new Atomizer()

var _acssConfig = {}

window.setAcssConfig = function(config) {
  _acssConfig = config
}

var genCSS = function(html) {
  var classes = acss.findClassNames(html)
  var config  = acss.getConfig(classes, _acssConfig)
  var css     = acss.getCss(config)
  insertCss(css)
}

var handleMutation = function(summaries) {
  // summaries[0] represents changes to our first query (classes, in this case)
  var changes = summaries[0]
  console.log(changes)
  // get all the classes of all the elements that changed
  var classes = ""
  changes.added.forEach(function(el) {
    classes += el.getAttribute('class') + " "
  })
  changes.valueChanged.forEach(function(el) {
    classes += el.getAttribute('class')
  })
  if (classes.length !== 0) {
    console.log(classes)
    genCSS(classes)
  }
}

// initial parse
var root = document.getElementsByTagName('html')[0]
genCSS(root.innerHTML)

// observe the document for changes
var observer = new MutationSummary({
  queries: [{ attribute: 'class' }],
  callback: handleMutation,
})
