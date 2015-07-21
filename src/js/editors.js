(function(ESH) {

    'use strict';

    ESH.requestEditor = function(commands) {

        var editor = ace.edit('requestData');
        editor.setTheme('ace/theme/chrome');
        editor.getSession().setMode('ace/mode/json');
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: false
        });
        editor.getSession().setTabSize(2);
        editor.$blockScrolling = Infinity;
        for (var i = 0; i < commands.length; i++) {
            editor.commands.addCommand(commands[i]);
        }

        var langTools = ace.require('ace/ext/language_tools');
        langTools.addCompleter({
            getCompletions: function(editor, session, pos, prefix, callback) {
                callback(null, keywords.map(function(word) {
                    return {
                        caption: word,
                        value: word
                    };
                }));
            }
        });

        var getValue = function() {
            var value = editor.getValue();
            return value && value.trim().length > 0 ? value : undefined;
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

    var keywords = [
        "_all",
        "_first",
        "_geo_distance",
        "_id",
        "_index",
        "_last",
        "_name",
        "_parent",
        "_script",
        "_source",
        "_subset_freq",
        "_subset_size",
        "_superset_freq",
        "_superset_size",
        "_type",
        "aggregations",
        "aggs",
        "analyze_wildcard",
        "analyzer",
        "asc",
        "avg",
        "background_is_superset",
        "bool",
        "boundary_chars",
        "boundary_max_scan",
        "cardinality",
        "chi_square",
        "collate",
        "combine_script",
        "combine_script_file",
        "combine_script_id",
        "confidence",
        "content",
        "context",
        "count",
        "date_histogram",
        "date_range",
        "default",
        "default_operator",
        "desc",
        "dfs_query_then_fetch",
        "end",
        "explain",
        "extended_stats",
        "false",
        "fielddata_fields",
        "fields",
        "filter",
        "filtered",
        "filters",
        "fragment_offset",
        "fragment_size",
        "from",
        "function_score",
        "fuzziness",
        "geo_bounding_box",
        "geo_bounds",
        "geo_distance",
        "geohash_grid",
        "global",
        "gnd",
        "gram_size",
        "gte",
        "highlight",
        "highlight_query",
        "histogram",
        "include_negatives",
        "index_analyzer",
        "index_options",
        "indices_boost",
        "init_script",
        "init_script_file",
        "init_script_id",
        "inner_hits",
        "input",
        "ip_range",
        "jlh",
        "keyed",
        "lang",
        "laplace",
        "lenient",
        "line_no",
        "linear_interpolation",
        "lowercase_expanded_terms",
        "lowercase_terms",
        "lte",
        "map_script",
        "map_script_file",
        "map_script_id",
        "match",
        "match_all",
        "match_phrase",
        "match_phrase_prefix",
        "matched_fields",
        "max",
        "max_edits",
        "max_errors",
        "max_input_length",
        "max_inspections",
        "max_term_freq",
        "min",
        "min_doc_count",
        "min_doc_freq",
        "min_length",
        "min_score",
        "min_word_length",
        "missing",
        "multiply",
        "must",
        "mutual_information",
        "name",
        "neighbors",
        "nested_filter",
        "nested_path",
        "no_match_size",
        "number_of_fragments",
        "offsets",
        "operator",
        "order",
        "output",
        "params",
        "partial_fields",
        "path",
        "payload",
        "payloads",
        "percentage",
        "percentile_ranks",
        "percentiles",
        "phrase",
        "phrase_slop",
        "post_filter",
        "post_tags",
        "pre_filter",
        "pre_tags",
        "precision",
        "prefix_length",
        "preserve_position_increments",
        "preserve_separators",
        "query",
        "query_and_fetch",
        "query_cache",
        "query_then_fetch",
        "query_weight",
        "ranges",
        "real_word_error_likelihood",
        "reduce_params",
        "reduce_script",
        "reduce_script_file",
        "reduce_script_id",
        "require_field_match",
        "rescore",
        "rescore_query",
        "rescore_query_weight",
        "reverse_nested",
        "scan",
        "script",
        "script_score",
        "scripted_metric",
        "search_analyzer",
        "search_type",
        "separator",
        "shard_size",
        "significant_terms",
        "simple_phrase",
        "size",
        "slop",
        "sort",
        "start",
        "stupid_backoff",
        "suggest",
        "suggest_mode",
        "sum",
        "tag_schema",
        "template",
        "term",
        "term_vector",
        "terminate_after",
        "terms",
        "timeout",
        "top_hits",
        "total",
        "track_scores",
        "transpositions",
        "true",
        "type",
        "unicode_aware",
        "unit",
        "value_count",
        "version",
        "weight",
        "window_size",
        "with_positions_offsets",
        "zero_terms_query"
    ];

})(window.ESH = window.ESH || {});