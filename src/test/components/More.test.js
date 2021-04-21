import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Render from '../helpers/Render';
import More from '../../components/fragments/More';

const state = {};

describe('More :', () => {
  it('Should render More component', async () => {
    Render(
      <BrowserRouter>
        <More
          currentUser={{
            id: 1,
            name: 'Admin',
            role: 'admin',
            email: 'admin@gmail.com',
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MTg1MjAzODV9.BJklCRWKvGQ8--L3l-tKDsfv0gbFKk4WDfcuC_v6m9Y',
          }}
        />
      </BrowserRouter>, { ...state },
    );

    expect(screen).toMatchSnapshot();
  });
});
