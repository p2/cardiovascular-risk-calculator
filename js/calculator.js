/**
 *  Calculator functions.
 *
 *  Licensed to the Apache Software Foundation (ASF) under one
 *  or more contributor license agreements.  See the NOTICE file
 *  distributed with this work for additional information
 *  regarding copyright ownership.  The ASF licenses this file
 *  to you under the Apache License, Version 2.0 (the
 *  "License"); you may not use this file except in compliance
 *  with the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 */


$(document).ready(function() {
	if (CONVERT_SLIDERS) {		// this flag is specifically set by IE 9 and lower because we have a plugin for FireFox and don't care about old WebKit
		convertSliders();
	}
	setFormulaById('cvd');
	
	// setup offline mode
	if ('applicationCache' in window) {
		window.applicationCache.addEventListener('checking', offlineStatusChanged, false);
		window.applicationCache.addEventListener('noupdate', offlineStatusChanged, false);
		window.applicationCache.addEventListener('downloading', offlineStatusChanged, false);
		window.applicationCache.addEventListener('cached', offlineStatusChanged, false);
		window.applicationCache.addEventListener('updateready', offlineStatusChanged, false);
		window.applicationCache.addEventListener('obsolete', offlineStatusChanged, false);
		window.applicationCache.addEventListener('error', offlineStatusChanged, false);
	}
	
	// detect if we're running standalone
	// if (window.navigator.standalone)
});


 
function gender(item) {
	if (item) {
		$(item).addClass('active').siblings().removeClass('active');
	}
	
	return $('#male').hasClass('active') ? 1 : 0;
}

function race(item) {
	if (item) {
		$(item).addClass('active').siblings().removeClass('active');
	}
	return $('#black').hasClass('active') ? 1 : 0;
}

function male() {
	return 1 == gender();
}

function female() {
	return 0 == gender();
}

function black() {
	return 1 == race();
}
function nonblack() {
	return 0 == race();
}

function smoker(item) {
	if (item) {
		$(item).addClass('active').siblings().removeClass('active');
	}
	
	return $('#smoker_yes').hasClass('active') ? 1 : 0;
}

function totalchol() {
	if (_useMMOL) {
		return $('#totalchol_mmol').val() *1;
	}
	
	// 1 mmol/L == 38.666666 mg/dL
	return $('#totalchol_mgdl').val() / 38.666666;
}

function hdlchol() {
	if (_useMMOL) {
		return $('#hdlchol_mmol').val() *1;
	}
	
	// 1 mmol/L == 38.666666 mg/dL
	return $('#hdlchol_mgdl').val() / 38.666666;
}

function diabetes(item) {
	if (item) {
		$(item).addClass('active').siblings().removeClass('active');
	}
	
	return $('#diabetes_yes').hasClass('active') ? 1 : 0;
}

function systole() {
	return $('#sbp').text() *1;
}

function bptreatment(item) {
	if (item && !$(item).parent().hasClass('disabled')) {
		$(item).addClass('active').siblings().removeClass('active');
	}
	
	return $('#bptreatment_yes').hasClass('active') ? 1 : 0;
}

function adjust(elem_id, sender, no_calc) {
	adjustValue(elem_id, $(sender).val(), no_calc);
}	

function adjustValue(elem_id, value, no_calc) {
	
	// systole was adjusted, show/hide some hints
	if ('sbp' == elem_id) {
		if (value > 120) {
			$('#bptreatment_toggle').removeClass('disabled');
			$('#bptreatment_hint').hide();
		}
		else if (!$('#bptreatment_toggle').hasClass('disabled')) {
			bptreatment($('#bptreatment_no'));
			$('#bptreatment_toggle').addClass('disabled');
			$('#bptreatment_hint').show();
		}
	}
	
	// apply and calculate
	$('#' + elem_id).text(value ? Math.round(value * 10) / 10 : 0);
	
	if (!no_calc) {
		CALC();
	}
}


function toggleBenefit(elem) {
	var obj = $(elem);
	obj.toggleClass('active').siblings().removeClass('active');		// for now limited to ONE choice
	
	// find correct text or list items
	var text = '';
	if (obj.hasClass('active')) {
		var bene = obj.data('benefit');
		if (bene in _benefit_risks) {
			var res = _benefit_risks[bene];
			if ('string' == typeof(res)) {
				text = res;
			}
			else if (res && res.length > 1) {
				text = "<strong>" + res[0] + "</strong>";
				text += "<ul><li>" + res.slice(1).join("</li><li>") + "</li></ul>";
			}
		}
		else {
			alert("There is no harm information for the intervention \"" + bene + "\"");
		}
	}
	
	// show/hide information text
	$('#benefit_information').html(text);
	if (text && text.length > 0) {
		$('#benefit_information_header').show();
	}
	else {
		$('#benefit_information_header').hide();
	}
	
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
		
		// for the BP meds ("bp"), it ONLY applies if BP is "_bp_threshold" and higher
		if ('bp' == bf && systole() < _bp_threshold) {
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
	// showImages(formula_id);
	calculate(formula_id);
}


/**
 *  Calculates the currently active formula.
 */
function CALC() {
	calculate(_formula_id);
}

/**
 *  ASCVD coefficients by age/race
 */
 function BlackFemale() {
    this.Age = 17.1141;
    this.AgeSquared = 0;
    this.TC = 0.9396;
    this.AgexTC = 0;
    this.HDL = -18.9196;
    this.AgexHDL = 4.4748;
    this.TreatedBP = 29.2907;
    this.AgexTreatedBP = -6.4321;
    this.UntreatedBP = 27.8197;
    this.AgexUntreatedBP = -6.0873;
    this.Smoker = 0.6908;
    this.AgexSmoker = 0;
    this.Diabetes = 0.8738;
    this.BaselineSurvival = 0.95334;
    this.OverallMean = 86.6081;
}
function BlackMale() {
    this.Age = 2.469;
    this.AgeSquared = 0;
    this.TC = 0.302;
    this.AgexTC = 0;
    this.HDL = -0.307;
    this.AgexHDL = 0;
    this.TreatedBP = 1.916;
    this.AgexTreatedBP = 0;
    this.UntreatedBP = 1.809;
    this.AgexUntreatedBP = 0;
    this.Smoker = 0.549;
    this.AgexSmoker = 0;
    this.Diabetes = 0.645;
    this.BaselineSurvival = 0.89536;
    this.OverallMean = 19.5425;
}
function WhiteFemale() {
    this.Age = -29.799;
    this.AgeSquared = 4.884;
    this.TC = 13.54;
    this.AgexTC = -3.114;
    this.HDL = -13.578;
    this.AgexHDL = 3.149;
    this.TreatedBP = 2.019;
    this.AgexTreatedBP = 0;
    this.UntreatedBP = 1.957;
    this.AgexUntreatedBP = 0;
    this.Smoker = 7.574;
    this.AgexSmoker = -1.665;
    this.Diabetes = 0.661;
    this.BaselineSurvival = 0.96652;
    this.OverallMean = -29.1817;
}
function WhiteMale() {
    this.Age = 12.344;
    this.AgeSquared = 0;
    this.TC = 11.853;
    this.AgexTC = -2.664;
    this.HDL = -7.99;
    this.AgexHDL = 1.769;
    this.TreatedBP = 1.797;
    this.AgexTreatedBP = 0;
    this.UntreatedBP = 1.764;
    this.AgexUntreatedBP = 0;
    this.Smoker = 7.837;
    this.AgexSmoker = -1.795;
    this.Diabetes = 0.658;
    this.BaselineSurvival = 0.91436;
    this.OverallMean = 61.1816;
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
	var BLOODP = systole();
	var SMOKE = smoker();
	var TCHOL = totalchol();
	var HDLCHOL = hdlchol();
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
	
	// ASCVD
	else if ('ascvd' == formula_id) {
		var IS_BLACK = black();
		var BPTREATMENT = bptreatment();
	
		// Select the appropriate sex/race
		var coeff;
		if ((IS_MALE) && (!IS_BLACK)) { coeff = new WhiteMale(); }
		if ((!IS_MALE) && (!IS_BLACK)) { coeff = new WhiteFemale(); }
		if ((IS_MALE) && (IS_BLACK)) { coeff = new BlackMale(); }
		if ((!IS_MALE) && (IS_BLACK)) { coeff = new BlackFemale(); }
		
		badFormula = OVERESTIMATE*ASCVD10YrRisk(coeff, AGE, Math.round(TCHOL/0.0259), Math.round(HDLCHOL/0.0259), BLOODP, BPTREATMENT, DIABETES, SMOKE);
		badFormulaBaseline = OVERESTIMATE*ASCVD10YrRisk(coeff, AGE, Math.round(TCHOL_A/0.0259), Math.round(HDLCHOL_A/0.0259), BLOODP_A, 0, 0, 0);
		
	}
	
	// Do some special hide/show magic for the ASCVD calculator ...
	if ('ascvd' == formula_id) {
		$('#divRace').show();
		$('#divBPTreatment').show();
		$('#rangeTime').prop('disabled',true);
		$('#rangeTime').val(10);
		$('#rangeTime').hide();
		adjust('time', $('#rangeTime'),true);
	} else {
		$('#divRace').hide();
		$('#divBPTreatment').hide();
		$('#rangeTime').show();
		$('#rangeTime').prop('disabled',false);
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
	$("#score_nnt").text(my_benefit > 0 ? Math.round(100 / my_benefit) : "∞");
	
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

function ASCVD10YrRisk(coeff, age, TC, HDL, SBP, BPTreatment, DM, Smoker) {
	var sum = 0;
	sum += Math.log(age) * coeff.Age;
	sum += Math.pow(Math.log(age), 2) * coeff.AgeSquared;
	sum += Math.log(TC) * coeff.TC;
	sum += Math.log(age) * Math.log(TC) * coeff.AgexTC;
	sum += Math.log(HDL) * coeff.HDL;
	sum += Math.log(age) * Math.log(HDL) * coeff.AgexHDL;

	if (BPTreatment === 1) {
		sum += Math.log(SBP) * coeff.TreatedBP;
		sum += Math.log(age) * Math.log(SBP) * coeff.AgexTreatedBP;
	} else {
		//No BP treatment
		sum += Math.log(SBP) * coeff.UntreatedBP;
		sum += Math.log(age) * Math.log(SBP) * coeff.AgexUntreatedBP;
	}

	sum += Smoker * coeff.Smoker;
	sum += Smoker * Math.log(age) * coeff.AgexSmoker;
	sum += DM * coeff.Diabetes;

	return 1 - Math.pow(coeff.BaselineSurvival, Math.pow(Math.E, sum - coeff.OverallMean));
}

/**
 *  Returns a smilie face image.
 */
function newFace(type) {
	var retina = false;
	if ('devicePixelRatio' in window) {
		retina = (window.devicePixelRatio > 1);
	}
	
	var img = new Image();
	img.src = "imgs/" + type + (retina ? '@2x' : '') + ".png";
	
	return img;
}


/**
 *  Changes the interface between using mmol/L and mg/dL.
 */
var _useMMOL = true;
function toggleCholesterolUnit() {
	_useMMOL = !_useMMOL;
	
	var factor = 38.666666;
	if (_useMMOL) {
		$('#input').find('.chol_mmol').show();
		$('#input').find('.chol_mgdl').hide();
		
		var total = Math.round($('#totalchol_mgdl').val() / factor * 10) / 10;		// increments by 0.1
		$('#totalchol_mmol').val(total);
		adjustValue('chol_mmol', total, true);
		
		var hdl = Math.round($('#hdlchol_mgdl').val() / factor * 10) / 10;
		$('#hdlchol_mmol').val(hdl);
		adjustValue('hdl_mmol', hdl, true);
	}
	else {
		$('#input').find('.chol_mmol').hide();
		$('#input').find('.chol_mgdl').show();
		
		var total = Math.round($('#totalchol_mmol').val() * factor / 2) * 2;		// increments by 2
		$('#totalchol_mgdl').val(total);
		adjustValue('chol_mgdl', total, true);
		
		var hdl = Math.round($('#hdlchol_mmol').val() * factor / 2) * 2;
		$('#hdlchol_mgdl').val(hdl);
		adjustValue('hdl_mgdl', hdl, true);
	}
}


/**
 *  Shows the images for risk types.
 */
function showImages(tab) {
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




/**
 *  Convert sliders on IE9 and lower.
 *  We don't target FireFox because we use html5slider.js and we don't care about old WebKit browsers.
 */
function convertSliders() {			
	$('input[type=range]').each(function(idx, obj) {
		$(obj)
		.keyup(function(e) {
			var slider = $(e.target);
			var min = 1*slider.attr('min2');
			var max = 1*slider.attr('max');
			var val = slider.val();
			
			// check bounds
			if (undefined !== min && val < min) {
				slider.val(min);
			}
			if (undefined !== max && val > max) {
				slider.val(max);
			}
			
			// calculate score
			CALC();
		})
		.css('width', '30%')
		.next('b').hide();
	});
}


function offlineHint() {
	alert("This calculator can be used while offline.\n\nOn portable devices you may create a home screen icon for quick access, the calculator will act as if it was an App.");
}

function offlineStatusChanged(event) {
	var text = "Available offline";
	if ('checking' == event.type || 'downloading' == event.type) {
		text = "Cache " + event.type + "...";
	}
	$('#cache_status').removeClass('error').text(text);
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
 
