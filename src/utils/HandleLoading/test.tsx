import { render, screen } from '@testing-library/react'
import HandleLoading from '.'

describe('HandleLoading', () => {
  it('Shows loading spinner when fetching data', () => {
    render(
      <HandleLoading isSuccess={false}>
        <div data-testid="content">Content</div>
      </HandleLoading>
    )

    const altText = screen.queryByAltText('loading icon')
    const content = screen.queryByTestId('content')

    expect(altText).toBeTruthy()
    expect(content).toBeFalsy()
  })

  it('shows content when successful', () => {
    render(
      <HandleLoading isSuccess={true}>
        <div data-testid="content">Content</div>
      </HandleLoading>
    )

    const altText = screen.queryByAltText('loading icon')
    const child = screen.queryByTestId('content')

    expect(altText).toBeFalsy()
    expect(child).toBeTruthy()
  })
})