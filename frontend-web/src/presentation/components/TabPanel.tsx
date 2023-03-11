import { Box, Typography } from "@mui/material"

/** As propriedades do painel */
export interface TabPanelProps {
  /** O index da guia */
  index: Number

  /** O valor da guia */
  value: Number

  /** A direção */
  dir?: string

  /** O componente filho */
  children?: React.ReactNode
}

/**
 * O componente para uma um painel de uma guia.
 *
 * @param params Os parâmetros que podem ser recebidos em uma guia.
 * @returns A
 */
export const TabPanel = ({ index, value, dir, children }: TabPanelProps) => {
  return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        dir={dir}
      >
        {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
      </Typography>
  )
}
