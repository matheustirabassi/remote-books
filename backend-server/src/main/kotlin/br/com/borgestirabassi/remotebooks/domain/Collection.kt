package br.com.borgestirabassi.remotebooks.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table

/**
 * Representa uma coleção de livros.
 *
 * @property id O identificador da categoria.
 * @property name O nome da categoria
 * @property books Os livros que pertencem à coleção.
 */
@Entity
@Table(name = "COLLECTION")
data class Collection(

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(name = "NAME")
    val name: String,

    @OneToMany(mappedBy = "collection")
    var books: List<Book> = ArrayList(),
)
