var authors_to_edit = new Array();
var citations_to_edit = new Array();
var field_num;
var i;

(function ($) {
  
  $(document).ready(function() {
    $('span.remove_button').live('click', function() {
      var val = $(this).parent().find('input[type="text"]').val();
      var type = $(this).hasClass('author') ? 'author' : 'citation';
      $(this).parent().remove();
      
      field_num = $('#'+type+'-reference-values tbody input.form-text').length;
      var added = false;
      for (i = 0; i < field_num; i++) {
        if ($('#'+ type +'-reference-values tbody #edit-'+ type +'-reference-und-'+ i +'-target-id').val().length == 0) {
          added = true;
          $('#'+ type +'-reference-values tbody #edit-'+ type +'-reference-und-'+ i +'-target-id').val(val);
        }
      }
      if (!added) {
        $('input[name="'+type+'_reference_add_more"]').trigger('mousedown');
        if(type == 'author') {
          authors_to_edit.push(val);
        } else if (type == 'citation') {
          citations_to_edit.push(val);
        }
      }
    });
  });
  
  $(document).ajaxComplete(function(e, xhr, settings) {
    if (typeof settings.extraData != 'undefined') {
      var i;
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
          }
        }
      } else if (settings.extraData._triggering_element_name == 'field_paper_upload_und_0_remove_button') {
        removeFieldValues();
        $('#edit-field-paper-upload div.messages').slideUp(400);
      } else if (settings.extraData._triggering_element_name == 'author_reference_add_more') {
        if (authors_to_edit.length != 0) {
          field_num = $('#author-reference-values tbody input.form-text').length;
          $('#author-reference-values tbody #edit-author-reference-und-'+ (field_num - 1) +'-target-id').val(authors_to_edit[0]);
          authors_to_edit.splice(0, 1);
          if (authors_to_edit.length != 0) {
            $('input[name="author_reference_add_more"]').trigger('mousedown');
          }
        }
      } else if (settings.extraData._triggering_element_name == 'citation_reference_add_more') {
        if (citations_to_edit.length != 0) {
          field_num = $('#citation-reference-values tbody input.form-text').length;
          $('#citation-reference-values tbody #edit-citation-reference-und-'+ (field_num - 1) +'-target-id').val(citations_to_edit[0]);
          citations_to_edit.splice(0, 1);
          if (citations_to_edit.length != 0) {
            $('input[name="citation_reference_add_more"]').trigger('mousedown');
          }
        }
      }
    }
  });
  
  function removeFieldValues() {
    $('#edit-title').val('');
    $('#edit-abstract-und-0-value').val('');
    $('fieldset.extracted_authors div.author_row').not('.prototype').remove();
    $('fieldset.extracted_citations div.citation_row').not('.prototype').remove();
  }
  
})(jQuery);



function getCitationAuthorString(authors) {
  var s = '';
  if (authors && authors.length > 0) {
    s = ' [Authors: '+ authors.join(', ') +']';
  }
  return s;
}
