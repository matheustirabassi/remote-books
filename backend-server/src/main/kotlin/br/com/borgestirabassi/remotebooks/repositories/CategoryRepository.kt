package br.com.borgestirabassi.remotebooks.repositories

import br.com.borgestirabassi.remotebooks.domain.Category
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

/**
 * Dao para a categoria.
 */
@Repository
interface CategoryRepository : JpaRepository<Category, Long> {
    fun findByName(name: String): Optional<Category>
}
