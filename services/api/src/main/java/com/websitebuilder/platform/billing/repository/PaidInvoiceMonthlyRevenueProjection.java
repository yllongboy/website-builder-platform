package com.websitebuilder.platform.billing.repository;

import java.time.LocalDate;

/** One UTC calendar-month revenue aggregate, with month set to the first day. */
public interface PaidInvoiceMonthlyRevenueProjection {
    LocalDate getMonth();
    Long getRevenueCents();
}
