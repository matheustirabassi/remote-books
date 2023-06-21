import { Theme } from "@emotion/react"
import { Card, CardActionArea, CardContent, CardMedia, SxProps, Typography } from "@mui/material"
import Routes, { ROUTES } from "Routes"
import { Link } from "react-router-dom"

/** As propriedades do componente */
interface BookCardProps {
  /** O link para a imagem */
  imageLink: string

  /** O título do livro */
  title: string

  /** O autor do livro */
  author: string

  /** O estilo para o componente */
  sx?: SxProps<Theme>
}

export const BookCard: React.FC<BookCardProps> = ({
  imageLink,
  title,
  author,
  sx = { maxWidth: 180 },
}) => {
  return (
    <Link to={ROUTES.REGISTER}>
      <Card sx={sx}>
        <CardActionArea>
          <CardMedia component="img" image={imageLink} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {author}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
