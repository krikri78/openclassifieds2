// VALIDATION with chosen fix
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    var $form = $(".edit_ad_form");
    $form.validate({
        errorLabelContainer: $(".edit_ad_form div.error"),
        wrapper: 'div',
        rules: {
            title: {minlength:2},
            price: {regex:"^[0-9]{1,18}([,.]{1}[0-9]{1,3})?$"}
        },
        messages: {
            price:{regex: "Format is incorect"}
        }
    });
    
    //chosen fix
    var settings = $.data($form[0], 'validator').settings;
    settings.ignore += ':not(.chzn-done)'; // edit_ad_form location(any chosen) texarea
    settings.ignore += ':not(#description)'; // edit_ad_form description texarea
    settings.ignore += ':not(.cf_textarea_fields)';//edit_ad_form texarea custom fields
    // end VALIDATION

    //datepicker in case date field exists
    if($('.cf_date_fields').length != 0){
        $('.cf_date_fields').datepicker();}


    // custom fields set to categories
    $( "input[name=category]" ).on( "click", function() {
        showCustomFieldsByCategory(this);
    });

    showCustomFieldsByCategory($("input[name=category]:checked"));
    
    function showCustomFieldsByCategory(element){
        id_categ = $(element).val();
        // only custom fields have class data-custom
        $(".data-custom").each(function(){
            // get data-category, contains json array of set categories
            field = $(this);
            dataCategories = field.attr('data-categories');
            // show if cf fields if they dont have categories set
            if(dataCategories.length != 2){
                field.parent().parent().css('display','none');
                field.prop('disabled', true);
            }
            else{
                field.parent().parent().css('display','block');
                field.prop('disabled', false);
            }
            if(dataCategories !== undefined)  
                if(dataCategories != "")
                {
                    // apply if they have equal id_category 
                    $.each($.parseJSON(dataCategories), function (index, value) { 
                        if(id_categ == value){
                            field.parent().parent().css('display','block');
                            field.prop('disabled', false);
                        }
                    });
                }
        });
    }