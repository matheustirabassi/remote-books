package br.com.borgestirabassi.remotebooks.utils.extensions

import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.Date

private val yearFormatter = SimpleDateFormat("yyyy-MM-dd")
private const val YEAR_FORMAT_LENGTH = 10

private val standardDateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:SS")
private const val STANDARD_DATE_FORMAT_LENGTH = 19

/**
 * Converte uma String para Date
 */
fun String?.parseToDate(): Date? {
    if (this.isNullOrBlank()) {
        return null
    }

    if (YEAR_FORMAT_LENGTH == this.length) {
        return formatWithYearFormat()
    }

    if (STANDARD_DATE_FORMAT_LENGTH == this.length) {
        return formatWithStandardFormat()
    }

    return null
}

private fun String?.formatWithYearFormat(): Date? {
    return try {
        yearFormatter.parse(this)
    } catch (exception: ParseException) {
        null
    }
}

private fun String?.formatWithStandardFormat(): Date? {
    return try {
        standardDateFormat.parse(this)
    } catch (exception: ParseException) {
        null
    }
}
