// ==UserScript==
// @name         VNDS-Price-Mod-v1
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       QuyNguyen
// @match        https://trade.vndirect.com.vn/*
// @icon         https://www.google.com/s2/favicons?domain=vndirect.com.vn
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://code.jquery.com/ui/1.13.0-rc.2/jquery-ui.min.js
// ==/UserScript==

var title = '';

$(document).ready(function() {
    $("<style type='text/css'> .highlight_quy{ background-color:#ffd900; } </style>").appendTo("head");
    updateinterface();
    setInterval(updateinfo, 500);


    $('ul.footer-quick-nav').click(function(){
        var delayInMilliseconds = 200; //1 second
        setTimeout(function() {
            updateinterface();
            updateinfo();
            $('#toggle_kl').change(function(){
                if($(this).prop('checked',true)) showhidekl();


            }
            );
        }, delayInMilliseconds);
      });



});

function showhidekl(){
    $('table.category-list thead tr th:nth-child(n+2):nth-child(-n+4').toggle();
    $('table.category-list tbody tr td:nth-child(n+2):nth-child(-n+4').toggle();
    $('table.category-list tfoot td').attr('colspan',2);
}

function updateinterface(){
    $('span.title').append(' <input type="checkbox" id="toggle_kl"> Ẩn KL/Giá vốn</input> ');
    $('div.right-frame').css({
        'width':'600px',
        'height':'fit-content',
        'opacity':'0.95',
        'box-shadow': 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        'border-radius': '10px'});
    $('table.category-list thead').find('th').eq(4).after('<th class="tc">Gồng lãi</th>');
    $('table.category-list thead').find('th').eq(4).after('<th class="tc">% ngày</th>');
    //$('.right-frame').draggable();
};

function updateinfo(){

    title = '';

    $('.loinhuanvnd').remove();

    $('table.category-list tbody').find('tr').each(function(){
        var stock = $(this).find('td').eq(0).html();
        var slcp = $(this).find('td').eq(2).html();
        var price = $(this).find('td').eq(3).html();
        var percent = $(this).find('td').eq(4).find('span').html();

        var live_price = $('#banggia-khop-lenh-body').find('span#'+stock+'matchP').html();
        live_price = parseFloat(live_price.replace('.',''))*10;

        var live_percent = $('#banggia-khop-lenh-body').find('span#'+stock+'percent').html();
        var live_percent_class = $('#banggia-khop-lenh-body').find('span#'+stock+'percent').attr('class')

        var live_change = $('#banggia-khop-lenh-body').find('span#'+stock+'change').html();


        slcp = parseFloat(slcp.replace(',',''));
        price = parseFloat(price.replace(',',''));
        percent = percent.replace(/\<.*?\>/g,'');
        percent = percent.replace('%','');
        percent = parseFloat(percent);

        var profit = parseFloat(slcp*(live_price-price)).toFixed(0);

        var color = '';
        if(profit<0) {
            color = 'txt-pink';
        }else if(profit==0){
            color = 'txt-gia-tc';
        }else{
            color = 'txt-lime';
        };
        $(this).find('td').eq(4).after('<td class="tr loinhuanvnd"><span class="'+color+'">' + new Intl.NumberFormat().format(profit) + 'đ</span></td>');
        $(this).find('td').eq(4).after('<td class="tr loinhuanvnd"><span class="'+live_percent_class+'">'+new Intl.NumberFormat().format(live_price)+' '+live_percent+' ('+live_change+')</span></td>');

        title = title + stock + ' ' + $('#banggia-khop-lenh-body').find('span#'+stock+'matchP').html() + ' | ';
        $('title').html(title);

    });
    $
};
