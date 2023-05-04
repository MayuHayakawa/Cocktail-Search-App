import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { lightTheme } from '../../redux/ThemeSlice/Theme';
import { Link } from 'react-router-dom';
import { motion as m } from 'framer-motion'

const Main = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.primary_background_color};
    div {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 50%;
    }
    }
`

const ButtonContainer = styled.div`
  width: 20rem;
  height: 5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  button {
    width: 100%;
    height: 100%;
    font-size: 2.5rem;
    color: ${(props) => props.theme.secondary_background_color};
    background-color: ${(props) => props.theme.primary_font_color};
    border: solid 2px ${(props) => props.theme.secondary_background_color};
    cursor: pointer;
  }
`

const Home: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <ImageContainer>
          <m.div
            initial={{opacity: 0}} 
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
          >
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
          </m.div>
        </ImageContainer>
        <ButtonContainer>
          <Link to="search">
            <m.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Get Started
            </m.button>
          </Link>
        </ButtonContainer>
      </Main>
    </ThemeProvider>
  )
}

export default Home