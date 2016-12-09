var Atomizer = require('atomizer')
var insertCss = require('insert-css')
var MutationSummary = require('mutation-summary')

var acss = new Atomizer()

var _acssConfig = {}
if (typeof acssConfig === 'object') {
  _acssConfig = acssConfig
}

var appliedClasses = []
var genCSS = function(html) {

  // find classes and remove ones that have already been generated
  var classes = acss.findClassNames(html)
  // filter by classes
  .filter(function(cls) {
    // see if we can find a a matching class
    var result = appliedClasses.find(function(aCls) {
      return cls === aCls
    })
    return !result
  })

  console.log(classes.length)

  if (classes.length) {
    var config = acss.getConfig(classes, _acssConfig)
    var css    = acss.getCss(config)
    insertCss(css)
    appliedClasses = appliedClasses.concat(classes)
  }

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
