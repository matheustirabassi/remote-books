package br.com.borgestirabassi.remotebooks.controllers

import br.com.borgestirabassi.remotebooks.dto.BookDto
import com.fasterxml.jackson.databind.ObjectMapper
import java.util.Date
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.header
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

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
    @DisplayName(
        "Dado que os dados são válidos, quando o livro é inserido, retorna cabeçalho com a localização do" +
                " recurso",
    )
    fun insertBookTest_AllValid_ReturnHeaderWithId() {
        val bookDto = BookDto(
            "Abacate",
            "Abacaxi",
            "http://localhost:8080/imagem.png",
            Date(),
            1L,
        )

        mockMvc.perform(
            post("/book")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        bookDto,
                    ),
                ),
        )
            .andExpect(status().isCreated)
            .andExpect(header().string("Location", "http://localhost/book/1"))
    }

    @Test
    @DisplayName("Dado que o título é vazio, quando é feito a tentativa de salvar, retorna erro de validação")
    fun insertBookTest_TitleIsEmpty_ReturnValidationError() {
        val bookDto = BookDto("", "Abacaxi", "http://localhost:8080/imagem.png", Date(), 1L)

        mockMvc.perform(
            post("/book")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        bookDto,
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
    @DisplayName("Dado que o link da imagem é vazio, quando é feito a tentativa de salvar, retorna erro de validação")
    fun insertBookTest_ImageLinkIsEmpty_ReturnValidationError() {
        val bookDto = BookDto("Abacate", "Sinopse", "", Date(), 1L)

        mockMvc.perform(
            post("/book")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        bookDto,
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
    @DisplayName(
        "Dado que o identificador do autor é nulo, quando é feito a tentativa de salvar, retorna erro de " +
                "validação",
    )
    fun insertBookTest_AuthorIdIsNull_ReturnValidationError() {
        val bookDto = BookDto("Abacate", "Sinopse", "link", Date(), null)

        mockMvc.perform(
            post("/book")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsString(
                        bookDto,
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
}
