package com.websitebuilder.platform.common.config;

import com.fasterxml.jackson.core.StreamReadConstraints;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class JacksonConfig implements WebMvcConfigurer {

    private static final long MAX_JSON_DOCUMENT_LENGTH = 10_485_760L; // 10MB
    private static final int MAX_NESTING_DEPTH = 100;

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.stream()
                .filter(c -> c instanceof MappingJackson2HttpMessageConverter)
                .map(c -> (MappingJackson2HttpMessageConverter) c)
                .forEach(c -> c.getObjectMapper().getFactory().setStreamReadConstraints(
                        StreamReadConstraints.builder()
                                .maxDocumentLength(MAX_JSON_DOCUMENT_LENGTH)
                                .maxNestingDepth(MAX_NESTING_DEPTH)
                                .build()
                ));
    }
}
