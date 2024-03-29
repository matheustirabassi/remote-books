package br.com.tirabassi.remotebooks.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import java.util.Date

/**
 * Representa uma coleção de livros.
 *
 * @property id O identificador da categoria.
 * @property name O nome da categoria
 * @property dateOfBirth A data de nascimento.
 * @property books Os livros do autor.
 */
@Entity
@Table(name = "AUTHOR")
data class Author(

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(name = "NAME")
    val name: String,

    @Column(name = "DATE_OF_BIRTH")
    val dateOfBirth: Date,

    @OneToMany(mappedBy = "author")
    var books: List<Book> = ArrayList()
) {
    override fun toString(): String {
        return "Author [id=$id, name=$name, dateOfBirth=$dateOfBirth]"
    }
}
