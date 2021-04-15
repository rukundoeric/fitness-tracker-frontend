import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Render from '../helpers/Render';
import NewThingToMeasure from '../../components/fragments/NewThingToMeasure';

const state = {};

describe('NewThingToMeasure :', () => {
  it('Should render NewThingToMeasure component', async () => {
    Render(
      <BrowserRouter>
        <NewThingToMeasure
          history={{
            push: jest.fn,
          }}
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
          createThingToMeasure={jest.fn}
          ttReset={jest.fn}
        />
      </BrowserRouter>, { ...state },
    );

    expect(screen).toMatchSnapshot();
  });
});
