package br.com.tirabassi.remotebooks.base

import jakarta.transaction.Transactional
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@Transactional
@ExtendWith(SpringExtension::class)
@SpringBootTest
@AutoConfigureMockMvc
class BaseIntegrationTest
