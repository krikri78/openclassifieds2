$(function (){

    if ($("textarea[name=description]").data('editor')=='html')
    {
        $("#formorm_description, textarea[name=description], textarea[name=email_purchase_notes], .cf_textarea_fields").sceditor({
            plugins: "xhtml",
            height: "450",
            toolbar: "bold,italic,underline|,strike,subscript,superscript|,left,center,right,justify|" +
                    "font,size,color,removeformat|,table,code,quote,horizontalrule|,paste,bulletlist,orderedlist|,image,email,link,unlink|,youtube,date,time,ltr,rtl,print,maximize|,source",
            toolbarExclude : "emoticons",
            resizeEnabled: "true",
            emoticonsEnabled: "false",
            emoticonsCompat: "false",
            enablePasteFiltering: "true"
        });
    }
    else
    {   
        $('#formorm_description, textarea[name=description], textarea[name=email_purchase_notes], .cf_textarea_fields').sceditorBBCodePlugin({
            toolbar: "bold,italic,underline,strike|left,center,right,justify|" +
            "bulletlist,orderedlist|link,unlink,image,youtube|source",
            resizeEnabled: "true",
            enablePasteFiltering: "true"});
    }
    
    // $('#formorm_description, textarea[name=description]').sceditorBBCodePlugin({
    //     toolbar: "bold,italic,underline,strike|left,center,right,justify|" +
    //     "bulletlist,orderedlist|link,unlink,image,youtube|source",
    //     resizeEnabled: "true"});
    
    $('.tips').popover();

    $("select").chosen({width: "100%"});
    
    $('.radio > input:checked').parentsUntil('div .accordion').addClass('in');
    
    //custom fields select. To determain if some fields are shown or not
    $('select#cf_type_fileds').change(function(){ // on change add hidden   
        if($(this).val() == 'select' || $(this).val() == 'radio'){
            $('#cf_values_input').attr('type','text');
            $('#cf_values_input').parent().parent().css('display','block'); // parent of a parent. display whole block
        }
        else{
            $('#cf_values_input').attr('type','hidden');
            $('#cf_values_input').parent().parent().css('display','none'); // parent of a parent. dont show whole block
        }    
    }).change();
    
    // custom field edit, show/hide values field
    $('#cf_values_input').parent().parent().css('display','none');
    if( $('#cf_type_field_input').attr('value') == 'select' 
        || $('#cf_type_field_input').attr('value') == 'radio') 
            $('#cf_values_input').parent().parent().css('display','block'); 

    
    $('select[name="locale_select"]').change(function()
    {
         $('#locale_form').submit();
    });
    $('select[name="type"]').change(function()
    {
        // alert($(this).val());
        if($(this).val() == 'email') 
            $('#from_email').parent().parent().css('display','block');
        else
            $('#from_email').parent().parent().css('display','none');
    });

    $('input').each(function(){
        if( $(this).attr('type') != 'checkbox' && !$(this).hasClass('form-control')) {$(this).addClass('form-control');} // other than checkbox
        
        if($(this).attr('type') == 'checkbox' && $(this).hasClass('form-control')) {$(this).removeClass('form-control');}
        
        if($(this).attr('type') == 'radio')
            $(this).removeClass('form-control');
    });

    // Search widget in header
    $('.oc-faq-btn').click(function() {
        // event.preventDefault();
        $('.header-oc-faq').toggle();
    });
    

});

_debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
};


function setCookie(c_name,value,exdays)
{
var exdate = new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value = escape(value) + ((exdays==null) ? "" : ";path=/; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

// $(window).load(function(){
//     $('input,select,textarea').addClass('form-control');
//     $('label').next().addClass('col-sm-4');
//     $('textarea').parent().removeClass('col-sm-4').addClass('col-sm-6');
//     $('.control-label').addClass('col-sm-3');
//     $('.form-group').removeClass('form-group').addClass('form-group');
//     $('input[type=checkbox],input[type=radio]').removeClass('form-control').removeClass('input-large');

// });