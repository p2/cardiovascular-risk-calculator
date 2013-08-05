/**
 *  Calculator functions.
 */


$(document).ready(function() {
	setFormulaById('cvd');
});


 
function gender(item) {
	if (item) {
		$(item).addClass('active').siblings().removeClass('active');
	}
	
	return $('#male').hasClass('active') ? 1 : 0;
}

function smoker(item) {
	if (item) {
		$(item).addClass('active').siblings().removeClass('active');
	}
	
	return $('#smoker_yes').hasClass('active') ? 1 : 0;
}

function diabetes(item) {
	if (item) {
		$(item).addClass('active').siblings().removeClass('active');
	}
	
	return $('#diabetes_yes').hasClass('active') ? 1 : 0;
}

function adjust(elem_id, sender, no_calc) {
	var value = $(sender).val();
	
	// convert cholesterol values
	if (!_useMMOL && ('chol' == elem_id || 'hdl' == elem_id)) {
		value = Math.round(value * 38.666666);
	}
	
	// apply and calculate
	$('#' + elem_id).text(value ? Math.round(value * 10) / 10 : 0);
	
	if (!no_calc) {
		CALC();
	}
}

function toggleBenefit(elem) {
	$(elem).toggleClass('active');
	CALC();
}

/**
 *  Calculates the current benefit for the given formula.
 */
function benefit(formula_id) {
	if (!formula_id || ! (formula_id in _benefit)) {
		alert("I cannot currently calculate benefits for this formula: " + (formula_id ? formula_id : "not defined"));
		return 0;
	}
	
	// get active benefits
	var active = $('#benefit_estimates').find('li').map(function(idx, item) {
		var elem = $(item);
		if (elem.hasClass('active')) {
			return elem.data('benefit');
		}
	}).get();
	
	// get maximum benefit percentage
	var max = 0;
	for (var bf in _benefit[formula_id]) {
		if (!active.contains(bf)) {
			continue;
		}
		
		var this_benefit = _benefit[formula_id][bf];
		
		// not a number, assume it's a dictionary in the form {'default': 0, 'diabetes': 10}
		if ('number' != typeof(this_benefit)) {
			var def = 0;
			var use = null;
			for (var t in this_benefit) {
				if ('default' == t) {
					def = this_benefit[t];
				}
				else {
					var func = window[t];
					if (!func || 'function' != typeof(func)) {
						alert("The benefit for " + bf + " of type " + t + " is invalid, needs to be a function name");
					}
					else if (func()) {
						use = this_benefit[t];
						break;
					}
				}
			}
			
			this_benefit = (null !== use) ? use : def;
		}
		
		// make sure we have a number and add to our array
		if ('number' != typeof(this_benefit)) {
			console.error(this_benefit);
			alert("Not a numerical value for benefit " + bf + ": " + this_benefit);
		}
		else if (this_benefit > max) {
			max = this_benefit;
		}
	}
	
	return max;
}


/**
 *  Sets the active formula from the given element.
 */
function setFormula(item) {
	setFormulaById($(item).data('calc'));
}

/**
 *  Sets the currently active formula to the given id.
 */
function setFormulaById(formula_id) {
	if (!formula_id) {
		return;
	}
	
	_formula_id = formula_id;
	
	$('#formula_selector').find('li').removeClass('active').filter(function(index) {
		return $(this).data('calc') == _formula_id;
	}).addClass('active');
	showImages(formula_id);
	calculate(formula_id);
}


/**
 *  Calculates the currently active formula.
 */
function CALC() {
	calculate(_formula_id);
}


/**
 *  Our main calculation formula.
 */
function calculate(formula_id) {
	var OVERESTIMATE = $('#overestimate').text() *1;
	var BENE = benefit(formula_id);
	$('#benefit').text(BENE);
	var TIME = $('#time').text() *1;
	var IS_MALE = gender();
	var AGE = $('#age').text() *1;
	var BLOODP = $('#sbp').text() *1;
	var SMOKE = smoker();
	var TCHOL = $('#totalchol').val() *1;
	var HDLCHOL = $('#hdlchol').val() *1;
	var DIABETES = diabetes();
	var IVH = 0;
	
	// baseline values
	var BLOODP_A = 120;
	var SMOKE_A = 0;
	var TCHOL_A = 3;
	var HDLCHOL_A = 1.3;
	var DIABETES_A = 0;
	var IVH_A = 0;
	
	// formulas
	var badFormula = 0;
	var badFormulaBaseline = 0;
	
	// CVD
	if ('cvd' == formula_id) {
		badFormula = OVERESTIMATE*(1-Math.exp(-Math.exp((Math.log(TIME)-(18.8144+(-1.2146*(1-IS_MALE))+(-1.8443*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(0.3668*Math.log(AGE)*(1-IS_MALE))+(0*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-1.4032*Math.log(BLOODP))+(-0.3899*SMOKE)+(-0.539*Math.log(TCHOL/HDLCHOL))+(-0.3036*DIABETES)+(-0.1697*DIABETES*(1-IS_MALE))+(-0.3362*IVH)+(0*IVH*IS_MALE)))/(Math.exp(0.6536)*Math.exp(-0.2402*(18.8144+(-1.2146*(1-IS_MALE))+(-1.8443*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(0.3668*Math.log(AGE)*(1-IS_MALE))+(0*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-1.4032*Math.log(BLOODP))+(-0.3899*SMOKE)+(-0.539*Math.log(TCHOL/HDLCHOL))+(-0.3036*DIABETES)+(-0.1697*DIABETES*(1-IS_MALE))+(-0.3362*IVH)+(0*IVH*IS_MALE)))))));
		badFormulaBaseline = OVERESTIMATE*(1-Math.exp(-Math.exp((Math.log(TIME)-(18.8144+(-1.2146*(1-IS_MALE))+(-1.8443*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(0.3668*Math.log(AGE)*(1-IS_MALE))+(0*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-1.4032*Math.log(BLOODP_A))+(-0.3899*SMOKE_A)+(-0.539*Math.log(TCHOL_A/HDLCHOL_A))+(-0.3036*DIABETES_A)+(-0.1697*DIABETES_A*(1-IS_MALE))+(-0.3362*IVH_A)+(0*IVH_A*IS_MALE)))/(Math.exp(0.6536)*Math.exp(-0.2402*(18.8144+(-1.2146*(1-IS_MALE))+(-1.8443*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(0.3668*Math.log(AGE)*(1-IS_MALE))+(0*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-1.4032*Math.log(BLOODP_A))+(-0.3899*SMOKE_A)+(-0.539*Math.log(TCHOL_A/HDLCHOL_A))+(-0.3036*DIABETES_A)+(-0.1697*DIABETES_A*(1-IS_MALE))+(-0.3362*IVH_A)+(0*IVH_A*IS_MALE)))))));
	}
	
	// CHD
	else if ('chd' == formula_id) {
		badFormula = OVERESTIMATE*(1-Math.exp(-Math.exp((Math.log(TIME)-(15.5305+(28.4441*(1-IS_MALE))+(-1.4792*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(-14.4588*Math.log(AGE)*(1-IS_MALE))+(1.8515*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-0.9119*Math.log(BLOODP))+(-0.2767*SMOKE)+(-0.7181*Math.log(TCHOL/HDLCHOL))+(-0.1759*DIABETES)+(-0.1999*DIABETES*(1-IS_MALE))+(-0.5865*IVH)+(0*IVH*IS_MALE)))/(Math.exp(0.9145)*Math.exp(-0.2784*(15.5305+(28.4441*(1-IS_MALE))+(-1.4792*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(-14.4588*Math.log(AGE)*(1-IS_MALE))+(1.8515*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-0.9119*Math.log(BLOODP))+(-0.2767*SMOKE)+(-0.7181*Math.log(TCHOL/HDLCHOL))+(-0.1759*DIABETES)+(-0.1999*DIABETES*(1-IS_MALE))+(-0.5865*IVH)+(0*IVH*IS_MALE)))))));
		badFormulaBaseline = OVERESTIMATE*(1-Math.exp(-Math.exp((Math.log(TIME)-(15.5305+(28.4441*(1-IS_MALE))+(-1.4792*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(-14.4588*Math.log(AGE)*(1-IS_MALE))+(1.8515*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-0.9119*Math.log(BLOODP_A))+(-0.2767*SMOKE_A)+(-0.7181*Math.log(TCHOL_A/HDLCHOL_A))+(-0.1759*DIABETES_A)+(-0.1999*DIABETES_A*(1-IS_MALE))+(-0.5865*IVH_A)+(0*IVH_A*IS_MALE)))/(Math.exp(0.9145)*Math.exp(-0.2784*(15.5305+(28.4441*(1-IS_MALE))+(-1.4792*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(-14.4588*Math.log(AGE)*(1-IS_MALE))+(1.8515*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-0.9119*Math.log(BLOODP_A))+(-0.2767*SMOKE_A)+(-0.7181*Math.log(TCHOL_A/HDLCHOL_A))+(-0.1759*DIABETES_A)+(-0.1999*DIABETES_A*(1-IS_MALE))+(-0.5865*IVH_A)+(0*IVH_A*IS_MALE)))))));
	}
	
	// MI
	else if ('mi' == formula_id) {
		badFormula = OVERESTIMATE*(1-Math.exp(-Math.exp((Math.log(TIME)-(11.4712+(10.5109*(1-IS_MALE))+(-0.7965*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(-5.4216*Math.log(AGE)*(1-IS_MALE))+(0.7101*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-0.6623*Math.log(BLOODP))+(-0.2675*SMOKE)+(-0.4277*Math.log(TCHOL/HDLCHOL))+(-0.1534*DIABETES)+(-0.1165*DIABETES*(1-IS_MALE))+(0*IVH)+(-0.1588*IVH*IS_MALE)))/(Math.exp(3.4064)*Math.exp(-0.8584*(11.4712+(10.5109*(1-IS_MALE))+(-0.7965*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(-5.4216*Math.log(AGE)*(1-IS_MALE))+(0.7101*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-0.6623*Math.log(BLOODP))+(-0.2675*SMOKE)+(-0.4277*Math.log(TCHOL/HDLCHOL))+(-0.1534*DIABETES)+(-0.1165*DIABETES*(1-IS_MALE))+(0*IVH)+(-0.1588*IVH*IS_MALE)))))));
		badFormulaBaseline = OVERESTIMATE*(1-Math.exp(-Math.exp((Math.log(TIME)-(11.4712+(10.5109*(1-IS_MALE))+(-0.7965*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(-5.4216*Math.log(AGE)*(1-IS_MALE))+(0.7101*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-0.6623*Math.log(BLOODP_A))+(-0.2675*SMOKE_A)+(-0.4277*Math.log(TCHOL_A/HDLCHOL_A))+(-0.1534*DIABETES_A)+(-0.1165*DIABETES_A*(1-IS_MALE))+(0*IVH_A)+(-0.1588*IVH_A*IS_MALE)))/(Math.exp(3.4064)*Math.exp(-0.8584*(11.4712+(10.5109*(1-IS_MALE))+(-0.7965*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(-5.4216*Math.log(AGE)*(1-IS_MALE))+(0.7101*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-0.6623*Math.log(BLOODP_A))+(-0.2675*SMOKE_A)+(-0.4277*Math.log(TCHOL_A/HDLCHOL_A))+(-0.1534*DIABETES_A)+(-0.1165*DIABETES_A*(1-IS_MALE))+(0*IVH_A)+(-0.1588*IVH_A*IS_MALE)))))));
	}
	
	// Stroke
	else if ('stroke' == formula_id) {
		badFormula = OVERESTIMATE*(1-Math.exp(-Math.exp((Math.log(TIME)-(26.5116+(0.2019*(1-IS_MALE))+(-2.3741*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(0*Math.log(AGE)*(1-IS_MALE))+(0*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-2.4643*Math.log(BLOODP))+(-0.3914*SMOKE)+(-0.0229*Math.log(TCHOL/HDLCHOL))+(-0.3087*DIABETES)+(-0.2627*DIABETES*(1-IS_MALE))+(-0.2355*IVH)+(0*IVH*IS_MALE)))/(Math.exp(-0.4312)*Math.exp(0*(26.5116+(0.2019*(1-IS_MALE))+(-2.3741*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(0*Math.log(AGE)*(1-IS_MALE))+(0*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-2.4643*Math.log(BLOODP))+(-0.3914*SMOKE)+(-0.0229*Math.log(TCHOL/HDLCHOL))+(-0.3087*DIABETES)+(-0.2627*DIABETES*(1-IS_MALE))+(-0.2355*IVH)+(0*IVH*IS_MALE)))))));
		badFormulaBaseline = OVERESTIMATE*(1-Math.exp(-Math.exp((Math.log(TIME)-(26.5116+(0.2019*(1-IS_MALE))+(-2.3741*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(0*Math.log(AGE)*(1-IS_MALE))+(0*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-2.4643*Math.log(BLOODP_A))+(-0.3914*SMOKE_A)+(-0.0229*Math.log(TCHOL_A/HDLCHOL_A))+(-0.3087*DIABETES_A)+(-0.2627*DIABETES_A*(1-IS_MALE))+(-0.2355*IVH_A)+(0*IVH_A*IS_MALE)))/(Math.exp(-0.4312)*Math.exp(0*(26.5116+(0.2019*(1-IS_MALE))+(-2.3741*Math.log(AGE))+(0*Math.log(AGE)*Math.log(AGE))+(0*Math.log(AGE)*(1-IS_MALE))+(0*Math.log(AGE)*Math.log(AGE)*(1-IS_MALE))+(-2.4643*Math.log(BLOODP_A))+(-0.3914*SMOKE_A)+(-0.0229*Math.log(TCHOL_A/HDLCHOL_A))+(-0.3087*DIABETES_A)+(-0.2627*DIABETES_A*(1-IS_MALE))+(-0.2355*IVH_A)+(0*IVH_A*IS_MALE)))))));
	}
	
	// calculate
	var over_baseline = badFormula - badFormulaBaseline;
	var my_benefit = badFormula * BENE / 100;
	var additional = Math.max(0, over_baseline - my_benefit);
	var good = 100 - (badFormulaBaseline + my_benefit + additional).toFixed(1);
	
	// risk percentages
	$("#score_good").text(good.toFixed(1) + "%");
	$("#score_bad").text(badFormulaBaseline.toFixed(1) + "%");
	$("#score_bad_add").text(additional.toFixed(1) + "%");
	$("#score_benefits").text(my_benefit.toFixed(1) + "%");
	
	// TODO: the rounding here is wrong, it needs to be combined and then a dominant face gets to use up the space
	var numSadFaces = Math.round(badFormulaBaseline);
	var numProFaces = Math.round(my_benefit);
	var numAddFaces = Math.round(additional + my_benefit) - numProFaces;
	var totalSum = 100 - (numSadFaces + numAddFaces + numProFaces);
	
	// add the faces
	var faces = $("#faces").empty();
	
	for (var i = 0; i < numSadFaces; i++) {
		faces.prepend(newFace('bad'));
	}
	for (var i = 0; i < numAddFaces; i++) {
		faces.prepend(newFace('badA'));
	}
	for (var i = 0; i < numProFaces; i++) {
		faces.prepend(newFace('badP'));
	}
	for (var i = 0; i < totalSum; i++) {
		faces.prepend(newFace('good'));
	}
}


/**
 *  Returns a smilie face image.
 */
function newFace(type) {
	var img = new Image();
	img.src = "imgs/" + type + ".png";
	
	return img;
}


/**
 *  Changes the interface between using mmol/L and mg/dL.
 */
var _useMMOL = true;
function toggleCholesterolUnit() {
	_useMMOL = !_useMMOL;
	
	if (_useMMOL) {
		$('#input').find('.chol_toggle').text('mmol/L');
		$('#input').find('.chol_mmol').show();
		$('#input').find('.chol_mgdl').hide();
	}
	else {
		$('#input').find('.chol_toggle').text('mg/dL');
		$('#input').find('.chol_mmol').hide();
		$('#input').find('.chol_mgdl').show();
	}
	
	// update slider values
	adjust('chol', $('#totalchol'), true);
	adjust('hdl', $('#hdlchol'), true);
}


/**
 *  Shows the images for risk types.
 */
function showImages(tab) {
	return;
	var content = "";
	
 	if ('cvd' == tab) {
 		content = '<div><img src="imgs/heart_attack.jpg" />Heart Attacks</div><div><img src="imgs/heart_failure.jpg" />Heart Failure</div><div><img src="imgs/stroke.jpg" />Strokes</div><div><img src="imgs/intermittent.jpg" />Intermittent claudication</div>';
 	}
 	else if ('chd' == tab) {
 		content = '<div><img src="imgs/heart_attack.jpg" />Heart Attacks</div><div><img src="imgs/angina.jpg" />Angina</div>';
 	}
 	else if ('mi' == tab) {
 		content = '<div><img src="imgs/heart_attack.jpg" />Heart Attacks</div>';
 	}
 	else if ('stroke' == tab) {
 		content = '<div><img src="imgs/stroke.jpg" />Strokes</div>';
 	}
 	
	$("#disease").html(content);
}



/*
 *  Extending Array capabilities
 */

Array.prototype.contains = function(obj) {
	return (this.indexOf(obj) >= 0);
}

if ( ! ('indexOf' in Array.prototype)) {
	Array.prototype.indexOf = function(obj) {
		for(var i = 0; i < this.length; i++) {
			if (this[i] == obj)
				return i;
		}
		
		return -1;
	}
}
 
