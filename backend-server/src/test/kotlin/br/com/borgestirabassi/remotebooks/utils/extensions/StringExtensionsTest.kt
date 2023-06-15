package br.com.borgestirabassi.remotebooks.utils.extensions

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

class StringExtensionsTest {
    @Test
    @DisplayName("Dado que o texto é nulo, retorna uma data nula")
    fun parseToDateTest_StringIsNull_ReturnNullDate() {
        assertNull(null.parseToDate())
    }

    @Test
    @DisplayName("Dado que o texto é vazio, retorna uma data nula")
    fun parseToDateTest_StringDateIsEmpty_ReturnNullDate() {
        assertNull("".parseToDate())
    }

    @Test
    @DisplayName("Dado que o texto é inválido, retorna uma data nula")
    fun parseToDateTest_StringDateIsInvalid_ReturnNullDate() {
        assertNull("Jeremias".parseToDate())
    }

    @Test
    @DisplayName("Dado que o texto é uma data no formato anual, converte para Date")
    fun parseToDateTest_StringDateIsYearFormat_ParseToDate() {
        assertEquals(yearFormatter.parse("2023-26-03"), "2023-26-03".parseToDate())
    }

    @Test
    @DisplayName("Dado que o texto é uma data no formato padrão, converte para Date")
    fun parseToDateTest_StringDateIsStandardFormat_ParseToDate() {
        assertEquals(
            standardDateFormat.parse("2023-26-03 14:51:00"),
            "2023-26-03 14:51:00".parseToDate(),
        )
    }
}
