jQuery(document).ready(function(){
	
	var selectedItem = false;

	jQuery("body").on("click", "#priceMin li a", function(){
		jQuery(this).parent().parent().find(".active").removeClass("active");
		jQuery(this).parent().addClass("active");
		jQuery(".priceContainer div.priceMin input").val(parseFloat(jQuery(this).data("value")).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		jQuery(".priceContainer div.priceMax input").trigger("focus");
	});

	jQuery("body").on("focus", ".priceContainer div.priceMax input", function(){
		jQuery("#priceMin").hide();
		jQuery("#priceMax").show();
		//jQuery("#priceMax").html(" ");
		var minVal = jQuery(".priceContainer div.priceMin input").val();
		minVal = minVal.replace(",","");
		
		//jQuery("#priceMax").append("<li class='childLI ng-scope'><a ng-click='priceSave("+minVal+","+(parseInt(minVal)+25000)+")' href='#' data-value='"+(parseInt(minVal)+25000)+"'>$"+parseFloat((parseInt(minVal)+25000)).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+"</a></li><li class='childLI ng-scope'><a href='#' data-value='"+(parseInt(minVal)+50000)+"'>$"+(parseInt(minVal)+50000).toLocaleString()+"</a></li><li class='childLI ng-scope'><a href='#' data-value='"+(parseInt(minVal)+75000)+"'>$"+(parseInt(minVal)+75000).toLocaleString()+"</a></li><li class='childLI ng-scope'><a href='#' data-value='"+(parseInt(minVal)+100000)+"'>$"+(parseInt(minVal)+100000).toLocaleString()+"</a></li><li class='childLI ng-scope'><a href='#' data-value='"+(parseInt(minVal)+125000)+"'>$"+(parseInt(minVal)+125000).toLocaleString()+"</a></li><li class='childLI ng-scope'><a href='#' data-value='"+(parseInt(minVal)+150000)+"'>$"+(parseInt(minVal)+150000).toLocaleString()+"</a></li><li class='childLI ng-scope'><a href='#' data-value='"+(parseInt(minVal)+175000)+"'>$"+(parseInt(minVal)+175000).toLocaleString()+"</a></li><li class='childLI ng-scope'><a href='#' data-value='"+(parseInt(minVal)+200000)+"'>$"+(parseInt(minVal)+200000).toLocaleString()+"</a></li>")
	});	
	
	jQuery("body").on("focus", ".priceContainer div.priceMin input", function(){
		jQuery("#priceMax").hide();
		jQuery("#priceMin").show();
	});

	jQuery("body").on("click", "#priceMax li a", function(){
		jQuery(this).parent().parent().find(".active").removeClass("active");
		jQuery(this).parent().addClass("active");
		jQuery(".priceContainer div.priceMax input").val(parseFloat(jQuery(this).data("value")).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		
		jQuery(this).parents('.divChild').hide();
	});
	
	jQuery("body").on("click", ".bedding ul li a", function(){
		
		jQuery(this).parent().parent().toggle();

	});
	
	jQuery("body").on("click",".parentLI a",function(){
		//jQuery(this).parent().parent().parent().toggle();
	
 		if (jQuery(this).next().hasClass(".divChild")) {
			console.log(this);
		}
		else{
			//jQuery(this).parent().find("ul").toggle();
		} 
		jQuery(this).next().toggle();
		
		
	})
	
	
});