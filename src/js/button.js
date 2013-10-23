module.exports = Em.View.extend({
    template: require('../templates/button'),

    tagName: 'button',

    classNameBindings: [':option', 'isSelected:selected'],

    option: null,

    isSelected: function() {
        return this.get('option.value') === this.get('parentView.value');
    }.property('parentView.value'),

    click: function() {
        if (this.get('parentView.disabled')) {
            return;
        }
        var parentView = this.get('parentView'),
            oldOption = parentView.get('options').findBy('value', parentView.get('value')),
            option = this.get('option'),
            selectorFactory = Em.get(option, 'selector'),
            hasSelector = false;
        var callback = function() {
            if (oldOption) {
                var oldOriginalLabel = Em.get(oldOption, 'originalLabel');
                if (oldOption !== option && !Em.isEmpty(oldOriginalLabel)) {
                    oldOption.set('label', oldOriginalLabel);
                }
            }
            parentView.set('value', Em.get(option, 'value'));
        };
        if (selectorFactory) {
            var selectorPromise = selectorFactory.call(null, this, option);
            if (selectorPromise) {
                hasSelector = true;
                selectorPromise.then(callback);
            }
        }
        if (!hasSelector) {
            callback();
        }
    }
});