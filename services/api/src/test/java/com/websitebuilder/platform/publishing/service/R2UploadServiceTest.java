package com.websitebuilder.platform.publishing.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.websitebuilder.platform.publishing.config.R2Properties;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectsRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@ExtendWith(MockitoExtension.class)
class R2UploadServiceTest {

    private static final String TEST_USER_SLUG = "testuser";
    private static final String TEST_SLUG = "my-site";

    @Mock
    private S3Client r2Client;

    @Mock
    private R2Properties r2Properties;

    @Captor
    private ArgumentCaptor<PutObjectRequest> putObjectRequestCaptor;

    @Captor
    private ArgumentCaptor<RequestBody> requestBodyCaptor;

    @Captor
    private ArgumentCaptor<DeleteObjectsRequest> deleteObjectsRequestCaptor;

    @Test
    @DisplayName("uploadSiteFiles with html and css uploads index and styles with correct keys")
    void uploadSiteFiles_withHtmlAndCss_uploadsIndexAndStylesWithCorrectKeys() {
        R2UploadService service = newService();
        when(r2Properties.bucketName()).thenReturn("test-bucket");

        service.uploadSiteFiles(TEST_USER_SLUG, TEST_SLUG, "<html>ok</html>", "body { color: red; }");

        verify(r2Client, times(2)).putObject(putObjectRequestCaptor.capture(), any(RequestBody.class));
        List<PutObjectRequest> requests = putObjectRequestCaptor.getAllValues();

        PutObjectRequest htmlRequest = requests.get(0);
        assertEquals("test-bucket", htmlRequest.bucket());
        assertEquals("testuser/my-site/index.html", htmlRequest.key());
        assertEquals("text/html; charset=utf-8", htmlRequest.contentType());

        PutObjectRequest cssRequest = requests.get(1);
        assertEquals("test-bucket", cssRequest.bucket());
        assertEquals("testuser/my-site/styles.css", cssRequest.key());
        assertEquals("text/css; charset=utf-8", cssRequest.contentType());
    }

    @Test
    @DisplayName("uploadSiteFiles with null css uploads empty styles file")
    void uploadSiteFiles_withNullCss_uploadsEmptyStylesFile() {
        R2UploadService service = newService();
        when(r2Properties.bucketName()).thenReturn("test-bucket");

        service.uploadSiteFiles(TEST_USER_SLUG, TEST_SLUG, "<html>ok</html>", null);

        verify(r2Client, times(2)).putObject(putObjectRequestCaptor.capture(), requestBodyCaptor.capture());
        List<PutObjectRequest> requests = putObjectRequestCaptor.getAllValues();
        List<RequestBody> bodies = requestBodyCaptor.getAllValues();

        PutObjectRequest cssRequest = requests.get(1);
        assertEquals("testuser/my-site/styles.css", cssRequest.key());
        assertEquals(0L, bodies.get(1).optionalContentLength().orElse(-1L));
    }

    @Test
    @DisplayName("uploadSiteFiles with blank css uploads empty styles file")
    void uploadSiteFiles_withBlankCss_uploadsEmptyStylesFile() {
        R2UploadService service = newService();
        when(r2Properties.bucketName()).thenReturn("test-bucket");

        service.uploadSiteFiles(TEST_USER_SLUG, TEST_SLUG, "<html>ok</html>", "   \n\t ");

        verify(r2Client, times(2)).putObject(putObjectRequestCaptor.capture(), requestBodyCaptor.capture());
        List<RequestBody> bodies = requestBodyCaptor.getAllValues();

        assertEquals(0L, bodies.get(1).optionalContentLength().orElse(-1L));
    }

    @Test
    @DisplayName("uploadSiteFiles with invalid user slug throws IllegalArgumentException")
    void uploadSiteFiles_withInvalidUserSlug_throwsIllegalArgumentException() {
        R2UploadService service = newService();

        IllegalArgumentException thrown = assertThrows(
                IllegalArgumentException.class,
                () -> service.uploadSiteFiles("../bad-user", TEST_SLUG, "<html>ok</html>", "body {}")
        );

        assertEquals("Invalid userSlug format for R2 key construction", thrown.getMessage());
        verify(r2Client, never()).putObject(any(PutObjectRequest.class), any(RequestBody.class));
    }

    @Test
    @DisplayName("uploadSiteFiles when s3 throws propagates exception")
    void uploadSiteFiles_whenS3Throws_propagatesException() {
        R2UploadService service = newService();
        when(r2Properties.bucketName()).thenReturn("test-bucket");
        RuntimeException s3Exception = new RuntimeException("r2 down");
        when(r2Client.putObject(any(PutObjectRequest.class), any(RequestBody.class))).thenThrow(s3Exception);

        RuntimeException thrown = assertThrows(
            RuntimeException.class,
                () -> service.uploadSiteFiles(TEST_USER_SLUG, TEST_SLUG, "<html>ok</html>", "body {}")
        );

        assertEquals("r2 down", thrown.getMessage());
    }

    @Test
    @DisplayName("deleteSiteFiles with valid slugs builds delete request with index and styles keys")
    void deleteSiteFiles_success() {
        R2UploadService service = newService();
        when(r2Properties.bucketName()).thenReturn("test-bucket");

        service.deleteSiteFiles(TEST_USER_SLUG, TEST_SLUG);

        verify(r2Client).deleteObjects(deleteObjectsRequestCaptor.capture());
        DeleteObjectsRequest request = deleteObjectsRequestCaptor.getValue();

        assertEquals("test-bucket", request.bucket());
        assertEquals(2, request.delete().objects().size());
        assertEquals("testuser/my-site/index.html", request.delete().objects().get(0).key());
        assertEquals("testuser/my-site/styles.css", request.delete().objects().get(1).key());
    }

    @Test
    @DisplayName("deleteSiteFiles with invalid slug throws IllegalArgumentException")
    void deleteSiteFiles_invalidSlug() {
        R2UploadService service = newService();

        IllegalArgumentException thrown = assertThrows(
                IllegalArgumentException.class,
                () -> service.deleteSiteFiles(TEST_USER_SLUG, "../bad-slug")
        );

        assertEquals("Invalid websiteSlug format for R2 key construction", thrown.getMessage());
        verify(r2Client, never()).deleteObjects(any(DeleteObjectsRequest.class));
    }

    private R2UploadService newService() {
        return new R2UploadService(r2Client, r2Properties);
    }
}