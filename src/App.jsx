import { useState } from 'react'
import './App.css'
import PageContainer from './containers/PageContainer'
import Header from './components/Header'

function App() {

  return (
    <div>
      <div>
        <PageContainer >
          <Header />
        </PageContainer>
      </div>
    </div>
  )
}

export default App
