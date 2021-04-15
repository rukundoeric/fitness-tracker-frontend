import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Render from '../helpers/Render';
import Measurements from '../../components/fragments/Measurements';

const state = {};

describe('Measurements :', () => {
  it('Should render Measurements component', async () => {
    Render(
      <BrowserRouter>
        <Measurements
          currentUser={{
            id: 4,
            name: 'UZABUMWANA Fiston',
            role: 'user',
            email: 'fiston005@gmail.com',
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE2MTg1MTYwMTh9.Ii7iGqP2wmnkZbUL7-y0AWsS33CIzDLadTilxDus9R4',
          }}
          measurements={{
            cmResponse: '{}',
            mList: {},
            status: 'success',
          }}
          match={{
            path: '/measurements',
            url: '/measurements',
            isExact: true,
            params: '{}',
          }}
          location={{
            pathname: '/measurements',
          }}
          history={{
            length: 50,
            action: 'PUSH',
            location: {},
            push: jest.fn,
            goBack: jest.fn,
          }}
        />
      </BrowserRouter>, { ...state },
    );

    expect(screen).toMatchSnapshot();
  });
});
