package br.com.borgestirabassi.remotebooks.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

/**
 * Classe de configuração do Spring Security.
 */
@Configuration
@EnableWebSecurity
class MultiHttpSecurityConfig {
    companion object {

        /**
         * Os endpoints públicos
         */
        private val PUBLIC_MATCHERS = arrayOf(
            "/*",
            "/h2-console",
        )

        /**
         * Os endpoints públicos que usam o método POST
         */
        private val PUBLIC_MATCHERS_POST = arrayOf(
            "/category",
        )
    }

    @Autowired
    private lateinit var environment: Environment

    /**
     * Disponibiliza a configuração do Spring Security para o Spring.
     *
     * @param http O objeto HTTP do spring security.
     * @return O objeto HTTP configurado.
     */
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        if (environment.activeProfiles.contains("test")) {
            http.headers().frameOptions().disable()
        }

        http.cors().and().csrf().disable()

        http.authorizeHttpRequests()
            .requestMatchers(* PUBLIC_MATCHERS).permitAll()
            .requestMatchers(HttpMethod.POST, * PUBLIC_MATCHERS_POST).permitAll()
            .requestMatchers(HttpMethod.OPTIONS).permitAll()
            .anyRequest().authenticated()
            .and().httpBasic()

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

        return http.build()
    }

    /**
     * Disponibiliza a configuração do CORS para o Spring.
     *
     * @return O objeto do CORS configurado.
     */
    @Bean
    fun getCorsConfiguration(): CorsConfigurationSource {
        val configuration = CorsConfiguration().applyPermitDefaultValues()
        configuration.allowedMethods = listOf(
            HttpMethod.POST.name(),
            HttpMethod.GET.name(),
            HttpMethod.PUT.name(),
            HttpMethod.DELETE.name(),
            HttpMethod.OPTIONS.name(),
        )

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)

        return source
    }

    /**
     * Disponibiliza a instância do BCrypt para injeção de dependência.
     *
     * @return A instância do BCrypt.
     */
    @Bean
    fun getPasswordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}
