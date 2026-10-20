package com.websitebuilder.platform.config;

import jakarta.annotation.PostConstruct;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.sql.DataSource;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/** Prevents the E2E profile from connecting to a developer or remote database. */
@Component
@Profile("e2e")
public class E2eDatabaseGuard {
    private static final String ALLOWED_URL =
            "jdbc:postgresql://127.0.0.1:5433/website_builder_e2e";

    private final DataSource dataSource;

    public E2eDatabaseGuard(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @PostConstruct
    void verifyDisposableDatabase() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String configuredUrl = connection.getMetaData().getURL();
            if (!ALLOWED_URL.equals(configuredUrl)) {
                throw new IllegalStateException(
                        "E2E profile requires JDBC URL " + ALLOWED_URL + " with no additional parameters.");
            }

            try (Statement statement = connection.createStatement();
                    ResultSet result = statement.executeQuery(
                            "SELECT inet_server_addr()::text, inet_server_port(), current_database(), current_user")) {
                if (!result.next()) {
                    throw new IllegalStateException("Could not verify the E2E PostgreSQL server identity.");
                }

                String serverAddress = result.getString(1);
                int serverPort = result.getInt(2);
                String database = result.getString(3);
                String username = result.getString(4);
                if (!isLocalOrPrivate(serverAddress)
                        || serverPort != 5432
                        || !"website_builder_e2e".equals(database)
                        || !"website_builder".equals(username)) {
                    throw new IllegalStateException(
                            "E2E profile connected to an unexpected PostgreSQL server, port, database, or user.");
                }
            }
        }
    }

    private boolean isLocalOrPrivate(String address) {
        if (address == null) {
            return false;
        }
        try {
            InetAddress resolvedAddress = InetAddress.getByName(address);
            return resolvedAddress.isLoopbackAddress()
                    || resolvedAddress.isSiteLocalAddress()
                    || resolvedAddress.isLinkLocalAddress();
        } catch (UnknownHostException exception) {
            return false;
        }
    }
}
