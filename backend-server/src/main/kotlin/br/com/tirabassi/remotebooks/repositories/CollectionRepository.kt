package br.com.tirabassi.remotebooks.repositories

import br.com.tirabassi.remotebooks.domain.Collection
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

/**
 * Dao para a coleção.
 */
@Repository
interface CollectionRepository : JpaRepository<Collection, Long> {
    fun findByName(name: String): Optional<Collection>
}
