import { render } from '@redwoodjs/testing/web'

import MainLayout from './MainLayout'
import {useAuth} from "src/auth";
import {RedwoodApolloProvider} from "@redwoodjs/web/apollo";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

global.URL.createObjectURL = jest.fn();
jest.mock('../../pages/HomePage/HomePage', () => {
  return () => <div/>;
});

describe('MainLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <RedwoodApolloProvider useAuth={useAuth}>
          <MainLayout />
        </RedwoodApolloProvider>)
    }).not.toThrow()
  })
})
