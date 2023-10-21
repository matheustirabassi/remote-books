package br.com.tirabassi.remotebooks.repositories

import br.com.tirabassi.remotebooks.domain.Book
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Dao para o livro.
 */
@Repository
interface BookRepository : JpaRepository<Book, Long>
