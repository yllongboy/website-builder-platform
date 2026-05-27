package com.websitebuilder.platform.publishing.service;

import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.publishing.config.R2Properties;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Delete;
import software.amazon.awssdk.services.s3.model.DeleteObjectsRequest;
import software.amazon.awssdk.services.s3.model.ObjectIdentifier;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class R2UploadService {

    private final S3Client r2Client;
    private final R2Properties r2Properties;

    public R2UploadService(@Qualifier("r2Client") S3Client r2Client, R2Properties r2Properties) {
        this.r2Client = r2Client;
        this.r2Properties = r2Properties;
    }

    public void uploadSiteFiles(String userSlug, String websiteSlug, String htmlContent, @Nullable String cssContent) {
        if (userSlug == null || !userSlug.matches("^[a-z0-9][a-z0-9-]{0,179}$")) {
            throw new IllegalArgumentException("Invalid userSlug format for R2 key construction");
        }
        if (websiteSlug == null || !websiteSlug.matches("^[a-z0-9][a-z0-9-]{0,179}$")) {
            throw new IllegalArgumentException("Invalid websiteSlug format for R2 key construction");
        }

        String keyPrefix = userSlug + "/" + websiteSlug;

        PutObjectRequest htmlRequest = PutObjectRequest.builder()
                .bucket(r2Properties.bucketName())
                .key(keyPrefix + "/index.html")
                .contentType("text/html; charset=utf-8")
                .build();
        r2Client.putObject(htmlRequest, RequestBody.fromString(htmlContent, StandardCharsets.UTF_8));

        String normalizedCss = cssContent == null || cssContent.isBlank() ? "" : cssContent;
        PutObjectRequest cssRequest = PutObjectRequest.builder()
                .bucket(r2Properties.bucketName())
                .key(keyPrefix + "/styles.css")
                .contentType("text/css; charset=utf-8")
                .build();
        r2Client.putObject(cssRequest, RequestBody.fromString(normalizedCss, StandardCharsets.UTF_8));
    }

    public void deleteSiteFiles(String userSlug, String websiteSlug) {
        if (userSlug == null || !userSlug.matches("^[a-z0-9][a-z0-9-]{0,179}$")) {
            throw new IllegalArgumentException("Invalid userSlug format for R2 key construction");
        }
        if (websiteSlug == null || !websiteSlug.matches("^[a-z0-9][a-z0-9-]{0,179}$")) {
            throw new IllegalArgumentException("Invalid websiteSlug format for R2 key construction");
        }

        String keyPrefix = userSlug + "/" + websiteSlug;

        ObjectIdentifier indexHtml = ObjectIdentifier.builder()
                .key(keyPrefix + "/index.html")
                .build();
        ObjectIdentifier stylesCss = ObjectIdentifier.builder()
                .key(keyPrefix + "/styles.css")
                .build();

        DeleteObjectsRequest request = DeleteObjectsRequest.builder()
                .bucket(r2Properties.bucketName())
                .delete(Delete.builder().objects(indexHtml, stylesCss).build())
                .build();

        try {
            r2Client.deleteObjects(request);
        } catch (Exception ex) {
            throw new ApiException("UNPUBLISH_FAILED", "Failed to remove published site files");
        }
    }
}