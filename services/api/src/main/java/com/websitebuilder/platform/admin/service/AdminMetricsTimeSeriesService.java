package com.websitebuilder.platform.admin.service;

import com.stripe.exception.StripeException;
import com.stripe.model.Invoice;
import com.stripe.model.InvoiceCollection;
import com.stripe.net.RequestOptions;
import com.stripe.param.InvoiceListParams;
import com.websitebuilder.platform.admin.dto.AdminMetricsTimeSeriesBucket;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.users.repository.UserRepository;
import java.time.Instant;
import java.time.YearMonth;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminMetricsTimeSeriesService {

    private static final Logger log = LoggerFactory.getLogger(AdminMetricsTimeSeriesService.class);
    private static final int BUCKET_COUNT = 6;
    private static final int STRIPE_PAGE_SIZE = 100;

    private final UserRepository userRepository;
    private final String stripeSecretKey;

    public AdminMetricsTimeSeriesService(
            UserRepository userRepository,
            @Value("${stripe.secret-key:}") String stripeSecretKey
    ) {
        this.userRepository = userRepository;
        this.stripeSecretKey = stripeSecretKey;
    }

    @Transactional(readOnly = true)
    public List<AdminMetricsTimeSeriesBucket> getSixMonthSeries() {
        if (stripeSecretKey == null || stripeSecretKey.isBlank()) {
            throw stripeUnavailable();
        }

        YearMonth currentMonth = YearMonth.now(ZoneOffset.UTC);
        YearMonth firstMonth = currentMonth.minusMonths(BUCKET_COUNT - 1L);
        Instant rangeStart = firstMonth.atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();
        Instant rangeEnd = currentMonth.plusMonths(1).atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();

        Map<YearMonth, Long> revenueByMonth = new LinkedHashMap<>();
        List<YearMonth> months = new ArrayList<>(BUCKET_COUNT);
        for (int offset = 0; offset < BUCKET_COUNT; offset++) {
            YearMonth month = firstMonth.plusMonths(offset);
            months.add(month);
            revenueByMonth.put(month, 0L);
        }

        addPaidUsdInvoiceRevenue(revenueByMonth, rangeStart, rangeEnd);

        List<AdminMetricsTimeSeriesBucket> buckets = new ArrayList<>(BUCKET_COUNT);
        for (YearMonth month : months) {
            Instant monthStart = month.atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();
            Instant monthEnd = month.plusMonths(1).atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();
            long userCount = userRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(monthStart, monthEnd);
            buckets.add(new AdminMetricsTimeSeriesBucket(month.toString(), userCount, revenueByMonth.get(month)));
        }
        return buckets;
    }

    private void addPaidUsdInvoiceRevenue(Map<YearMonth, Long> revenueByMonth, Instant rangeStart, Instant rangeEnd) {
        String startingAfter = null;
        try {
            while (true) {
                InvoiceListParams.Builder params = InvoiceListParams.builder()
                        .setStatus(InvoiceListParams.Status.PAID)
                        .setLimit((long) STRIPE_PAGE_SIZE);
                if (startingAfter != null) {
                    params.setStartingAfter(startingAfter);
                }

                InvoiceCollection page = Invoice.list(
                        params.build(),
                        RequestOptions.builder().setApiKey(stripeSecretKey).build()
                );
                List<Invoice> invoices = page.getData();
                for (Invoice invoice : invoices) {
                    if (!"usd".equalsIgnoreCase(invoice.getCurrency()) || invoice.getAmountPaid() == null
                            || invoice.getStatusTransitions() == null || invoice.getStatusTransitions().getPaidAt() == null) {
                        continue;
                    }
                    Instant paidAt = Instant.ofEpochSecond(invoice.getStatusTransitions().getPaidAt());
                    if (paidAt.isBefore(rangeStart) || !paidAt.isBefore(rangeEnd)) {
                        continue;
                    }
                    YearMonth paidMonth = YearMonth.from(paidAt.atZone(ZoneOffset.UTC));
                    revenueByMonth.computeIfPresent(paidMonth,
                            (month, existing) -> Math.addExact(existing, invoice.getAmountPaid()));
                }

                if (!Boolean.TRUE.equals(page.getHasMore()) || invoices.isEmpty()) {
                    return;
                }
                String lastId = invoices.get(invoices.size() - 1).getId();
                if (lastId == null || lastId.isBlank() || lastId.equals(startingAfter)) {
                    throw stripeUnavailable();
                }
                startingAfter = lastId;
            }
        } catch (StripeException | ArithmeticException ex) {
            log.error("Unable to retrieve Stripe paid invoice metrics", ex);
            throw stripeUnavailable();
        }
    }

    private ApiException stripeUnavailable() {
        return new ApiException("BILLING_STRIPE_ERROR", "A billing service error occurred. Please contact support.");
    }
}
