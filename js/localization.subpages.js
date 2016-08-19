/*
	LOCALIZATION SUPPORT - just for subpages (Caveats.html and FAQ.html)
	
	This script handles the URL param (lang=???) and the <select> language element
*/

var language = 'en';	// Defaults to English

$(document).ready(function() {

	// First, check the URL (if param 'lang' is set)
	var uri = new URI(window.location);
	if (uri.hasQuery('lang')) {
		language = uri.search(true)['lang'];
		$('#selectLocalization').val(language);
		LoadLocalizationSubpage(language);
	} else {
		// Nothing in the param list -- load default English
		language = $('#selectLocalization').val();
		if (language == '') { language = 'en'; }
		LoadLocalizationSubpage(language);
	}

});

function LoadLocalizationSubpage(language) {
	$('.localizeSubpage').hide();
	$('.localizeSubpage[data-lang=' + language + ']').show();
	
	// Set the title (if applicable)
	var newTitle = $('#selectLocalization').find(":selected").attr('data-page-title');
	if (newTitle.length > 0) {
		$('title').html(newTitle);
	}
}