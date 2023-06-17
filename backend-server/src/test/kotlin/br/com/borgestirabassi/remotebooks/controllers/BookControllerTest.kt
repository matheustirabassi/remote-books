package br.com.borgestirabassi.remotebooks.controllers

import br.com.borgestirabassi.remotebooks.dto.BookDto
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.header
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.util.Date

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    // region insertBook tests
    @Sql("/scripts/insert-author.sql")
    @Test
    @DisplayName("Dado que os dados são válidos, retorna cabeçalho com a localização do recurso")
    fun insertBookTest_AllValid_ReturnHeaderWithId() {
        mockMvc.perform(
            post("/book")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        BookDto(
                            "Abacate",
                            "Abacaxi",
                            "http://localhost:8080/imagem.png",
                            Date(),
                            1L,
                        ),
                    ),
                ),
        )
            .andExpect(status().isCreated)
            .andExpect(header().string("Location", "http://localhost/book/1"))
    }

    @Test
    @DisplayName("Dado que o título é vazio, retorna erro de validação")
    fun insertBookTest_TitleIsEmpty_ReturnValidationError() {
        mockMvc.perform(
            post("/book")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        BookDto("", "Abacaxi", "http://localhost:8080/imagem.png", Date(), 1L),
                    ),
                ),
        ).andExpect(status().isBadRequest).andExpect(
            content().json(
                "{\"statusCode\":400,\"message\":\"VALIDATION_ERROR\",\"errors\":" +
                        "[{\"fieldName\":\"title\",\"message\":\"BOOK_TITLE_REQUIRED\"}]}",
            ),
        )
    }

    @Test
    @DisplayName("Dado que o link da imagem é vazio, retorna erro de validation")
    fun insertBookTest_ImageLinkIsEmpty_ReturnValidationError() {
        mockMvc.perform(
            post("/book")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        BookDto("Abacate", "Sinopse", "", Date(), 1L),
                    ),
                ),
        ).andExpect(status().isBadRequest).andExpect(
            content().json(
                "{\"statusCode\":400,\"message\":\"VALIDATION_ERROR\"," +
                        "\"errors\":[{\"fieldName\":\"imageLink\",\"message\":" +
                        "\"IMAGE_LINK_REQUIRED\"}]}",
            ),
        )
    }

    @Test
    @DisplayName("Dado que o identificador do autor é nulo, retorna erro de validation")
    fun insertBookTest_AuthorIdIsNull_ReturnValidationError() {
        mockMvc.perform(
            post("/book")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        BookDto("Abacate", "Sinopse", "link", Date(), 0L),
                    ),
                ),
        ).andExpect(status().isBadRequest).andExpect(
            content().json(
                "{\"statusCode\":400,\"message\":\"VALIDATION_ERROR\"," +
                        "\"errors\":[{\"fieldName\":\"authorId\",\"message\":" +
                        "\"AUTHOR_ID_REQUIRED\"}]}",
            ),
        )
    }

    // endregion

    // region findAllBooks tests

    @Test
    @DisplayName("Dado que foi buscado todos os livros, retorna todos os livros")
    fun findAllBooksTest_AllBooksSearched_ReturnAllBooks() {
        mockMvc.perform(
            get("/book")
                .contentType(MediaType.APPLICATION_JSON),
        ).andExpect(status().isOk).andExpect(
            content().json(
                "{\"content\":" +
                        "[{\"title\":\"Title1\",\"sinopse\":\"Sinopse1\"," +
                        "\"imageLink\":\"link1\"," +
                        "\"releaseDate\":\"2023-06-17T03:00:00.000+00:00\"," +
                        "\"authorId\":0,\"categoryId\":0,\"collectionId\":0}," +
                        "{\"title\":\"Title2\",\"sinopse\":\"Sinopse2\"," +
                        "\"imageLink\":\"link2\"," +
                        "\"releaseDate\":\"2023-06-18T03:00:00.000+00:00\"," +
                        "\"authorId\":0,\"categoryId\":0,\"collectionId\":0}," +
                        "{\"title\":\"Title3\",\"sinopse\":\"Sinopse3\"," +
                        "\"imageLink\":\"link3\"," +
                        "\"releaseDate\":\"2023-06-19T03:00:00.000+00:00\"," +
                        "\"authorId\":0,\"categoryId\":0,\"collectionId\":0}]," +
                        "\"pageable\":\"INSTANCE\",\"last\":true,\"totalPages\":1," +
                        "\"totalElements\":3,\"size\":3,\"number\":0,\"sort\":{\"empty\":true," +
                        "\"unsorted\":true,\"sorted\":false},\"first\":true," +
                        "\"numberOfElements\":3,\"empty\":false}",
            ),
        )
    }

    // endregion
}
