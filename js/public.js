$(function(){var e={$el:$("#load"),init:function(){$.get("api_project.json?t="+(new Date).getTime()).done(e.render).fail(function(){e.render({name:"API 文件",description:"",version:"0.0.0"})})},render:function(t){$("title").text(t.name),e.$el.append($("<div />").append($("<h1 />").text(t.name)).append($("<p />").text(t.description)).append($("<div />").append($("<i />")).append($("<i />")).append($("<i />"))).append($("<span />").text("版本：v"+t.version)))},hide:function(t){e.$el&&(e.$el.addClass("hide"),setTimeout(function(){e.$el.remove(),e.$el=null,t&&t()},375))}},t={$el:$("#main"),$tabs:null,$panels:null,$format:null,init:function(){var e=$("<div />");t.$el.empty().append(e),t.$el=e},render:function(e){t.$el.empty();var a={name:"",title:"",description:"",permission:[]};for(var n in a)"undefined"==typeof e[n]&&(e[n]=a[n]);var p=$("<header />").append($("<h1 />").attr("data-title",e.name).text(e.title)).append($("<section />").html(e.description)),i=$("<div />").addClass("important").append(e.permission.map(function(e){return $("<div />").append($("<span />").text(e.name)).append($("<div />").text(e.title)).append($(e.description))})),d=$("<div />").addClass("url").attr("data-type",e.type).append($("<pre />").text(e.url)),r={header:{title:"Header",d4:"Header"},parameter:{title:"參數",d4:"Parameter"},success:{title:"成功",d4:"Success 200"},error:{title:"錯誤",d4:"Error 4xx"}};t.$tabs=[],t.$panels=[];for(var l in r)"undefined"!=typeof e[l]&&(t.$tabs.push(r[l].title),t.$panels.push({d4:r[l].d4,fields:"undefined"==typeof e[l].fields?{}:e[l].fields,examples:"undefined"==typeof e[l].examples?[]:e[l].examples}));t.$tabs=$(t.$tabs.map(function(e){return $("<a />").text(e).click(function(){t.$format.attr("data-i",$(this).index()+1)})})).map($.fn.toArray),t.$panels=$(t.$panels.map(function(e){var t=$("<div />"),a=[];for(var n in e.fields)a.push($.extend(e.fields[n],{title:e.d4==n?"":n}));return a.sort(function(e,t){return e.title>t.title}),t.append(a.map(function(e){var t=$("<div />").addClass("table").append($("<table />").append($("<thead />").append($("<tr />").append($("<th />").addClass("center").addClass("is-need").text("必須")).append($("<th />").addClass("key").text("Key")).append($("<th />").addClass("type").text("類型")).append($("<th />").addClass("desc").text("敘述")))).append($("<tbody />").append(e.map(function(e){return $("<tr />").append($("<td />").append($("<span />").addClass(e.optional?"maybe":"need"))).append($("<td />").text(e.field)).append($("<td />").text(e.type)).append($("<td />").html(e.description))}))));return e.title.length?$("<h3 />").text(e.title).add(t):t})),t.append(e.examples.map(function(t){var a=$("<pre />").addClass("prettyprint").addClass("language-"+t.type).addClass("sample").text(t.content);return e.examples.length>1?$("<h3 />").text(t.title).add(a):a})),t})).map($.fn.toArray),t.$format=$("<div />").addClass("format").append($("<div />").addClass("tabs").append(t.$tabs)).append($("<div />").addClass("panels").append(t.$panels)),t.$tabs.first().click(),t.$el.append(p).append(i).append(d).append(t.$format),PR.prettyPrint()}},a={$el:$("#menu"),$search:null,$apis:null,$links:null,apis:null,init:function(){a.$el.empty(),a.$search=$("<form />").attr("id","search").append($("<input />").attr("placeholder","你想找什麼？").prop("required",!0).keyup(a.filter)).submit(function(){return!1}),a.$apis=$("<div />").attr("id","apis"),a.$el.append(a.$search),a.$el.append(a.$apis),null===a.apis?$.get("api_data.json?t="+(new Date).getTime()).done(function(e){a.apis=e,a.filter()}).fail(function(){a.apis=[],a.filter()}):a.filter()},filter:function(n){n="undefined"==typeof n?"":n,n="string"==typeof n?n.trim():n,n="object"==typeof n?$(this).val().trim():n,a.$apis.empty();var p=a.apis.filter(function(e){var t=new RegExp(n,"gi");return n.length?e.type.match(t)||e.url.match(t)||e.title.match(t)||e.group.match(t):e}),i={};p.forEach(function(e){"undefined"==typeof e.group&&(e.group=""),"undefined"==typeof i[e.group]&&(i[e.group]=[]),i[e.group].push(e)}),a.$links=[];for(var d in i){var r=i[d].map(function(e){return $("<a />").attr("data-type",e.type).attr("data-url",e.url).text(e.title).data("obj",e).click(function(){a.$links.removeClass("active"),$(this).addClass("active"),t.render($(this).data("obj"))})});a.$apis.append($("<div />").attr("data-title",d).attr("data-cnt",i[d].length).append(r)),a.$links.push(r)}console.error(),a.$links=$(a.$links.length?a.$links.reduce(function(e,t){return e.concat(t)}):[]).map($.fn.toArray),e.hide(function(){a.$links.length?a.$links.first().click():(a.$apis.attr("data-tip","找不到任何 API"),t.$el.attr("data-tip","找不到任何 API 資訊"))})}};e.init(),t.init(),a.init()});