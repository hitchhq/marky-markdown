var MD = require('markdown-it')
var lazyHeaders = require('markdown-it-lazy-headers')
var emoji = require('markdown-it-emoji')
var expandTabs = require('markdown-it-expand-tabs')
var githubTaskList = require('markdown-it-task-lists')
var headingLinks = require('./heading-links')
var githubLinkify = require('./linkify')
var relaxedLinkRefs = require('./gfm/relaxed-link-reference')
var githubHeadings = require('./gfm/indented-headings')

module.exports = function (html, options) {
  var mdOptions = {
    html: true,
    langPrefix: 'highlight ',
    linkify: options.linkify
  }

  var parser = MD(mdOptions)
    .use(lazyHeaders)
    .use(emoji, {shortcuts: {}})
    .use(expandTabs, {tabWidth: 4})
    .use(githubTaskList)
    .use(headingLinks, options)
    .use(githubHeadings)
    .use(relaxedLinkRefs)

  return githubLinkify(parser).render(html)
}