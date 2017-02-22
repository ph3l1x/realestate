/**
 * @file
 * bootstrap.js
 *
 * Provides general enhancements and fixes to Bootstrap's JS files.
 */

var Drupal = Drupal || {};

(function(d$, Drupal){
  "use strict";

  Drupal.behaviors.bootstrap = {
    attach: function(context) {
      // Provide some Bootstrap tab/Drupal integration.
      d$(context).find('.tabbable').once('bootstrap-tabs', function () {
        var d$wrapper = d$(this);
        var d$tabs = d$wrapper.find('.nav-tabs');
        var d$content = d$wrapper.find('.tab-content');
        var borderRadius = parseInt(d$content.css('borderBottomRightRadius'), 10);
        var bootstrapTabResize = function() {
          if (d$wrapper.hasClass('tabs-left') || d$wrapper.hasClass('tabs-right')) {
            d$content.css('min-height', d$tabs.outerHeight());
          }
        };
        // Add min-height on content for left and right tabs.
        bootstrapTabResize();
        // Detect tab switch.
        if (d$wrapper.hasClass('tabs-left') || d$wrapper.hasClass('tabs-right')) {
          d$tabs.on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
            bootstrapTabResize();
            if (d$wrapper.hasClass('tabs-left')) {
              if (d$(e.target).parent().is(':first-child')) {
                d$content.css('borderTopLeftRadius', '0');
              }
              else {
                d$content.css('borderTopLeftRadius', borderRadius + 'px');
              }
            }
            else {
              if (d$(e.target).parent().is(':first-child')) {
                d$content.css('borderTopRightRadius', '0');
              }
              else {
                d$content.css('borderTopRightRadius', borderRadius + 'px');
              }
            }
          });
        }
      });
    }
  };

  /**
   * Behavior for .
   */
  Drupal.behaviors.bootstrapFormHasError = {
    attach: function (context, settings) {
      if (settings.bootstrap && settings.bootstrap.formHasError) {
        var d$context = d$(context);
        d$context.find('.form-item.has-error:not(.form-type-password.has-feedback)').once('error', function () {
          var d$formItem = d$(this);
          var d$input = d$formItem.find(':input');
          d$input.on('keyup focus blur', function () {
            var value = d$input.val() || false;
            d$formItem[value ? 'removeClass' : 'addClass']('has-error');
            d$input[value ? 'removeClass' : 'addClass']('error');
          });
        });
      }
    }
  };

  /**
   * Bootstrap Popovers.
   */
  Drupal.behaviors.bootstrapPopovers = {
    attach: function (context, settings) {
      if (settings.bootstrap && settings.bootstrap.popoverEnabled) {
        var d$currentPopover = d$();
        if (settings.bootstrap.popoverOptions.triggerAutoclose) {
          d$(document).on('click', function (e) {
            if (d$currentPopover.length && !d$(e.target).is('[data-toggle=popover]') && d$(e.target).parents('.popover.in').length === 0) {
              d$currentPopover.popover('hide');
              d$currentPopover = d$();
            }
          });
        }
        var elements = d$(context).find('[data-toggle=popover]').toArray();
        for (var i = 0; i < elements.length; i++) {
          var d$element = d$(elements[i]);
          var options = d$.extend({}, settings.bootstrap.popoverOptions, d$element.data());
          if (!options.content) {
            options.content = function () {
              var target = d$(this).data('target');
              return target && d$(target) && d$(target).length && d$(target).clone().removeClass('element-invisible').wrap('<div/>').parent()[d$(this).data('bs.popover').options.html ? 'html' : 'text']() || '';
            }
          }
          d$element.popover(options).on('click', function (e) {
            e.preventDefault();
          });
          if (settings.bootstrap.popoverOptions.triggerAutoclose) {
            d$element.on('show.bs.popover', function () {
              if (d$currentPopover.length) {
                d$currentPopover.popover('hide');
              }
              d$currentPopover = d$(this);
            });
          }
        }
      }
    }
  };

  /**
   * Bootstrap Tooltips.
   */
  Drupal.behaviors.bootstrapTooltips = {
    attach: function (context, settings) {
      if (settings.bootstrap && settings.bootstrap.tooltipEnabled) {
        var elements = d$(context).find('[data-toggle="tooltip"]').toArray();
        for (var i = 0; i < elements.length; i++) {
          var d$element = d$(elements[i]);
          var options = d$.extend({}, settings.bootstrap.tooltipOptions, d$element.data());
          d$element.tooltip(options);
        }
      }
    }
  };

  /**
   * Anchor fixes.
   */
  var d$scrollableElement = d$();
  Drupal.behaviors.bootstrapAnchors = {
    attach: function(context, settings) {
      var i, elements = ['html', 'body'];
      if (!d$scrollableElement.length) {
        for (i = 0; i < elements.length; i++) {
          var d$element = d$(elements[i]);
          if (d$element.scrollTop() > 0) {
            d$scrollableElement = d$element;
            break;
          }
          else {
            d$element.scrollTop(1);
            if (d$element.scrollTop() > 0) {
              d$element.scrollTop(0);
              d$scrollableElement = d$element;
              break;
            }
          }
        }
      }
      if (!settings.bootstrap || settings.bootstrap.anchorsFix !== '1') {
        return;
      }
      var anchors = d$(context).find('a').toArray();
      for (i = 0; i < anchors.length; i++) {
        if (!anchors[i].scrollTo) {
          this.bootstrapAnchor(anchors[i]);
        }
      }
      d$scrollableElement.once('bootstrap-anchors', function () {
        d$scrollableElement.on('click.bootstrap-anchors', 'a[href*="#"]:not([data-toggle],[data-target],[data-slide])', function(e) {
          if (this.scrollTo) {
            this.scrollTo(e);
          }
        });
      });
    },
    bootstrapAnchor: function (element) {
      element.validAnchor = element.nodeName === 'A' && (location.hostname === element.hostname || !element.hostname) && (element.hash.replace(/#/,'').length > 0);
      element.scrollTo = function(event) {
        var attr = 'id';
        var d$target = d$(element.hash);
        // Check for anchors that use the name attribute instead.
        if (!d$target.length) {
          attr = 'name';
          d$target = d$('[name="' + element.hash.replace('#', '') + '"]');
        }
        // Immediately stop if no anchors are found.
        if (!this.validAnchor && !d$target.length) {
          return;
        }
        // Anchor is valid, continue if there is an offset.
        var offset = d$target.offset().top - parseInt(d$scrollableElement.css('paddingTop'), 10) - parseInt(d$scrollableElement.css('marginTop'), 10);
        if (offset > 0) {
          if (event) {
            event.preventDefault();
          }
          var d$fakeAnchor = d$('<div/>')
            .addClass('element-invisible')
            .attr(attr, d$target.attr(attr))
            .css({
              position: 'absolute',
              top: offset + 'px',
              zIndex: -1000
            })
            .appendTo(d$scrollableElement);
          d$target.removeAttr(attr);
          var complete = function () {
            location.hash = element.hash;
            d$fakeAnchor.remove();
            d$target.attr(attr, element.hash.replace('#', ''));
          };
          if (Drupal.settings.bootstrap.anchorsSmoothScrolling) {
            d$scrollableElement.animate({ scrollTop: offset, avoidTransforms: true }, 400, complete);
          }
          else {
            d$scrollableElement.scrollTop(offset);
            complete();
          }
        }
      };
    }
  };

  /**
   * Tabledrag theming elements.
   */
  Drupal.theme.tableDragChangedMarker = function () {
    return '<span class="tabledrag-changed glyphicon glyphicon-warning-sign text-warning"></span>';
  };

  Drupal.theme.tableDragChangedWarning = function () {
    return '<div class="tabledrag-changed-warning alert alert-warning messages warning">' + Drupal.theme('tableDragChangedMarker') + ' ' + Drupal.t('Changes made in this table will not be saved until the form is submitted.') + '</div>';
  };

})(jQuery, Drupal);
