import Pagination from '@material-ui/lab/Pagination'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'

const CustomPagination = ({totalPagesNumber = 10, setCurrentPage}) => {
    const theme = createMuiTheme({
        typography: {
            fontFamily: 'Quicksand, sans-serif',
            fontWeightRegular: 500

        },
        palette: {
            primary: {
                light: '#fff',
                main: '#9e4991',
                dark: '#b460a8',
                contrastText: '#fff',
            },
            text: {
                primary: '#e2e8f0',
            },
            action: {
                hover: '#2e3d52'
            }
        }
    })

    const changePage = (event, value) => {
        setCurrentPage(value)
        // window.scrollTo(0, 0)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '60px'}}>
            <ThemeProvider theme={theme}>
                <Pagination
                    onChange={changePage}
                    // because I used 3 variables with each holding 20 movies, 
                    // there are 3 times less total pages number;
                    // so totalPagesNumber / 3 and rounded up
                    count={Math.round(totalPagesNumber / 3)}
                    color='primary'
                    siblingCount={3}
                    size='large'
                />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
