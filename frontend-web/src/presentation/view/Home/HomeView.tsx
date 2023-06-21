import { Grid, Stack } from "@mui/material"
import { BookCard } from "presentation/components/BookCard"

/** A tela principal do site */
export default function HomeView() {
	return (
			<Grid>
				<BookCard imageLink={"https://images-na.ssl-images-amazon.com/images/I/81MooQRogeL._AC_UL210_SR210,210_.jpg"} title={"O que é a vida"} author={"Evwin Schorodinger"} />
				<BookCard imageLink={"https://images-na.ssl-images-amazon.com/images/I/81MooQRogeL._AC_UL210_SR210,210_.jpg"} title={"O que é a vida"} author={"Evwin Schorodinger"} />
				<BookCard imageLink={"https://images-na.ssl-images-amazon.com/images/I/81MooQRogeL._AC_UL210_SR210,210_.jpg"} title={"O que é a vida"} author={"Evwin Schorodinger"} />
				<BookCard imageLink={"https://images-na.ssl-images-amazon.com/images/I/81MooQRogeL._AC_UL210_SR210,210_.jpg"} title={"O que é a vida"} author={"Evwin Schorodinger"} />
			</Grid>
	)
}