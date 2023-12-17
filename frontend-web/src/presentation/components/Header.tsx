import { Button, Stack } from "@mui/material"
import { ROUTES } from "Routes"
import { ReactComponent as IconAddBook } from "assets/images/icons/add-book.svg"
import { ReactComponent as IconBook } from "assets/images/icons/logo.svg"
import { Link } from "react-router-dom"
import { Line } from "./Line"

interface HeaderProps {
  /** Flag que indica se está na página de cadastro */
  isRegister?: boolean
}

/**
 * O cabeçalho do site
 * @returns Os elementos do cabeçalho
 */
export const Header: React.FC<HeaderProps> = ({ isRegister = false }) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Link to={ROUTES.HOME}>
          <Button>
            <IconBook />
          </Button>
        </Link>

        {showIfIsRegister()}
      </Stack>

      <Line />
    </>
  )

  function showIfIsRegister() {
    if (isRegister) {
      return
    }

    return (
      <Link to={ROUTES.REGISTER}>
        <Button>
          <IconAddBook />
        </Button>
      </Link>
    )
  }
}
