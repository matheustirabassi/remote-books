package br.com.borgestirabassi.remotebooks.repositories

import br.com.borgestirabassi.remotebooks.domain.Author
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Dao para o autor.
 */
@Repository
interface AuthorRepository : JpaRepository<Author, Long>
