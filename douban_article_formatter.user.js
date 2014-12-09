// ==UserScript==
// @name Douban Article Formater
// @namespace DAF
// @description 豆瓣文章格式化脚本，能够过滤段落中的手动缩进，自动调整段落间距。
// @include http://movie.douban.com/review/*
// @include http://www.douban.com/note/*
// @include http://book.douban.com/review/*
// @include http://music.douban.com/review/*
// @version 1.1.2
// @author tranch
// ==/UserScript==

(function() {
    function GM_wait() {
        if (typeof window.jQuery == 'undefined') {
            setTimeout(GM_wait, 100);
        } else {
            main(jQuery);
        }
    }

    function main($) {
        var article, article_container;
        switch (location.host.split('.')[0]) {
            case 'movie':
                article_container = $('div[property="v:description"]');
                break;
            case 'book':
            case 'music':
                article_container = $('span[property="v:description"]');
                break;
            case 'www':
                article_container = $('div#link-report.note');
                break;
            default:
                return;
        }
        article = article_container.html().replace(/(&nbsp;|\s|\n){2,}/g, '');
        article = '<p>' + article.replace(/(<br>(\s|(&nbsp;)*)+)+/g, '</p><p>') + '</p>';
        article_container.addClass('article_description').html(article);
        $('head').append($('<style>', {type: 'text/css'}).html('.article_description p { text-indent: 2em !important; text-align: justify; }'));
    }

    GM_wait();
})();
