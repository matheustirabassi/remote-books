package br.com.tirabassi.remotebooks

import jakarta.annotation.PostConstruct
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import java.util.TimeZone

@SpringBootApplication
class RemoteBooksApplication

fun main(args: Array<String>) {
	runApplication<RemoteBooksApplication>(*args)
}

@PostConstruct
fun started() {
	TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"))
}
