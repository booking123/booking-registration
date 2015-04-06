/*
jQuery(document).ready(function(){
    sliderStep2();
});
*/
function sliderStep2(){
    var initialValue = 15;
    var minValue = 3;
    var maxValue = 30;

    var sliderTooltip = function (event, ui) {
        var curValue = ui.value || initialValue;
        var target = ui.handle || jQuery('.ui-slider-handle');
        var tooltip = '<div class="tooltip">' + curValue + '%</div>';
        jQuery(target).html(tooltip);
    };


    jQuery("#sliderStep2").slider({
        value: initialValue,
        min: minValue,
        max: maxValue,
        step: 1,
        create: sliderTooltip,
        slide: function (event, ui) {
            jQuery(".tooltip",this).html(ui.value+"%");
        },
        change: function (event, ui) {
            jQuery(".tooltip",this).html(ui.value+"%");
        }
    });
}