import { Button, Stack, Typography } from "@mui/material"
import { ReactComponent as IconBook } from "assets/images/icons/logo.svg"
import { LanguageConstants } from "enums/Constants"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { ROUTES } from "Routes"
import { Line } from "./Line"

/**
 * O cabeçalho do site
 * @returns Os elementos do cabeçalho
 */
export const Header = () => {
  const { t } = useTranslation()

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems="center">
        <Link to={ROUTES.HOME}>
          <Button>
            <IconBook />
          </Button>
        </Link>

        <Link
          to={ROUTES.REGISTER}
        >
          <Button fullWidth style={{ minHeight:"150px"}}>
            <Typography fontSize={40} marginRight={3} fontWeight={"bold"}>
              {t(LanguageConstants.REGISTER)}
            </Typography>
          </Button>
        </Link>
      </Stack>

      <Line />
    </>
  )
}
