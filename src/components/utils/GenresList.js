import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const GenresList = ({allGenres, setAllGenres, selectedGenres, setSelectedGenres, setCurrentPage}) => {
    const theme = createMuiTheme({
        overrides: {
            MuiChip: {
                deleteIconColorPrimary: {
                    width: '18px',
                },
                deleteIconColorSecondary: {
                    width: '18px',
                },
            },
        },
        typography: {
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 16
        },
        palette: {
            primary: {
                light: '#fff',
                main: '#1c212a',
                dark: '#2e3d52',
                contrastText: '#fff',
            },
            secondary: {
                light: '#fff',
                main: '#b460a8',
                dark: '#2e3d52',
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

    const addGenre = (addedGenre) => {
        setSelectedGenres([...selectedGenres, addedGenre])
        setAllGenres(allGenres.filter((genre) => genre.id !== addedGenre.id))
        setCurrentPage(1)
    }

    const removeGenre = (removedGenre) => {
        setAllGenres([...allGenres, removedGenre])
        // 28 (Action)
        // 28 !== 28 -> EMPTY ARRAY

        // 28 (Action) !== 16, 12 (Adventure) !== 16, 16 (Animation) !== 16
        // 28 (Action) !== 12, 12 (Adventure) !== 12
        // 28 (Action) !== 28 -> empty selectedGenres array
        setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre.id !== removedGenre.id))
        setCurrentPage(1)
    }

    return (
        <div style={{marginBottom: '40px'}}>
            <ThemeProvider theme={theme}>

                {selectedGenres.map((genre) => (
                    <Chip
                        key={genre.id}
                        label={genre.name}
                        style={{marginBottom: '8px', marginRight: '8px', padding: '5px'}}
                        color='secondary'
                        clickable
                        onDelete={() => removeGenre(genre)}
                    />
                ))}

                {/* always order genres alphabetically */}
                {allGenres.sort((a, b) => a.name.localeCompare(b.name)).map((genre) => (
                    <Chip
                        key={genre.id}
                        label={genre.name}
                        style={{marginBottom: '8px', marginRight: '8px', padding: '5px'}}
                        color='primary'
                        clickable
                        onClick={() => addGenre(genre)}
                    />
                ))}


            </ThemeProvider>
        </div>
    )
}

export default GenresList
