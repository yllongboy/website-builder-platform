package com.websitebuilder.platform.publishing.service;

import com.websitebuilder.platform.publishing.entity.PublishLogEntity;
import com.websitebuilder.platform.publishing.entity.PublishLogStatus;
import com.websitebuilder.platform.publishing.repository.PublishLogRepository;
import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import java.time.Instant;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PublishLogService {

    private final PublishLogRepository publishLogRepository;

    public PublishLogService(PublishLogRepository publishLogRepository) {
        this.publishLogRepository = publishLogRepository;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public PublishLogEntity logStarted(WebsiteEntity website) {
        PublishLogEntity log = new PublishLogEntity(
                UUID.randomUUID(),
                website,
                PublishLogStatus.STARTED,
                null,
                null,
                Instant.now()
        );
        return publishLogRepository.save(log);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logSuccess(PublishLogEntity log, String publishedUrl) {
        PublishLogEntity updatedLog = new PublishLogEntity(
                log.id(),
                log.website(),
                PublishLogStatus.SUCCESS,
                null,
                publishedUrl,
                log.createdAt()
        );
        publishLogRepository.save(updatedLog);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logFailed(PublishLogEntity log, String message) {
        PublishLogEntity updatedLog = new PublishLogEntity(
                log.id(),
                log.website(),
                PublishLogStatus.FAILED,
                message,
                null,
                log.createdAt()
        );
        publishLogRepository.save(updatedLog);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public PublishLogEntity logUnpublished(WebsiteEntity website) {
        PublishLogEntity log = new PublishLogEntity(
                UUID.randomUUID(),
                website,
                PublishLogStatus.UNPUBLISHED,
                null,
                null,
                Instant.now()
        );
        return publishLogRepository.save(log);
    }
}
