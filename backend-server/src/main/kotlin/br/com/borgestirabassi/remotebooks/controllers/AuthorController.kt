package br.com.borgestirabassi.remotebooks.controllers

import br.com.borgestirabassi.remotebooks.dto.AuthorDto
import br.com.borgestirabassi.remotebooks.services.AuthorService
import br.com.borgestirabassi.remotebooks.utils.Strings
import jakarta.validation.Valid
import lombok.extern.log4j.Log4j2
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
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
@RequestMapping("/author")
class AuthorController {

    @Autowired
    private lateinit var authorService: AuthorService

    /**
     * Insere um novo autor no sistema.
     *
     * @return O código de resposta HTTP 201 (CREATED) e o cabeçalho Location contendo a URL para
     * obter o autor criado.
     */
    @PostMapping
    fun insertAuthor(
        @Valid
        @RequestBody
        authorDto: AuthorDto,
    ): ResponseEntity<Void> {
        val uri: URI = ServletUriComponentsBuilder.fromCurrentRequest().path(Strings.PATH_ID)
            .buildAndExpand(authorService.insertAuthor(authorDto)).toUri()

        return ResponseEntity.created(uri).build()
    }

    @GetMapping
    fun getAuthors(): ResponseEntity<List<AuthorDto>> {
        return ResponseEntity.ok(authorService.getAuthors())
    }
}
