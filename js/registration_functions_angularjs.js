var app = angular.module('myapp', ['AllowOnlyNumbersDirective']);

app.config(function ($locationProvider) {
	$locationProvider.html5Mode(true);
});

/*** Servel ULR Define***/
var defaultOpenStep = 100,
	saveSuccessMessage = "Your data was successfully saved.";

//status return from server
var agreementClass1 = 'step6_distribution_agreement_title',
	agreementClass2 = 'step6_distribution_agreement_title_only',
	agreementWrapperClass1 = 'step6_distribution_agreement_wrapper',
	agreementWrapperClass2 = 'step6_distribution_agreement_wrapper_only',
	agreementDivClass1 = 'distribution_agreement_div',
	agreementDivClass2 = 'distribution_agreement_div_only',
	agreementTextClass1 = 'distribution_agreement_text',
	agreementTextClass2 = 'distribution_agreement_text_only',
	countryUsId = "US";


function RegistrationController($scope, $location, $http) {
	$scope.isSupportCreditCard = false;

	$scope.submittedStep1 = false;
	$scope.submittedStep2 = false;

	$scope.step6AgreementClass = agreementClass1;
	$scope.step6AgreementWrapperClass = agreementWrapperClass1;
	$scope.step6AgreementDivClass = agreementDivClass1;
	$scope.step6AgreementTextClass = agreementTextClass1;
	$scope.bookingpalpayment = false;

	$scope.submittedStep7 = false;
	$scope.needtoVerify = true;

	$scope.submittedLogin = false;
	$scope.wrongLoginData = false;

	$scope.showInfoPopup = false;
	$scope.showStep1PrivacyPopup = false;
	$scope.showStep1TermConditions = false;


	$scope.step2DefaultTab = 'pay_per_booking';
	$scope.step2TableTabView = $scope.step2DefaultTab;

	$scope.user = {};

	$scope.step2 = {};
	$scope.step4 = {};
	$scope.step5 = {};
	$scope.step6 = {};
	$scope.step7 = {};


	//default Radio Btn SSL
	$scope.step6.socialOrTaxType = "ssn";

	$scope.countriesStep1 = [];
	$scope.statesStep1 = [
		{id: 1, name: "Alabama"},
		{id: 2, name: "Alaska"},
		{id: 4, name: "Arizona"},
		{id: 5, name: "Arkansas"},
		{id: 6, name: "California"},
		{id: 7, name: "Colorado"},
		{id: 8, name: "Connecticut"},
		{id: 9, name: "Delaware"},
		{id: 10, name: "District of Columbia"},
		{id: 11, name: "Florida"},
		{id: 12, name: "Georgia"},
		{id: 14, name: "Hawaii"},
		{id: 15, name: "Idaho"},
		{id: 16, name: "Illinois"},
		{id: 17, name: "Indiana"},
		{id: 18, name: "Iowa"},
		{id: 19, name: "Kansas"},
		{id: 20, name: "Kentucky"},
		{id: 21, name: "Louisiana"},
		{id: 22, name: "Maine"},
		{id: 23, name: "Maryland"},
		{id: 24, name: "Massachusetts"},
		{id: 25, name: "Michigan"},
		{id: 26, name: "Minnesota"},
		{id: 27, name: "Mississippi"},
		{id: 28, name: "Missouri"},
		{id: 29, name: "Montana"},
		{id: 30, name: "Nebraska"},
		{id: 31, name: "Nevada"},
		{id: 32, name: "New Hampshire"},
		{id: 33, name: "New Jersey"},
		{id: 34, name: "New Mexico"},
		{id: 35, name: "New York"},
		{id: 36, name: "North Carolina"},
		{id: 37, name: "North Dakota"},
		{id: 39, name: "Ohio"},
		{id: 40, name: "Oklahoma"},
		{id: 41, name: "Oregon"},
		{id: 42, name: "Pennsylvania"},
		{id: 44, name: "Rhode Island"},
		{id: 45, name: "South Carolina"},
		{id: 46, name: "South Dakota"},
		{id: 47, name: "Tennessee"},
		{id: 48, name: "Texas"},
		{id: 49, name: "Utah"},
		{id: 50, name: "Vermont"},
		{id: 51, name: "Virginia "},
		{id: 53, name: "Washington"},
		{id: 54, name: "West Virginia"},
		{id: 55, name: "Wisconsin"},
		{id: 56, name: "Wyoming"}
	];

	$scope.listStep2 = [];
	$scope.listStep3 = [];
	$scope.sliderStep2 = {};

	//$scope.paymentBookingListStep4 = [];
	//$scope.paymentReminderListStep4 = [];

//	$scope.cancellationTimeListStep4 = [];
//	$scope.damageInsuranceListStep4 = [];
	$scope.step2ChoosenRowPopup = null;


	$scope.ngRepeatHour = [];
	for (var i = 1; i <= 12; i++) {
		$scope.ngRepeatHour.push(correctHourOrTime(i));
	}

	$scope.ngRepeatTime = [];
	for (var i = 0; i <= 59; i++) {
		$scope.ngRepeatTime.push(correctHourOrTime(i));
	}

	$scope.step4.paymentOption = [
		{id: 1, selected: false},
		{id: 2, selected: false}
	];

	$scope.step4.cancellationOption = [
		{id: 1, selected: false},
		{id: 2, selected: false}
	];

	$scope.step4.damageOption = [
		{id: 0, selected: false},
		{id: 1, selected: false},
		{id: 2, selected: false}
	];

	$scope.step5.paymentOption = [
		{id: 1, selected: false},
		{id: 0, selected: false},
		{id: 2, selected: false}
	];

	$scope.step6.receivingOption = [
		{id: 3, selected: false},
		{id: 2, selected: false},
		{id: 1, selected: false}
	];


	$scope.paymentBookingListStep4 = [
		{id: 1, name: "% of booking", max: 100},
		{id: 2, name: "Flat Rate", max: 9999}
	];
	$scope.step4.paymentTimeOfBookingType = $scope.paymentBookingListStep4[0].id;


	$scope.paymentReminderListStep4 = [
		{id: 0, name: "On Arrival"},
		{id: 1, name: "1 day before check in"},
		{id: 2, name: "3 day before check in"},
		{id: 3, name: "5 days before check in"},
		{id: 4, name: "7 days before check in"},
		{id: 5, name: "10 days before check in"},
		{id: 6, name: "2 weeks before check in"},
		{id: 7, name: "1 month before check in"},
		{id: 8, name: "2 months before check in"},
		{id: 9, name: "3 months before check in"}
	];
	$scope.step4.reminderDueType = $scope.paymentReminderListStep4[0].id;


//	$scope.cancellationTimeListStep4 = [
//		{id: 0, name: "Anytime"},
//		{id: 1, name: "up to 1 day before check in"},
//		{id: 2, name: "up to 3 day before check in"},
//		{id: 3, name: "up to 5 days before check in"},
//		{id: 4, name: "up to 7 days before check in"},
//		{id: 5, name: "up to 10 days before check in"},
//		{id: 6, name: "up to 2 weeks before check in"},
//		{id: 7, name: "up to 1 month before check in"},
//		{id: 8, name: "up to 2 months before check in"},
//		{id: 9, name: "up to 3 months before check in"}
//	];
//	$scope.step4.cancellationTimeType = $scope.cancellationTimeListStep4[0].id;

	$scope.damageInsuranceListStep4 = [
		{id: 1, name: "$1,000 Coverage — Traveler Pays $34.99"},
		{id: 2, name: "$3,000 Coverage – Traveler pays $39.99"},
		{id: 3, name: "$6,000 Coverage – Traveler pays $49.99"}
	];
	$scope.step4.damageInsuranceType = $scope.damageInsuranceListStep4[0].id;

	$scope.achAccountTypeListStep6 = [
		{ id: 1, name: "Type 1" },
		{ id: 2, name: "Type 2" },
		{ id: 3, name: "Type 3" }
	];
	$scope.step6.accountType = $scope.achAccountTypeListStep6[0].name;

	$scope.dayBirthDateListStep6 = [];
	for (var i = 1; i <= 31; i++) {
		$scope.dayBirthDateListStep6.push(i);
	}
	$scope.step6.dayBirthDate = $scope.dayBirthDateListStep6[0];

	$scope.yearBirthDateListStep6 = [];

	var current_year = (new Date()).getFullYear();
	current_year = current_year < 2014 ? 2014 : current_year;
	$scope.step6.yearBirthDate = current_year;
	for (var i = current_year; i >= (current_year - 110); i--) {
		$scope.yearBirthDateListStep6.push(i);
	}


	$scope.monthBirthDateListStep6 = [
		{id: 1, name: "Jan"},
		{id: 2, name: "Feb"},
		{id: 3, name: "Mar"},
		{id: 4, name: "Apr"},
		{id: 5, name: "May"},
		{id: 6, name: "Jun"},
		{id: 7, name: "Jul"},
		{id: 8, name: "Aug"},
		{id: 9, name: "Sep"},
		{id: 10, name: "Oct"},
		{id: 11, name: "Nov"},
		{id: 12, name: "Dec"}
	];
	$scope.step6.monthBirthDate = $scope.monthBirthDateListStep6[0].id;


	$scope.step3TableOrderBy = '';

	$scope.changeCountry = function () {
		$scope.user.countryid = $scope.currentCountry.ID;
		$scope.user.phoneCountryCode = '';

		if (+$scope.currentCountry.PhoneCode) {
			$scope.user.phoneCountryCode = '+' + +$scope.currentCountry.PhoneCode;
		}
	};

	/********************************************************/
	/*************** Login functions START ******************/
	/********************************************************/

	function openPage(page_number) {
		switch (page_number) {
			case 0:
				$scope.pageStep0.view();
				break;
			case 1:
				$scope.pageStep1.view();
				break;
			case 2:
				$scope.pageStep2.view();
				break;
			case 3:
				$scope.pageStep3.view();
				break;
			case 4:
				$scope.pageStep4.view();
				break;
			case 5:
				$scope.pageStep5.view();
				break;
			case 6:
				$scope.pageStep6.view();
				break;
			case 7:
				$scope.pageStep7.view();
				break;
			case 8:
				$scope.pageStep8.view();
				break;

			default :
			case 100:
				$scope.pageLogin.view();
				break;
		}

		if (page_number != 100) {
			server.saveParams({page: page_number});
		}
	}

	function Server(option) {
		var _option = {
				pos: null,
				pms_pos: null,
				email: null,
				page: null
			},
			is_logged = false;

		this.saveParams = function (data) {
			try {
				var cookie_data = JSON.parse(getCookie(COOKIE_USER));
			} catch (e) {
				cookie_data = {};
			} finally {
				for (var i in data) {
					cookie_data[i] = data[i];
				}
				SERVER_DATA = cookie_data;

				setCookie(COOKIE_USER, JSON.stringify(cookie_data));
			}
		};

		this.getParams = function () {
			try {
				var cookie_data = JSON.parse(getCookie(COOKIE_USER));
			} catch (e) {
				cookie_data = {};
			} finally {
				for (var i in _option) {
					cookie_data[i] = cookie_data[i] ? cookie_data[i] : _option[i];
				}

				return cookie_data;
			}
		};

		this.isLogged = function () {
			return is_logged;
		};

		var SERVER_DATA = this.getParams();

		if (!SERVER_DATA.email) {
			for (var i in _option) {
				SERVER_DATA[i] = option[i] ? option[i] : _option[i];
			}
		}

		/* Server */
		this.registration = function (requestData, callback) {
			var self = this;
			if (SERVER_DATA.pms_pos) {
				requestData.pos = SERVER_DATA.pms_pos;
			}

			if (SERVER_DATA.pos) {
				requestData.managerpos = SERVER_DATA.pos;
			}

			$http({
				url: API_JAVA_URL,
				method: "POST",
				data: JSON.stringify(requestData)
			}).success(function (resp) {
				var returnData = getRespData(resp);

				if (!returnData.error) {
					SERVER_DATA.pos = resp.data.step_data.pos;
					SERVER_DATA.page = resp.data.step_data.next_step;
					SERVER_DATA.email = requestData.email;
					SERVER_DATA.pms_pos = null;
					self.saveParams(SERVER_DATA);
				}

				return callback(returnData);
			});
		};

		this.login = function (callback) {
			var self = this;
			$http({
				url: API_JAVA_URL + '/j_security_check',
				method: "POST",
				data: $.param({
					j_username: SERVER_DATA.email,
					j_password: option.password
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function (resp) {
				var returnData = {
					error: true,
					message: '',
					data: {}
				};

				if (!resp.data) {
					returnData.message = 'Please, enter correct email or password';
				} else {
					returnData.error = false;
					returnData.data = resp.data;

					SERVER_DATA.pos = resp.data.step_data.pos;
					if (resp.data.step_data.step) {
						SERVER_DATA.page = resp.data.step_data.step;
					}
					SERVER_DATA.pms_pos = null;
					self.saveParams(SERVER_DATA);
				}

				callback(returnData);
			}).error(function (e, s, r, q) {
				console.log(e, s, r, q);
			});
		};

		this.logout = function (statusLogOut) {
			var self = this;

			self.saveParams(_option);
			document.cookie = 'JSESSIONID=null;path=/xml';

			if (statusLogOut) {
				$scope.pageLogin.login.message = statusLogOut;
			}

			window.location.reload();
		};

		this.checkStatus = function (callback) {
			var self = this;

			$http({
				method: "GET",
				url: API_JAVA_URL + 'status?user=' + SERVER_DATA.email + '&pos=' + SERVER_DATA.pms_pos
			}).success(function (resp) {
				var returnData = {
					error: true,
					message: '',
					data: {}
				};

				if (!resp.data) {
					returnData.message = 'Error connect to server!';
					return callback(returnData);
				} else if (resp.data.status.is_error) {
					returnData.message = resp.data.status.message;
					return callback(returnData);
				}

				returnData.error = false;
				returnData.data = resp.data.step_data;

				if (returnData.data.pos) {
					SERVER_DATA.pos = returnData.data.pos;
				}

				if (!SERVER_DATA.page || SERVER_DATA.page == 100 || SERVER_DATA.page == 0) {
					SERVER_DATA.page = +returnData.data.next_step;
				}

				if (SERVER_DATA.page == 1) {
					self.saveParams(SERVER_DATA);
				}
				return callback(returnData);
			});
		};

		this.checkStep = function () {
			var self = this;

			$http({
				method: "GET",
				url: API_JAVA_URL + 'step?pos=' + SERVER_DATA.pos + '&step=' + SERVER_DATA.page
			}).success(function (respStep) {
				var $loginPage = $scope.pageLogin.login;
				if (respStep == 'login') {
					if (!SERVER_DATA.email || !option.password) {
						openPage(defaultOpenStep);
						return;
					}

					$http({
						url: API_JAVA_URL + '/j_security_check',
						method: "POST",
						data: $.param({
							j_username: SERVER_DATA.email,
							j_password: option.password
						}),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).success(function (respLogin) {
						var message = '';

						if (!respLogin.data) {
							message = 'Please, enter correct email or password';
						} else if (!respLogin.data.status) {
							message = 'Please, enter correct email or password';
						} else if (respLogin.data.status.is_error) {
							message = respLogin.data.status.message;
						}

						if (message) {
							openPage(defaultOpenStep);
							$loginPage.message = message;
							return;
						}

						SERVER_DATA.pos = respLogin.data.step_data.pos;
						SERVER_DATA.pms_pos = null;
						if (respLogin.data.step_data.step) {
							SERVER_DATA.page = respLogin.data.step_data.step;
						}

						self.saveParams(SERVER_DATA);

						is_logged = true;

						setValuesAllInputs(respLogin.data);
					}).error(function (e, s, r, q) {
						self.logout('We have a problem with pur server right now. Please try again in few seconds.'); // TODO: Change Error
					});

					return;
				} else if (!respStep.data) {
					$loginPage.message = 'Error connect to server!';
					openPage(defaultOpenStep);
					return;
				}

				self.saveParams(SERVER_DATA);
				setValuesAllInputs(respStep.data);
				is_logged = true;
			}).error(function () {
				self.logout('We have a problem with pur server right now. Please try again in few seconds.'); // TODO: Change Error
			});
		};

		this.saveStep = function (requestData, callback) {
			requestData.pos = SERVER_DATA.pos;
			$http({
				url: API_JAVA_URL + 'step/',
				method: "POST",
				data: JSON.stringify(requestData)
			}).success(function (resp) {
				resp = getRespData(resp);

				return callback(resp);
			});
		};

		function getRespData(resp) {
			var __return = {
				error: true,
				message: '',
				data: resp.data
			};

			if (!resp.data) {
				__return.message = 'Error connect to server!';
			} else if (!resp.data.status) {
				__return.message = 'Error connect to server!';
			} else if (resp.data.status.is_error) {
				__return.message = resp.data.status.message;
			} else {
				__return.error = false;
			}

			return __return;
		}
	}

	var server = new Server({});

	$scope.Global = {

		pmID: 0,

		isPasswordRequired: function () {
			return !server.isLogged();
		},

		verifyingPassword: function () {
			if (!$scope.submittedStep1) {
				return false;
			}

			var re_pass = $scope.pageStep1.rePasswordField ? $scope.pageStep1.rePasswordField : '',
				pass = $scope.user.password ? $scope.user.password : '';

			if (!server.isLogged() && !pass) {
				return true;
			}

			return pass != re_pass;
		},

		title: 'BookingPal',
		l18n: {
			default: 0,
			active: 0,
			view: false,
			languages: [
				'English',
				'Dutch',
				'Spanish',
				'Greek',
				'French',
				'Italian',
				'German',
				'Portuguese',
				'Turkish',
				'Swedish',
				'Hungarian',
				'Russian'
			],

			activeID: function () {
				return Number(this.active || this.default);
			},

			activeName: function () {
				return this.view ? 'Choose Language' : this.languages[this.activeID()];
			},

			isActive: function (index) {
				return this.activeID() == index;
			},

			select: function (id) {
				this.active = id;
//				this.view = false;
			},
			toggle: function (toggle) {
//				this.view = toggle;
			},
			clickOutside: function () {
				if (1) {
					return;
				}

				this.view = false;
			}
		}
	};

	$scope.logout = function () {
		server.logout();
	};

	$scope.pageLogin = {
		forgotPassword: {
			message: '',
			view: false,
			toggle: function (toggle) {
				this.view = toggle;
			},
			submit: function () {
				var self = this;

				self.message = 'Coming Soon';

				this.toggle(false);
			}
		},

		login: {
			message: '',
			email: '',
			password: '',
			submit: function () {
				setCookie(COOKIE_USER, '{}');
				var self = this;
				self.message = '';

				self.password = $('#login_psw').val();

				if (!self.email || !self.password) {
					self.message = 'Please, enter email and password';
					return;
				}

				var user = server.getParams();

				server = new Server({
					pos: user.pos,
					email: self.email,
					password: self.password,
					page: user.page
				});

				server.checkStatus(function (resp) {
					if (resp.error) {
						self.message = resp.message;
						return;
					}

					var need_to_login = +resp.data.need_to_login,
						numberPage = +resp.data.next_step;

					if (need_to_login) {
						server.checkStep();
					} else if (!need_to_login && numberPage == 1) {
						self.message = 'Please, enter correct email or password';
					}
				});

			}
		},

		showRegistration: function () {
			setCookie(COOKIE_USER, '{}');
			openPage(0);
		},

		view: function () {
			this.login.message = '';
			this.forgotPassword.message = '';

			$scope.showPage = 100;
			$scope.Global.title = 'Login';
//			setUserCookie({
//				email: '',
//				pos: '',
//				page: 100
//			});
//			server.logout();

		}
	};

	function setValuesAllInputs(data) {
		var serverData = server.getParams(),
			step = (data.step_data && data.step_data.next_step) ? data.step_data.next_step : serverData.page;

		if (data.status.is_error) {
			return data.status.message;
		}

		// Global Settings
		$scope.Global.pmID = data.pmId;
		// TODO: go to Global object
		$scope.isSupportCreditCard = !!data.support_credit_card;
		//if ($scope.isSupportCreditCard) {
		//	$scope.step4.paymentOption[0].selected = $scope.isSupportCreditCard;
		//	$scope.step4.paymentOption[1].selected = !$scope.isSupportCreditCard;
		//}

		// Step 1
		if (data.manager) {
			$scope.pageStep1.setData(data.manager);
		}

		// Step 2
		if (data.channel_partners) {
			$scope.pageStep2.setData(data.channel_partners);
		}
		if (step > 1) {
			$scope.user.authorityCheckbox = true;
			$scope.user.privacyPolicyAgreeCheckbox = true;

			$scope.pageStep1.isPassword = true;
		}

		// Step 3
		if (data.products) {
			$scope.pageStep3.setData(data.products);
		}

		// Step 4
		if (data.billing_policies) {
			$scope.pageStep4.setData(data.billing_policies);
		}

		// Step 5
		if (data.credit_card_types) {
			$scope.pageStep5.setData(data.credit_card_types, data.payment, data.gateway);
		}

		// Step 6
		if (data.payment && data.manager_payment_type) {
			$scope.pageStep6.setData(data.payment, data.manager_payment_type, data.manager_ach, data.manager_paypal);
		}

		var next_step = (step != 100 && step < serverData.page) ? step : serverData.page;

		openPage(next_step);

		return false;
	}

	/********************************************************/
	/*************** Login functions END ********************/
	/********************************************************/

	$scope.pageStep0 = {
		back: function () {
			openPage(100);
		},

		view: function () {
			$scope.showPage = 0;
			$scope.Global.title = 'Channel Partner Distribution';
		},

		next: function () {
			openPage(1);
		}
	};

	/********************************************************/
	/*************** Step1 functions START ******************/
	/********************************************************/

	$scope.pageStep1 = {
		message: '',
		isPassword: false,
		rePasswordField: '',

		view: function () {
			this.message = '';
			this.isError = false;
			this.isStep = false;

			$scope.showPage = 1;
			$scope.Global.title = 'Please verify Your information';
		},

		setData: function (manager) {
			$scope.user.account = manager.account;
			$scope.user.company = manager.companyName;
			$scope.user.firstname = manager.firstName;
			$scope.user.lastname = manager.lastName;
			$scope.user.address = manager.address;
			$scope.user.city = manager.city;
			$scope.user.state = manager.state;
			$scope.user.code = manager.code;
			$scope.user.countryid = manager.countryId;
			for (var i in $scope.countriesStep1) {

				if ($scope.countriesStep1[i].ID == $scope.user.countryid) {
					$scope.currentCountry = $scope.countriesStep1[i];
				}
			}

			if (manager.phoneCountryCode) {
				$scope.user.phoneCountryCode = manager.phoneCountryCode;
			} else if ($scope.currentCountry) {
				$scope.currentCountry = '+' + $scope.currentCountry.PhoneCode;
			}

			$scope.user.phoneMainPart = manager.dayPhone;
			$scope.user.email = manager.email;
		},

		viewPrivacy: function () {
			jQuery('#step1PopupPrivacyContentDiv').load(privacyPolicyPageUrl, function () {
				jQuery('.terms_link', '#step1PopupPrivacyContentDiv').click(function () {
					$scope.pageStep1.viewTermsConditions();
					return false;
				});
			});
			$scope.showStep1PrivacyPopup = true;
		},

		viewTermsConditions: function () {
			jQuery('#step1PopupPrivacyContentDiv').load(termsConditionsTextPage, function () {
				jQuery('.privacy_link', '#step1PopupPrivacyContentDiv').click(function () {
					console.log('Work link');
					$scope.pageStep1.viewPrivacy();
					return false;
				});
			});
			$scope.showStep1PrivacyPopup = true;
		},

		errorStep: function (error) {
			this.isError = false;
			if (!this.isStep) {
				return false;
			}
			var pass = $scope.user.password || '',
				repass = $scope.pageStep1.rePasswordField || '';

			if (!$scope.reg1Form.$valid || pass != repass) {
				this.isError = true;
				this.message = 'Please complete all highlighted fields to continue.';
				return true;
			}

			if (error) {
				this.isError = true;
				this.message = error;
				return true;
			}

			return false;
		},

		next: function () {
			var self = this;
			$scope.submittedStep1 = true;

			self.isStep = true;

			if (self.errorStep()) {
				return;
			}

			var postDataStep1 = {
				"account": $scope.user.account,
				"company": $scope.user.company,
				"firstname": $scope.user.firstname,
				"lastname": $scope.user.lastname,
				"address": $scope.user.address,
				"city": $scope.user.city,
				"state": $scope.user.state,
				"code": $scope.user.code,
				"countryid": $scope.user.countryid,
				"phone": "(" + $scope.user.phoneCountryCode + ")" + $scope.user.phoneMainPart,
				"email": $scope.user.email,
				"password": $scope.user.password,
				"step": 1
			};

			server.registration(postDataStep1, function (resp) {
				if (resp.error) {
					self.isError = true;
					self.message = resp.message;
					return;
				}

				setValuesAllInputs(resp.data);

				server = new Server({
					pms_pos: '',
					email: $scope.user.email,
					password: $scope.user.password,
					page: resp.data.step_data.next_step
				});


				server.checkStatus(function (resp) {
					if (resp.error) {
						self.message = resp.message;
						return;
					}

					var need_to_login = +resp.data.need_to_login,
						numberPage = +resp.data.next_step;

					if (need_to_login) {
						server.checkStep();
					} else if (!need_to_login && numberPage == 1) {
						self.message = 'Please, enter correct email or password';
					}

					$scope.pageStep1.rePasswordField = $scope.user.password = '';
				});
			});
		}
	};

	/********************************************************/
	/*************** Step2 functions START ******************/
	/********************************************************/

	$scope.popupDefaultTab = 'channel_overview';
	$scope.popupTabView = $scope.popupDefaultTab;


	$scope.pageStep2 = {
		message: '',
		activePrivacyPopup: false,

		back: function () {
			openPage(1);
			$scope.submittedStep1 = false;
		},

		setData: function (channels) {
			var self = this,
				isSelected = false;

			$scope.listStep2 = channels;

			self.slider.option.max = 0;
			self.slider.option.min = 100;

			angular.forEach($scope.listStep2, function (channel) {
				channel.channel_type = channel.channel_type.toString().split(',');
				channel.commission = parseFloat(channel.commission);
				channel.selected = !!channel.selected;

				if (self.slider.option.min > channel.commission) {
					self.slider.option.min = parseInt(channel.commission, 10);
				}

				if (self.slider.option.max < channel.commission) {
					self.slider.option.max = parseInt(channel.commission, 10);
				}

				if (channel.selected) {
					isSelected = true;
				}
			});

			if (self.slider.option.val < 0) {
				self.slider.option.val = self.slider.option.max;
			}

			self.slider.setCommissionSlider();

			$scope.step2.confirmDistributionAgreement = isSelected;
		},

		view: function () {
			this.message = '';
			this.isStep = false;
			this.isError = false;

			$scope.Global.title = 'Channel Selection';
			$scope.showPage = 2;
		},

		errorStep: function (error) {
			var self = this,
				isSelectedChannel = false;

			self.message = '';
			self.isError = false;

			if (!self.isStep) {
				return false;
			}

			for (var i = 0, count_channels = $scope.listStep2.length; i < count_channels; i++) {
				if ($scope.listStep2[i].selected && parseInt($scope.listStep2[i].commission) <= self.slider.option.val) {
					isSelectedChannel = true;
				}
			}

			if (!isSelectedChannel) {
				self.isError = true;
				self.message = 'At least one partner need to be checked and Distribution Agreement checkbox checked.';
				return true;
			}

			if (!$scope.reg2Form.step2ConfirmReadDistributionAgreement.$valid) {
				self.isError = true;
				self.message = 'Please confirm that you have read, understand and accept the channel partners Distribution Agreement.';
				return true;
			}

			if (error) {
				self.isError = true;
				self.message = error;

				return true;
			}

			return false;
		},

		next: function (goToNextStep) {
			var self = this;
			$scope.submittedStep2 = true;

			self.isStep = true;

			if (self.errorStep()) {
				return;
			}

			if ($scope.reg2Form.$valid) {
				var selectedChannelIdArray = [];

				angular.forEach($scope.listStep2, function (tableRow) {
					if (tableRow.selected && parseInt(tableRow.commission) <= self.slider.option.val) { //$scope.sliderStep2.selectedValue
						selectedChannelIdArray.push(tableRow.id);
					}
				});

				if (selectedChannelIdArray.length > 0) {
					//post data to server
					var postDataStep2 = {
						channel_partners_list_ids: selectedChannelIdArray,
						step: 2,
						next_step: goToNextStep
					};
					server.saveStep(postDataStep2, function (resp) {
						if (resp.error) {
							self.errorStep(resp.message);
							return;
						}

						self.isStep = false;

						if (!goToNextStep) {
							alert(saveSuccessMessage);
							return;
						}

						$scope.pageStep3.setData(resp.data.products);

						openPage(resp.data.step_data.next_step);
					});
				}
			}
		},

		channelInfo: {
			data: {},

			view: function (channel_id) {
				var self = this;
				$scope.pageStep2.isStep = true;
				$http({
					url: API_PHP_URL + 'channel/get/?id=' + channel_id,
					method: 'GET'
				}).success(function (resp) {
					if (resp.error) {
						$scope.pageStep2.errorStep(resp.message);
						return;
					}

					$scope.pageStep2.isStep = false;
					self.data = resp.data;

					$scope.showInfoPopup = true;

				}).error(function () {
					$scope.pageStep2.errorStep('Connect server error!');
				});
			},

			close: function () {
				$scope.showInfoPopup = false;

				this.data = {};
			},

			select: function () {
				if (!this.data.id) {
					this.close();
				}

				for (var i = 0, count_channels = $scope.listStep2.length; i < count_channels; i++) {
					if ($scope.listStep2[i].id == this.data.id) {
						$scope.listStep2[i].selected = true;
						break;
					}
				}

				this.close();
			}

		},

		showPrivacyPopup: function () {
			this.activePrivacyPopup = true;
		},

		filter: {
			booking: function (channel) {
				return ~channel.channel_type.indexOf('1') && (channel.commission <= $scope.pageStep2.slider.option.val);
			},

			listing: function (channel) {
				return ~channel.channel_type.indexOf('2') && (channel.commission <= $scope.pageStep2.slider.option.val);
			},

			inguiry: function (channel) {
				return ~channel.channel_type.indexOf('3') && (channel.commission <= $scope.pageStep2.slider.option.val);
			},

			isSelectedChannel: function (cahnnel) {
				return cahnnel.selected && parseInt(cahnnel.commission) <= $scope.pageStep2.slider.option.val;
			}

		},

		slider: {
			option: {
				val: -1,
				max: 0,
				min: 100,
				step: 1,

				count_view_partners: 0,
				total_view_exposures: 0
			},
			$tooltip: jQuery(".tooltip", '#sliderStep2'),
			$box: jQuery("#sliderStep2"),

			setCommissionSlider: function () {
				var self = this;

				self.$box.slider({
					value: self.option.val,
					min: self.option.min,
					max: self.option.max,
					step: self.option.step,

					create: function (event, ui) {
						var curValue = ui.value || self.option.val,
							target = ui.handle || jQuery('.ui-slider-handle');


						jQuery(target).html('<div class="tooltip">' + curValue + '%</div>');

						self.changeCommission(curValue);
						self.filterCannelsByCommission();
					},

					slide: function (event, ui) {
						self.changeCommission(ui.value);

					},

					change: function (event, ui) {
						self.changeCommission(ui.value);
						self.filterCannelsByCommission();
					}
				});
			},

			changeCommission: function (val) {
				var self = this,
					$minbox = jQuery('.slider_min_value'),
					$maxbox = jQuery('.slider_max_value');

				self.option.val = parseInt(val, 10);
				self.$box.find('.tooltip').html(self.option.val + "%");

				if (val - self.option.step <= self.option.min) {
					$minbox.fadeOut();
				} else {
					$minbox.fadeIn();
				}
				if (val + self.option.step >= self.option.max) {
					$maxbox.fadeOut();
				} else {
					$maxbox.fadeIn();
				}
			},

			filterCannelsByCommission: function () {
				var self = this;

				self.option.count_view_partners = 0;
				self.option.total_view_exposures = 0;

				angular.forEach($scope.listStep2, function (tableRow) {
					if (parseInt(tableRow.commission) <= self.option.val) {
						self.option.count_view_partners++;

						self.option.total_view_exposures += isNaN(+tableRow.traffic) ? 0 : +tableRow.traffic;
					}
				});

				if (!$scope.$$phase) {
					$scope.$apply();
				}
			}
		}
	};


	/********************************************************/


	/********************************************************/
	/*************** Step3 functions START ******************/

	$scope.pageStep3 = {
		isStep: false,
		message: '',

		products: {},

		setData: function (products) {
			if (!angular.isArray(products.list) && products.list) {
				products.list = [products.list];
			}


			for (var i in products.list) {
				var prod = products.list[i];
				products.list[i] = {
					address: prod.address || '',
					bathrooms: prod.bathrooms || 0,
					bedrooms: prod.bedrooms || 0,
					cleaning_fee: prod.cleaning_fee || 0,
					commission: prod.commission || 0,
					country: prod.country || '',
					deposit: prod.deposit || 0,
					description: prod.description || '',
					id: prod.id || 0,
					location: prod.location || '',
					selected: prod.selected || false
				}
			}

			this.products = products;

			if (this.products.total_count) {
				this.products.count_page = Math.ceil(this.products.per_page ? this.products.total_count / this.products.per_page : 1);
			}

			this.products.prev_page = products.page - 1;
			if (1 > this.products.prev_page) {
				this.products.prev_page = 1;
			}

			this.products.next_page = products.page + 1;
			if (this.products.count_page < this.products.next_page) {
				this.products.next_page = this.products.count_page;
			}

		},

		back: function () {
			openPage(2);
		},

		view: function () {
			this.message = '';
			this.isStep = false;
			this.isError = false;

			if (!this.products.list || !this.products.list.length) {
				this.isStep = true;
				this.errorStep('Please contact us at this number so that we can assist you with your registration process.');
			}

			$scope.Global.title = 'Property Selection';
			$scope.showPage = 3;
		},

		errorStep: function (error) {
			this.isError = false;
			if (!this.isStep) {
				return false;
			}

			//TODO MAYBE need
//			if (!$scope.reg3Form.$valid) {
//				this.isError = true;
//				this.message = 'At least one properties need to be checked and all selected properties fields filled.';
//				return true;
//			}

			if (error) {
				this.isError = true;
				this.message = error;

				return true;
			}

			return false;
		},

		getActivePages: function () {
			if (!this.products.total_count) {
				return {};
			}

			var active_pages = [],
				prev_page = this.products.page - 5,
				next_page = this.products.page + 5;

			if (1 > prev_page) {
				prev_page = 1;
			}

			if (this.products.count_page < next_page) {
				next_page = this.products.count_page;
			}

			for (var i = prev_page; i <= next_page; i++) {
				active_pages.push(i);
			}

			return active_pages;
		},

		isCurrentPage: function (page) {
			if (page == '..') {
				return 'not_use';
			}

			return page == this.products.page ? 'current_page' : '';
		},

		isNotUse: function (page) {
			return (!this.products.total_count || page == this.products.page) ? 'not_use' : '';
		},

		getPage: function (page) {
			this.isStep = true;
			if (!Number(page)) {
				return;
			}

			if (this.errorStep()) {
				return;
			}

			var self = this,
				postDataStep3 = {
//					pos: $scope.user.pos,
					products: {
						list: self.products.list,
						per_page: self.products.per_page,
						page: page,
						selected: self.products.selected
					},
					next_step: false,
					step: 3
				};

			server.saveStep(postDataStep3, function (resp) {
				if (resp.error) {
					self.errorStep(resp.message);
					return;
				}

				self.setData(resp.data.products);
			});

		},

		triggerSelectAll: function () {
			var count_selected = 0;
			if (!this.products.selected) {
				for (var i = 0; i < this.products.list.length; i++) {
					if (this.products.list[i].selected)
						count_selected++;
				}

				if (count_selected != this.products.list.length) {
					return;
				}
			}

			for (var i = 0; i < this.products.list.length; i++) {
				this.products.list[i].selected = this.products.selected;
			}
		},

		triggerSelectOne: function (selected) {
			if (selected) {
				var count_selected = 0;

				for (var i = 0; i < this.products.list.length; i++) {
					if (this.products.list[i].selected) {
						count_selected++;
					}
				}

				if (count_selected == this.products.list.length) {
					this.products.selected = true;
				}
			}

			if (!selected && this.products.selected) {
				this.products.selected = false;
			}
		},

		next: function (goToNextStep) {
			var self = this;
//			$scope.submittedStep3 = true;
			self.isStep = true;

			if (self.errorStep()) {
				return;
			}

			var postDataStep3 = {
//				pos: $scope.user.pos,
				products: {
					list: this.products.list,
					selected: self.products.selected
				},
				step: 3,
				next_step: goToNextStep
			};

			server.saveStep(postDataStep3, function (resp) {
				if (resp.error) {
					self.errorStep(resp.message);
					return;
				}

				self.isStep = false;

				if (!goToNextStep) {
					alert(saveSuccessMessage);
					return;
				}

				openPage(resp.data.step_data.next_step);
			});

		},

		verify: function () {

		}
	};


	/********************************************************/
	/*************** Step4 functions START ******************/

	function correctHourOrTime(val) {
		val = '0' + val;
		return val.substr(-2);
	}

	$scope.pageStep4 = {
		isStep: false,
		message: '',

		back: function () {
			openPage(3);
		},

		view: function () {
			this.message = '';
			this.isStep = false;
			this.isError = false;

			$scope.Global.title = 'Cancellation & Term';
			$scope.showPage = 4;

			//if ($scope.isSupportCreditCard) {
			//	$scope.step4.paymentOption[0].selected = true;
			//	$scope.step4.paymentOption[1].selected = false;
			//}
		},

		errorStep: function (error) {
			var self = this;
			if (!this.isStep) {
				return false;
			}

			if (!$scope.reg4Form.$valid) {
				this.isError = true;
				this.message = 'Please select one of the options and fill in empty fields.';
				return true;
			}

			if ($scope.step4.paymentTimeOfBooking > $scope.paymentBookingListStep4[$scope.step4.paymentTimeOfBookingType - 1].max) {
				this.isError = true;
				this.message = 'Please select one of the options and fill in empty fields.';
				return true;
			}

			if (!this.tmpData.terms_link) {
				this.isError = true;
				this.message = "Please set url or upload file 'Terms and Conditions'.";
				return true;
			}

			var history_days = [], history_error = false;
			if ($scope.step4.cancellationOption[1].selected){
				angular.forEach($scope.pageStep4.tmpData.cancelation_policies, function (row) {
					if (~history_days.indexOf(row.cancelation_time)) {
						row.error_cancelation_time = 'invalid-required';
						self.isError = true;
						self.message = 'Please select one of the options and fill in empty fields.';
						history_error = true;
						return;
					} else {
						row.error_cancelation_time = '';
					}
					history_days.push(row.cancelation_time);
				});
			}

			if (history_error) {
				return true;
			}

			if (error) {
				this.isError = true;
				this.message = error;

				return true;
			}

			return false;
		},

		setData: function (policies) {
			if (!policies) {
				return;
			}

			this.tmpData.terms_link = policies.terms_link;
			this.tmpData.pm_time = policies.pm_time;

			var check_in_time = new Date();
			if (policies.check_in_time && typeof policies.check_in_time == "string") {
				policies.check_in_time = policies.check_in_time.split(':');
			} else {
				policies.check_in_time = ['00', '00'];
			}
			check_in_time.setHours(policies.check_in_time[0], policies.check_in_time[1], 0);
			var hour = check_in_time.getHours() > 12 ? check_in_time.getHours() - 12 : check_in_time.getHours();
			this.tmpData.check_in_time = [correctHourOrTime(hour), correctHourOrTime(check_in_time.getMinutes()), check_in_time.getHours() > 12 ? 'PM' : 'AM'];

			var check_out_time = new Date();
			if (policies.check_out_time && typeof policies.check_out_time == "string") {
				policies.check_out_time = policies.check_out_time.split(':');
			} else {
				policies.check_out_time = [0, 0];
			}
			check_out_time.setHours(policies.check_out_time[0], policies.check_out_time[1], 0);
			hour = check_out_time.getHours() > 12 ? check_out_time.getHours() - 12 : check_out_time.getHours();
			this.tmpData.check_out_time = [correctHourOrTime(hour), correctHourOrTime(check_out_time.getMinutes()), check_out_time.getHours() > 12 ? 'PM' : 'AM'];


			if (policies.number_of_payments == 1) { // || $scope.isSupportCreditCard
				$scope.step4.paymentOption[0].selected = true;
				$scope.step4.paymentOption[1].selected = false;
			} else {
				$scope.step4.paymentOption[0].selected = false;
				$scope.step4.paymentOption[1].selected = true;

				$scope.step4.paymentTimeOfBooking = policies.first_payment_amount;
				$scope.step4.paymentTimeOfBookingType = policies.first_payment_type;
				$scope.step4.reminderDueType = policies.second_payment_type;
			}


			if (policies.cancelation_type == 1) {
				$scope.step4.cancellationOption[0].selected = true;
				$scope.step4.cancellationOption[1].selected = false;

			} else if (policies.cancelation_type == 2) {
				$scope.step4.cancellationOption[0].selected = false;
				$scope.step4.cancellationOption[1].selected = true;

				if (policies.cancelation_policies && policies.cancelation_policies.length) {
					this.tmpData.cancelation_policies = policies.cancelation_policies;
				} else if (typeof policies.cancelation_policies == 'object') {
					this.tmpData.cancelation_policies = [policies.cancelation_policies];
				}
			}

			if (policies.damage_coverage_type || policies.damage_coverage_type === 0 || policies.damage_coverage_type === '0') {
				$scope.step4.damageOption[policies.damage_coverage_type].selected = true;

				if (policies.damage_coverage_type == "2") {
					$scope.step4.damageInsuranceType = policies.damage_insurance;
				}
			}


			this.tmpData.currency = policies.currency;
		},

		getData: function (goToNextStep) {

			var paymentAmount = $scope.step4.paymentTimeOfBooking,
				firstPaymentType = $scope.step4.paymentTimeOfBookingType,
				paymentTerms = getIdOfSelectedCheckboxFromArray($scope.step4.paymentOption),
				cancelation_type = 0;

			if ($scope.step4.cancellationOption[0].selected) {
				cancelation_type = 1;
			}

			if ($scope.step4.cancellationOption[1].selected) {
				cancelation_type = 2;
			}

			var check_in_time = new Date();
			var check_out_time = new Date();


			check_in_time.setHours(+this.tmpData.check_in_time[0] + (this.tmpData.check_in_time[2] == 'PM' ? 12 : 0), this.tmpData.check_in_time[1]);
			check_out_time.setHours(+this.tmpData.check_out_time[0] + (this.tmpData.check_out_time[2] == 'PM' ? 12 : 0), this.tmpData.check_out_time[1]);

			for (var i = 0; i < this.tmpData.cancelation_policies.length; i++) {
				if (!this.tmpData.cancelation_policies[i].cancelation_transaction_fee) {
					this.tmpData.cancelation_policies[i].cancelation_transaction_fee = 0;
				}
			}

			return {
//				pos: $scope.user.pos,
				step: 4,
				next_step: goToNextStep,

				billing_policies: {
					cancelation_policies: this.tmpData.cancelation_policies,
					cancelation_type: cancelation_type,

					terms_link: this.tmpData.terms_link,
					check_in_time: correctHourOrTime(check_in_time.getHours()) + ':' + correctHourOrTime(check_in_time.getMinutes()),
					check_out_time: correctHourOrTime(check_out_time.getHours()) + ':' + correctHourOrTime(check_out_time.getMinutes()),

					number_of_payments: paymentTerms,
					first_payment_amount: paymentAmount,
					first_payment_type: firstPaymentType,
					second_payment_type: $scope.step4.reminderDueType,
					damage_coverage_type: getIdOfSelectedCheckboxFromArray($scope.step4.damageOption),
					damage_insurance: $scope.step4.damageInsuranceType,

					currency: this.tmpData.currency,
					pm_time: this.tmpData.pm_time ? true : false
				}
			};
		},

		next: function (goToNextStep) {
			var self = this;

			self.isStep = true;

			if (self.errorStep()) {
				return;
			}


			var postDataStep4 = this.getData(goToNextStep);

			server.saveStep(postDataStep4, function (resp) {
				if (resp.error) {
					self.errorStep(resp.message);
					return;
				}

				self.isStep = false;
				self.isError = false;

				if (!goToNextStep) {
					alert(saveSuccessMessage);
					return;
				}

				openPage(($scope.isSupportCreditCard) ? 6 : resp.data.step_data.next_step);
			});
		},

		tmpData: {
			cancelation_policies: [
				{
					cancelation_time: '',
					cancelation_refund: '',
					cancelation_transaction_fee: '',
					error_cancelation_time: ''
				}
			],

			terms_link: '',
			check_in_time: [0, 0, 'AM'],
			check_out_time: [0, 0, 'AM'],
			pm_time: '',

			currency: ''
		},

		currencyList: [],

		addCancelation: function () {
			this.tmpData.cancelation_policies.push({
				cancelation_time: '',
				cancelation_refund: '',
				cancelation_transaction_fee: '',
				error_cancelation_time: ''
			});
		},

		delCancelation: function (index) {
			if (this.tmpData.cancelation_policies.length <= 1) {
				this.tmpData.cancelation_policies = [
					{
						cancelation_time: 0,
						cancelation_refund: '',
						cancelation_transaction_fee: '',
						error_cancelation_time: ''
					}
				];

				return;
			}

			this.tmpData.cancelation_policies.splice(index, 1);
		},

		getMaxFileSize: function () {
			return MAX_FILE_SIZE;
		},

		isUploaded: false,
		fileUp: function () {
			var self = this,
				fd = new FormData;

			if (!$scope.files) {
				alert('Select file.');
				return;
			}

			for (var i = 0; i < $scope.files.length; i++) {
				if ($scope.files[i].size > (MAX_FILE_SIZE * 1048576)) {
					alert('File `' + $scope.files[i].name + '` have size > ' + MAX_FILE_SIZE + 'M');
					return;
				}

				fd.append('file', $scope.files[i]);
			}

			if (self.isUploaded) {
				alert('Sorry, file is uploading!');
				return;
			}
			self.isUploaded = true;

			$http.post(API_PHP_URL + 'upload-files/pm/?type=terms&id=' + $scope.Global.pmID, fd, {
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined
				}
			}).success(function (resp) {
				self.isUploaded = false;
				if (resp.error) {
					alert(resp.message);
					return;
				}

				self.tmpData.terms_link = resp.data.url;
			}).error(function () {
				self.isUploaded = false;
				alert('Sorry, error!!!');
			});
		}
	};

	/********************************************************/
	/*************** Step5 functions START ******************/
	/********************************************************/

	$scope.pageStep5 = {
		message: '',
		isStep: false,

		back: function () {
			openPage(4);
		},

		view: function () {
			if ($scope.isSupportCreditCard) {
				openPage(6);
				return;
			}
			this.message = '';
			this.isStep = false;
			this.isError = false;

			$scope.Global.title = 'Online Payment';
			$scope.showPage = 5;
		},

		setData: function (credit_card_types, payment, gateway) {
			if (!credit_card_types.none) {
				$scope.pageStep5.credit_cart = credit_card_types;
			} else {
				$scope.pageStep5.credit_cart_reset = true;
			}

			if (payment == 1) {
				$scope.step5.paymentOption[0].selected = true;
			} else if (payment == 2) {
				$scope.step5.paymentOption[2].selected = true;
			} else if (payment == 0) {
				$scope.step5.paymentOption[1].selected = true;

				for (var i = 0; i < $scope.pageStep5.gateway.length; i++) {
					var g = angular.extend({}, $scope.pageStep5.gateway[i]);

					if (gateway.id == g.id) {
						for (var j = 0; j < g.fields.length; j++) {
							var field = g.fields[j];

							g.fields[j].value = gateway[field.id] ? gateway[field.id] : '';
						}

						$scope.pageStep5.activeGateway = g;
						break;
					}
				}

			}
		},

		errorStep: function (error) {

			this.isError = false;

			if (!this.isStep) {
				return false;
			}

			if (!$scope.reg5Form.$valid) {
				this.message = 'Please select one of the options and fill in empty fields.';
				this.isError = true;
				return true;
			}

			if ($scope.step5.paymentOption[1].selected && (!this.activeGateway.id || !this.activeGateway.fields[0].value || !this.activeGateway.fields[1].value)) {
				this.message = 'Please select one of the options and fill in empty fields.';
				this.isError = true;
				return true;
			}

			if (!$scope.step5.paymentOption[2].selected && !(function (c) {
				for (var i in  c) if (c[i]) return true;
				return false;
			})(this.credit_cart)) {
				this.message = 'Please select one of accepted credit cards.';
				this.isError = true;
				return true;
			}

			if (error) {
				this.isError = true;
				this.message = error;
				return true;
			}

			return false;
		},

		next: function (goToNextStep) {
			var self = this;

			self.isStep = true;

			if (self.errorStep()) {
				return;
			}

			if (this.activeGateway.id) {
				var gatewaySelected = {
					id: this.activeGateway.id
				};
				for (var i = 0; i < this.activeGateway.fields.length; i++) {
					var field = this.activeGateway.fields[i];

					gatewaySelected[field.id] = field.value;
				}

			}

			var pid = getIdOfSelectedCheckboxFromArray($scope.step5.paymentOption);
			if (pid == 1) {
				$scope.step6AgreementClass = agreementClass1;
				$scope.step6AgreementWrapperClass = agreementWrapperClass1;
				$scope.step6AgreementDivClass = agreementDivClass1;
				$scope.step6AgreementTextClass = agreementTextClass1;
				$scope.bookingpalpayment = true;

			} else if (pid == 0 || pid == 2) {
				$scope.step6AgreementClass = agreementClass2;
				$scope.step6AgreementWrapperClass = agreementWrapperClass2;
				$scope.step6AgreementDivClass = agreementDivClass2;
				$scope.step6AgreementTextClass = agreementTextClass2;
				$scope.bookingpalpayment = false;
			}

			//post data to server
			var postDataStep5 = {
//				pos: $scope.user.pos,
				payment: pid,
				gateway: gatewaySelected,
				step: 5,
				next_step: goToNextStep,
				credit_card_types: this.credit_cart
			};


			server.saveStep(postDataStep5, function (resp) {
				if (resp.error) {
					self.errorStep(resp.message);
					return;
				}

				self.isStep = false;

				if (!goToNextStep) {
					alert(saveSuccessMessage);
					return;
				}

				openPage(6);
			});
		},


		credit_cart: {},
		credit_card_none: function () {
			for (var i in this.credit_cart) {
				delete this.credit_cart[i];
			}

			for (var i in $scope.step5.paymentOption) {
				$scope.step5.paymentOption[i].selected = false;
			}

			$scope.step5.paymentOption[2].selected = true;
		},
		credit_card_select: function () {
			delete this.credit_cart_reset;
		},

		gateway: [
			{
				name: "Pay Pal",
				id: "1",
				fields: [
					{id: 'additionalInfo', name: "ClientID", value: "", info: {title: 'Your Client ID', desc: 'Fugitat accab im quis debistibus demporectet ligendi odi beateminum apiet prerum voluptae int plitius  exp eruntur aut et opta quiatursapelig'}},
					{id: 'transactionKey', name: "Secret", value: "", info: {title: 'Your Secret', desc: 'Fugitat accab im quis debistibus demporectet ligendi odi beateminum apiet prerum voluptae int plitius  exp eruntur aut et opta quiatursapelig'}}
				]
			},
			{
				name: "Authorize.Net",
				id: "2",
				fields: [
					{id: 'additionalInfo', name: "ApiLoginId", value: "", info: {title: 'Test', desc: 'test desc'}},
					{id: 'transactionKey', name: "TransactionKey", value: "", info: {title: 'Test', desc: 'test desc'}}
				]
			},
			{
				name: "DIBS",
				id: "4",
				fields: [
					{id: 'accountId', name: "Merchant ID", value: "", info: {title: 'Test', desc: 'test desc'}},
					{id: 'additionalInfo', name: "Login", value: "", info: {title: 'Test', desc: 'test desc'}},
					{id: 'transactionKey', name: "Password", value: "", info: {title: 'Test', desc: 'test desc'}}
				]
			},
			{
				name: "oGone",
				id: "6",
				fields: [
					{id: 'accountId', name: "PSP_ID", value: "", info: {title: 'Test', desc: 'test desc'}},
					{id: 'additionalInfo', name: "User_ID", value: "", info: {title: 'Test', desc: 'test desc'}},
					{id: 'transactionKey', name: "Password", value: "", info: {title: 'Test', desc: 'test desc'}}
				]
			}
		],

		selectGateway: function (row) {
			this.activeGateway = row;
		},

		activeGateway: {}
	};

	$scope.pageStep5.activeGateway = $scope.pageStep5.gateway[0];

	/********************************************************/
	/*************** Step6 functions START ******************/
	/********************************************************/

	$scope.pageStep6 = {

		message: '',

		back: function () {
			openPage(($scope.isSupportCreditCard) ? 4 : 5);
		},

		view: function () {
			this.message = '';
			this.isError = false;
			this.isStep = false;

			$scope.Global.title = 'Payouts';
			$scope.showPage = 6;
		},

		setData: function (payment, manager_payment_type, manager_ach, manager_paypal) {

			if (payment == 1) {
				angular.forEach($scope.step6.receivingOption, function (oneRow) {
					if (oneRow.id == manager_payment_type) {
						oneRow.selected = true;
					}
				});

				if (manager_payment_type == 3) {
					$scope.step6.bankName = manager_ach.bank;
					$scope.step6.accountHolderName = manager_ach.holder_name;
					$scope.step6.routingNumber = manager_ach.routing_number;
					$scope.step6.accountNumber = manager_ach.accounting_number;
					$scope.step6.accountType = manager_ach.account_type;
					$scope.step6.socialOrTaxNumber = manager_ach.social_or_tax_number;
					$scope.step6.socialOrTaxType = manager_ach.social_or_tax_type;

					$scope.step6.dayBirthDate = 1;
					$scope.step6.monthBirthDate = 2;
					$scope.step6.yearBirthDate = 2;
				}
				if (manager_payment_type == 2) {
					$scope.step6.paypalId = manager_paypal;
				}
				$scope.bookingpalpayment = true;
			}

			if (payment == 0) {
				$scope.step6AgreementClass = agreementClass2;
				$scope.step6AgreementWrapperClass = agreementWrapperClass2;
				$scope.step6AgreementDivClass = agreementDivClass2;
				$scope.step6AgreementTextClass = agreementTextClass2;
				$scope.bookingpalpayment = false;
			}
		},

		isStep: false,

		errorStep: function (error) {
			this.message = '';
			this.isError = false;

			if (!this.isStep) {
				return false;
			}


			if (!$scope.reg6Form.$valid) {
				this.isError = true;

				if (!$scope.reg6Form.step6ConfirmReadDistributionAgreement.$valid) {
					this.message = "Please confirm that you have read, understand and accept Bookingpal's Distribution Agreement.";
				} else {
					this.message = 'Please select one of the options and fill in empty fields.';
				}

				return true;
			}


			if (error) {
				this.isError = true;
				this.message = error;

				return true;
			}


			return false;
		},

		next: function (goToNextStep) {
			var self = this;

			$scope.needtoVerify = true;

			self.isStep = true;
			if (self.errorStep()) {
				return;
			}

			//post data to server
			var postDataStep6 = {
//				pos: $scope.user.pos,
				step: 6,
				next_step: goToNextStep
			};

			if ($scope.bookingpalpayment) {
				var managerAch = {"bank": $scope.step6.bankName, "holder_name": $scope.step6.accountHolderName, "routing_number": $scope.step6.routingNumber,
					"accounting_number": $scope.step6.accountNumber, "account_type": $scope.step6.accountType, "social_or_tax_number": $scope.step6.socialOrTaxNumber,
					"social_or_tax_type": $scope.step6.socialOrTaxType, "birthdate": $scope.step6.dayBirthDate + "-" + $scope.step6.monthBirthDate + "-" + $scope.step6.yearBirthDate
				};

				var typeId = getIdOfSelectedCheckboxFromArray($scope.step6.receivingOption);

				if (typeId === 1) {
					$scope.needtoVerify = false;
				}

				postDataStep6 = {
//					"pos": $scope.user.pos,
					manager_payment_type: typeId,
					manager_paypal: $scope.step6.paypalId,
					manager_ach: managerAch,
					step: 6,
					next_step: goToNextStep
				};
			}

			server.saveStep(postDataStep6, function (resp) {
				if (resp.error) {
					self.errorStep(resp.message);
					return;
				}

				self.isStep = false;

				if (!goToNextStep) {
					alert(saveSuccessMessage);
					return;
				}

				openPage(resp.data.stepData.next_step);
			});

		}
	};

	/********************************************************/
	/*************** Step7 functions START ******************/
	/********************************************************/

	$scope.pageStep7 = {
		message: '',
		back: function () {
			openPage(6);
		},

		view: function () {
			if ($scope.isSupportCreditCard) {
				openPage(6);
				return;
			}

			this.isError = false;
			this.message = '';
			this.isStep = false;

			$scope.Global.title = 'Payment Verification';
			$scope.showPage = 7;
		},

		errorStep: function (error) {
			this.message = '';
			this.isError = false;

			if (!this.isStep) {
				return false;
			}

			if (!$scope.reg7Form.$valid) {
				this.isError = true;
				this.message = "You must enter number value.";

				return true;
			}

			if (error) {
				this.isError = true;
				this.message = error;

				return true;
			}


			return false;
		},

		verify: function (goToNextStep) {
			var self = this;
			$scope.submittedStep7 = true;

			self.isStep = true;
			if (self.errorStep()) {
				return;
			}

			var postDataStep7 = {
//				pos: $scope.user.pos,
				verification_amount: $scope.step7.verificationAmount,
				step: 7,
				next_step: goToNextStep
			};

			server.saveStep(postDataStep7, function (resp) {
				if (resp.error) {
					self.errorStep(resp.message);
					return;
				}

				self.isStep = false;

				if (goToNextStep) {
					openPage(8);
				} else {
					alert(saveSuccessMessage);
				}
			});
		}
	};


	/********************************************************/
	/*************** Step8 functions START ********************/
	/********************************************************/
	$scope.pageStep8 = {
		back: function () {
			openPage(6);
		},

		view: function () {
			$scope.Global.title = 'Thank You';
			$scope.showPage = 8;
		}
	};

	$scope.checkboxGroupDeselectOthers = function (checkboxGroupArray, selectedId) {
		angular.forEach(checkboxGroupArray, function (oneOption) {

			oneOption.selected = (oneOption.id === selectedId);

		});
	};


	/* check is at least one checkbox from some group is selected.
	 Checkboxes need to be in array of list, and one of list
	 element need to be 'selected'*/
	$scope.isSomeCheckboxSelectedFromArray = function (optionArray) {
		var someCheckBoxSelected = false;
		angular.forEach(optionArray, function (oneOption) {
			if (oneOption.selected) {
				someCheckBoxSelected = true;
			}
		});

		return someCheckBoxSelected;
	};

	/******* FUnction ******/
	function getIdOfSelectedCheckboxFromArray(optionArray) {
		var selectedId;

		angular.forEach(optionArray, function (oneOption) {
			if (oneOption.selected) {
				selectedId = oneOption.id;
			}
		});

		return selectedId;
	}


	/** -------------------------------------------------------------- **/
	/** ----------------------------Start----------------------------- **/
	$http({
		method: "GET",
		url: API_PHP_URL + 'currency/list/'
	}).success(function (resp) {
		if (resp.error) {
			return;
		}

		$scope.pageStep4.currencyList = resp.data;
	});

	loadCountry();
	checkUserOnPageOpen();

	function loadCountry() {
		$http({
			url: API_PHP_URL + 'country/list/',
			method: "GET"
		}).success(function (resp) {
			if (resp.error) {
				return;
			}

			$scope.countriesStep1 = resp.data;
		}).error(function (data, status, headers, config) {
			console.log('Error List Country! Erorr: ' + status);
		});
	}

	function checkUserOnPageOpen() {
		var pmsPos = $location.search().pos;

		$scope.user = {
			email: $location.search().email,
			account: $location.search().account,
			company: $location.search().company,
			firstname: $location.search().firstname,
			lastname: $location.search().lastname,
			address: $location.search().address,
			city: $location.search().city,
			state: $location.search().state,
			code: $location.search().code,
			countryid: $location.search().countryid,
			phoneMainPart: $location.search().phone
		};


		for (var i in $scope.countriesStep1) {
			if ($scope.countriesStep1[i].ID == $scope.user.countryid) {
				$scope.currentCountry = $scope.countriesStep1[i];
			}
		}

		server = new Server({
			pms_pos: pmsPos,
			email: $scope.user.email,
			page: defaultOpenStep
		});

		server.checkStatus(function (resp) {
			if (resp.error) {
				$scope.pageLogin.message = resp.message;
				openPage(defaultOpenStep);
			} else if (resp.data.need_to_login) {


				$scope.pageLogin.login.email = $scope.user.email;
				server.checkStep();

			} else if (!resp.data.need_to_login) {
				$scope.user.company = resp.data.pms_name;
				openPage(resp.data.next_step);
			}
		});
 	}
}

app.directive('fileInput', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, elm, attrs) {
			elm.bind('change', function () {
				$parse(attrs.fileInput).assign(scope, elm[0].files);
				scope.$apply();
			});
		}
	};
}]);

app.directive('clickOnlyHere', function () {
	return {
		scope: {
			clickOnlyHere: "="
		},
		link: function ($scope, $element, attrs) {

			var clickHandler = function (event) {
//				var inside = ($element[0] === event.target) || $(event.target).parents().index($element) !== -1;
				var inside = ($element[0] === event.target) || !!$(event.target).parents('#' + attrs.id).length;

				var show = inside ? !$scope.clickOnlyHere : false;

				$scope.$apply(function () {
					$scope.clickOnlyHere = show;
				});
			};

			$(document).on('click', clickHandler);

			$scope.$on('$destroy', function () {
				$(document).off('click', clickHandler);
			})
		}
	}
});

/*This is for check password verify field on step1*/
//angular.module('PasswordVerifyValidation', []).directive('validPasswordRe', function () {
//	return {
//		require: 'ngModel',
//		link: function (scope, elm, attrs, ctrl) {
//			ctrl.$parsers.unshift(function (viewValue, $scope) {
//				var noMatch = viewValue != scope.reg1Form.password.$viewValue
//				ctrl.$setValidity('noMatch', !noMatch)
//			})
//		}
//	}
//});

/*This is directive for select/deselect all checkbox*/
app.directive('checkboxAll', function () {
	return function (scope, iElement, iAttrs) {
		var parts = iAttrs.checkboxAll.split('.');
		iElement.attr('type', 'checkbox');
		iElement.bind('change', function (evt) {
			scope.$apply(function () {
				var setValue = iElement.prop('checked');
				angular.forEach(scope.$eval(parts[0]), function (v) {
					v[parts[1]] = setValue;
				});
			});
		});
		scope.$watch(parts[0], function (newVal) {
			var hasTrue, hasFalse;
			angular.forEach(newVal, function (v) {
				if (v[parts[1]]) {
					hasTrue = true;
				} else {
					hasFalse = true;
				}
			});
			if (hasTrue && hasFalse) {
				iElement.attr('checked', false);
			} else {
				iElement.attr('checked', hasTrue);
			}
		}, true);
	};
});

/*This is for allow only numbers in some field (other chars will not be displayed)*/
angular.module('AllowOnlyNumbersDirective', []).directive('numbersOnlyAllowed', function () {
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function (inputValue) {
				// this next if is necessary for when using ng-required on your input.
				// In such cases, when a letter is typed first, this parser will be called
				// again, and the 2nd time, the value will be undefined
				if (inputValue == undefined) return '';
				var transformedInput = inputValue.replace(/[^0-9]/g, '');
				if (transformedInput != inputValue) {
					modelCtrl.$setViewValue(transformedInput);
					modelCtrl.$render();
				}

				return transformedInput;
			});
		}
	};
});

// Cookies save and get - steps number and user data for open page when it's restarting.
function setUserCookie(data) {
	try {
		var cookie_data = JSON.parse(getCookie(COOKIE_USER));
	} catch (e) {
		cookie_data = {};
	} finally {
		for (var i in data) {
			cookie_data[i] = data[i];
		}

		setCookie(COOKIE_USER, JSON.stringify(cookie_data));
	}
}

function getUserCookie() {
	try {
		var cookie_data = JSON.parse(getCookie(COOKIE_USER));
	} catch (e) {
		cookie_data = {}
	} finally {
		return cookie_data;
	}
}

function setCookie(name, value, options) {
	options = options || {};

	var expires = options.expires;

	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
