package br.com.borgestirabassi.remotebooks.controllers

import br.com.borgestirabassi.remotebooks.dto.BookDto
import br.com.borgestirabassi.remotebooks.utils.Strings
import jakarta.validation.Valid
import lombok.extern.log4j.Log4j2
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.net.URI

/**
 * Controlador para endpoint de categorias.
 */
@Log4j2
@RestController
@RequestMapping("/book")
class BookController {

    /**
     * Insere um novo livro no sistema.
     *
     * @return O código de resposta HTTP 201 (CREATED) e o cabeçalho Location contendo a URL para
     * obter o autor criado.
     */
    @PostMapping
    fun insertBook(
        @Valid
        @RequestBody
        bookDto: BookDto,
    ): ResponseEntity<Void> {
        // TODO: Mudar para o Service.
        val uri: URI = ServletUriComponentsBuilder.fromCurrentRequest().path(Strings.PATH_ID)
            .buildAndExpand("123").toUri()

        return ResponseEntity.created(uri).build()
    }
}
