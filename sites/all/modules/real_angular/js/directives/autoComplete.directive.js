function autoCompleteDirective(retsAPI) {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        templateUrl: '/sites/all/modules/real_angular/themes/search_form.html',
        link: function(scope, element, attrs) {
			element.autocomplete({
						source: scope[attrs.uiItems],
						select: function() {
							$timeout(function() {
							  element.trigger('input');
							}, 0);
						}
					});
        }
    }
}