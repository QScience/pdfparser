(function ($) {
  $(document).ready(function() {
//    console.log('pdfparser loaded...');
  });
  
  $(document).ajaxComplete(function(e, xhr, settings) {
    console.log(settings);
    if (typeof settings.extraData != 'undefined') {
      var field_num;
      if (settings.extraData._triggering_element_name == 'field_paper_upload_und_0_upload_button') {
  //      var num = $('#edit-field-paper-upload div.messages').length;
  //      var i = 1;
  //      $('#edit-field-paper-upload div.messages').each(function() {
  //        if (i >= num) return;
  //        $(this).slideUp(1000);
  //        i++;
  //      });
        if (Drupal.settings && Drupal.settings.pdfparser) {
          if (Drupal.settings.pdfparser.title) {
            $('#edit-title').val(Drupal.settings.pdfparser.title);
          }
          if (Drupal.settings.pdfparser.abstr) {
            $('#edit-abstract-und-0-value').val(Drupal.settings.pdfparser.abstr);
          }
          if (Drupal.settings.pdfparser.authors) {
//            console.log(Drupal.settings.pdfparser.authors);
            field_num = $('#author-reference-values tbody input.form-text').length;
            var authors = Drupal.settings.pdfparser.authors;
            var author_num = authors.length;
            var i, j;
//            for (i = 0; i < author_num - field_num; i++) {
//              $('#edit-author-reference-und-add-more').trigger('mousedown');
//            }
            for (i = 0, j = 0; i < author_num; j++) {
              if (j >= field_num) {
                break;
              } else {
                $('#author-reference-values tbody #edit-author-reference-und-'+ j +'-target-id').val(authors[i]);
                Drupal.settings.pdfparser.authors.splice(i, 1);
              }
            }
            if (Drupal.settings.pdfparser.authors.length != 0) {
              $('#edit-author-reference-und-add-more').trigger('mousedown');
            }
//            console.log(Drupal.settings.pdfparser.authors);
//            for (i = 0; i < author_num; i++) {
//              $('#author-reference-values tbody #edit-author-reference-und-'+ i +'-target-id').val(authors[i]);
//            }
//            for (i = author_num; i < field_num; i++) {
//              $('#author-reference-values tbody #edit-author-reference-und-'+ i +'-target-id').val('');
//            }
            //$('#edit-authorname-und-0-value').val(Drupal.settings.pdfparser.authors);
          }
        }
      } else if (settings.extraData._triggering_element_name == 'field_paper_upload_und_0_remove_button') {
        $('#edit-title').val('');
        $('#edit-abstract-und-0-value').val('');
        $('#edit-authorname-und-0-value').val('');
        $('#edit-field-paper-upload div.messages').slideUp(400);
      } else if (settings.extraData._triggering_element_name == 'author_reference_add_more') {
        if (Drupal.settings && Drupal.settings.pdfparser) {
          if (Drupal.settings.pdfparser.authors && Drupal.settings.pdfparser.authors.length > 0) {
            field_num = $('#author-reference-values tbody input.form-text').length;
            $('#author-reference-values tbody #edit-author-reference-und-'+ (field_num - 1) +'-target-id').val(Drupal.settings.pdfparser.authors[0]);
            Drupal.settings.pdfparser.authors.splice(0, 1);
            if (Drupal.settings.pdfparser.authors.length != 0) {
              $('#edit-author-reference-und-add-more').trigger('mousedown');
            }
          }
        }
      }
    }
  });
})(jQuery);
