import React from 'react'
import ReactDOM from 'react-dom/client'
import * as NavBarCompany from './components/Navigation/NavBarCompany'
import './css/main.css'
import './components/Navigation/NavBarCompany'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.Fragment>
    <NavBarCompany.NavBarCompany company={"NYC"} />
  </React.Fragment>
)