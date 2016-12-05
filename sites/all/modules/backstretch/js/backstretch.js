/**
 * @file
 * Javascript functionality for Backstretch module.
 */

(function ($) {

  Drupal.behaviors.backstretch = {
    attach: function (context, settings) {
      if (typeof settings.backstretch != 'undefined') {
        // Iterate all Backstretch configurations.
        $.each(settings.backstretch, function(id, options) {
          var items = [];
          var titles = [];
          var fade = (typeof options.fade == 'undefined') ? 0 : options.fade;

          // set options.selector if not defined so no need to test below.
          if (typeof options.selector == 'undefined') options.selector = 'body';

          // if captions are on handle them
          if (options.caption === 1) {
            for(i=0; i < options.items.length; i++) {
              items.push(options.items[i]['url']);
              titles.push(options.items[i]['title']);
            }
          }
          else {
            items = options.items;
          }

          // Pass items and options to Backstretch with the specific selector.
          $(options.selector).backstretch(items, options);

          // optionally add captions
          if (options.caption === 1) {
            var selCaptions = 'backstretch-caption-container';
            var selBackstretchContainer = options.selector + ' .backstretch';

            // Handle first image caption ////////////////////////////

            // add image caption container to the same selector used for the backstretch
            $(selBackstretchContainer).append('<div class="' + selCaptions + ' active"><div class="caption"></div></div>');

            // add current image title
            $(selBackstretchContainer + ' .' + selCaptions + '.active > .caption')
              .css({
                opacity: 0,
              })
              .html(titles[0])
              .animate(
                {
                  opacity: 1,
                },
                {
                  duration: fade,
                  done: function() {}
                }
              );

            // handle subsequent image captions ////////////////////////////

            // add titles with each image transitions
            // bind is used to work back to jquery 1.4 (drupal 7 default).
            $(options.selector).bind("backstretch.before", function(e, instance, index) {
              // add a new caption container to contain the next image caption for the title
              $(selBackstretchContainer).append('<div class="' + selCaptions + ' inactive"><div class="caption"></div></div>');
              // load next caption into the new container but keep it invisible (opacity 0)
              $(selBackstretchContainer + ' .' + selCaptions + '.inactive > .caption')
                .css({
                  opacity: 0,
                })
                .html(titles[index]);
              // aninmate the current caption out of view at the speed of the fade supplied by backstretch configuraiton
              // animate caption if a fade delay is present
              $(selBackstretchContainer + ' .' + selCaptions + '.active > .caption').animate(
                {
                  opacity: 0,
                },
                {
                  duration: fade,
                  done: function() {
                    // once the fade out is complete, remove the caption container for the previous image caption
                    $(selBackstretchContainer + ' .' + selCaptions + '.active').remove();
                  }
                }
              );
              // fade in the next caption
              $(selBackstretchContainer + ' .' + selCaptions + '.inactive > .caption').animate(
                {
                  opacity: 1,
                },
                {
                  duration: fade,
                  done: function() {
                    // swap inactive for active for the next round to avoid stacks of unused caption containers
                    $(selBackstretchContainer + ' .' + selCaptions + '.inactive')
                      .removeClass('inactive')
                      .addClass('active');
                  }
                }
              );
            }); // end on
          } // end if
        });
      }
    }
  };

})(jQuery);
