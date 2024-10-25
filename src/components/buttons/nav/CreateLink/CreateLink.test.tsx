import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'

// Components
import CreateLink from './CreateLink'

describe('CreateLink', () => {

  it('Renders correctly', () => {
    render(
      <BrowserRouter>
        <CreateLink
          label={'Create Violation'}
          location={'/create?formType=createViolation'} />
      </BrowserRouter>
    )
    
    const link = screen.getByRole('link')
    const text = screen.getByText('Create Violation')

    expect(link).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('Link navigates to the correct location', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateLink label={'Create Violation'} location={'/create?formType=createViolation'} />} />
          <Route path="/create" element={<div>Create Page</div>} />
        </Routes>
      </BrowserRouter>
    );

    const link = screen.getByRole('link')
    fireEvent.click(link)

    expect(screen.getByText('Create Page')).toBeInTheDocument()
  })
})