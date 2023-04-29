package br.com.borgestirabassi.remotebooks.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.persistence.Temporal
import jakarta.persistence.TemporalType
import java.util.Date

/**
 * Representa um livro.
 *
 * @property id O identificador.
 * @property title O título.
 * @property sinopse O resumo.
 * @property imageLink O link que representa a imagem do livro.
 * @property registrationDate A data do registro do livro no sistema, representado por um timestamp.
 */
@Entity
@Table(name = "BOOK")
data class Book(

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "TITLE")
    val title: String,

    @Column(name = "SINOPSE", length = 3000)
    val sinopse: String?,

    @Column(name = "IMAGE_LINK", length = 5000)
    val imageLink: String,

    @Column(name = "REGISTRATION_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    val registrationDate: Date,

    @Column(name = "RELEASE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    val releaseDate: Date,
)
