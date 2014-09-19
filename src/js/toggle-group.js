module.exports = Em.Component.extend(require('ember-field-mixin'), {
    layout: require('../templates/toggle-group'),
    
    classNameBindings: [':toggle-group', 'direction', 'disabled', 'small'],

    options: null,
    
    value: null,
    
    disabled: null,
    
    direction: 'horizontal',
    
    small: false,
    
    buttonViewClass: require('./button')
});
