interface FilterComponentProps {
  filterText: string,
  onFilter: any,
  onClear: () => void
}
export function FilterComponent({ filterText, onFilter, onClear }: FilterComponentProps) {
  return (
    <div>
      <input
        id="search"
        type="text"
        className="data-table-input"
        placeholder="Filter table data!"
        value={filterText}
        onChange={onFilter}
      />
      <button className="data-table-button" onClick={onClear}>Clear</button>
    </div>
  )
}
