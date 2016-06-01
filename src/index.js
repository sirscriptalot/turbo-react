import Turbolinks from 'turbolinks'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import virtualize from 'vdom-virtualize'

(function () {
  let rootNode, tree

  // Monkey patch Turbolinks to use our virtual-dom based differ `applyDiff`.
  Turbolinks.SnapshotRenderer.prototype.assignNewBody = function() {
    applyDiff(this.newBody)
  }

  Turbolinks.start()
  document.addEventListener('DOMContentLoaded', initialDiff)

  // Replaces the initial body with a virtual-dom tree that we can
  // apply patches to rather than replacing the entire thing.
  function initialDiff() {
    tree = virtualize(document.body)
    rootNode = createElement(tree)

    document.body = rootNode
    document.removeEventListener("DOMContentLoaded", initialDiff)
  }

  function applyDiff(newBody) {
    try {
      const newTree = virtualize(newBody)
      const patches = diff(tree, newTree)

      rootNode = patch(rootNode, patches)
      tree = newTree
    } catch (e) {
      document.body = newBody
    }
  }
})()
