package br.com.borgestirabassi.remotebooks.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

/**
 * Representa uma categoria de um livro.
 *
 * @property id O identificador da categoria.
 * @property name O nome da categoria
 */
@Entity
@Table(name = "CATEGORY")
data class Category(

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "NAME")
    val name: String,
)
