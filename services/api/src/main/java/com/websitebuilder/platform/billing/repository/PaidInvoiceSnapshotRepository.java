package com.websitebuilder.platform.billing.repository;

import com.websitebuilder.platform.billing.entity.PaidInvoiceSnapshotEntity;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/** Persistence access for append-only, uniquely keyed paid invoice snapshots. */
public interface PaidInvoiceSnapshotRepository extends JpaRepository<PaidInvoiceSnapshotEntity, String> {

    /**
     * Inserts the first immutable snapshot for an invoice. A unique-key conflict means a
     * different Stripe event already recorded this same invoice and is intentionally ignored.
     */
    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO paid_invoice_snapshots (stripe_invoice_id, amount_paid_cents, currency, paid_at)
            VALUES (:invoiceId, :amountPaidCents, :currency, :paidAt)
            ON CONFLICT (stripe_invoice_id) DO NOTHING
            """, nativeQuery = true)
    int insertIfAbsent(
            @Param("invoiceId") String invoiceId,
            @Param("amountPaidCents") Long amountPaidCents,
            @Param("currency") String currency,
            @Param("paidAt") Instant paidAt
    );

    /** Returns snapshots in the half-open interval [paidAtStartInclusive, paidAtEndExclusive). */
    List<PaidInvoiceSnapshotEntity> findByCurrencyAndPaidAtGreaterThanEqualAndPaidAtLessThanOrderByPaidAtAsc(
            String currency,
            Instant paidAtStartInclusive,
            Instant paidAtEndExclusive
    );

    /**
     * Aggregates snapshots by UTC calendar month for a half-open interval. The report contract
     * spans at most six months, and the limit also bounds accidental wider requests.
     */
    @Query(value = """
            SELECT date_trunc('month', paid_at AT TIME ZONE 'UTC')::date AS month,
                   SUM(amount_paid_cents) AS \"revenueCents\"
            FROM paid_invoice_snapshots
            WHERE currency = :currency
              AND paid_at >= :paidAtStartInclusive
              AND paid_at < :paidAtEndExclusive
            GROUP BY date_trunc('month', paid_at AT TIME ZONE 'UTC')::date
            ORDER BY month ASC
            LIMIT 6
            """, nativeQuery = true)
    List<PaidInvoiceMonthlyRevenueProjection> findMonthlyRevenueCents(
            @Param("currency") String currency,
            @Param("paidAtStartInclusive") Instant paidAtStartInclusive,
            @Param("paidAtEndExclusive") Instant paidAtEndExclusive
    );
}
