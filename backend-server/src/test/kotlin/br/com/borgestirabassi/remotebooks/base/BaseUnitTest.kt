package br.com.borgestirabassi.remotebooks.base

import org.junit.jupiter.api.BeforeEach
import org.mockito.MockitoAnnotations

open class BaseUnitTest {
    @BeforeEach
    fun initMocks() {
        MockitoAnnotations.openMocks(this)
    }
}
