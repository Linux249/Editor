import React, { Component } from 'react';
import Editor from '../container/Editor'
import styled from 'styled-components'

const Center = styled.div`
    display: flex;
    justify-content: center;
    
    margin-top: 5rem;
`

class App extends Component {
  render() {
    return (
      <Center>
        <Editor/>
      </Center>
    );
  }
}

export default App;
