//TODO remember that one inch printed is 96 pixels in all browsers

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['exports'], factory);
	} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
		// CommonJS
		factory(exports);
	} else {
		// Browser globals
		factory(root.PrintHAF = {});
	}
}(this, function (exports) {
	var domID = '';

	var width = 0;
	var height = 0;
	var marginTop = 0;
	var marginBottom = 0;
	var marginLeft = 0;
	var marginRight = 0;
	
	var createHeaderTemplate = function() { return document.createElement('div'); };
	var createFooterTemplate = function() { return document.createElement('div'); };
	
	var userBefore = function() {};
	var userAfter = function() {};
	
	exports.init = function(options) {
		var insertPrintStyles = function(width, height, domID) {
			var style = document.createElement('style');
			
			var printQuery = document.createTextNode('@media print { @page { margin: 0; size: ' + width + 'px ' + height + 'px;  } html, body { margin: 0; visibility: hidden; } #region-container { visibility: visible !important; }  }');
			
			style.appendChild(printQuery);
			
			document.body.appendChild(style);
		};
		
		domID = options.domID;
			
		if (options.size) {
			
			if (options.size === 'letter') {
				width = 8.5 * 96;
				height = 11 * 96;
			}
			
			if (options.size === 'legal') {
				width = 8.5 * 96;
				height = 14 * 96;
			}
			
			if (options.size === 'tabloid') {
				width = 17 * 96;
				height = 11 * 96;
			}
			
			//TODO these don't seem to work well because of rounding errors
			//if (options.size === 'A3') {
			//	width = 11.69 * 96;
			//	height = 16.53 * 96;
			//}
			
			//if (options.size === 'A4') {
			//	width = 8.27 * 96;
			//	height = 11.69 * 96;
			//}
			
		}
		else {
			options.width && (width = options.width);
			options.height && (height = options.height);
		}
		
		insertPrintStyles(width, height, domID);
		
		options.marginTop && (marginTop = options.marginTop);
		options.marginBottom && (marginBottom = options.marginBottom);
		options.marginLeft && (marginLeft = options.marginLeft);
		options.marginRight && (marginRight = options.marginRight);
		
		options.createHeaderTemplate && (createHeaderTemplate = options.createHeaderTemplate);
		options.createFooterTemplate && (createFooterTemplate = options.createFooterTemplate);
		
		options.before && (userBefore = options.before);
		options.after && (userAfter = options.after);
	};
	
	exports.print = function() {
		var regionContainer = document.createElement('div');
	
		regionContainer.id = 'region-container';
		
		var printContainer = document.getElementById(domID);
		
		before(userBefore, printContainer, regionContainer);
		prepareRegions(regionContainer, createHeaderTemplate, createFooterTemplate, marginTop, marginBottom, marginLeft, marginRight, width, height).then(function() {
			window.print();
			after(printContainer, regionContainer, userAfter);
		});
	};
	
	var before = function(userBefore, printContainer, regionContainer) {
		userBefore();
		
		regionContainer.style.visibility = 'hidden';
		regionContainer.style.position = 'absolute';
		regionContainer.style.zIndex = '5000';
		regionContainer.style.top = '0';
		regionContainer.style.left = '0';
		// FORK FROM EMA: find the item and add half-content to it to watch overflow for new page
		// var min_page_height = 790
		// //: get the height of the test header
		 //var test_header_height = $("#"+domID).find("#main-header").filter(':visible').outerHeight(true)
		 //alert('HEADER '+test_header_height)
		// var test_footer_height = $("#"+domID).find("#main-footer").filter(':visible').outerHeight(true)
		// alert("main_header "+test_header_height)
		// alert("main_footer "+test_footer_height)
		// alert(JSON.stringify($(regionContainer)))
		
		// var min_offset_page_height  = min_page_height - test_header_height // include the header height in cal

		 $(".item").each(function(i, d){
		// 	//: INCLUDE THE HEADER HEIGHT
			
			 var staticHeight = $(this).filter(':visible').outerHeight(true)
			// alert("Cat H: "+staticHeight)

		// 	var total_dyn_content_height = test_header_height + staticHeight + test_footer_height

		// 	alert("Total "+  total_dyn_content_height)
		// 	//var fheight = staticHeight + test_header_height
		// 	$(this).css("min-height", total_dyn_content_height+"px")
			
		// 	staticHeight = $(this).filter(':visible').outerHeight(true)
		// 	//alert("s "+  staticHeight)
		var min_h = 580
		if(staticHeight < min_h){
				// var ttt = 500 - test_header_height
				//min_h = min_h - staticHeight
		 		$(this).css("min-height", min_h+"px")
			
 	    }else{
			
			 	//var hey = staticHeight + 400
			 	$(this).css("min-height", staticHeight+"px")
		 }

			
			
		// 	//alert("GGGG "+$(this).filter(':visible').outerHeight(true))
			
		//$(this).addClass('haf-content')

		 })
		//alert($(printContainer).height())
		printContainer.classList.add('haf-content');

		document.body.appendChild(regionContainer);
	};
	
	var prepareRegions = function(regionContainer, createHeaderTemplate, createFooterTemplate, marginTop, marginBottom, marginLeft, marginRight, width, height) {
		return new Promise(function(resolve, reject) {
			var createPage = function(pageNumber, createHeaderTemplate, createFooterTemplate, marginTop, marginBottom, marginLeft, marginRight, width, height) {
				
				var createNewPage = function(width, height) {
					var page = document.createElement('div');
					
					page.style.width = width + 'px';
					page.style.height = height + 'px';
					page.style.boxSizing = 'border-box';
					page.style.display = 'flex';
					page.style.flexDirection = 'column';
					//ema editing
					//page.style.border = 'solid 1px red'
					//console.log(page)
					
					// end ema editing
					
					return page;
				};
				
				var prepareTemplate = function(pageNumber, templateType, templateCreator, marginTop, marginBottom, marginLeft, marginRight, width) {
					
					var element = templateCreator(pageNumber);
					
					element.style.boxSizing = 'border-box';
					
					if (templateType === 'header') {
						element.style.paddingTop = marginTop + 'px';
					}
					
					if (templateType === 'footer') {
						element.style.paddingBottom = marginBottom + 'px';
					}
					//console.log(element)
					document.body.appendChild(element);
					element.style.height = Math.max(element.clientHeight, element.scrollHeight, element.offsetHeight) + 'px'; //TODO Without this line, why is the height of the template a decimal pixel value? Figure out how to fix that
					element.parentNode.removeChild(element);
					
					element.style.width = width + 'px';
					element.style.paddingLeft = marginLeft + 'px';
					element.style.paddingRight = marginRight + 'px';
					
					return element;
				};
				
				var createRegion = function(preparedHeader, preparedFooter, width, marginLeft, marginRight) {
					
					var calculateRegionHeight = function(height, headerHeight, footerHeight) {
						return height - (headerHeight + footerHeight);
					};
					
					var regionHeight = calculateRegionHeight(height, +preparedHeader.style.height.slice(0, -2), +preparedFooter.style.height.slice(0, -2));
					
					var region = document.createElement('div');
					
					region.style.boxSizing = 'border-box';
					region.style.height = regionHeight + 'px';
					region.style.width = width + 'px';
					region.style.paddingLeft = marginLeft + 'px';
					region.style.paddingRight = marginRight + 'px';
					
					region.classList.add('haf-region');
					
					return region;
				};
				
				var page = createNewPage(width, height);
				var preparedHeader = prepareTemplate(pageNumber, 'header', createHeaderTemplate, marginTop, marginBottom, marginLeft, marginRight, width);
				var preparedFooter = prepareTemplate(pageNumber, 'footer', createFooterTemplate, marginTop, marginBottom, marginLeft, marginRight, width);

				//! - - - - - - - - - -- - - - - - -START EMA FORK
				var _em_header_height = $(preparedHeader).height()
				var _em_footer_height = $(preparedFooter).height()
				//alert("###### "+_em_header_height+"  footer "+_em_footer_height)
				var min_page_height = 1056 // letter
				var total_header_footer = _em_header_height + _em_footer_height
				var min_offset_page_height = min_page_height - total_header_footer // printable page area
				$(".item").each(function (i, d) {
					//: INCLUDE THE HEADER HEIGHT

					 var staticHeight = $(this).filter(':visible').outerHeight(true)
					//alert(staticHeight)
					// var total_dyn_content_height = test_header_height + staticHeight + test_footer_height

					// // alert("Total " + total_dyn_content_height)
					// // //var fheight = staticHeight + test_header_height

					// //$(this).css("min-height", min_offset_page_height + "px")
					// if(staticHeight > min_page_height){
					// 	//alert(staticHeight)
					// 	//$(this).css("max-height", "746" + "px")
					// }
					// // staticHeight = $(this).filter(':visible').outerHeight(true)
					// //alert("s "+  staticHeight)
					// if (staticHeight < 700) {

					// 	$(this).css("min-height", "700" + "px")

					// }



					//alert("GGGG "+$(this).filter(':visible').outerHeight(true))

					//$(this).addClass('haf-content')
				})




				//! - - - - - - - - - -- - - - - - -END


				



				page.appendChild(preparedHeader);
				page.appendChild(createRegion(preparedHeader, preparedFooter, width, marginLeft, marginRight));
				page.appendChild(preparedFooter);
				
				return page;
			};
			
			var setupOversetListener = function(regionContainer, createHeaderTemplate, createFooterTemplate, marginTop, marginBottom, marginLeft, marginRight, width, height) {
				document.getNamedFlow('haf-content').addEventListener('regionoversetchange', function(e) {
					
					if (e.target.overset) {
						
						pageNumber += 1;
						regionContainer.appendChild(createPage(pageNumber, createHeaderTemplate, createFooterTemplate, marginTop, marginBottom, marginLeft, marginRight, width, height));
						return;
					}
					
					resolve();
				});
			};
			
			var pageNumber = 1;
			
			regionContainer.appendChild(createPage(pageNumber, createHeaderTemplate, createFooterTemplate, marginTop, marginBottom, marginLeft, marginRight, width, height));
			setupOversetListener(regionContainer, createHeaderTemplate, createFooterTemplate, marginTop, marginBottom, marginLeft, marginRight, width, height);
		});
		
	};
	
	var after = function(printContainer, regionContainer, userAfter) {
		regionContainer.parentNode.removeChild(regionContainer);
		
		printContainer.classList.remove('haf-content');
		
		userAfter();
	};
}));
