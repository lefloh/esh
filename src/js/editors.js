(function(ESH) {

    'use strict';

    ESH.requestEditor = function(commands) {

        var editor = ace.edit('request');
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

    // hopefully all found in the query and search documentation
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
        "allow_leading_wildcard",
        "analyze_wildcard",
        "analyzer",
        "asc",
        "auto_generate_phrase_queries",
        "avg",
        "background_is_superset",
        "best_fields",
        "bool",
        "boost",
        "boost_terms",
        "boosting",
        "boundary_chars",
        "boundary_max_scan",
        "cardinality",
        "chi_square",
        "collate",
        "combine_script",
        "combine_script_file",
        "combine_script_id",
        "common",
        "confidence",
        "constant_score",
        "content",
        "context",
        "count",
        "cross_fields",
        "cutoff_frequency",
        "date_histogram",
        "date_range",
        "decay",
        "default",
        "default_field",
        "default_operator",
        "desc",
        "dfs_query_then_fetch",
        "dis_max",
        "dist",
        "docs",
        "enable_position_increments",
        "end",
        "exp",
        "explain",
        "extended_stats",
        "false",
        "field_value_factor",
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
        "fuzzy",
        "fuzzy_max_expansions",
        "fuzzy_prefix_length",
        "gauss",
        "geo_bounding_box",
        "geo_bounds",
        "geo_distance",
        "geo_shape",
        "geohash_grid",
        "global",
        "gnd",
        "gram_size",
        "gt",
        "gte",
        "has_child",
        "has_parent",
        "highlight",
        "highlight_query",
        "histogram",
        "ids",
        "include",
        "include_negatives",
        "index_analyzer",
        "index_options",
        "indices",
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
        "leap_frog",
        "leap_frog_filter_first",
        "leap_frog_query_first",
        "lenient",
        "like_text",
        "line_no",
        "linear",
        "linear_interpolation",
        "locale",
        "low_freq_operator",
        "lowercase_expanded_terms",
        "lowercase_terms",
        "lt",
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
        "max_determinized_states",
        "max_doc_freq",
        "max_edits",
        "max_errors",
        "max_expansions",
        "max_input_length",
        "max_inspections",
        "max_query_terms",
        "max_term_freq",
        "max_word_length",
        "min",
        "min_doc_count",
        "min_doc_freq",
        "min_length",
        "min_score",
        "min_term_freq",
        "min_word_length",
        "minimum_should_match",
        "missing",
        "modifier",
        "more_like_this",
        "most_fields",
        "multi_match",
        "multiply",
        "must",
        "must_not",
        "mutual_information",
        "name",
        "negative",
        "negative_boost",
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
        "parent_type",
        "partial_fields",
        "path",
        "payload",
        "payloads",
        "percentage",
        "percentile_ranks",
        "percentiles",
        "phrase",
        "phrase_prefix",
        "phrase_slop",
        "positive",
        "post",
        "post_filter",
        "post_tags",
        "pre",
        "pre_filter",
        "pre_tags",
        "precision",
        "prefix",
        "prefix_length",
        "preserve_position_increments",
        "preserve_separators",
        "queries",
        "query",
        "query_and_fetch",
        "query_cache",
        "query_first",
        "query_string",
        "query_then_fetch",
        "query_weight",
        "random_access_always",
        "random_score",
        "ranges",
        "real_word_error_likelihood",
        "reduce_params",
        "reduce_script",
        "reduce_script_file",
        "reduce_script_id",
        "regexp",
        "replace",
        "require_field_match",
        "rescore",
        "rescore_query",
        "rescore_query_weight",
        "reverse_nested",
        "scan",
        "score_mode",
        "script",
        "script_score",
        "scripted_metric",
        "search_analyzer",
        "search_type",
        "separator",
        "shard_size",
        "should",
        "significant_terms",
        "simple_phrase",
        "simple_query_string",
        "size",
        "slop",
        "sort",
        "span_multi",
        "span_near",
        "span_not",
        "start",
        "stop_words",
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
        "tie_breaker",
        "time_zone",
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
        "wildcard",
        "window_size",
        "with_positions_offsets",
        "zero_terms_query"
    ];

})(window.ESH = window.ESH || {});