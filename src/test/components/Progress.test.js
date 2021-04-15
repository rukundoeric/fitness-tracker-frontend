import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Render from '../helpers/Render';
import Progress from '../../components/fragments/Help';

const state = {};

describe('Progress :', () => {
  it('Should render Progress component', async () => {
    Render(
      <BrowserRouter>
        <Progress
          history={{
            length: 50,
            action: 'PUSH',
            location: {},
            push: jest.fn,
          }}
          location={{
            pathname: '/progress',
            search: '',
            hash: '',
            key: '5o4p4q',
          }}
          match={{
            path: '/progress',
            url: '/progress',
            isExact: true,
            params: '{}',
          }}
          progress={{
            rReport: {},
            sReport: [],
            status: 'success',
          }}
          currentUser={{
            id: 4,
            name: 'UZABUMWANA Fiston',
            role: 'user',
            email: 'fiston005@gmail.com',
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE2MTg1MTYwMTh9.Ii7iGqP2wmnkZbUL7-y0AWsS33CIzDLadTilxDus9R4',
          }}
        />
      </BrowserRouter>, { ...state },
    );

    expect(screen).toMatchSnapshot();
  });
});
