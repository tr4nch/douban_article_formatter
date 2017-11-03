// ==UserScript==
// @name Douban Article Formatter
// @namespace DAF
// @description 豆瓣文章格式化脚本，能够过滤段落中的手动缩进，自动调整段落间距。
// @include /^https?://movie.douban.com/review/*/
// @include /^https?://www.douban.com/note/*/
// @include /^https?://book.douban.com/review/*/
// @include /^https?://music.douban.com/review/*/
// @version 1.1.5
// @author tranch
// ==/UserScript==

(function() {
  let content, container;
  switch (location.host.split('.')[0]) {
    case 'movie':
      container = document.querySelector('div[property="v:description"]');
      break;
    case 'book':
    case 'music':
      container = document.querySelector('span[property="v:description"]');
      break;
    case 'www':
      container = document.querySelector('div#link-report.note');
      break;
    default:
      return;
  }
  content = container.innerHTML.replace(/(&nbsp;|\s|\n){2,}/g, '');
  content = '<p>' + content.replace(/(<br>(\s|(&nbsp;)*)+)+/g, '</p><p>') + '</p>';
  container.className += ' article_description';
  container.innerHTML = content;
})();
