import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Render from '../helpers/Render';
import ThingsToMeasure from '../../components/fragments/ThingsToMeasure';

const state = {};

describe('ThingsToMeasure :', () => {
  it('Should render ThingsToMeasure component', async () => {
    Render(
      <BrowserRouter>
        <ThingsToMeasure
          thingsToMeasure={{
            ttResponce: {},
            ttmList: [],
            ttMeasure: {},
            status: 'success',
          }}
          currentUser={{
            id: 1,
            name: 'Admin',
            role: 'admin',
            email: 'admin@gmail.com',
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MTg1MjAzODV9.BJklCRWKvGQ8--L3l-tKDsfv0gbFKk4WDfcuC_v6m9Y',
          }}
          getThingsToMeasure={jest.fn}
        />
      </BrowserRouter>, { ...state },
    );

    expect(screen).toMatchSnapshot();
  });
});
