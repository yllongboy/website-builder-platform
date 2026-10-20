package com.websitebuilder.platform.config;

import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.EnumerablePropertySource;
import org.springframework.core.env.PropertySource;

/** Rejects unsafe E2E datasource overrides before Spring initializes Flyway or a DataSource. */
public class E2eDataSourceUrlEnvironmentPostProcessor implements EnvironmentPostProcessor, Ordered {
    private static final String ALLOWED_URL =
            "jdbc:postgresql://127.0.0.1:5433/website_builder_e2e";
    private static final List<String> FORBIDDEN_DATASOURCE_PROPERTIES = List.of(
            "spring.datasource.hikari.jdbc-url",
            "spring.datasource.hikari.data-source-class-name",
            "spring.datasource.hikari.data-source-properties",
            "spring.datasource.jndi-name",
            "spring.datasource.type",
            "spring.datasource.driver-class-name",
            "spring.datasource.tomcat.url",
            "spring.datasource.tomcat.data-source",
            "spring.datasource.dbcp2.url",
            "spring.datasource.dbcp2.data-source",
            "spring.datasource.oracleucp.connection-factory-class-name",
            "spring.datasource.xa.data-source-class-name");
    private static final List<String> ALLOWED_FLYWAY_PROPERTIES =
            List.of("spring.flyway.enabled", "spring.flyway.locations");
    private static final String ALLOWED_FLYWAY_LOCATIONS = "classpath:db/migration,classpath:db/e2e-migration";

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        boolean e2eProfile = false;
        for (String profile : environment.getActiveProfiles()) {
            if ("e2e".equals(profile)) {
                e2eProfile = true;
                break;
            }
        }

        if (e2eProfile) {
            String configuredUrl = environment.getProperty("spring.datasource.url");
            if (!ALLOWED_URL.equals(configuredUrl)) {
                throw new IllegalStateException(
                        "E2E profile requires spring.datasource.url=" + ALLOWED_URL
                                + " with no additional parameters; refusing to start.");
            }

            for (PropertySource<?> source : environment.getPropertySources()) {
                if (source instanceof EnumerablePropertySource<?> enumerable) {
                    for (String name : enumerable.getPropertyNames()) {
                        String normalizedName = normalizePropertyName(name);
                        if (normalizedName.startsWith("spring.datasource.")
                                && !List.of("spring.datasource.url", "spring.datasource.username",
                                        "spring.datasource.password").contains(normalizedName)) {
                            throw new IllegalStateException(
                                    "E2E profile does not allow datasource override " + name + "; refusing to start.");
                        }
                        if (normalizedName.startsWith("spring.flyway.")
                                && !ALLOWED_FLYWAY_PROPERTIES.contains(normalizedName)) {
                            throw new IllegalStateException(
                                    "E2E profile does not allow Flyway override " + name + "; refusing to start.");
                        }
                    }
                }
            }

            for (String property : FORBIDDEN_DATASOURCE_PROPERTIES) {
                if (environment.containsProperty(property)) {
                    throw new IllegalStateException(
                            "E2E profile does not allow datasource override " + property + "; refusing to start.");
                }
            }
            for (String property : List.of("spring.flyway.url", "spring.flyway.user",
                    "spring.flyway.password", "spring.flyway.driver-class-name", "spring.flyway.data-source")) {
                if (environment.containsProperty(property)) {
                    throw new IllegalStateException(
                            "E2E profile does not allow Flyway datasource override " + property + "; refusing to start.");
                }
            }
            String flywayLocations = environment.getProperty("spring.flyway.locations");
            if (!ALLOWED_FLYWAY_LOCATIONS.equals(flywayLocations)) {
                throw new IllegalStateException(
                        "E2E profile requires spring.flyway.locations=" + ALLOWED_FLYWAY_LOCATIONS
                                + "; refusing to start.");
            }
        }
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }

    private String normalizePropertyName(String propertyName) {
        if (propertyName.startsWith("SPRING_DATASOURCE_") || propertyName.startsWith("SPRING_FLYWAY_")) {
            return propertyName.toLowerCase().replace('_', '.');
        }
        return propertyName;
    }
}
