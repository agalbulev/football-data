import React, {
  Component
} from 'react';
import { MemoryRouter } from "react-router-dom";
import Layout from './components/layout/layout'


class App extends Component {
  render() {
    return (
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    )
  }
}

export default App;
