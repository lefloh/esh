(function(ESH, $) {

    'use strict';

    ESH.app = function() {

        var developmentHost = 'localhost:9000';

        var requestEditor, responseEditor;

        function Request(method, url, data, name) {
            this.method = method;
            this.url = url;
            this.data = data;
            this.name = name;
        }

        var createUrl = function(path) {
            return document.location.origin + '/' + path;
        };

        var history = [];
        var historyIdx = 0;

        var init = function() {
            requestEditor = new ESH.requestEditor(commands);
            responseEditor = new ESH.responseEditor();
            initExampleRequests();
            registerListeners();
        };

        var initExampleRequests = function() {
            var select =  $('#exampleRequests');
            for (var i = 0; i < exampleRequests.length; i++) {
                $(select).append($('<option>', {
                    value: i,
                    text: exampleRequests[i].name
                }));
            }
        };

        var setRequest = function(request) {
            $('#method').val(request.method);
            $('#url').val(request.url);
            requestEditor.setValue(request.data);
        };

        var submit = function() {
            hideError();
            try {
                var data = requestEditor.getValue();
            } catch(e) {
                showError('Invalid data: ' + e);
                return;
            }
            var request = new Request(
                $('#method').val(),
                $('#url').val(),
                data
            );
            var isJSON = request.url.indexOf('_cat') === -1;
            $.ajax({
                type: request.method,
                url: realUrl(request.url),
                contentType: isJSON ? 'application/json' : 'text/plain',
                data: request.data,
                success: function(data) {
                    responseEditor.setValue(data, isJSON ? 'json' : 'text');
                },
                error: function(xhr) {
                    var msg = xhr.responseJSON && xhr.responseJSON.error
                                ? xhr.responseJSON.error.replace(/; /g,';\n\t')
                                : xhr.responseText;
                    showError(xhr.statusText + ': ' + msg);
                }
            });
            history.push(request);
            historyIdx = history.length - 1;
        };

        // add something for the grunt proxy for development
        var realUrl = function(url) {
            if (document.location.host === developmentHost) {
                return url.replace(developmentHost, developmentHost + '/es');
            }
            return url;
        };

        var scrollHistory = function(inc) {
            var idx = historyIdx + inc;
            if (idx > -1 && idx < history.length) {
                setRequest(history[idx]);
                historyIdx = idx;
            }
        };

        var clear = function() {
            $('#url').val('');
            $('#exampleRequests').val(-1);
            $('#method').val('GET');
            requestEditor.clear();
            responseEditor.clear();
        };

        var registerListeners = function() {
            $('#exampleRequests').on('change', function(e) {
                setRequest(exampleRequests[e.target.value]);
                submit();
                $('#exampleRequests').val(-1);
            });
            $('form').on('submit', function(e) {
                e.preventDefault();
                submit();
            });
            $('#url').on('keydown', handleKeypress);
        };

        var handleKeypress = function(e) {
            if (!e.ctrlKey && !e.metaKey) {
                return;
            }
            for (var i = 0; i < commands.length; i++) {
                if (commands[i].keyCode === e.keyCode) {
                    commands[i].exec();
                }
            }
        };

        var showError = function(msg) {
            $('#error').text(msg).fadeIn();
            responseEditor.clear();
        };

        var hideError = function() {
            $('#error').text('').fadeOut();
        };

        var commands = [
            {
                name : 'submit',
                bindKey: { win: 'Ctrl-Enter',  mac: 'Command-Enter' },
                keyCode: 13,
                exec: submit
            },
            {
                name : 'historyUp',
                bindKey: { win: 'Ctrl-Up',  mac: 'Command-Up' },
                keyCode: 38,
                exec: function() { scrollHistory(-1); }
            },
            {
                name : 'historyDown',
                bindKey: { win: 'Ctrl-Down',  mac: 'Command-Down' },
                keyCode: 40,
                exec: function() { scrollHistory(1); }
            },
            {
                name : 'clear',
                bindKey: { win: 'Ctrl-U',  mac: 'Command-U' },
                keyCode: 85,
                exec: clear
            }
        ];

        var exampleRequests = [
            new Request('GET', createUrl('_cat/allocation?v'), undefined, '_cat allocation'),
            new Request('GET', createUrl('_cat/indices?v'), undefined, '_cat indices'),
            new Request('GET', createUrl('_cat/master?v'), undefined, '_cat master'),
            new Request("POST", createUrl('_search'),
                {
                    "query": {
                        "filtered": {
                            "query": {
                                "match": { "name": "alex" }
                            },
                            "filter": {
                                "term": { "gender": "female" }
                            }
                        }
                    }
                }, '_search filtered'),
            new Request("POST", createUrl('_search'),
                {
                    "query": {
                        "match_all": {}
                    },
                    "sort" : [
                        { "name" : { "order" : "asc"} }
                    ],
                    "from" : 2,
                    "size" : 10
                }, '_search from, size and sort'),
            new Request("POST", createUrl('_search'),
                {
                    "query" : {
                        "match_all" : {}
                    }
                }, '_search match_all'),
            new Request("POST", createUrl('_search'),
                {
                    "query" : {
                        "term" : { "gender" : "male" }
                    }
                }, '_search term'),
            new Request('GET', createUrl('_search?q=gender:female'), undefined, '_search uri')
        ];

        return {
            init : init
        };

    };

    $(document).ready(new ESH.app().init);


})(window.ESH = window.ESH || {}, jQuery);