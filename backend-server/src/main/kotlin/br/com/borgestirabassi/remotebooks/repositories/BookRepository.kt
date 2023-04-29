package br.com.borgestirabassi.remotebooks.repositories

import br.com.borgestirabassi.remotebooks.domain.Book
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Dao para o livro.
 */
@Repository
interface BookRepository : JpaRepository<Book, Long>
