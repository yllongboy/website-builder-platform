package com.websitebuilder.platform.publishing.config;

import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "cloudflare.r2")
public record R2Properties(
        @NotBlank String accountId,
        @NotBlank String accessKeyId,
        @NotBlank String accessKeySecret,
        @NotBlank String bucketName,
        @NotBlank String publicUrlBase
) {
}
