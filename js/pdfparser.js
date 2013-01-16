(function ($) {
  $(document).ajaxComplete(function(e, xhr, settings) {
    if (typeof settings.extraData != 'undefined') {
      var field_num;
      var i, j;
      if (settings.extraData._triggering_element_name == 'field_paper_upload_und_0_upload_button') {
        // Removing previous field datas.
        removeFieldValues();
        
        // Inserting new datas.
        if (Drupal.settings && Drupal.settings.pdfparser) {
          if (Drupal.settings.pdfparser.title) {
            $('#edit-title').val(Drupal.settings.pdfparser.title);
          }
          if (Drupal.settings.pdfparser.abstr) {
            $('#edit-abstract-und-0-value').val(Drupal.settings.pdfparser.abstr);
          }
          if (Drupal.settings.pdfparser.authors) {
            var authors = Drupal.settings.pdfparser.authors;
            var author_num = authors.length;
            if (author_num > 0) {
              for (i = 0; i < author_num; i++) {
                var author_row = $('fieldset.extracted_authors div.author_row.prototype').clone();
                author_row
                  .removeClass('prototype')
                  .find('input.author_name')
                    .val(authors[i])
                    .attr('name', 'author_reference[extracted]['+ i +'][name]');
                $('fieldset.extracted_authors div.fieldset-wrapper').append(author_row);
              }
            }
          }
          if (Drupal.settings.pdfparser.citations) {
            var citations = Drupal.settings.pdfparser.citations;
            var citation_num = citations.length;
            if (citation_num > 0) {
              for (i = 0; i < citation_num; i++) {
                var citation_row = $('fieldset.extracted_citations div.citation_row.prototype').clone();
                citation_row
                  .removeClass('prototype')
                  .find('input.citation')
                    .val(citations[i].title + getCitationAuthorString(citations[i].authors))
                    .attr('name', 'citation_reference[extracted]['+ i +'][name]');
                $('fieldset.extracted_citations div.fieldset-wrapper').append(citation_row);
              }
            }
//            var citations = Drupal.settings.pdfparser.citations;
//            var citation_num = citations.length;
//            for (i = 0, j = 0; i < citation_num; j++) {
//              if (j >= field_num) {
//                break;
//              } else {
//                $('#citation-reference-values tbody #edit-citation-reference-und-'+ j +'-target-id').val(citations[i].title + getCitationAuthorString(citations[i].authors));
//                Drupal.settings.pdfparser.citations.splice(i, 1);
//              }
//            }
//            if (Drupal.settings.pdfparser.citations.length != 0) {
//              $('#edit-citation-reference-und-add-more').trigger('mousedown');
//            }
          }
        }
      } else if (settings.extraData._triggering_element_name == 'field_paper_upload_und_0_remove_button') {
        removeFieldValues();
        $('#edit-field-paper-upload div.messages').slideUp(400);
      } else if (settings.extraData._triggering_element_name == 'author_reference_add_more') {
//        if (Drupal.settings && Drupal.settings.pdfparser) {
//          if (Drupal.settings.pdfparser.authors && Drupal.settings.pdfparser.authors.length > 0) {
//            field_num = $('#author-reference-values tbody input.form-text').length;
//            $('#author-reference-values tbody #edit-author-reference-und-'+ (field_num - 1) +'-target-id').val(Drupal.settings.pdfparser.authors[0]);
//            Drupal.settings.pdfparser.authors.splice(0, 1);
//            if (Drupal.settings.pdfparser.authors.length != 0) {
//              $('#edit-author-reference-und-add-more').trigger('mousedown');
//            }
//          }
//        }
      } else if (settings.extraData._triggering_element_name == 'citation_reference_add_more') {
//        if (Drupal.settings && Drupal.settings.pdfparser) {
//          if (Drupal.settings.pdfparser.citations && Drupal.settings.pdfparser.citations.length > 0) {
//            field_num = $('#citation-reference-values tbody input.form-text').length;
//            $('#citation-reference-values tbody #edit-citation-reference-und-'+ (field_num - 1) +'-target-id').val(
//                    Drupal.settings.pdfparser.citations[0].title + getCitationAuthorString(Drupal.settings.pdfparser.citations[0].authors));
//            Drupal.settings.pdfparser.citations.splice(0, 1);
//            if (Drupal.settings.pdfparser.citations.length != 0) {
//              $('#edit-citation-reference-und-add-more').trigger('mousedown');
//            }
//          }
//        }
      }
    }
  });
  
  function removeFieldValues() {
    var field_num;
    $('#edit-title').val('');
    $('#edit-abstract-und-0-value').val('');
    $('fieldset.extracted_authors div.author_row').not('.prototype').remove();
    field_num = $('#citation-reference-values tbody input.form-text').length;
    for (i = 0; i < field_num; i++) {
      $('#citation-reference-values tbody #edit-citation-reference-und-'+ i +'-target-id').val('');
    }
  }
  
})(jQuery);



function getCitationAuthorString(authors) {
  var s = '';
  if (authors && authors.length > 0) {
    s = ' [Authors: '+ authors.join(', ') +']';
  }
  return s;
}
