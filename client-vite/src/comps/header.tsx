import { FC } from "react"
import { HeaderProps } from "../utils/types"
import { Grid, Typography } from "@mui/material"
import { booksstyle } from "../styles/books.styles"

const Header: FC<HeaderProps> = ({ title }) => {

    return (
        <>
            <Grid container spacing={3} alignItems="center" sx={{margin:2}}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5">{title}</Typography>
                </Grid>
            </Grid>
        </>
    )
}
export default Header