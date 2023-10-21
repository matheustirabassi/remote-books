package br.com.tirabassi.remotebooks

import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import java.util.TimeZone

@SpringBootApplication
class RemoteBooksApplication

/** O fuso horário padrão do servidor */
@Value("\${spring.jpa.properties.hibernate.jdbc.time_zone}")
private lateinit var timeZone: String

fun main(args: Array<String>) {
    runApplication<RemoteBooksApplication>(*args)
}

@PostConstruct
fun started() {
    TimeZone.setDefault(TimeZone.getTimeZone(timeZone))
}
