package br.com.tirabassi.remotebooks.repositories

import br.com.tirabassi.remotebooks.domain.Author
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Dao para o autor.
 */
@Repository
interface AuthorRepository : JpaRepository<Author, Long>
