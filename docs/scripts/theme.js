    /** 
 * https://gist.github.com/wpscholar/4637176#file-jquery-external-links-new-window-js-L4
 * Open all external links in a new window
 */
$(function() {
    $('a').not('[href*="mailto:"]').each(function () {
		var isInternalLink = new RegExp('/' + window.location.host + '/');
		if ( ! isInternalLink.test(this.href) ) {
			$(this).attr('target', '_blank');
		}
	});
	// copy of HTML generated by native Search plugin 
	var html=`
    <label class="md-icon md-icon--search md-header-nav__button" for="search"></label>

    <div class="md-search" data-md-component="search" role="dialog">
      <label class="md-search__overlay" for="search"></label>
      <div class="md-search__inner">
        <form class="md-search__form" id="kx-search-form" name="search">
          <input type="text" class="md-search__input" id="kx-search-query" name="query" required placeholder="Search" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" data-md-component="query">
          <label class="md-icon md-search__icon" for="search"></label>
          <button type="reset" class="md-icon md-search__icon" data-md-component="reset">&#xE5CD;</button>
        </form>
        <div class="md-search__output">
          <div class="md-search__scrollwrap" data-md-scrollfix>
            <div class="md-search-result" data-md-component="result">
              <div class="md-search-result__meta">
                Type a query and hit Enter
              </div>
              <div class="md-search-result__list"/>
            </div>
          </div>
        </div>
      </div>
    </div>
	`;
	$("div.md-flex div").last().append(html);
	// var serviceRoot = "http://139.59.172.244"; // search engine on DigitalOcean VPS
	// var serviceRoot = window.location.host; // queries revert to originating site for redirection by reverse proxy
	var serviceRoot = 'https://code.kx.com/q/search'; // >>> reverse-proxy directive on Apache httpd
	var srchHandler =function( evt ) {
		// console.log(evt.which);
		if( evt.which===13 ) {
			var url = serviceRoot + "?query=" + $("#kx-search-query").val();
			console.log(url);
			window.location = url;
/*			$.get(url, function( data ) {
				alert( 'ping!' );
				console.log( data );
				$( ".md-search-result__list" ).html( data );
			});
*/			return false;
		};
	};
	$("#kx-search-form").keypress(srchHandler);

/*	$('#kx-search-query').kendoAutoComplete({				/// Initialise autocomplete functionality
		autoWidth: true,
		dataTextField: "topic",
		fixedGroupTemplate: "#:data#",
		height: 500,
		highlightFirst: true,
		minLength: 1,
		placeholder: "Search",
		popup: {
			appendTo: $("#kx-search-dump")
		},			
		theme: "Material",
		dataSource: new kendo.data.DataSource({
			transport: {
				read: {
					dataType: "jsonp",
					url: serviceRoot + "/search",
					data: {
						session: "hello",			// insert var for some session management here...
						srch: function(){
							var kd = $('#kx-search-query').data("kendoAutoComplete");
							kd.ul.appendTo("#kx-search-results");
							return kd.value();
						}
					}
				}
			},
			group: { field: "grp" },
			serverFiltering: true
		}),
		change: function(e) {
			var value = this.value();
			console.log(value);
			// Use the value of the widget
		},
		select: function(e) {
			var item = e.item;
			var dItem = e.dataItem;
			var url = dItem.url;
			var text = item.text();
			console.log(text);
			window.location=url;
		}
			// Use the selected item or its text
	});

*/	// Supplement local search: send query to Web search engine on Return
/*	$("[data-md-component=query]").change(function() {
		var qry = "http://www.google.com/search?q="; // www.bing.com is an alternative
		qry += "site%3Acode.kx.com/q/+"; // non-portable, excludes wiki
		window.location = qry + $(this).val();
		return false; // prevents submitting form to server
	});
*/	// replace Close button with link to Search tips
/*	var btn = $("button.md-icon.md-search__icon");
	$(btn).text("?");
	$(btn).attr("title","Search help");
	$(btn).css({
		color:"white",
		fontFamily:'Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif',
		fontSize:"1.6rem",
		opacity:"1",
		paddingTop:".5rem",
		transform:"none","-webkit-transform":"none"
	});
	$(btn).click(function() {
		var host = window.location.host;
		var dest = "/about/thissite/#search-tips";
		dest = (host==="code.kx.com" ? "/q" : "") + dest
		window.location = dest;
	});
*/	// $("button.md-icon.md-search__icon").replaceWith('<a href="/about/thissite/#search-tips" title="Search tips">?</a>');

	// // cse.google.com Google Custom Search Engine
	// // replace MkDocs Search form with GCSE container
	// $('form[name="search"]').parent().parent().replaceWith('<gcse:search id="gcse_search"></gcse:search>');
	// // compose master GCSE script to call other scripts
	// var cx = '004878902718534787160:xazraufkjx4';
	// var gcse = document.createElement('script');
	// gcse.type = 'text/javascript';
	// gcse.async = true;
	// gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
	// // insert the master GCSE script
	// var s = document.getElementsByTagName('script')[0];
	// // console.log('Insert new script');
	// s.parentNode.insertBefore(gcse, s);
	// // override GCSE style rules to 
	// var style = '.cse .gsc-control-cse, .gsc-control-cse {background-color: transparent !important; border-color: transparent !important;}';
	// // style += '.gsc-search-button {display: none;}';
	// style += 'input.gsc-search-button.gsc-search-button-v2 {height: inherit !important; width: inherit !important;}';
	// style += ' #gcse_search {width: 300px !important}';
	// $('html > head').append($('<style>'+style+'</style>'));

	// $(document).arrive("input.gsc-search-button.gsc-search-button-v2", function(newElem) {
	// 	// https://github.com/uzairfarooq/arrive
	// 	// console.log('button found');
	// 	$(document).unbindArrive(); // unbind all arrive events
	// 	$(newElem).replaceWith('<a href="/about/thissite/#search-tips" title="Search tips">?</a>');
	// 	// $(newElem).click(function(){window.location.href="/about/thissite";});
	// });

});
