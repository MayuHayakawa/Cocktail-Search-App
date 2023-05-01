import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { lightTheme } from '../../redux/ThemeSlice/Theme';

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  
`

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.primary_background_color};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 50%;
  }
`

const Home = () => {
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <ImageContainer>
          {theme === lightTheme ? (
            <img 
              src="/images/cocktail_light.jpg" 
              alt="backgroundImage_light" 
            />
          ) : (
            <img 
              src="/images/cocktail_dark.jpg" 
              alt="backgroundImage_dark" 
            />
          )}
        </ImageContainer>
      </Main>
    </ThemeProvider>
  )
}

export default Home