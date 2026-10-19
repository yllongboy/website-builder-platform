package com.websitebuilder.platform.auth.controller;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doAnswer;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.websitebuilder.platform.assets.repository.AssetRepository;
import com.websitebuilder.platform.billing.repository.StripeEventRepository;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.categories.repository.CategoryRepository;
import com.websitebuilder.platform.publishing.repository.PublishLogRepository;
import com.websitebuilder.platform.security.jwt.RevokedTokenRepository;
import com.websitebuilder.platform.templates.repository.TemplateRepository;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.entity.UserRole;
import com.websitebuilder.platform.users.entity.UserStatus;
import com.websitebuilder.platform.users.repository.UserRepository;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import com.websitebuilder.platform.websites.repository.WebsiteVersionRepository;
import java.time.Instant;
import java.util.Set;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.MOCK,
        properties = {
                "app.jwt.secret=01234567890123456789012345678901",
                "app.cors.allowed-origins=http://localhost:4200",
                "spring.autoconfigure.exclude="
                        + "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,"
                        + "org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,"
                        + "org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration"
        }
)
@AutoConfigureMockMvc
class JwtRevocationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private WebsiteRepository websiteRepository;

    @MockBean
    private WebsiteVersionRepository websiteVersionRepository;

    @MockBean
    private TemplateRepository templateRepository;

    @MockBean
    private PublishLogRepository publishLogRepository;

    @MockBean
    private CategoryRepository categoryRepository;

    @MockBean
    private SubscriptionRepository subscriptionRepository;

    @MockBean
    private StripeEventRepository stripeEventRepository;

    @MockBean
    private AssetRepository assetRepository;

    @MockBean
    private RevokedTokenRepository revokedTokenRepository;

    @Test
    void revokedToken_cannotAccessProtectedEndpoint() throws Exception {
        Set<String> revokedJtis = java.util.concurrent.ConcurrentHashMap.newKeySet();
        doAnswer(invocation -> {
            revokedJtis.add(invocation.getArgument(0));
            return 1;
        }).when(revokedTokenRepository).revoke(anyString(), any(Instant.class));
        when(revokedTokenRepository.existsByJtiAndExpiresAtAfter(anyString(), any(Instant.class)))
                .thenAnswer(invocation -> revokedJtis.contains(invocation.getArgument(0)));

        UUID userId = UUID.fromString("11111111-1111-1111-1111-111111111111");
        String email = "user@example.com";
        String password = "Password123!";

        UserEntity activeUser = new UserEntity(
                userId,
                email,
                passwordEncoder.encode(password),
                UserRole.USER,
                UserStatus.ACTIVE,
                Instant.now(),
                Instant.now()
        );
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(activeUser));
        when(userRepository.findById(userId)).thenReturn(Optional.of(activeUser));

        MvcResult loginResult = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").isNotEmpty())
                .andReturn();

        JsonNode loginJson = objectMapper.readTree(loginResult.getResponse().getContentAsString());
        String token = loginJson.path("accessToken").asText();

        mockMvc.perform(post("/auth/logout")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());

        mockMvc.perform(get("/auth/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isUnauthorized());
    }
}
