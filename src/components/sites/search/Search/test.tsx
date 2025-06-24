import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import Search from "."

vi.mock('./components', () => ({
  Header: () => <div data-testid="search-header">Search Header</div>,
  SearchInput: ({ onChange, searchValue }: { onChange: React.ChangeEventHandler<HTMLInputElement>, searchValue: string }) => (
    <input
      data-testid="search-input" 
      type="text"
      value={searchValue}
      onChange={onChange} />
  ),
  ClearBtn: ({ searchValue }: { searchValue: string }) => {
    return searchValue ? <button data-testid="clear-btn" type="button">Clear</button> : null
  }
}))

describe('Search', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => (
    mockOnChange.mockClear()
  ))

  it('Renders all child elements', () => {
    render(
      <Search 
        searchValue={'test value'}
        onSearchChange={mockOnChange} />
    )

    const header = screen.queryByTestId('search-header')
    const searchInput = screen.queryByTestId('search-input')
    const clearBtn = screen.queryByTestId('clear-btn')

    expect(header).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(clearBtn).toBeInTheDocument()
  })

  it('Does not render clear button when no search value', () => {
    render(
      <Search
        searchValue={''}
        onSearchChange={mockOnChange} />
    )

    const clearBtn = screen.queryByTestId('clear-btn')

    expect(clearBtn).not.toBeInTheDocument()
  })
})