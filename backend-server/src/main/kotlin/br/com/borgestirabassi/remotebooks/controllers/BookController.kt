package br.com.borgestirabassi.remotebooks.controllers

import br.com.borgestirabassi.remotebooks.dto.BookDto
import br.com.borgestirabassi.remotebooks.services.BookService
import br.com.borgestirabassi.remotebooks.utils.Strings
import br.com.borgestirabassi.remotebooks.utils.extensions.parseToDate
import jakarta.validation.Valid
import lombok.extern.log4j.Log4j2
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
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
@RequestMapping("/book")
class BookController {

    @Autowired
    private lateinit var bookService: BookService

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
        val uri: URI = ServletUriComponentsBuilder.fromCurrentRequest().path(Strings.PATH_ID)
            .buildAndExpand(bookService.insertBook(bookDto)).toUri()

        return ResponseEntity.created(uri).build()
    }

    /** Retorna todos os livros de forma paginada */
    @GetMapping
    fun findAllBooks(pageable: Pageable): ResponseEntity<Page<BookDto>> {
        val mockBookList = listOf(
            BookDto(
                "Title1",
                "Sinopse1",
                "link1",
                "2023-06-17".parseToDate()!!,
                authorId = 0,
                categoryId = 0,
                collectionId = 0,

                ),
            BookDto(
                "Title2",
                "Sinopse2",
                "link2",
                "2023-06-18".parseToDate()!!,
                authorId = 0,
                categoryId = 0,
                collectionId = 0,

                ),
            BookDto(
                "Title3",
                "Sinopse3",
                "link3",
                "2023-06-19".parseToDate()!!,
                authorId = 0,
                categoryId = 0,
                collectionId = 0,

                ),
        )

        return ResponseEntity.ok(PageImpl(mockBookList))
    }
}
