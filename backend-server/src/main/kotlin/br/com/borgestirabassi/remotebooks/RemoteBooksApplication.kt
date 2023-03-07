package br.com.borgestirabassi.remotebooks

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class RemoteBooksApplication

fun main(args: Array<String>) {
	runApplication<RemoteBooksApplication>(*args)
}
