import { useState } from 'react'
import './App.css'
import PageContainer from './containers/PageContainer'
import Header from './components/Header'
import ProductList from './components/ProductList'
import RouteConfig from './config/RouteConfig'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <div>
      <div>
        <PageContainer >
          <BrowserRouter>
            <Header />
            <RouteConfig />
          </BrowserRouter>
        </PageContainer>
      </div>
    </div>
  )
}

export default App
