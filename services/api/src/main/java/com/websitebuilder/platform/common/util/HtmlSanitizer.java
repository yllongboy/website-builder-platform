package com.websitebuilder.platform.common.util;

import java.util.regex.Pattern;
import org.springframework.stereotype.Component;

@Component
public class HtmlSanitizer {

    // Remove <script>...</script> tags and their content
    private static final Pattern SCRIPT_TAG = Pattern.compile(
            "<script\\b[^>]*>[\\s\\S]*?</script\\s*>", Pattern.CASE_INSENSITIVE);

    // Remove self-closing <script .../> tags
    private static final Pattern SCRIPT_SELF_CLOSING = Pattern.compile(
            "<script\\b[^>]*/\\s*>", Pattern.CASE_INSENSITIVE);

    // Remove on* event handler attributes (e.g. onclick, onload, onerror)
    private static final Pattern ON_EVENT_ATTR = Pattern.compile(
            "\\s+on[a-z]+\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s>]+)",
            Pattern.CASE_INSENSITIVE);

    // Remove javascript: in href/src/action attribute values
    private static final Pattern JAVASCRIPT_URI = Pattern.compile(
            "((?:href|src|action|formaction|data|poster)\\s*=\\s*[\"']?)\\s*javascript\\s*:",
            Pattern.CASE_INSENSITIVE);

    public String sanitize(String html) {
        if (html == null) {
            return "";
        }
        String result = html;
        result = SCRIPT_TAG.matcher(result).replaceAll("");
        result = SCRIPT_SELF_CLOSING.matcher(result).replaceAll("");
        result = ON_EVENT_ATTR.matcher(result).replaceAll("");
        result = JAVASCRIPT_URI.matcher(result).replaceAll("$1");
        return result;
    }
}
