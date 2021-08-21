import React from 'react'
import { Alert } from 'react-bootstrap'

function message({variant, children}) {
    return (
            <Alert variant={variant}>
              {children}
            </Alert>
          )
}

export default message