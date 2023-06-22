import { Theme } from "@emotion/react"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  SxProps,
  Typography
} from "@mui/material"
import { ROUTES } from "Routes"
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
  sx = { background: "none", textAlign: "start", maxWidth: 180},
}) => {
  const maxCardTextLength = 15

  return (
    <Card sx={sx}>
      <CardActionArea >
        <Link to={ROUTES.REGISTER}>
          <CardMedia component="img" image={imageLink}/>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {title.limitChars(maxCardTextLength)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {author.limitChars(maxCardTextLength)}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  )
}
