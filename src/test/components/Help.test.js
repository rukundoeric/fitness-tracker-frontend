import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import Render from '../helpers/Render';
import Help from '../../components/fragments/Help';

const state = {};
describe('Progress :', () => {
  it('Should render Progress component', async () => {
    Render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>, { ...state },
    );
    expect(screen).toMatchSnapshot();
  });
  it('Should should have text', async () => {
    Render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>, { ...state },
    );
    await waitFor(() => screen.getByTestId('help-info'));
    expect(screen.getByTestId('help-info')).toHaveTextContent('If you need help with something, contact the administrator:');
  });
});
