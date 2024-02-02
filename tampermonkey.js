// ==UserScript==
// @name         Wjx
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  try to take over the world!
// @author
// @match        https://*/*
// @match        http://*/*

// ==/UserScript==

;(function () {
  'use strict'
  if (location.href === 'https://cdn.jsdelivr.net/') return
  var script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/gh/MeYangGe/AutoWenJuanXing@master/dist/app.bundle.js'
  document.body.appendChild(script)
})()