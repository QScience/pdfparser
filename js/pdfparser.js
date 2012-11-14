(function ($) {
  $(document).ready(function() {
//    console.log('pdfparser loaded...');
  });
  
  $(document).ajaxComplete(function(e, xhr, settings) {
    if (typeof settings.extraData != 'undefined') {
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
            var field_num = $('#author-reference-values tbody input.form-text').length;
            var authors = Drupal.settings.pdfparser.authors;
            var author_num = authors.length;
            var i;
            for (i = 0; i < author_num - field_num; i++) {
              $('#edit-author-reference-und-add-more').trigger('mousedown');
            }
            for (i = 0; i < author_num; i++) {
              $('#author-reference-values tbody #edit-author-reference-und-'+ i +'-target-id').val(authors[i]);
            }
            for (i = author_num; i < field_num; i++) {
              $('#author-reference-values tbody #edit-author-reference-und-'+ i +'-target-id').val('');
            }
            //$('#edit-authorname-und-0-value').val(Drupal.settings.pdfparser.authors);
          }
        }
      } else if (settings.extraData._triggering_element_name == 'field_paper_upload_und_0_remove_button') {
        $('#edit-title').val('');
        $('#edit-abstract-und-0-value').val('');
        $('#edit-authorname-und-0-value').val('');
        $('#edit-field-paper-upload div.messages').slideUp(400);
      }
    }
  });
})(jQuery);
