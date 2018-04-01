/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2018, OAF2E
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */
 
$(function () {
  var load = {
    $el: $('#load'),
    init: function () {
      $.get ('api_project.json?t=' + new Date ().getTime ()).done (load.render).fail (function () {
        load.render ({
          name: 'API 文件',
          description: '',
          version: '0.0.0',
        })
      });
    },
    render: function (r) {
      $('title').text (r.name);
      load.$el.append (
        $('<div />').append (
          $('<h1 />').text (r.name)).append (
          $('<p />').text (r.description)).append (
          $('<div />').append ($('<i />')).append ($('<i />')).append ($('<i />'))).append (
          $('<span />').text ('版本：v' + r.version + '')));
    },
    hide: function (cb) {
      if (!load.$el) return ;
      load.$el.addClass ('hide');
      setTimeout (function () { load.$el.remove (); load.$el = null; cb && cb (); }, 375);
    }
  };

  var main = {
    $el: $('#main'),
    $tabs: null,
    $panels: null,
    $format: null,
    init: function () {
      var $tmp = $('<div />');
      main.$el.empty ().append ($tmp);
      main.$el = $tmp;
    },
    render: function (obj) {
      main.$el.empty ();

      var filters = {name: '', title: '', description: '', permission: []};
      for (var filter in filters)
        if (typeof obj[filter] === 'undefined')
          obj[filter] = filters[filter];

      var $header = $('<header />').append ($('<h1 />').attr ('data-title', obj.name).text (obj.title))
                                   .append ($('<section />').html (obj.description));

      var $important = $('<div />').addClass ('important').append (obj.permission.map (function (t) {
        return $('<div />').append (
                  $('<span />').text (t.name)).append (
                  $('<div />').text (t.title)).append (
                  $(t.description));
      }));
      var $url = $('<div />').addClass ('url').attr ('data-type', obj.type).append ($('<pre />').text (obj.url));
      
      var formats = {
        header: {title: 'Header', d4: 'Header'},
        parameter: {title: '參數', d4: 'Parameter'},
        success: {title: '成功', d4: 'Success 200'},
        error: {title: '錯誤', d4: 'Error 4xx'}
      };

      main.$tabs = [];
      main.$panels = [];

      for (var format in formats)
        if (typeof obj[format] !== 'undefined') {
          main.$tabs.push (formats[format].title);
          main.$panels.push ({
            d4: formats[format].d4,
            fields: typeof obj[format].fields === 'undefined' ? {} : obj[format].fields,
            examples: typeof obj[format].examples === 'undefined' ? [] : obj[format].examples
          });
        }

      main.$tabs = $(main.$tabs.map (function (t) { return $('<a />').text (t).click (function () { main.$format.attr ('data-i', $(this).index () + 1); }); })).map ($.fn.toArray);
      main.$panels = $(main.$panels.map (function (t) {
        var $div = $('<div />');

        var fields = [];

        for (var field in t.fields)
          fields.push ($.extend (t.fields[field], {title: t.d4 == field ? '' : field}));

        fields.sort (function (a, b) { return a.title > b.title; });
        $div.append (fields.map (function (field) {

          var $table = $('<div />').addClass ('table').append (
                         $('<table />').append (
                           $('<thead />').append (
                             $('<tr />').append (
                               $('<th />').addClass ('center').addClass ('is-need').text ('必須')).append (
                               $('<th />').addClass ('key').text ('Key')).append (
                               $('<th />').addClass ('type').text ('類型')).append (
                               $('<th />').addClass ('desc').text ('敘述')))).append (
                           $('<tbody />').append (
                             field.map (function (u) {
                               return $('<tr />').append (
                                 $('<td />').append (
                                   $('<span />').addClass (u.optional ? 'maybe' : 'need'))).append (
                                 $('<td />').text (u.field)).append (
                                 $('<td />').text (u.type)).append (
                                 $('<td />').html (u.description));
                             }))));
          return field.title.length ? $('<h3 />').text (field.title).add ($table) : $table;
        }));

        $div.append (t.examples.map (function (u) {
          var $pre = $('<pre />').addClass ('prettyprint').addClass ('language-' + u.type).addClass ('sample').text (u.content);
          return t.examples.length > 1 ? $('<h3 />').text (u.title).add ($pre) : $pre;
        }));

        return $div;
      })).map ($.fn.toArray);

      main.$format = $('<div />').addClass ('format').append (
                      $('<div />').addClass ('tabs').append (main.$tabs)).append (
                      $('<div />').addClass ('panels').append (main.$panels));

      main.$tabs.first ().click ();

      main.$el.append ($header)
              .append ($important)
              .append ($url)
              .append (main.$format);

      PR.prettyPrint();
    }
  };

  var menu = {
    $el: $('#menu'),
    $search: null,
    $apis: null,
    $links: null,
    apis: null,
    
    init: function () {
      menu.$el.empty ();
      menu.$search = $('<form />').attr ('id', 'search').append (
        $('<input />').attr ('placeholder', '你想找什麼？').prop ('required', true).keyup (menu.filter)).submit (function () { return false; });

      menu.$apis = $('<div />').attr ('id', 'apis');
      menu.$el.append (menu.$search);
      menu.$el.append (menu.$apis);

      if (menu.apis === null)
        $.get ('api_data.json?t=' + new Date ().getTime ())
         .done (function (r) { menu.apis = r; menu.filter (); })
         .fail (function () { menu.apis = []; menu.filter (); });
      else
        menu.filter ();
    },
    filter: function (q, t) {
      q = typeof q === 'undefined' ? '' : q;
      q = typeof q === 'string' ? q.trim () : q;
      q = typeof q === 'object' ? $(this).val ().trim () : q;

      menu.$apis.empty ();

      var apis = menu.apis.filter (function (t) {
        var re = new RegExp (q, 'gi');
        return q.length ? t.type.match (re) || t.url.match (re) || t.title.match (re) || t.group.match (re) : t;
      });
      var groups = {};

      apis.forEach (function (t) {
        if (typeof t.group === 'undefined')
          t.group = '';

        if (typeof groups[t.group] === 'undefined')
          groups[t.group] = [];

        groups[t.group].push (t);
      });

      menu.$links = [];

      for (var group in groups) {
        var tmp = groups[group].map (function (t) {
          return $('<a />').attr ('data-type', t.type).attr ('data-url', t.url).text (t.title).data ('obj', t).click (function () {
            menu.$links.removeClass ('active');
            $(this).addClass ('active');
            main.render ($(this).data ('obj'));
          });
        });
        menu.$apis.append ($('<div />').attr ('data-title', group).attr ('data-cnt', groups[group].length).append (tmp));
        menu.$links.push (tmp);
      }
      console.error ();
      
      menu.$links = $(menu.$links.length ? menu.$links.reduce (function (p, n) { return p.concat (n); }) : []).map ($.fn.toArray);
      load.hide (function () {
        if (!menu.$links.length) {
          menu.$apis.attr ('data-tip', '找不到任何 API');
          main.$el.attr ('data-tip', '找不到任何 API 資訊');
        } else {
          menu.$links.first ().click ();
        }
      });
    }
  };

  load.init ();
  main.init ();
  menu.init ();
});