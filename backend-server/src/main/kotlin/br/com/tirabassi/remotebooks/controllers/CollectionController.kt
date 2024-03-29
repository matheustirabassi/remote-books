package br.com.tirabassi.remotebooks.controllers

import br.com.tirabassi.remotebooks.dto.CollectionDto
import br.com.tirabassi.remotebooks.services.CollectionService
import br.com.tirabassi.remotebooks.utils.Strings
import jakarta.validation.Valid
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
@RestController
@RequestMapping("/collection")
class CollectionController {

    @Autowired
    private lateinit var collectionService: CollectionService

    /**
     * Insere uma nova coleção no sistema.
     *
     * @return O código de resposta HTTP 201 (CREATED) e o cabeçalho Location contendo a URL para
     * obter a coleção criada.
     */
    @PostMapping
    fun insertCollection(
        @Valid
        @RequestBody
        collectionDto: CollectionDto
    ): ResponseEntity<Unit> {
        val uri: URI = ServletUriComponentsBuilder.fromCurrentRequest().path(Strings.PATH_ID)
            .buildAndExpand(collectionService.insertCollection(collectionDto)).toUri()

        return ResponseEntity.created(uri).build()
    }

    @GetMapping
    fun getCollections(): ResponseEntity<List<CollectionDto>> {
        return ResponseEntity.ok(collectionService.getCollections())
    }
}
