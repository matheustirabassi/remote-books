import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { Theme } from "@emotion/react"
import { Box, SxProps, Typography } from "@mui/material"
import { PickerChangeHandler } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue"
import { DateValidationError } from "@mui/x-date-pickers"

/** As propriedades do componente */
interface BasicDatePickerProps {
  /** O label do date picker */
  label: string

  /** O valor da data */
  value?: Date

  onChange?: PickerChangeHandler<any, DateValidationError> | undefined

  /** O estilo para o componente */
  sx?: SxProps<Theme>

  helperText?: string
}

export const BasicDatePicker: React.FC<BasicDatePickerProps> = ({
  label,
  sx,
  value,
  onChange,
  helperText,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={["DatePicker"]}>
        <Box>
          <DatePicker label={label} sx={sx} value={value} onChange={onChange} />
          <Typography fontSize={"caption"} color={"error"} marginLeft={1.75} marginTop={0.375}>
            {helperText}
          </Typography>
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  )
}
