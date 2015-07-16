(function(ESH, $) {

    'use strict';

    ESH.requestEditor = function(commands) {

        var editor = ace.edit('requestData');
        editor.setTheme('ace/theme/chrome');
        editor.getSession().setMode('ace/mode/json');
        editor.getSession().setTabSize(2);
        editor.$blockScrolling = Infinity;
        for (var i = 0; i < commands.length; i++) {
            editor.commands.addCommand(commands[i]);
        }

        var getValue = function() {
            var value = editor.getValue();
            return value && value.trim().length > 0 ? JSON.parse(value) : undefined;
        };

        var setValue = function(json) {
            var value = typeof json == 'undefined' ? '' : JSON.stringify(json, null, '\t');
            editor.setValue(value);
            editor.getSession().selection.clearSelection();
        };

        var clear = function() {
            editor.setValue();
        };

        return {
            getValue: getValue,
            setValue: setValue,
            clear: clear
        };

    };

    ESH.responseEditor = function() {

        var editor = ace.edit('response');
        editor.setTheme('ace/theme/chrome');
        editor.getSession().setMode('ace/mode/text');
        editor.getSession().setTabSize(2);
        editor.setReadOnly(true);
        editor.$blockScrolling = Infinity;

        var setValue = function(data, mode) {
            editor.getSession().setMode('ace/mode/' + mode);
            var value = mode === 'json' ? JSON.stringify(data, null, '\t') : data;
            editor.setValue(value);
            editor.getSession().setScrollTop(0);
            editor.getSession().selection.clearSelection();
        };

        var clear = function() {
            editor.setValue();
        };

        return {
            setValue: setValue,
            clear: clear
        };

    };

})(window.ESH = window.ESH || {}, jQuery);