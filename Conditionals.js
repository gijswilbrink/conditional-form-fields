'use strict';

/**
 * @author Gijs Wilbrink – Digital Natives – gijs@digitalnatives.nl
 * @since 1 February 2017
 */

/*
 |--------------------------------------------------------------------------
 | Conditionals
 |--------------------------------------------------------------------------
 |
 | Creates conditional fields in CMS forms
 |
 | To use this:
 | Give conditional fields a data-condition attribute with name=conditionalValue
 | To show a field when another is empty, leave condition blank after '='
 | To check if a condition is false, use !=
 | For checkboxes, use name=checked or for unchecked use name!=checked
 |
 | Examples:
 | <div data-condition="status=published">(fields)</div>
 | <div data-condition="title!=">(fields)</div>
 | <div data-condition="in_menu=checked">(fields)</div>
 */

module.exports = {

    /**
     * Set class vars
     */
    attribute: 'data-condition',

    /**
     * Initialize elements and events
     */
    init: function () {
        // init class reference
        var conditionals = this;

        // loop repeater containers
        $('[' + conditionals.attribute + ']').each(function () {
            var $conditional = $(this),
                condition = $conditional.attr(conditionals.attribute).split('='),
                fieldName = condition[0],
                desiredValue = condition[1],
                $field;

            // fix for != syntax: remove ! from fieldname and prepend to desiredvalue
            if(fieldName.slice(-1) === '!') {
                fieldName = fieldName.slice(0, -1);
                desiredValue = '!' + desiredValue;
            }

            $field = $('[name="' + fieldName + '"]');

            // set events on field
            $field.change(function () {
                // on change
                conditionals.checkCondition($field, $conditional, desiredValue);
            }).click(function () {
                // on click
                conditionals.checkCondition($field, $conditional, desiredValue);
            }).keyup(function () {
                // on key up
                conditionals.checkCondition($field, $conditional, desiredValue);
            });

            // also check on load
            conditionals.checkCondition($field, $conditional, desiredValue);
        });
    },

    /**
     * Check if condition passes
     */
    checkCondition: function ($field, $conditional, desiredValue) {

        // if condition passes: show conditional section
        if (
            // check if checked condition passes
            (desiredValue === 'checked' && $field.is(':checked')) ||
            // check if unchecked condition passes
            (desiredValue === '!checked' && !$field.is(':checked')) ||
            // check if desired value matches field value
            ($field.val() === desiredValue) ||
            // check if desired non-value matches field value
            (desiredValue.charAt(0) === '!' && desiredValue.substring(1) !== $field.val())
        ) {
            $conditional.show();
        } else {
            // no conditions pass: hide conditional section
            $conditional.hide();
        }
    }
};