package com.websitebuilder.platform.billing.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import org.hibernate.annotations.Immutable;

/** Minimal historical snapshot of a Stripe invoice that has been paid. */
@Entity
@Immutable
@Table(name = "paid_invoice_snapshots")
public class PaidInvoiceSnapshotEntity {

    @Id
    @Column(name = "stripe_invoice_id", nullable = false, length = 255)
    private String stripeInvoiceId;

    @Column(name = "amount_paid_cents", nullable = false)
    private Long amountPaidCents;

    @Column(nullable = false, length = 3)
    private String currency;

    @Column(name = "paid_at", nullable = false)
    private Instant paidAt;

    protected PaidInvoiceSnapshotEntity() {
    }

    public PaidInvoiceSnapshotEntity(String stripeInvoiceId, Long amountPaidCents, String currency, Instant paidAt) {
        this.stripeInvoiceId = stripeInvoiceId;
        this.amountPaidCents = amountPaidCents;
        this.currency = currency;
        this.paidAt = paidAt;
    }

    public String stripeInvoiceId() { return stripeInvoiceId; }
    public Long amountPaidCents() { return amountPaidCents; }
    public String currency() { return currency; }
    public Instant paidAt() { return paidAt; }
}
