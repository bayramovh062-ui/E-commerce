import React from 'react'
import { Container } from '@mui/material'

function PageContainer({ children }) {
    return (
        <div><Container maxWidth="lg">{children}</Container></div>
    )
}

export default PageContainer