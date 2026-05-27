package com.websitebuilder.platform.websites.controller;

import com.websitebuilder.platform.common.dto.SuccessResponse;
import com.websitebuilder.platform.publishing.dto.PublishLogResponse;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.websites.dto.CreateBlankWebsiteRequest;
import com.websitebuilder.platform.websites.dto.CreateWebsiteFromTemplateRequest;
import com.websitebuilder.platform.websites.dto.EditorStateResponse;
import com.websitebuilder.platform.websites.dto.PreviewResponse;
import com.websitebuilder.platform.websites.dto.PublishResponse;
import com.websitebuilder.platform.websites.dto.PublishStatusResponse;
import com.websitebuilder.platform.websites.dto.SaveEditorStateRequest;
import com.websitebuilder.platform.websites.dto.SaveEditorStateResponse;
import com.websitebuilder.platform.websites.dto.UpdateWebsiteRequest;
import com.websitebuilder.platform.websites.dto.WebsiteSummary;
import com.websitebuilder.platform.websites.service.WebsiteService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/websites")
public class WebsiteController {

    private final WebsiteService websiteService;

    public WebsiteController(WebsiteService websiteService) {
        this.websiteService = websiteService;
    }

    @PostMapping("/from-template/{templateId}")
    public WebsiteSummary createFromTemplate(
            @PathVariable("templateId") UUID templateId,
            @Valid @RequestBody CreateWebsiteFromTemplateRequest request
    ) {
        UserEntity user = currentUser();
        return websiteService.createFromTemplate(templateId, request, user);
    }

    @PostMapping
    public WebsiteSummary createBlank(@Valid @RequestBody CreateBlankWebsiteRequest request) {
        UserEntity user = currentUser();
        return websiteService.createBlankWebsite(request, user);
    }

    @GetMapping("/my")
    public List<WebsiteSummary> listMyWebsites() {
        UserEntity user = currentUser();
        return websiteService.listByUser(user);
    }

    @PatchMapping("/{websiteId}")
    public WebsiteSummary update(
            @PathVariable("websiteId") UUID websiteId,
            @Valid @RequestBody UpdateWebsiteRequest request
    ) {
        UserEntity user = currentUser();
        return websiteService.update(websiteId, request, user);
    }

    @DeleteMapping("/{websiteId}")
    public SuccessResponse delete(@PathVariable("websiteId") UUID websiteId) {
        UserEntity user = currentUser();
        return websiteService.delete(websiteId, user);
    }

    @GetMapping("/{websiteId}/editor")
    public EditorStateResponse loadEditor(@PathVariable("websiteId") UUID websiteId) {
        UserEntity user = currentUser();
        return websiteService.loadEditorState(websiteId, user);
    }

    @PutMapping("/{websiteId}/editor")
    public SaveEditorStateResponse saveEditor(
            @PathVariable("websiteId") UUID websiteId,
            @Valid @RequestBody SaveEditorStateRequest request
    ) {
        UserEntity user = currentUser();
        return websiteService.saveEditorState(websiteId, request, user);
    }

    @GetMapping("/{websiteId}/preview")
    public PreviewResponse getPreview(@PathVariable("websiteId") UUID websiteId) {
        UserEntity user = currentUser();
        return websiteService.getPreview(websiteId, user);
    }

    @PostMapping("/{websiteId}/publish")
    public ResponseEntity<PublishResponse> publishWebsite(@PathVariable("websiteId") UUID websiteId) {
        UserEntity user = currentUser();
        return ResponseEntity.ok(websiteService.publish(websiteId, user));
    }

    @PostMapping("/{websiteId}/republish")
    public ResponseEntity<PublishResponse> republishWebsite(@PathVariable("websiteId") UUID websiteId) {
        UserEntity user = currentUser();
        return ResponseEntity.ok(websiteService.republish(websiteId, user));
    }

    @DeleteMapping("/{websiteId}/publish")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void unpublishWebsite(@PathVariable("websiteId") UUID websiteId) {
        UserEntity user = currentUser();
        websiteService.unpublish(websiteId, user);
    }

    @GetMapping("/{websiteId}/publish-status")
    public PublishStatusResponse getPublishStatus(@PathVariable("websiteId") UUID websiteId) {
        UserEntity user = currentUser();
        return websiteService.getPublishStatus(websiteId, user);
    }

    @GetMapping("/{websiteId}/publish-logs")
    public ResponseEntity<List<PublishLogResponse>> getPublishLogs(@PathVariable("websiteId") UUID websiteId) {
        UserEntity user = currentUser();
        List<PublishLogResponse> logs = websiteService.getPublishLogs(websiteId, user);
        return ResponseEntity.ok(logs);
    }

    private UserEntity currentUser() {
        return (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
