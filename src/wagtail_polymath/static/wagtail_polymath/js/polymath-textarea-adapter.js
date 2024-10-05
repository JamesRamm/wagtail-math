(function() {
    function PolymathxTextarea(html, config) {
        this.html = html;
        this.baseConfig = config;
    }
    PolymathTextarea.prototype.render = function(placeholder, name, id, initialState) {
        placeholder.outerHTML = this.html.replace(/__NAME__/g, name).replace(/__ID__/g, id);

        var element = document.getElementById(id);
        element.value = initialState;

        initPolymathTextareaPreview(id);

        // define public API functions for the widget:
        // https://docs.wagtail.io/en/latest/reference/streamfield/widget_api.html
        return {
            idForLabel: null,
            getValue: function() {
                return element.value;
            },
            getState: function() {
                return element.value;
            },
            setState: function() {
                throw new Error('PolymathTextarea.setState is not implemented');
            },
            getTextLabel: function(opts) {
                if (!element.value) return '';
                var maxLength = opts && opts.maxLength,
                    result = element.value;
                if (maxLength && result.length > maxLength) {
                    return result.substring(0, maxLength - 1) + '…';
                }
                return result;
            },
        };
    };

    window.telepath.register('wagtail_polymath.widgets.PolymathTextareaWidget', PolymathxTextarea);
})();
