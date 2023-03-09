import { Button, Stack, Typography } from "@mui/material"
import { ReactComponent as IconBook } from "assets/images/icons/logo.svg"
import { LanguageConstants } from "enums/Constants"
import { useTranslation } from "react-i18next"
import { Line } from "./Line"

export const Header = () => {
  const { t } = useTranslation()

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button>
          <IconBook />
        </Button>
        <Button>
          <Typography fontSize={40} marginY={3} marginRight={3} fontWeight={"bold"}>
            {t(LanguageConstants.REGISTER)}
          </Typography>
        </Button>
      </Stack>
      <Line />
    </>
  )
}
