/*
	LOCALIZATION SUPPORT
	
	The following variables are modified based on language selected:
		_alerts
		_benefit_risks
	
	Each language (JSON object) needs to have the following properties:
		'language' -- this must correspond to the <select> tag and the parameter passed to LoadLocalizationData() on page load
		'_html_localization' -- array holding key/value pairs for 'data-lang-id' and its localization-based value
		
	Any link with a CSS class of 'localize' will be given a URL parameter if the language is not English
*/

var _alerts;
var _benefit_risks;
var current_language = 'en';

// Localization Settings
var localization_debug_checkEnglishDiscrepancies = false;
var localization_debug_noItemExists = false;
var localization_debug_noItemValueExists = false;
var localization_debug_checkDuplicateKeys = false;

var localizations = {
	// English
	'en': {
		'_alerts': {
					'age': {
						'alert_id': 'alert_age',
						'label': 'Age',
						'suffix': 'years'
					},
					'sbp': {
						'alert_id': 'alert_sbp',
						'label': 'Systolic BP',
						'suffix': 'mmHg'
					},
					'time': {
						'alert_id': 'alert_time',
						'label': 'Risk time period',
						'suffix': 'years'
					},
					'tchol': {
						'alert_id': 'alert_tchol',
						'label': 'Total cholesterol',
						'suffix': ''
					},
					'hdl': {
						'alert_id': 'alert_hdl',
						'label': 'HDL cholesterol',
						'suffix': ''
					},
					'height': {
						'alert_id': 'alert_height',
						'label': 'Height',
						'suffix': ''
					},
					'weight': {
						'alert_id': 'alert_weight',
						'label': 'Weight',
						'suffix': ''
					},
					'overestimate': {
						'alert_id': 'alert_overestimate',
						'label': 'Risk adjustment',
						'suffix': '%'
					}
				},
		'_benefit_risks': {
					'activity': "Potential for activity-related injury<br><h3>Additional Benefits</h3><ul><li>Less depression</li><li>Improves sleep quality</li><li>Improves OA pain and function</li></ul>",
					'meddiet': "No real harms",
					'vitaomeg': [
						"Vitamin A and E have evidence for increased mortality",
						"Drug Cost"
					],
					'bp': [
						"Types of side effects vary between drugs",
						"Having to stop drug due to intolerability NNH 10",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'statins_lowmod': [
						"Muscle aches and stiffness NNH 10-20 (similar to placebo in most studies)",
						"Increased liver function tests (3x normal) NNH 250",
						"Severe muscle/kidney damage NNH 10,000",
						"Nausea, constipation, diarrhea",
						"Drug Cost"
					],
					'statins_high': [
						"Muscle aches and stiffness NNH 10-20 (similar to placebo in most studies)",
						"Increased liver function tests (3x normal) NNH 150",
						"Severe muscle/kidney damage NNH 10,000",
						"Nausea, constipation, diarrhea",
						"Drug Cost"
					],
					'fibrates': [
						"Nausea, abdominal pain, flatulence",
						"Increased risk of muscle damage when combined with statins",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'niacin': [
						"Flushing/itching NNH 20",
						"Increased glucose NNH 100",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'ezetimibe': [
						"Headache, diarrhea",
						"Muscle aches",
						"Increased liver function tests",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'sulfonylureas': [
						"Severe low blood sugar (yearly) NNH 175",
						"Weight gain - average 2 kg",
						"Rash, diarrhea",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'insulins': [
						"Severe low blood sugar (yearly) NNH 85",
						"Weight gain - average 2 kg",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost",
					],
					'metformin': [
						"Indigestion, nausea, diarrhea",
						"Lactic acidosis - inconclusive evidence",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'glitazones': [
						"Fluid retention/heart failure NNH 25",
						"Fractures (three years) NNH 85",
						"Weight gain - average 2kg",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'glp': [
						"Nausea, vomiting, diarrhea NNH 10-20",
						"Weight loss - average 2 kg",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'dpp-4': [
						"Hives, rash",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'meglit': [
						"Hypoglycemia",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'sglt': [
						"Genital infections NNH 15",
						"Inconvenience of surrogate remeasurements",
						"Drug Cost"
					],
					'smoking': [
						"No Harms",
					],
					'asa': [
						"Major bleed (yearly) NNH 200",
						"Drug Cost"
					]
				},
		'_html_localization': [
			{'id': 'languages', 'value': 'Languages'},
			{'id': 'pageHeading', 'value': 'The Absolute CVD Risk/Benefit Calculator'},
			{'id': 'FraminghamCriteria', 'value': 'Heart attacks + angina/coronary insufficiency + heart failure + strokes + intermittent claudication'},
			{'id': 'QriskCriteria', 'value': 'Heart attacks + strokes<br />&nbsp;'},
			{'id': 'AscvdCriteria', 'value': 'CHD death + nonfatal heart attacks <br />+ fatal/nonfatal strokes'},
			{'id': 'Age', 'value': 'Age'},
			{'id': 'years', 'value': 'years'},
			{'id': 'Gender', 'value': 'Gender'},
			{'id': 'Male', 'value': 'Male'},
			{'id': 'Female', 'value': 'Female'},
			{'id': 'Race', 'value': 'Race'},
			{'id': 'Black', 'value': 'Black'},
			{'id': 'Non-Black', 'value': 'Non-Black'},
			{'id': 'Ethnicity', 'value': 'Ethnicity'},
			{'id': 'WhiteOrNotStated', 'value': 'White or not stated'},
			{'id': 'Indian', 'value': 'Indian'},
			{'id': 'Pakistani', 'value': 'Pakistani'},
			{'id': 'Bangladeshi', 'value': 'Bangladeshi'},
			{'id': 'OtherAsian', 'value': 'Other Asian'},
			{'id': 'BlackCaribbean', 'value': 'Black Caribbean'},
			{'id': 'BlackAfrican', 'value': 'Black African'},
			{'id': 'Chinese', 'value': 'Chinese'},
			{'id': 'OtherEthnicGroup', 'value': 'Other ethnic group'},
			{'id': 'Smoker', 'value': 'Smoker'},
			{'id': 'Yes', 'value': 'Yes'},
			{'id': 'No', 'value': 'No'},
			{'id': 'SmokingReversal', 'value': 'CVD risk is reversed after 5-10 years of no smoking'},
			{'id': 'NonSmoker', 'value': 'Non-smoker'},
			{'id': 'ExSmoker', 'value': 'Ex-smoker'},
			{'id': 'LessThan10Cig', 'value': 'Less than 10 cig/day'},
			{'id': '10to19Cig', 'value': '10 to 19 cig/day'},
			{'id': '20MoreCig', 'value': '20 or more cig/day'},
			{'id': 'Diabetes', 'value': 'Diabetes'},
			{'id': 'Type1', 'value': 'Type 1'},
			{'id': 'Type2', 'value': 'Type 2'},
			{'id': 'SystolicBP', 'value': 'Systolic Blood Pressure'},
			{'id': 'BpBaselineRisk', 'value': '120 mmHg is used for baseline risk'},
			{'id': 'BpTreatmentDisclaimer', 'value': 'Enter present blood pressure regardless of treatment'},
			{'id': 'BpTreatmentClickYes', 'value': 'Click YES if taking blood pressure medication'},
			{'id': 'OnBpTreatment', 'value': 'On treatment for BP'},
			{'id': 'BpAppliesGreater120', 'value': 'Only applies if SBP is greater than 120 mmHg'},
			{'id': 'TotalCholesterol', 'value': 'Total Cholesterol'},
			{'id': 'CholesterolPriorToDrugs', 'value': 'Cholesterol should be prior to drug treatment'},
			{'id': 'CholesterolBaselineRisk_mmol', 'value': '3 mmol/L is used for baseline risk.<br /><a href="javascript:void(0);" onclick="toggleCholesterolUnit()">Click to change to mg/dL.</a>'},
			{'id': 'CholesterolBaselineRisk_mg', 'value': '116 mg/dL is used for baseline risk.<br /><a href="javascript:void(0);" onclick="toggleCholesterolUnit()">Click to change to mmol/L.</a>'},
			{'id': 'HdlCholesterol', 'value': 'HDL Cholesterol'},
			{'id': 'HdlPriorToDrugs', 'value': 'HDL should be prior to drug treatment'},
			{'id': 'HdlBaselineRisk_mmol', 'value': '1.3 mmol/L is used for baseline risk.'},
			{'id': 'HdlBaselineRisk_mg', 'value': '50 mg/dL is used for baseline risk.'},
			{'id': 'FamilyHistory', 'value': 'Family History of CVD'},
			{'id': 'FamilyHistoryDefinition', 'value': 'Angina or heart attack in a 1<sup>st</sup> degree relative &lt; 60 yrs'},
			{'id': 'CKD', 'value': 'Chronic Kidney Disease'},
			{'id': 'AFib', 'value': 'Atrial Fibrillation'},
			{'id': 'RA', 'value': 'Rheumatoid Arthritis'},
			{'id': 'Height', 'value': 'Height'},
			{'id': 'Weight', 'value': 'Weight'},
			{'id': 'BMI', 'value': 'BMI'},
			{'id': 'BmiBaselineRisk', 'value': 'BMI of 25 kg/m<sup>2</sup> for baseline risk'},
			{'id': 'FamilyHistoryEarlyCHD', 'value': 'Family History of Early CHD'},
			{'id': 'EarlyFamilyHistory_Amount', 'value': 'The amount of <u>additional</u> risk (relative increase in risk) conferred from a family member to a patient depends on: (1) how close a relative, (2) age of a relative, (3) number of affected family members.'},
			{'id': 'AdditionalRisk', 'value': 'additional risk'},
			{'id': 'EarlyFamilyHistory_Mother', 'value': 'If mother (&lt; 65 yrs) increase risk 60%'},
			{'id': 'EarlyFamilyHistory_Father', 'value': 'If father (&lt; 55 yrs) increase risk 75%'},
			{'id': 'RelativeBenefitWithDoubleSpace', 'value': 'Relative Benefit:&nbsp;&nbsp;'},
			{'id': 'BenefitSurrogate', 'value': 'Benefit often has <i>nothing</i> to do with the effect on the surrogate marker. At present, you can only select one intervention at a time.'},
			{'id': 'PhysicalActivity', 'value': 'Physical Activity'},
			{'id': 'MedDiet', 'value': 'Mediterranean Diet vs Low fat'},
			{'id': 'VitaOmega', 'value': 'Vitamin/Omega-3 supplements'},
			{'id': 'BPNotBadDrugs', 'value': 'BP meds (not atenolol/doxazosin)'},
			{'id': 'StatinLowMod', 'value': 'Low-mod intensity statins'},
			{'id': 'StatinHigh', 'value': 'High intensity statins'},
			{'id': 'Fibrates', 'value': 'Fibrates'},
			{'id': 'Niacin', 'value': 'Niacin'},
			{'id': 'Ezetimibe', 'value': 'Ezetimibe'},
			{'id': 'Metformin', 'value': 'Metformin'},
			{'id': 'Sulfonylureas', 'value': 'Sulfonylureas'},
			{'id': 'Insulins', 'value': 'Insulins'},
			{'id': 'Glitazones', 'value': 'Glitazones'},
			{'id': 'GLPs', 'value': 'GLPs'},
			{'id': 'DPP-4s', 'value': 'DPP-4s'},
			{'id': 'Meglitinides', 'value': 'Meglitinides'},
			{'id': 'SGLT2', 'value': 'SGLT2'},
			{'id': 'SmokingCessation', 'value': 'Smoking Cessation'},
			{'id': 'Aspirin', 'value': 'ASA'},
			{'id': 'BenefitEstimateDetails', 'value': 'Benefit Estimate Details'},
			{'id': 'RiskTimePeriod', 'value': 'Risk Time Period'},
			{'id': '10years', 'value': '10 years'},
			{'id': 'NoEvent', 'value': 'No event'},
			{'id': 'TotalWithEvent', 'value': 'Total with an event'},
			{'id': 'NumWhoBenefitWithTx', 'value': 'Number who benefit from treatment'},
			{'id': 'NNT', 'value': 'NNT'},
			{'id': 'NumNeededTreat', 'value': 'Number needed to treat'},
			{'id': 'BaselineEvents', 'value': 'Baseline events using baseline factors alone'},
			{'id': 'AdditionalEvents', 'value': 'Additional events “caused” by risk factors'},
			{'id': 'PlusMinus5', 'value': 'As with all risk calculators, calculated risk numbers are +/- 5% at best. <a class="infoT various localize" href="FAQ.html#percentage" target="_blank">More information</a>.'},
			{'id': 'QriskDisclaimer', 'value': 'See the <a href="FAQ.html#QRISK">QRISK<sup>&reg;</sup>2 disclaimer</a> for more information.'},
			{'id': 'SwitchBasicView', 'value': 'Switch to "Basic" View'},
			{'id': 'Feedback', 'value': 'Please provide feedback to <a href="mailto:james.mccormack@ubc.ca">james.mccormack@ubc.ca</a>'},
			{'id': 'FAQ', 'value': 'For more detailed information and acronym definitions etc see the <a href="FAQ.html#calculator" target="_blank" class="localize">FAQ</a>'},
			{'id': 'Caveats', 'value': 'For important calculator caveats click <a href="Caveats.html#calculator" target="_blank" class="localize">here</a>'},
			{'id': 'OfflineHint', 'value': 'Available offline'},
			{'id': 'SwitchEnhanced', 'value': 'Switch to "Enhanced" View'},
			{'id': 'NA', 'value': 'N/A'},
			{'id': 'Variable', 'value': 'Variable'},
			{'id': 'MustBeBetween', 'value': 'must be between'},
			{'id': 'and', 'value': 'and'},
			{'id': 'HarmOfIntervention', 'value': 'Harm Of Intervention'},
			{'id': 'NotDefined', 'value': 'not defined'},			
			{'id': 'Framingham2008AgeWarning', 'value': 'Age must be between 30 and 74 years for Framingham'},
			{'id': 'Framingham2008BpWarning', 'value': 'Systolic BP must be between 90 and 200 mmHg for Framingham'},
			{'id': 'Framingham2008HdlWarning', 'value': 'HDL cholesterol must be between 10 and 100 mg/dL for Framingham'},
			{'id': 'Framingham2008TCWarning', 'value': 'Total cholesterol must be between 100 and 405 mg/dL for Framingham'},
			{'id': 'QriskAgeWarning', 'value': 'Age must be between 25 and 84 years for QRISK'},
			{'id': 'QriskBmiWarning', 'value': 'BMI must be between 20 and 40 kg/m<sup>2</sup> for QRISK'},
			{'id': 'QriskBpWarning', 'value': 'Systolic BP must be between 70 and 210 mmHg for QRISK'},
			{'id': 'QriskCholRatioWarning', 'value': 'Total:HDL cholesterol ratio must be between 1 and 12 for QRISK'},
			{'id': 'entered', 'value': 'entered'},
			{'id': 'OfflineInfo', 'value': 'This calculator can be used while offline.\n\nOn portable devices you may create a home screen icon for quick access, the calculator will act as if it was an App.'},
			{'id': 'Cache', 'value': 'Cache'},
			{'id': 'PrintReport', 'value': 'Print Report'},
			{'id': 'CalculationDetails', 'value': 'Calculation Details'},
			{'id': 'RiskCalculationMethod', 'value': 'Risk Calculation Method'},
			{'id': 'ReturnToCalculator', 'value': 'Return to Calculator'},
			{'id': 'ReportGeneratedFrom', 'value': 'Report generated by http://cvdcalculator.com'},
			{'id': 'CkdExplanation', 'value': 'CKD status is not part of the risk algorithm but is used for calculating the benefit of certain therapies'},
			{'id': 'FrenchContribution', 'value': 'The French translation of this tool was made possible through the work of Dr. Thériault Guylène public health medical officer (CISSS Outaouais), Jane Zhang medical student, and Michal Iglewski Professor Department of Computer Science and Engineering of Université du Québec en Outaouais.'}
		]
	},
	
	// French
	'fr': {
		'_alerts': {
					'age': {
						'alert_id': 'alert_age',
						'label': 'Âge',
						'suffix': 'années'
					},
					'sbp': {
						'alert_id': 'alert_sbp',
						'label': 'Pression artérielle systolique',
						'suffix': 'mmHg'
					},
					'time': {
						'alert_id': 'alert_time',
						'label': 'Durée de la période de risque',
						'suffix': 'années'
					},
					'tchol': {
						'alert_id': 'alert_tchol',
						'label': 'Cholestérol total',
						'suffix': ''
					},
					'hdl': {
						'alert_id': 'alert_hdl',
						'label': 'Cholestérol HDL',
						'suffix': ''
					},
					'height': {
						'alert_id': 'alert_height',
						'label': 'Taille',
						'suffix': ''
					},
					'weight': {
						'alert_id': 'alert_weight',
						'label': 'Poids',
						'suffix': ''
					},
					'overestimate': {
						'alert_id': 'alert_overestimate',
						'label': 'Ajustement des risques',
						'suffix': '%'
					}
				},
		'_benefit_risks': {
				  'activity': "Risque potentiel de blessures liées aux activités<br><h3>Bénéfices additionnels</h3><ul><li>Moins de dépression</li><li>Amélioration de la qualité du sommeil</li><li>Amélioration fonctionnelle et de la douleur liée à l'arthrose</li></ul>",
				  'meddiet': "Pas d'effets délétères",
				  'vitaomeg': [
					"Les études montrent une augmentation de la mortalité avec des suppléments de vitamine A et E",
					"Coût des médicaments"
				  ],
				  'bp': [
					"Le type d'effets secondaires varie selon les médicaments",
					"Médicament cessé à cause d'intolérance NNH=10",
					"Inconvénients en lien avec les mesures répétées de paramètres de substitution",
					"Coût des médicaments"
				  ],
				  'statins_lowmod': [
					"Douleurs musculaires et raideur NNH 10-20 (similaire à un placebo dans la majorité des études)",
					"Augmentation des enzymes hépatiques (3X la normale) NNH 250",
					"Dommages musculaire ou rénal grave NNH 10,000",
					"Nausée, constipation, diarrhée",
					"Coût des médicaments"
				  ],
				  'statins_high': [
					"Douleurs musculaires et raideur NNH 10-20 (similaire à un placebo)",
					"augmentation des enzymes hépatiques (3X la normale) NNH 150",
					"Dommages musculaire ou rénal sévère NNH 10,000",
					"Nausée, constipation, diarrhée",
					"Coût des médicaments"
				  ],
				  'fibrates': [
					"Nausée, douleur abdominale, flatulence",
					"Augmentation du risque de dommage musculaire si combiné avec une statine",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments"
				  ],
				  'niacin': [
					"Bouffées vasomotrices/prurit NNH 20",
					"Augmentation de la glycémie NNH 100",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments"
				  ],
				  'ezetimibe': [
					"Céphalée, diarrhée",
					"Douleurs musculaires",
					"Augmentation des enzymes hépatiques",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments"
				  ],
				  'sulfonylureas': [
					"Hypoglycémie grave NNH 175 (annuellement)",
					"Gain de poids - moyenne de 2 kg",
					"Érythème cutané, diarrhée",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments"
				  ],
				  'insulins': [
					"Hypoglycémie sévère NNH 85 (annuellement)",
					"Gain de poids – moyenne de 2 kg",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments",
				  ],
				  'metformin': [
					"Indigestion, nausée, diarrhée",
					"Acidose lactique – données non-concluantes",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments"
				  ],
				  'glitazones': [
					"Rétention liquidienne/insuffisance cardiaque NNH 25",
					"Fractures NNH 85 (sur 3 ans)",
					"Gain de poids - moyenne de 2 kg",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments"
				  ],
				  'glp': [
					"Nausée, vomissement, diarrhée NNH 10-20",
					"Perte de poids - moyenne de 2 kg",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments"
				  ],
				  'dpp-4': [
					"Urticaire, erythème cutané",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments"
				  ],
				  'meglit': [
					"Hypoglycémie",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments"
				  ],
				  'sglt': [
					"Infections génitales NNH 15",
					"Inconvénients en lien avec les mesures répétées de marqueurs de substitution",
					"Coût des médicaments"
				  ],
				  'smoking': [
					"Pas d'effets délétères",
				  ],
				  'asa': [
					"Saignement grave NNH 200 (annuellement)",
					"Coût des médicaments"
				  ]
				},
		'_html_localization': [
			{'id': 'languages', 'value': 'Langues'},
			{'id': 'pageHeading', 'value': 'Calculatrice des bénéfices et des risques absolus de maladies cardiovasculaires'},
			{'id': 'FraminghamCriteria', 'value': 'Infarctus + angine / insuffisance coronarienne + insuffisance cardiaque + accident vasculaire cérébral (AVC) + claudication intermittente'},
			{'id': 'QriskCriteria', 'value': 'Infarctus + AVC<br />&nbsp;'},
			{'id': 'AscvdCriteria', 'value': 'Décès par maladie coronarienne + infarctus non mortel + AVC mortel/non mortel'},
			{'id': 'Age', 'value': 'Âge'},
			{'id': 'years', 'value': 'années'},
			{'id': 'Gender', 'value': 'Sexe'},
			{'id': 'Male', 'value': 'Homme'},
			{'id': 'Female', 'value': 'Femme'},
			{'id': 'Race', 'value': 'Race'},
			{'id': 'Black', 'value': 'Noir'},
			{'id': 'Non-Black', 'value': 'Non-Noir'},
			{'id': 'Ethnicity', 'value': 'Origine ethnique'},
			{'id': 'WhiteOrNotStated', 'value': 'Blanc ou non défini'},
			{'id': 'Indian', 'value': 'Indien'},
			{'id': 'Pakistani', 'value': 'Pakistanais'},
			{'id': 'Bangladeshi', 'value': 'Bangladeshi'},
			{'id': 'OtherAsian', 'value': 'Autres asiatiques'},
			{'id': 'BlackCaribbean', 'value': 'Noir des Caraïbes'},
			{'id': 'BlackAfrican', 'value': 'Noir d\'Afrique'},
			{'id': 'Chinese', 'value': 'Chinois'},
			{'id': 'OtherEthnicGroup', 'value': 'Autre groupe ethnique'},
			{'id': 'Smoker', 'value': 'Fumeur'},
			{'id': 'Yes', 'value': 'Oui'},
			{'id': 'No', 'value': 'Non'},
			{'id': 'SmokingReversal', 'value': 'Le risque de maladie cardiovasculaire revient au risque de base  5-10 ans après avoir arrêté de fumer.'},
			{'id': 'NonSmoker', 'value': 'Non-fumeur'},
			{'id': 'ExSmoker', 'value': 'Ex-fumeur'},
			{'id': 'LessThan10Cig', 'value': 'Moins de 10 cig/jour'},
			{'id': '10to19Cig', 'value': '10-19 cig/jour'},
			{'id': '20MoreCig', 'value': '20 cig/jour ou plus'},
			{'id': 'Diabetes', 'value': 'Diabète'},
			{'id': 'Type1', 'value': 'Type 1'},
			{'id': 'Type2', 'value': 'Type 2'},
			{'id': 'SystolicBP', 'value': 'Pression artérielle systolique'},
			{'id': 'BpBaselineRisk', 'value': 'Une pression artérielle de 120 mmHg est utilisée pour déterminer le risque de base'},
			{'id': 'BpTreatmentDisclaimer', 'value': 'Entrez la pression artérielle actuelle quel que soit le traitement'},
			{'id': 'BpTreatmentClickYes', 'value': 'Cliquez sur OUI si vous prenez des médicaments'},
			{'id': 'OnBpTreatment', 'value': 'Traité pour hypertension artérielle'},
			{'id': 'BpAppliesGreater120', 'value': 'S\'applique uniquement si la TA systolique est supérieure à 120 mmHg'},
			{'id': 'TotalCholesterol', 'value': 'Cholestérol total'},
			{'id': 'CholesterolPriorToDrugs', 'value': 'La valeur du cholestérol doit être celle mesurée avant le traitement médicamenteux'},
			{'id': 'CholesterolBaselineRisk_mmol', 'value': 'Une valeur de 3 mmol/L est utilisée pour déterminer le risque de base.<br /><a href="javascript:void(0);" onclick="toggleCholesterolUnit()">Cliquez pour changer en mg/dL.</a>'},
			{'id': 'CholesterolBaselineRisk_mg', 'value': 'Une valeur de 116 mg/dL est utilisée pour déterminer le risque de base.<br /><a href="javascript:void(0);" onclick="toggleCholesterolUnit()">Cliquez pour changer en mmol/L.</a>'},
			{'id': 'HdlCholesterol', 'value': 'Cholestérol HDL'},
			{'id': 'HdlPriorToDrugs', 'value': 'La valeur du HDL doit être celle mesurée avant le traitement médicamenteux'},
			{'id': 'HdlBaselineRisk_mmol', 'value': 'Une valeur de 1,3 mmol/L est utilisée pour déterminer le risque de base.'},
			{'id': 'HdlBaselineRisk_mg', 'value': 'Une valeur de 50 mg/dL est utilisée pour déterminer le risque de base.'},
			{'id': 'FamilyHistory', 'value': 'Antécédents familiaux de maladies cardiaques'},
			{'id': 'FamilyHistoryDefinition', 'value': 'Angine ou infarctus chez un membre de la famille du premier degré à &lt;60 ans'},
			{'id': 'CKD', 'value': 'Maladie rénale chronique'},
			{'id': 'AFib', 'value': 'Fibrillation auriculaire'},
			{'id': 'RA', 'value': 'Polyarthrite rhumatoïde'},
			{'id': 'Height', 'value': 'Taille'},
			{'id': 'Weight', 'value': 'Poids'},
			{'id': 'BMI', 'value': 'IMC'},
			{'id': 'BmiBaselineRisk', 'value': 'Un IMC de 25 kg/m<sup>2</sup> est utilisé pour déterminer le risque de base'},
			{'id': 'FamilyHistoryEarlyCHD', 'value': 'Antécédents familiaux de coronaropathie précoce'},
			{'id': 'EarlyFamilyHistory_Amount', 'value': 'Le risque <u>supplémentaire</u> (augmentation relative du risque) résultant d\'antédédents familaux varie selon: (1) la proximité dans l\'arbre généalogique, (2) l\'âge du membre de la famille, (3) le nombre de membres de la famille touchés.'},
			{'id': 'AdditionalRisk', 'value': 'risque supplémentaire'},
			{'id': 'EarlyFamilyHistory_Mother', 'value': 'Si la mère (&lt; 65 ans) est atteinte, mettre le curseur de risque à 60%'},
			{'id': 'EarlyFamilyHistory_Father', 'value': 'Si le père (&lt; 55 ans) est atteint, mettre le curseur de risque à 75%'},
			{'id': 'RelativeBenefitWithDoubleSpace', 'value': 'Bénéfice relatif&nbsp;:&nbsp;&nbsp;'},
			{'id': 'BenefitSurrogate', 'value': 'Souvent le bénéfice réel pour le patient n\'est pas associé avec l\'effet sur un paramètre biologique ou physiopathologique de substitution (TA ou cholestérol, par exemple) . À l\'heure actuelle, vous ne pouvez sélectionner qu\'une intervention à la fois.'},			
			{'id': 'PhysicalActivity', 'value': 'Activité physique'},
			{'id': 'MedDiet', 'value': 'Diète méditerranéenne vs à faible teneur en gras'},
			{'id': 'VitaOmega', 'value': 'Suppléments de vitamines / oméga-3'},
			{'id': 'BPNotBadDrugs', 'value': 'Traitement pour la TA (autre que aténolol/doxasosine)'},
			{'id': 'StatinLowMod', 'value': 'Statines d\'intensité faible ou modérée'},
			{'id': 'StatinHigh', 'value': 'Statines à haute intensité'},
			{'id': 'Fibrates', 'value': 'Fibrates'},
			{'id': 'Niacin', 'value': 'Niacine'},
			{'id': 'Ezetimibe', 'value': 'Ézétimibe'},
			{'id': 'Metformin', 'value': 'Metformine'},
			{'id': 'Sulfonylureas', 'value': 'Sulfonylurées'},
			{'id': 'Insulins', 'value': 'Insulines'},
			{'id': 'Glitazones', 'value': 'Glitazones'},
			{'id': 'GLPs', 'value': 'GLP-1'},
			{'id': 'DPP-4s', 'value': 'DPP-4s'},
			{'id': 'Meglitinides', 'value': 'Meglitinides'},
			{'id': 'SGLT2', 'value': 'SGLT2'},
			{'id': 'SmokingCessation', 'value': 'Arrêt tabagique'},
			{'id': 'Aspirin', 'value': 'ASA'},
			{'id': 'BenefitEstimateDetails', 'value': 'Précisions sur l\'estimation des bénéfices'},
			{'id': 'RiskTimePeriod', 'value': 'Durée de la période de risque'},
			{'id': '10years', 'value': '10 années'},
			{'id': 'NoEvent', 'value': 'Pas d\'évènement'},
			{'id': 'TotalWithEvent', 'value': 'Total avec un événement'},
			{'id': 'NumWhoBenefitWithTx', 'value': 'Nombre de personnes bénéficiant d\'un traitement'},
			{'id': 'NNT', 'value': 'NNT'},
			{'id': 'NumNeededTreat', 'value': 'Nombre de personnes à traiter'},
			{'id': 'BaselineEvents', 'value': 'Événements calculés selon le risque de base seulement'},
			{'id': 'AdditionalEvents', 'value': 'Événements supplémentaires "causés" par les facteurs de risque'},
			{'id': 'PlusMinus5', 'value': 'Comme pour toutes les calculatrices de risque, la précision de l\'estimation du risque varie au moins de +/- 5%. <a class="infoT various localize" href="FAQ.html#percentage" target="_blank"><br/>Plus d\'informations.</a>.'},
			{'id': 'QriskDisclaimer', 'value': 'Voir l\'avertissement <a href="FAQ.html#QRISK">QRISK<sup>&reg;</sup>2</a> pour plus d\'informations.'},
			{'id': 'SwitchBasicView', 'value': 'Changer pour l\'affichage de base'},
			{'id': 'Feedback', 'value': 'Pour tous commentaires, contactez <a href="mailto:james.mccormack@ubc.ca">james.mccormack@ubc.ca</a>'},
			{'id': 'FAQ', 'value': 'Pour des informations supplémentaires et les définitions des acronymes, voir la <a href="FAQ.html#calculator" target="_blank" class="localize">page</a> sur les questions fréquemment posées'},
			{'id': 'Caveats', 'value': 'Pour les mises en garde, cliquez <a href="Caveats.html#calculator" target="_blank" class="localize">ici</a>'},
			{'id': 'OfflineHint', 'value': 'Disponible hors-ligne'},
			{'id': 'SwitchEnhanced', 'value': 'Changer pour l\'affichage plus complet'},
			{'id': 'NA', 'value': 'N/A'},	
			{'id': 'Variable', 'value': 'Variable'},
			{'id': 'MustBeBetween', 'value': 'doit être comprise entre'},
			{'id': 'and', 'value': 'et'},
			{'id': 'HarmOfIntervention', 'value': 'Effets délétères des interventions'},
			{'id': 'NotDefined', 'value': 'non défini'},
			{'id': 'Framingham2008AgeWarning', 'value': 'L\'âge doit être compris entre 30 et 74 ans pour la calculatrice Framingham'},
			{'id': 'Framingham2008BpWarning', 'value': 'La TA systolique doit être comprise entre 90 et 200 mmHg pour la calculatrice Framingham'},
			{'id': 'Framingham2008HdlWarning', 'value': 'Le cholestérol HDL doit être compris entre 10 et 100 mg/dL pour la calculatrice Framingham'},
			{'id': 'Framingham2008TCWarning', 'value': 'Le cholestérol total doit être compris entre 100 et 405 mg/dL pour la calculatrice Framingham'},			
			{'id': 'QriskAgeWarning', 'value': 'L\’âge doit être compris entre 25 et 84 ans pour la calculatrice QRISK'},
			{'id': 'QriskBmiWarning', 'value': 'L\’IMC doit être compris entre  20 et 40 kg/m2 pour la calculatrice QRISK'},
			{'id': 'QriskBpWarning', 'value': 'La TA systolique doit être comprise entre 70 et 210 mmHg pour la calculatrice QRISK'},
			{'id': 'QriskCholRatioWarning', 'value': 'Le ratio cholestérol total:HDL doit être compris entre 1 et 12 pour la calculatrice QRISK'},
			{'id': 'entered', 'value': 'entré'},
			{'id': 'OfflineInfo', 'value': 'Cette calculatrice peut être utilisée sans connection Internet. Sur des appareils portables, il est possible de créer un icône pour un accès rapide. De cette façon, la calculatrice fonctionne comme une application.'},
			{'id': 'Cache', 'value': 'En cache'},
			{'id': 'PrintReport', 'value': 'Imprimer le résultat'},
			{'id': 'CalculationDetails', 'value': 'Détails du calcul'},
			{'id': 'RiskCalculationMethod', 'value': 'Méthode de calcul du risque'},
			{'id': 'ReturnToCalculator', 'value': 'Retour à la calculatrice'},
			{'id': 'ReportGeneratedFrom', 'value': 'Résultat généré par  http://cvdcalculator.com'},
			{'id': 'FrenchContribution', 'value': 'La version francophone de cet outil fut rendue possible grâce au travail de Dr Guylène Thériault médecin conseil en santé publique (CISSS de l\'Outaouais), Jane Zhang étudiante en médecine et Michal Iglewski professeur au département d\'informatique et d\'ingénierie de l\'Université du Québec en Outaouais'},
			{'id': 'CkdExplanation', 'value': 'État de maladie rénale chronique ne fait pas partie de l\'algorithme de risque, mais est utilisé pour le calcul du bénéfice de certaines thérapies'}
		]
	},
	
	'ru': {
		'_alerts': {
					'age': {
						'alert_id': 'alert_age',
						'label': 'Возраст',
						'suffix': 'лет'
					},
					'sbp': {
						'alert_id': 'alert_sbp',
						'label': 'Систолическое АД',
						'suffix': 'мм рт.ст.'
					},
					'time': {
						'alert_id': 'alert_time',
						'label': 'Период оценки риска',
						'suffix': 'лет'
					},
					'tchol': {
						'alert_id': 'alert_tchol',
						'label': 'Общий холестерин',
						'suffix': ''
					},
					'hdl': {
						'alert_id': 'alert_hdl',
						'label': 'Холестерин ЛПВП',
						'suffix': ''
					},
					'height': {
						'alert_id': 'alert_height',
						'label': 'Рост',
						'suffix': ''
					},
					'weight': {
						'alert_id': 'alert_weight',
						'label': 'Вес',
						'suffix': ''
					},
					'overestimate': {
						'alert_id': 'alert_overestimate',
						'label': 'поправка на факторы риска',
						'suffix': '%'
					}
				},
		'_benefit_risks': {
					'activity': "Риск травм, связанных с физической активностью<br><h3>Дополнительная польза</h3><ul><li>Уменьшение выраженности депрессии </li><li>Улучшение качества сна </li><li>Уменьшение боли и улучшение функции суставов при ДОА</li></ul>",
					'meddiet': "Нет существенного вреда",
					'vitaomeg': [
						"Есть доказательные данные о вреде для здоровья приёма витаминов А и Е",
						"Расходы на лечение"
					],
					'bp': [
						"Виды нежелательных явлений отличаются у разных препаратов",
						"Необходимость прекратить приём препарата ввиду непереносимости (количество пациентов, принимающих препарат, на один случай побочной реакции), индекс потенциального вреда - 10)",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'statins_lowmod': [
						"Боль и ощущение скованности в мышцах, индекс потенциального вреда 10-20 (в большинстве исследований сходно с плацебо)",
						"Повышение активности печёночных ферментов (3x верхних границ нормы), индекс потенциального вреда 250",
						"Тяжёлое повреждение мышц/почек , индекс потенциального вреда 10 000",
						"Тошнота, запоры, диарея",
						"Расходы на лечение"
					],
					'statins_high': [
						"Боль и ощущение скованности в мышцах, индекс потенциального вреда 10-20 (в большинстве исследований сходно с плацебо)",
						"Повышение активности печёночных ферментов (3x верхних границ), индекс потенциального вреда 150",
						"Тяжёлое повреждение мышц/почек, индекс потенциального вреда 10 000",
						"Тошнота, запоры, диарея",
						"Расходы на лечение"
					],
					'fibrates': [
						"Тошнота, боль в животе, вздутие живота",
						"Повышенный риск повреждения мышц при одновременном приёме со статинами",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'niacin': [
						"Приливы/кожный зуд, индекс потенциального вреда 20",
						"Повышение уровня гликемии, индекс потенциального вреда 100",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'ezetimibe': [
						"Головная боль, диарея",
						"Мышечные боли",
						"Повышение активности печёночных ферментов",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'sulfonylureas': [
						"Тяжёлая гипогликемия(ежегодно), индекс потенциального вреда 175",
						"Увеличение массы тела - в среднем на 2 кг",
						"Кожная сыпь, диарея",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'insulins': [
						"Тяжёлая гипогликемия(ежегодно), индекс потенциального вреда 85",
						"Увеличение массы тела - в среднем на 2 кг",
						"Неудобство обследований в динамике",
						"Расходы на лечение",
					],
					'metformin': [
						"Диспепсия, тошнота, диарея",
						"Лактат ацидоз - недостаточно доказательств",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'glitazones': [
						"Задержка жидкости/сердечная недостаточность, индекс потенциального вреда 25",
						"Переломы (3 года), индекс потенциального вреда 85",
						"Увеличение массы тела - в среднем на 2 кг",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'glp': [
						"Тошнота, рвота, диарея, индекс потенциального вреда 10-20",
						"Потеря массы тела - в среднем на 2 кг",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'dpp-4': [
						"Крапивница, Сыпь",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'meglit': [
						"Гипогликемия",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'sglt': [
						"Генитальные инфекции, индекс потенциального вреда 15",
						"Неудобство обследований в динамике",
						"Расходы на лечение"
					],
					'smoking': [
						"Нет вреда",
					],
					'asa': [
						"Значимые кровотечения (ежегодно), индекс потенциального вреда 200",
						"Расходы на лечение"
					]
				},
		'_html_localization': [
			{'id': 'languages', 'value': 'Языки'},
			{'id': 'pageHeading', 'value': 'Калькулятор отношения пользы/абсолютного риска ССЗ'},
			{'id': 'FraminghamCriteria', 'value': 'Острый коронарный синдром + стенокардия/коронарная недостаточность + сердечная недостаточность + инсульты + перемежающаяся хромота'},
			{'id': 'QriskCriteria', 'value': 'Острый коронарный синдром + инсульты<br />&nbsp;'},
			{'id': 'AscvdCriteria', 'value': 'Смерть от ИБС + нефатальный острый коронарный синдром <br />+ фатальный/нефатальный инсульт'},
			{'id': 'Age', 'value': 'Возраст'},
			{'id': 'years', 'value': 'лет'},
			{'id': 'Gender', 'value': 'пол'},
			{'id': 'Male', 'value': 'мужской'},
			{'id': 'Female', 'value': 'женский'},
			{'id': 'Race', 'value': 'раса'},
			{'id': 'Black', 'value': 'Негроидная'},
			{'id': 'Non-Black', 'value': 'Европеоидная/Монголоидная'},
			{'id': 'Ethnicity', 'value': 'Этническая принадлежность'},
			{'id': 'WhiteOrNotStated', 'value': 'Европеоидная или неустановлена'},
			{'id': 'Indian', 'value': 'Индиец'},
			{'id': 'Pakistani', 'value': 'Пакистанец'},
			{'id': 'Bangladeshi', 'value': 'Бангладешец'},
			{'id': 'OtherAsian', 'value': 'Другие азиатские национальности'},
			{'id': 'BlackCaribbean', 'value': 'Чернокожие жители Карибских островов'},
			{'id': 'BlackAfrican', 'value': 'Чернокожие африканцы'},
			{'id': 'Chinese', 'value': 'Китайцы'},
			{'id': 'OtherEthnicGroup', 'value': 'Другие этнические группы'},
			{'id': 'Smoker', 'value': 'Курильщик'},
			{'id': 'Yes', 'value': 'Да'},
			{'id': 'No', 'value': 'Нет'},
			{'id': 'SmokingReversal', 'value': 'Риск ССЗ после повторной оценки через 5-10 после прекращения курения'},
			{'id': 'NonSmoker', 'value': 'не курит'},
			{'id': 'ExSmoker', 'value': 'курильщик в прошлом'},
			{'id': 'LessThan10Cig', 'value': 'курит менее 10 сигарет в день'},
			{'id': '10to19Cig', 'value': '10 - 19 '},
			{'id': '20MoreCig', 'value': '20 и более сигарет в день'},
			{'id': 'Diabetes', 'value': 'Сахарный диабет'},
			{'id': 'Type1', 'value': '1 типа'},
			{'id': 'Type2', 'value': '2 типа'},
			{'id': 'SystolicBP', 'value': 'Систолическое артериальное давление'},
			{'id': 'BpBaselineRisk', 'value': 'использованное для оценки исходного риска - 120 мм рт.ст.'},
			{'id': 'BpTreatmentDisclaimer', 'value': 'отметьте артериальное давление в настоящее время, не важно, получает пациент лечение или нет'},
			{'id': 'BpTreatmentClickYes', 'value': 'отметьте "ДА", если пациент принимает препараты для снижения артериального давления'},
			{'id': 'OnBpTreatment', 'value': 'Получает лечение от гипертонии'},
			{'id': 'BpAppliesGreater120', 'value': 'Принимает только если систолическое артериальное давление выше 120 мм рт.ст.'},
			{'id': 'TotalCholesterol', 'value': 'Общий холестерин'},
			{'id': 'CholesterolPriorToDrugs', 'value': 'Уровень холестерина до начала лечения препаратами'},
			{'id': 'CholesterolBaselineRisk_mmol', 'value': 'для оценки исходного риска используется уровень холестерина 3 ммоль/л.<br /><a href="javascript:void(0);" onclick="toggleCholesterolUnit()">отметьте, чтобы переключить в мг/дл.</a>'},
			{'id': 'HdlCholesterol', 'value': 'Холестерин ЛПВП'},
			{'id': 'CholesterolBaselineRisk_mg', 'value': 'для оценки исходного риска используется уровень холестерина 116 мг/дл.<br /><a href="javascript:void(0);" onclick="toggleCholesterolUnit()">отметьте, чтобы переключить в ммоль/л.</a>'},
			{'id': 'HdlPriorToDrugs', 'value': 'Уровень холестерина ЛПВП до начала лечения препаратами'},
			{'id': 'HdlBaselineRisk_mmol', 'value': 'для оценки исходного риска используется уровень холестерина ЛПВП 1.3 ммоль/л.'},
			{'id': 'HdlBaselineRisk_mg', 'value': 'для оценки исходного риска используется уровень 50 мг/дл.'},
			{'id': 'FamilyHistory', 'value': 'Семейный анамнез ССЗ'},
			{'id': 'FamilyHistoryDefinition', 'value': 'Стенокардия или коронарный приступ у родственника 1<sup>й</sup> родстсва &lt; 60 лет'},
			{'id': 'CKD', 'value': 'Хроническая почечная недостаточность'},
			{'id': 'AFib', 'value': 'Фибрилляция предсердий'},
			{'id': 'RA', 'value': 'Ревматоидный артрит'},
			{'id': 'Height', 'value': 'Рост'},
			{'id': 'Weight', 'value': 'Вес'},
			{'id': 'BMI', 'value': 'ИМТ'},
			{'id': 'BmiBaselineRisk', 'value': 'для оценки исходного риска используется ИМТ 25 кг/м<sup>2</sup>'},
			{'id': 'FamilyHistoryEarlyCHD', 'value': 'Семейный анамнез ССЗ в раннем возрасте'},
			{'id': 'EarlyFamilyHistory_Amount', 'value': 'Выраженность <u>дополнительного</u> риска (относительное повышение риска), связанного с заболеванием члена семьи пациента зависит от: (1) того, насколько близким является родство, (2) возраста родственника, (3) количества больных членов семьи.'},
			{'id': 'AdditionalRisk', 'value': 'дополнительный риск'},
			{'id': 'EarlyFamilyHistory_Mother', 'value': 'Если мать (&lt; 65 лет) повышение риска на 60%'},
			{'id': 'EarlyFamilyHistory_Father', 'value': 'Если отец (&lt; 55 лет) повышение риска на 75%'},
			{'id': 'RelativeBenefitWithDoubleSpace', 'value': 'Относительная польза:&nbsp;&nbsp;'},
			{'id': 'BenefitSurrogate', 'value': 'Полезное воздействие, как правило<i>не оказывает</i> влияния на действие сурогатных маркеров. В настоящей версии вы можете выбрать одновременно только один вид вмешательства.'},
			{'id': 'PhysicalActivity', 'value': 'Физическая активность'},
			{'id': 'MedDiet', 'value': 'Средиземноморская диета по сравнению с диетой с пониженным содержанием жира'},
			{'id': 'BPNotBadDrugs', 'value': 'Препараты, снижающие АД (кроме атенолола/доксазозина)'},
			{'id': 'VitaOmega', 'value': 'БАДы с витаминами/Omega-3 ненасыщенными жирными кислотами'},
			{'id': 'StatinLowMod', 'value': 'Статины в низкой и умеренной дозе'},
			{'id': 'StatinHigh', 'value': 'Статины в высокой лозе'},
			{'id': 'Fibrates', 'value': 'Фибраты'},
			{'id': 'Niacin', 'value': 'Ниацин'},
			{'id': 'Ezetimibe', 'value': 'Эзетимиб'},
			{'id': 'Metformin', 'value': 'Метформин'},
			{'id': 'Sulfonylureas', 'value': 'Производные сульфонилмочевины'},
			{'id': 'Insulins', 'value': 'Инсулины'},
			{'id': 'Glitazones', 'value': 'Глитазоны'},
			{'id': 'GLPs', 'value': 'ГПП'},
			{'id': 'DPP-4s', 'value': 'Ингибиторы ДПП-4'},
			{'id': 'Meglitinides', 'value': 'Меглитиниды'},
			{'id': 'SGLT2', 'value': 'ГЛЮТ'},
			{'id': 'SmokingCessation', 'value': 'Прекращение курения'},
			{'id': 'Aspirin', 'value': 'АСК'},
			{'id': 'BenefitEstimateDetails', 'value': 'Детали оценки пользы'},
			{'id': 'RiskTimePeriod', 'value': 'Промежуток времени риска'},
			{'id': '10years', 'value': '10 лет'},
			{'id': 'NoEvent', 'value': 'Нет сердечно-сосудистых событий'},
			{'id': 'TotalWithEvent', 'value': 'Всего с осложнением'},
			{'id': 'NumWhoBenefitWithTx', 'value': 'Число больных, которых необходимо лечить'},
			{'id': 'NNT', 'value': 'ЧБНЛ'},
			{'id': 'NumNeededTreat', 'value': 'число пролеченных больных на одного излеченного'},
			{'id': 'BaselineEvents', 'value': 'Исходное количество осложнений, при использовании только базовых факторов'},
			{'id': 'AdditionalEvents', 'value': 'Дополнительные осложнения “вызванные” факторами риска'},
			{'id': 'PlusMinus5', 'value': 'Как и при использовании других калькуляторов, максимальная точность расчётных величин +/- 5%. <a class="infoT various localize" href="FAQ.html#percentage" target="_blank">Подробнее</a>.'},
			{'id': 'QriskDisclaimer', 'value': 'См. <a href="FAQ.html#QRISK">QRISK<sup>&reg;</sup>2 пояснения</a> для более подробной информации.'},
			{'id': 'SwitchBasicView', 'value': 'Переключить в "Базовый" режим'},
			{'id': 'Feedback', 'value': 'Отзывы и предложения направляйте по адресу <a href="mailto:james.mccormack@ubc.ca">james.mccormack@ubc.ca</a>'},
			{'id': 'FAQ', 'value': 'Более подробная информация и определения акронимов в разделе <a href="FAQ.html#calculator" target="_blank" class="localize">FAQ</a>'},
			{'id': 'Caveats', 'value': 'Важные ограничения использования оценки по шкале приводятся <a href="Caveats.html#calculator" target="_blank" class="localize">здесь</a>'},
			{'id': 'OfflineHint', 'value': 'Можно использовать без доступа к Интернету'},
			{'id': 'SwitchEnhanced', 'value': 'Переключить в "Расширенный" режим'},
			{'id': 'NA', 'value': 'N/A'},
			{'id': 'Variable', 'value': 'Показатель'},
			{'id': 'MustBeBetween', 'value': 'должен быть между'},
			{'id': 'and', 'value': 'и'},
			{'id': 'HarmOfIntervention', 'value': 'Вред от вмешательства'},
			{'id': 'NotDefined', 'value': 'не установлен'},			
			{'id': 'Framingham2008AgeWarning', 'value': 'Для оценки по Фрамингемской шкале, возраст пациентов от 30 до 74 лет'},
			{'id': 'Framingham2008BpWarning', 'value': 'Для оценки по Фрамингемской шкале систолическое артериальное давление от 90 до 200 мм рт.ст.'},
			{'id': 'Framingham2008HdlWarning', 'value': 'Для оценки по Фрамингемской шкале, концентрация холестерина ЛПВП от 10 до 100 мг/дл'},
			{'id': 'Framingham2008TCWarning', 'value': 'Для оценки по Фрамингемской шкале, концентрация общего холестерина от 100 до 405 мг/дл'},
			{'id': 'QriskAgeWarning', 'value': 'Для оценки по шкале QRISK, возраст пациента должен быть от 25 до 84 лет'},
			{'id': 'QriskBmiWarning', 'value': 'Для оценки по шкале QRISK, ИМТ должен быть от 20 до 40 кг/м<sup>2</sup>'},
			{'id': 'QriskBpWarning', 'value': 'Для оценки по шкале QRISK,систолическое давление пределах от 70 до 210 мм рт.ст.'},
			{'id': 'QriskCholRatioWarning', 'value': 'Для оценки по шкале QRISK, отношение общий холестерин: холестерин ЛПВП должно быть от 1 до 12'},
			{'id': 'entered', 'value': 'Заполнено'},
			{'id': 'OfflineInfo', 'value': 'Этот калькулятор будет работать и без доступа к Интернету. На портативных устройствах необходимо создать иконку быстрого доступа на домашнем экране и калькулятор будет работать как мобильное приложение.'},
			{'id': 'Cache', 'value': 'Набор данных'},
			{'id': 'PrintReport', 'value': 'Напечатать отчёт'},
			{'id': 'CalculationDetails', 'value': 'Описание калькулятора'},
			{'id': 'RiskCalculationMethod', 'value': 'Метод расчёта риска'},
			{'id': 'ReturnToCalculator', 'value': 'Вернуться к калькулятору'},
			{'id': 'ReportGeneratedFrom', 'value': 'Отчёт подготовлен http://cvdcalculator.com'},
			{'id': 'RussianContribution', 'value': 'Перевод калькулятора на русский выполнен совместно врачом-неврологом Михаилом Яблонским (г.Балашиха) и кардиологом к.м.н. Денисом Синкевичем (г.Иркутск).'},
			{'id': 'CkdExplanation', 'value': 'Состояние хронического заболевания почек не доля алгоритма риски используется для целей расчета в пользу некоторых методов лечения'}
		]
	}
	
	// Place next language here -- must specify _alerts, _benefit_risks, and _html_localization
};

function LocalizeText(data_lang_id, language_abbreviation) {
	var thisLanguage = localizations[language_abbreviation];
	if (typeof(thisLanguage)=='undefined') {
		alert('Unable to load language ' + language_abbreviation);
		return;
	}
	
	for(var i = 0; i < thisLanguage['_html_localization'].length; i++) {
		var localizationItem = thisLanguage['_html_localization'][i];
		var itemId = localizationItem['id'];
		var itemValue = localizationItem['value'];
		
		if (itemId == data_lang_id) {
			return itemValue;
		}
	}
	
	alert("Unable to provide translated text for key " + data_lang_id);
}

function LocalizeDecimal(val, language_abbreviation) {
	if (language_abbreviation == 'fr') {
		
		// Decimal values are with a comma
		return val.replace(".",",");
		
	} else {
		return val;
	}
}

function LoadLocalizationData(language_abbreviation) {
	var thisLanguage = localizations[language_abbreviation];
	if (typeof(thisLanguage)=='undefined') {
		alert('Unable to load language ' + language_abbreviation);
		return;
	}
	
	_alerts = thisLanguage['_alerts'];
	_benefit_risks = thisLanguage['_benefit_risks'];
	
	if (current_language != language_abbreviation) {
		// Only run this section of code if the current language differs from the new language being set
		// (this prevents this block of code running when the page loads English by default)
		
		for(var i = 0; i < thisLanguage['_html_localization'].length; i++) {
			var localizationItem = thisLanguage['_html_localization'][i];
			var itemId = localizationItem['id'];
			var itemValue = localizationItem['value'];
		
			// Check to make sure there are no differences between the English-based normal page load and the English localization file
			if (localization_debug_checkEnglishDiscrepancies) {
				if ((language_abbreviation == 'en') && ($('#selectLocalization').val() == 'en')) {
			
					if ($('[data-lang-id='+itemId+']').html() != itemValue) {
					
						// Sometimes tags are changed once .html() is set...
						var oldValue, newValue;
						if ($('#'+itemId).length > 0) {
							var oldValue = $('[data-lang-id='+itemId+']').html();
							$('[data-lang-id='+itemId+']').html(itemValue);			// This value is set at the bottom of the function, but it's okay to double set given that this only runs in debug mode
							var newValue = $('[data-lang-id='+itemId+']').html();
					
						} else  {
							// Some elements may not exist (eg, those using LocalizeText() - we can't easily check these, so just let them pass
							var oldValue = itemValue;
							var newValue = itemValue;
					
						}
					
						if (oldValue.length > 0) oldValue.trim();
						if (newValue.length > 0) newValue.trim();
					
						// Do a final check...
						if (oldValue != newValue) {
							console.log('WARNING: Discrepant English default value vs. localization file: \n%s \nvs. \n%s', oldValue, newValue);
						}
					}
			
				}
			}
		
			if (localization_debug_noItemExists) {
				if ($('[data-lang-id='+itemId+']').length == 0) {
					console.log('WARNING: Data-lang-id element did not exist (%s)',itemId);
				}
			}
		
			if (localization_debug_noItemValueExists) {
				if (itemValue.length == 0) {
					console.log('WARNING: %s (item ID) does not have a localization value for \'%s \' language',itemId,language_abbreviation);
				}
			}
		
			if (localization_debug_checkDuplicateKeys) {
				for (var j=i+1; j < thisLanguage['_html_localization']; j++) {
					if (thisLanguage['_html_localization'][i]['id'] == thisLanguage['_html_localization'][j]['id']) {
						console.log("WARNING: Duplicate localization key found for %s", thisLanguage['_html_localization'][i]['id']);
					}
				}
			}
		
			$('[data-lang-id='+itemId+']').html(itemValue);
		
			// If the user selected a "relative benefit" item already, the text will need to be updated...
			if ($("#benefit_estimates li.active").length > 0) {
				toggleBenefit($("#benefit_estimates li.active"));	// Toggle -> elements will not be active anymore
			}
		}	
	}
	
	// Localize HTML links (if class is 'localize')
	var localizeLinks = $('a.localize');
	if (language_abbreviation == 'en') {
		localizeLinks.each(function (index,element) {
			var href = $(this).attr('href');
			var uri = new URI(href);
			if (uri.hasQuery('lang')) {
				uri.removeQuery('lang');
				$(this).attr('href',uri.toString());
			}
		});
	} else {
		localizeLinks.each(function (index,element) {
			var href = $(this).attr('href');
			var uri = new URI(href);
			if (uri.hasQuery('lang')) {
				uri.setQuery('lang',language_abbreviation);
			} else {
				uri.addQuery('lang',language_abbreviation);
			}
			$(this).attr('href',uri.toString());
		});
	}
	
	current_language = language_abbreviation;
}

