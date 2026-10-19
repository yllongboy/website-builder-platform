package com.websitebuilder.platform.billing.entity;

import com.websitebuilder.platform.users.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "subscriptions")
public class SubscriptionEntity {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private String provider;

    @Column(name = "provider_customer_id")
    private String providerCustomerId;

    @Column(name = "provider_subscription_id")
    private String providerSubscriptionId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubscriptionStatus status;

    @Column(name = "plan_code", nullable = false)
    private String planCode;

    @Column(name = "recurring_amount_minor")
    private Long recurringAmountMinor;

    @Column(name = "recurring_currency", length = 3)
    private String recurringCurrency;

    @Column(name = "recurring_interval", length = 10)
    private String recurringInterval;

    @Column(name = "recurring_interval_count")
    private Integer recurringIntervalCount;

    @Column(name = "current_period_end")
    private Instant currentPeriodEnd;

    @Column(name = "cancel_at_period_end", nullable = false)
    private Boolean cancelAtPeriodEnd;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected SubscriptionEntity() {
    }

    public SubscriptionEntity(
            UUID id,
            UserEntity user,
            String provider,
            String providerCustomerId,
            String providerSubscriptionId,
            SubscriptionStatus status,
            String planCode,
            Instant currentPeriodEnd,
            Boolean cancelAtPeriodEnd,
            Instant createdAt,
            Instant updatedAt
    ) {
        this.id = id;
        this.user = user;
        this.provider = provider;
        this.providerCustomerId = providerCustomerId;
        this.providerSubscriptionId = providerSubscriptionId;
        this.status = status;
        this.planCode = planCode;
        this.currentPeriodEnd = currentPeriodEnd;
        this.cancelAtPeriodEnd = cancelAtPeriodEnd;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PreUpdate
    void preUpdate() {
        this.updatedAt = Instant.now();
    }

    public UUID id() { return id; }
    public UserEntity user() { return user; }
    public String provider() { return provider; }
    public String providerCustomerId() { return providerCustomerId; }
    public String providerSubscriptionId() { return providerSubscriptionId; }
    public SubscriptionStatus status() { return status; }
    public String planCode() { return planCode; }
    public Long recurringAmountMinor() { return recurringAmountMinor; }
    public String recurringCurrency() { return recurringCurrency; }
    public String recurringInterval() { return recurringInterval; }
    public Integer recurringIntervalCount() { return recurringIntervalCount; }
    public Instant currentPeriodEnd() { return currentPeriodEnd; }
    public Boolean cancelAtPeriodEnd() { return cancelAtPeriodEnd; }
    public Instant createdAt() { return createdAt; }
    public Instant updatedAt() { return updatedAt; }

    public void setProviderCustomerId(String providerCustomerId) {
        this.providerCustomerId = providerCustomerId;
    }

    public void setProviderSubscriptionId(String providerSubscriptionId) {
        this.providerSubscriptionId = providerSubscriptionId;
    }

    public void setStatus(SubscriptionStatus status) {
        this.status = status;
    }

    public void setPlanCode(String planCode) {
        this.planCode = planCode;
    }

    public void setRecurringPriceSnapshot(
            Long recurringAmountMinor,
            String recurringCurrency,
            String recurringInterval,
            Integer recurringIntervalCount
    ) {
        this.recurringAmountMinor = recurringAmountMinor;
        this.recurringCurrency = recurringCurrency;
        this.recurringInterval = recurringInterval;
        this.recurringIntervalCount = recurringIntervalCount;
    }

    public void setCurrentPeriodEnd(Instant currentPeriodEnd) {
        this.currentPeriodEnd = currentPeriodEnd;
    }

    public void setCancelAtPeriodEnd(Boolean cancelAtPeriodEnd) {
        this.cancelAtPeriodEnd = cancelAtPeriodEnd;
    }
}
