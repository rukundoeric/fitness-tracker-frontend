import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Render from '../helpers/Render';
import NewMeasurement from '../../components/fragments/NewMeasurement';

const state = {};

describe('NewMeasurement :', () => {
  it('Should render NewMeasurement component', async () => {
    Render(
      <BrowserRouter>
        <NewMeasurement
          thingsToMeasure={{
            ttResponce: {},
            ttmList: [],
            ttMeasure: {},
            status: 'success',
          }}
          currentUser={{
            id: 4,
            name: 'UZABUMWANA Fiston',
            role: 'user',
            email: 'fiston005@gmail.com',
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE2MTg1MTYwMTh9.Ii7iGqP2wmnkZbUL7-y0AWsS33CIzDLadTilxDus9R4',
          }}
          getThingsToMeasure={jest.fn}
        />
      </BrowserRouter>, { ...state },
    );

    expect(screen).toMatchSnapshot();
  });
});
