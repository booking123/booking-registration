var app = angular.module('myapp', []);

app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});

dateFormatConstant = 'mm/dd/yy';

showSearchPage = "search_page";
showResultPage = "result_page";

app.controller('SearchController', function($scope, $location, $http) {
    //resolution can be regular and iframe
    $scope.resolutionView = 'regular';
    //$scope.resolutionView = 'iframe';
    
    setResolutionOnPageOpen($scope, $location, $http);
    
    $scope.showPage = showSearchPage;
    
    //popups
    $scope.showPopupContact = false;
    $scope.showPopupBookStep1 = false;
    $scope.showPopupBookStep2 = false;
    $scope.showPrivacyPopup = false;
    $scope.showRentalAgreementPopup = false;
    
    //for validation
    $scope.submittedContactForm = false;
    $scope.submittedBookStep1Form = false;
    $scope.submittedBookStep2Form = false;
    
    $scope.search = {};           
//    $scope.search.checkInDate = 'CHECK-IN';
//    $scope.search.checkOutDate = 'CHECK-OUT';
    
    $scope.resultView = {};
    $scope.book = {}; 
    $scope.contact = {}; 
//    $scope.book.checkInDate = '02/05/2014';
//    $scope.book.checkOutDate = '01/25/2014';

    $scope.search.arrayOfCheckInFieldsId = ['searchCheckInDatepickerField', 'resultSearchCheckInDatepickerField'];
    $scope.search.arrayOfCheckOutFieldsId = ['searchCheckOutDatepickerField', 'resultSearchCheckOutDatepickerField'];
    
    /*
    $scope.resultView.arrayOfCheckInFieldsId = ['resultSearchCheckInDatepickerField'];
    $scope.resultView.arrayOfCheckOutFieldsId = ['resultSearchCheckOutDatepickerField'];
    */
    
    $scope.book.arrayOfCheckInFieldsId = ['bookCheckInDatepickerField','popupContactCheckInDatepickerField','popupBookCheckInDatepickerField'];
    $scope.book.arrayOfCheckOutFieldsId = ['bookCheckOutDatepickerField','popupContactCheckOutDatepickerField','popupBookCheckOutDatepickerField'];
    
    $scope.numberRange = function(start, end) {
        var result = [];
        for (var i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    };
    
    
    
    //some setup default values
    $scope.searchResultsDefaultView='list_view';
    $scope.searchResultsTabView=$scope.searchResultsDefaultView;
    
    $scope.resultViewDefaultTab='description_tab';
    $scope.resultViewSelectedTab=$scope.resultViewDefaultTab;
    
    $scope.showAdvancedSearchOption = false;
    $scope.showAdvancedSearchOtherCheckboxes = true;
    
    
    
    /********************************************/
    /******* Variables start values START *******/
    /********************************************/
    
    $scope.adultsNumberList = $scope.numberRange(1,10);
    $scope.childrenNumberList = $scope.numberRange(0,10);
    
    $scope.contact.adultsNumber = $scope.adultsNumberList[0];
    $scope.contact.childrenNumber = $scope.childrenNumberList[0];
    $scope.book.adultsNumber = $scope.adultsNumberList[0];
    $scope.book.childrenNumber = $scope.childrenNumberList[0];
    
    $scope.book.expirationDateMonth = $scope.numberRange(1,12)[0];
    $scope.book.expirationDateYear = $scope.numberRange(2014,2024)[0];
    
    
    $scope.sortByTypes = [
        {id: 1, name: "Price: low to High"},
        {id: 2, name: "Price: High to Low other"},    
        {id: 3, name: "Number of Bedrooms"},    
        {id: 4, name: "Bedrooms: Least to Most"},    
        {id: 5, name: "Bedrooms: Most to least"},    
    ];
    
       
    
    $scope.search.resultsSortBy = $scope.sortByTypes[0].id;
    
    $scope.guestsNumberList = [
        {id: 1, name: "1+ guest"},
        {id: 2, name: "2+ guest"},
        {id: 3, name: "3+ guest"},    
        {id: 4, name: "4+ guest"},    
        {id: 5, name: "5+ guest"},    
        {id: 6, name: "6+ guest"},    
        {id: 7, name: "7+ guest"},    
        {id: 8, name: "8+ guest"},    
        {id: 9, name: "9+ guest"},    
        {id: 10, name: "10+ guest"},    
        {id: 11, name: "11+ guest"},    
        {id: 12, name: "12+ guest"}
    ];
    
    $scope.propertyTypesList = [
        {id: 1, name: "Type1"},
        {id: 2, name: "Type2"}    
    ];
    $scope.search.propertyType = $scope.propertyTypesList[0].id;
    
    $scope.numberOfBedroomsList = [
        {id: 1, name: "1"},
        {id: 2, name: "2"},    
        {id: 3, name: "3"},    
        {id: 4, name: "4"},    
        {id: 5, name: "5"}    
    ];
    $scope.search.numberBedrooms = $scope.numberOfBedroomsList[2].id;
    
    $scope.numberOfBathroomsList = [
        {id: 1, name: "1"},
        {id: 2, name: "2"},    
        {id: 3, name: "3"},    
        {id: 4, name: "4"},    
        {id: 5, name: "5"}    
    ];
    $scope.search.numberBathrooms = $scope.numberOfBathroomsList[1].id;
    
    $scope.numberOfBedsList = [
        {id: 1, name: "1"},
        {id: 2, name: "2"},    
        {id: 3, name: "3"},    
        {id: 4, name: "4"},    
        {id: 5, name: "5"}    
    ];
    $scope.search.numberBeds = $scope.numberOfBedsList[1].id;
    
    $scope.neighborhoodList = [
        {id: 1, name: "Neigh1"},
        {id: 2, name: "Neigh2"}    
    ];
    $scope.search.neighborhood = $scope.neighborhoodList[0].id;
    
    $scope.approximateEquivalentCurrencyList = [
        {id: 1, name: "USD"},
        {id: 2, name: "EUR"}    
    ];
    
    $scope.contactCountryList = [
        {id: 1, name: "US & Canada"},
        {id: 2, name: "Some other"}    
    ];
    $scope.contact.country = $scope.contactCountryList[0].id;
    
    $scope.protectDamageValueList = [
        {id: 1, name: "$1,500 Coverage: $39.95"},
        {id: 2, name: "$3,000 Coverage: $49.95"},
        {id: 3, name: "$6,000 Coverage: $59.95"}
    ];
    
    $scope.book.messageText = "";
    
    $scope.paymentCardTypeList = [
        {id: 1, name: "Visa"},
        {id: 2, name: "Maestro"}    
    ];
    $scope.book.paymentCardType = $scope.paymentCardTypeList[0].id;
    
        
    $scope.book.protectInvestement = 'false';
    $scope.book.protectPayment = 'false';
    $scope.book.protectDamage = 'false';
    
    
    $scope.countriesList = [
        {id: "RS", name: "Serbia"},
        {id: "US", name: "United States"},
        {id: "UK", name: "Ukraine"}
    ];
    $scope.book.paymentCountry = $scope.countriesList[0].id;


    $http({
        url: countryApiUrl,
        method: "GET"
        //   data: "id: 'something'",
        //  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        //     headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).success(function (data) {
            $scope.countriesList = data.countries.item;
            $scope.book.paymentCountry = $scope.countriesList[0].id;
    }).error(function (data, status, headers, config) {
        //      console.log("data:"+data);
        //      console.log("config:"+config);
    });
    
    
    
    
    $scope.statesList = [
        {id: 1, name: "Alabama"},
        {id: 2, name: "Alaska"},
        {id: 3, name: "American Samoa"},
        {id: 4, name: "Arizona"},
        {id: 5, name: "Arkansas"},
        {id: 6, name: "California"},
        {id: 7, name: "Colorado"},
        {id: 8, name: "Connecticut"},
        {id: 9, name: "Delaware"},
        {id: 10, name: "District of Columbia"},
        {id: 11, name: "Florida"},
        {id: 12, name: "Georgia"},
        {id: 13, name: "Guam"},
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
        {id: 38, name: "Northern Marianas Islands"},
        {id: 39, name: "Ohio"},
        {id: 40, name: "Oklahoma"},
        {id: 41, name: "Oregon"},
        {id: 42, name: "Pennsylvania"},
        {id: 43, name: "Puerto Rico"},
        {id: 44, name: "Rhode Island"},
        {id: 45, name: "South Carolina"},
        {id: 46, name: "South Dakota"},
        {id: 47, name: "Tennessee"},
        {id: 48, name: "Texas"},
        {id: 49, name: "Utah"},
        {id: 50, name: "Vermont"},
        {id: 51, name: "Virginia "},
        {id: 52, name: "Virgin Islands "},
        {id: 53, name: "Washington"},
        {id: 54, name: "West Virginia"},
        {id: 55, name: "Wisconsin"},
        {id: 56, name: "Wyoming"}
    ];
    $scope.book.paymentState = $scope.statesList[0].id;
    
    /********************************************/
    /******* Variables start values END *********/
    /********************************************/
    
    $scope.book.paymentTotalValue = "$1,234.56";
    
    
    jqSliderStep2();
    
    $scope.openResultView = function () {
        /*
        var resultViewUrl = "resultView.html";
        if($scope.resolutionView == 'iframe'){
            resultViewUrl += "?iframe=yes";  
        }
        window.location.href = resultViewUrl;
        */
        $scope.showPage = showResultPage;
    };
    
    $scope.backToSearchView = function () {
        /*
        var searchViewUrl = "search.html";
        if($scope.resolutionView == 'iframe'){
            searchViewUrl += "?iframe=yes";  
        }
        window.location.href = searchViewUrl;
        */
        $scope.showPage = showSearchPage;
    };
    
    
    $scope.contactFormSubmit = function () {
        $scope.submittedContactForm = true;
        if ($scope.popupContactForm.$valid) {
            $scope.showPopupContact = false;
        }
        
    };
    
    
    $scope.bookStep1FormSubmit = function () {
        $scope.submittedBookStep1Form = true;
        if ($scope.popupBookStep1Form.$valid) {
            $scope.showPopupBookStep1 = false;
            $scope.showPopupBookStep2 = true;
        }
        
    };
    
    $scope.bookStep2FormSubmit = function () {
        $scope.submittedBookStep2Form = true;
        if ($scope.popupBookStep2Form.$valid) {
            $scope.showPopupBookStep2 = false;
        }
        
    };
    
    $scope.bookStep2FormBackToEdit = function () {
        $scope.showPopupBookStep2 = false;
        $scope.showPopupBookStep1 = true;
    };
    
    
    
    $scope.showDatepickerPopup = function (datePickerFieldId) {
        jQuery('#'+datePickerFieldId).datepicker("show");
    };
    
    
    $scope.showPrivacyPopupClick = function () {
        jQuery('#popupPrivacyContentDiv').load(privacyPolicyPageUrl);
        $scope.showPrivacyPopup = true;
    }
    
    $scope.showRentalAgreementPopupClick = function () {
        $scope.showRentalAgreementPopup = true;
    }
    
    /*
    $scope.printRentalAgreement = function () {
        window.print();
    }
    */
    
    

});
  
  
function jqSliderStep2(){
    
    var initialValue = 400;
    var minValue = 5;
    var maxValue = 1000;
        
    var sliderPriceRangeTooltip = function (event, ui) {
        var curValue = ui.value || initialValue;
     /* var curValue = ui.value || $scope.sliderStep2.selectedValue; */
        var target = ui.handle || jQuery('.ui-slider-handle');
        var tooltip = '<div class="search_price_range_slider_tooltip">$' + curValue + '</div>';
        jQuery(target).html(tooltip);
    };


    jQuery("#searchPriceRangeSlider").slider({
        value: initialValue,
        min: minValue,
        max: maxValue,
        step: 1,
        create: sliderPriceRangeTooltip,
        slide: function (event, ui) {
            jQuery(".search_price_range_slider_tooltip",this).html("$"+ui.value);
        },
        change: function (event, ui) {
            jQuery(".search_price_range_slider_tooltip",this).html("$"+ui.value);
            /*
            $scope.sliderStep2.selectedValue = ui.value;
            setSliderStep2DependingValues($scope);   
            
            if(!$scope.$$phase) {   
                $scope.$apply();
            }
            */
        }
    });
}


/*
* dateFieldInRange - can be start or end
*/
app.directive('datepicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
           datepickerClass: '@',
           dateFieldInRange: '@',
           connectedDateFieldIdArray: '=',        
           connectedDateFieldValue: '='        
        },
        link: function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                var minDateValue = 0;
                if(scope.dateFieldInRange=='end' && scope.connectedDateFieldValue 
                    && scope.connectedDateFieldValue!='CHECK-IN'){
                    minDateValue = scope.connectedDateFieldValue;    
                }
                
                element.datepicker({
                    dateFormat: dateFormatConstant,
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    firstDay: 1,
                    showAnim: '',
                    minDate: minDateValue,
                    beforeShow: function(input, inst) {

                      //  angular.element(element).datepicker("option", "minDate", 0); 
                        inst.dpDiv.addClass(scope.datepickerClass);
                         
                    },
                    onClose: function(input, inst) {
                        inst.dpDiv.removeClass(scope.datepickerClass);
                    },
                    onSelect:function(selectedDate) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(selectedDate);
                        });
                        if(scope.datepickerClass=='datepicker_book_panel' || scope.datepickerClass=='datepicker_popup_window'){
                            jQuery("#datesAvailabilityCalendar").datepicker("refresh");
                        }
                        
                        /*adding minDate and maxDate option to coresponding date range field*/
                        if(scope.dateFieldInRange=='start'){             
                            for (index = 0; index < scope.connectedDateFieldIdArray.length; ++index) {
                                angular.element("#"+scope.connectedDateFieldIdArray[index]).datepicker("option", "minDate", selectedDate);    
                            }
                        }else if(scope.dateFieldInRange=='end'){  
                            for (index = 0; index < scope.connectedDateFieldIdArray.length; ++index) {                          
                                angular.element("#"+scope.connectedDateFieldIdArray[index]).datepicker("option", "maxDate", selectedDate);  
                            }
                        }
                        
                    }
                });
            });
        }
    }
});

app.directive('datepickerInline', function() {
    return {
        restrict: 'A',
        scope: {
            bookCheckInDate: '=',
            bookCheckOutDate: '='
        },
        link: function (scope, element, attrs) {
            $(function(){
                //just for showing until API do not work
                var arrayInvalidDates = ["02/03/2014", "02/04/2014"];
                //var arraySelectedDates = ["01/26/2014","01/25/2014"];
                
                element.datepicker({
                    dateFormat: dateFormatConstant,
                    showOtherMonths: true,
                    numberOfMonths: 3,
                    firstDay: 1,
                    beforeShowDay: function(date){
                        var arraySelectedDates = getDatesArrayFromRange(scope.bookCheckInDate, scope.bookCheckOutDate);
                        var currentDateString = jQuery.datepicker.formatDate(dateFormatConstant, date);
                        if(arrayInvalidDates.indexOf(currentDateString) >= 0){
                            return [ false , "non_available_date"];
                        }else  if(scope.bookCheckInDate && scope.bookCheckInDate == currentDateString){
                            return [ false , "selected_date_start"];
                        }else  if(scope.bookCheckOutDate &&  scope.bookCheckOutDate == currentDateString){
                            return [ false , "selected_date_end"];
                        }else  if(arraySelectedDates.indexOf(currentDateString) >= 0){
                            return [ false , "selected_date"];
                        }
                        else{
                            return [ false , "available_date"];    
                        }
                    }
                });
            });
        }
    }
});


app.directive('setImageSize', function () {       
    return {
        restrict: 'A',
        scope: {
            resolutionView: '=',
            regularMinHeight: '@',
            regularMinWidth: '@',
            iframeMinHeight: '@',
            iframeMinWidth: '@'
        },
        link: function(scope, element, attrs) {   
            element.bind("load" , function(e){ 

                //alert("Image height="+element[0].naturalHeight+ ", image width="+element[0].naturalWidth);
                if(scope.resolutionView=="iframe"){
                    ratio = element[0].naturalHeight / scope.iframeMinHeight;
                    if((element[0].naturalWidth / ratio) < scope.iframeMinWidth){
                        //alert("setWidth");   
                        element.addClass("image_set_width"); 
                    }else{
                        //alert("setheight");     
                        element.addClass("image_set_height");
                    }
                }else{
                    ratio = element[0].naturalHeight / scope.regularMinHeight;
                    if((element[0].naturalWidth / ratio) < scope.regularMinWidth){
                        //alert("setWidth");   
                        element.addClass("image_set_width"); 
                    }else{
                        //alert("setheight");     
                        element.addClass("image_set_height");
                    }
                }
                
                
            });

        }
    }
});

  
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDatesArrayFromRange(startDateString, stopDateString) {
    var resultDateArray = new Array();
    
    //this logic is when dateForamt is mm/dd/yy
    
    if(startDateString && stopDateString){
        var tempStartDateArray = startDateString.split("/");
        var startDate = new Date(tempStartDateArray[2], tempStartDateArray[0]-1, tempStartDateArray[1]);
        
        var tempStopDateArray = stopDateString.split("/");
        var stopDate = new Date(tempStopDateArray[2], tempStopDateArray[0]-1, tempStopDateArray[1]);
        
        
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            //resultDateArray.push( new Date (currentDate) )
            resultDateArray.push( jQuery.datepicker.formatDate(dateFormatConstant, currentDate) )
            currentDate = currentDate.addDays(1);
        }
    }
    return resultDateArray;
}    


function setResolutionOnPageOpen($scope, $location, $http) {
    /* here we check is there parameter iframe='yes' in URL */
    var iframeParameterValue = $location.search().iframe;
    if(iframeParameterValue=='yes'){
        $scope.resolutionView = 'iframe';    
    }

}

'use strict';

app.directive('printDiv', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function(evt){    
                evt.preventDefault();    
                PrintElem(attrs.printDiv);
            });

            function PrintElem(elem){
                PrintWithIframe($(elem).html());
            }

            function PrintWithIframe(data) {
                if (jQuery('iframe#printf').size() == 0) {
                    jQuery('body').append('<iframe id="printf" name="printf" width="1" height="0"></iframe>');  // an iFrame is added to the html content,

                    var mywindow = window.frames["printf"];
                    mywindow.document.write('<html><head><title>Rental Agreement</title><style>@page {margin: 25mm 5mm 25mm 5mm;}</style>' 
                        + '<link rel="stylesheet" type="text/css" href="css/styleSearch.css" />'
                        + '</head><body><div>'
                        + data
                        + '</div></body></html>'
                    );

                    mywindow.document.close();

                    mywindow.focus();
                    mywindow.print();
                    
                    setTimeout(function(){   
                        jQuery('iframe#printf').remove(); 
                    },100);
                    
                }

                return true;
            }
        }
    };
});


