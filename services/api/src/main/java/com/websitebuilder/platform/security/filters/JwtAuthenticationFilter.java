package com.websitebuilder.platform.security.filters;

import com.websitebuilder.platform.security.jwt.JwtService;
import com.websitebuilder.platform.security.jwt.TokenBlocklistService;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.entity.UserStatus;
import com.websitebuilder.platform.users.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final TokenBlocklistService tokenBlocklistService;
	private final UserRepository userRepository;

	public JwtAuthenticationFilter(
			JwtService jwtService,
			TokenBlocklistService tokenBlocklistService,
			UserRepository userRepository
	) {
		this.jwtService = jwtService;
		this.tokenBlocklistService = tokenBlocklistService;
		this.userRepository = userRepository;
	}

	@Override
	protected void doFilterInternal(
			HttpServletRequest request,
			HttpServletResponse response,
			FilterChain filterChain
	) throws ServletException, IOException {
		String authHeader = request.getHeader("Authorization");
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = authHeader.substring(7);
		if (!jwtService.validateToken(token)) {
			filterChain.doFilter(request, response);
			return;
		}

		String jti = jwtService.extractJti(token);
		if (jti == null || tokenBlocklistService.isRevoked(jti)) {
			filterChain.doFilter(request, response);
			return;
		}

		UUID userId = jwtService.extractUserId(token);
		Optional<UserEntity> userOpt = userRepository.findById(userId);
		if (userOpt.isEmpty() || userOpt.get().status() != UserStatus.ACTIVE) {
			filterChain.doFilter(request, response);
			return;
		}

		String role = jwtService.extractRole(token);
		List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));
		UsernamePasswordAuthenticationToken authToken =
				new UsernamePasswordAuthenticationToken(userOpt.get(), null, authorities);
		authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		SecurityContextHolder.getContext().setAuthentication(authToken);

		filterChain.doFilter(request, response);
	}
}
