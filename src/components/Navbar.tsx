import styled, { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { changeTheme } from '../redux/ThemeSlice/ThemeSlice';
import { lightTheme, darkTheme } from '../redux/ThemeSlice/Theme';

const Nav = styled.div`
  color: ${(props) => props.theme.primary_font_color};
  background-color: ${(props) => props.theme.primary_background_color};
  a {
    color: ${(props) => props.theme.primary_font_color};
  }
`

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  console.log(theme);

  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <h1>
          <Link to="/">Cocktail Recipes Search</Link>
        </h1>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/search">SEARCH</Link>
          </li>
          <li>
            <Link to="/favorite">FAVORITE</Link>
          </li>
          {theme.mode === 'light' ? (
            <button onClick={() => dispatch(changeTheme(darkTheme))}>Dark mode</button>
          ) : (
            <button onClick={() => dispatch(changeTheme(lightTheme))}>Light mode</button>
          )}
        </ul>
      </Nav>
    </ThemeProvider>
  )
}

export default Navbar