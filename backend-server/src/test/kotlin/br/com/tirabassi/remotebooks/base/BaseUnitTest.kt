package br.com.tirabassi.remotebooks.base

import org.junit.jupiter.api.BeforeEach
import org.mockito.MockitoAnnotations.openMocks

open class BaseUnitTest {
    @BeforeEach
    fun initMocks() {
        openMocks(this)
    }
}
