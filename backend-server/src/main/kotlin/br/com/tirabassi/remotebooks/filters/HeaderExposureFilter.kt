package br.com.tirabassi.remotebooks.filters

import jakarta.servlet.Filter
import jakarta.servlet.FilterChain
import jakarta.servlet.FilterConfig
import jakarta.servlet.ServletException
import jakarta.servlet.ServletRequest
import jakarta.servlet.ServletResponse
import jakarta.servlet.http.HttpServletResponse
import org.springframework.stereotype.Component
import java.io.IOException

@Component
class HeaderExposureFilter : Filter {
    @Throws(ServletException::class)
    override fun init(filterConfig: FilterConfig?) {
    }

    @Throws(IOException::class, ServletException::class)
    override fun doFilter(request: ServletRequest?, response: ServletResponse, chain: FilterChain) {
        val res = response as HttpServletResponse

        res.addHeader("Access-Control-Expose-Headers", "Location")

        chain.doFilter(request, response)
    }

    override fun destroy() {}
}
