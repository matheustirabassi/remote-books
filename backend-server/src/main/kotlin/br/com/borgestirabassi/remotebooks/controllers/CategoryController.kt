package br.com.borgestirabassi.remotebooks.controllers

import lombok.extern.log4j.Log4j2
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.net.URI

/**
 * Controlador para endpoint de categorias.
 */
@Log4j2
@RestController
@RequestMapping("/category")
class CategoryController {

    /**
     * Insere uma nova categoria no sistema.
     *
     * @return O código de resposta HTTP 201 (CREATED) e o cabeçalho Location contendo a URL para
     * obter a categoria criada.
     */
    @PostMapping
    fun insertCategory(): ResponseEntity<Void> {
        // TODO: Adicionar parâmetro e chamar o Service para salvar a categoria.
        val uri: URI = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand("1").toUri()

        return ResponseEntity.created(uri).build()
    }
}
