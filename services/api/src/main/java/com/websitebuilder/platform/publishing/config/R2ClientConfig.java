package com.websitebuilder.platform.publishing.config;

import java.net.URI;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@EnableConfigurationProperties(R2Properties.class)
public class R2ClientConfig {

    @Bean
    public S3Client r2Client(R2Properties props) {
        return S3Client.builder()
                .endpointOverride(URI.create("https://" + props.accountId() + ".r2.cloudflarestorage.com"))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(props.accessKeyId(), props.accessKeySecret())
                ))
                .region(Region.of("auto"))
                .forcePathStyle(true)
                .build();
    }
}
