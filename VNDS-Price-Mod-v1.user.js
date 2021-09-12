// ==UserScript==
// @name         VNDS-Price-Mod-v1
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       QuyNguyen
// @match        https://trade.vndirect.com.vn/chung-khoan/danh-muc
// @icon         https://www.google.com/s2/favicons?domain=vndirect.com.vn
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {

    $('ul.footer-quick-nav').click(function(){
        var delayInMilliseconds = 300; //1 second
        setTimeout(function() {
            updateinterface();
            updateinfo();

        }, delayInMilliseconds);
      });

});

function updateinterface(){

    $('div.right-frame').css({
        'width':'420px',
        'height':'fit-content',
        'opacity':'0.95',
        'box-shadow': 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        'border-radius': '10px'});
    $('table.category-list thead').find('th').eq(4).after('<th class="tc">Lãi/lỗ</th>');
};

function updateinfo(){
            $('table.category-list tbody').find('tr').each(function(){
                var slcp = $(this).find('td').eq(2).html();
                var price = $(this).find('td').eq(3).html();
                var percent = $(this).find('td').eq(4).find('span').html();
                slcp = parseFloat(slcp.replace(',',''));
                price = parseFloat(price.replace(',',''));
                percent = percent.replace(/\<.*?\>/g,'');
                percent = percent.replace('%','');
                percent = parseFloat(percent);
                console.log(slcp);
                console.log(price);
                console.log(percent);
                var profit = slcp*price*percent/100;

                var color = '';
                if(profit<0) {
                    color = 'txt-pink';
                }else if(profit==0){
                   color = 'txt-gia-tc';
                }else{
                    color = 'txt-lime';
                };
                $(this).find('td').eq(4).after('<td class="tr"><span class="'+color+'">' + new Intl.NumberFormat().format(profit) + '</span></td>');

            });
};