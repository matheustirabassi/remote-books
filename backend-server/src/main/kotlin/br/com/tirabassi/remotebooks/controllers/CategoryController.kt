package br.com.tirabassi.remotebooks.controllers

import br.com.tirabassi.remotebooks.dto.CategoryDto
import br.com.tirabassi.remotebooks.services.CategoryService
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
@RequestMapping("/category")
class CategoryController {

    @Autowired
    private lateinit var categoryService: CategoryService

    /**
     * Insere uma nova categoria no sistema.
     *
     * @return O código de resposta HTTP 201 (CREATED) e o cabeçalho Location contendo a URL para
     * obter a categoria criada.
     */
    @PostMapping
    fun insertCategory(
        @Valid
        @RequestBody
        categoryDto: CategoryDto,
    ): ResponseEntity<Void> {
        val uri: URI = ServletUriComponentsBuilder.fromCurrentRequest().path(Strings.PATH_ID)
            .buildAndExpand(categoryService.insertCategory(categoryDto)).toUri()

        return ResponseEntity.created(uri).build()
    }

    @GetMapping
    fun getCategories(): ResponseEntity<List<CategoryDto>> {
        return ResponseEntity.ok(categoryService.getCategories())
    }
}
