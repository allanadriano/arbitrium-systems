import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

import { FilterComponent } from "./FilterComponent";

interface dataProps {
  data: Array<string>
}

export function Table(props: dataProps) {
  const columns = [
    {
      name: "Country",
      selector: "country"
    },
    {
      name: "Region",
      selector: "region"
    }
  ] as Array<object>;

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = props.data.filter(
    (item: any) =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      className="data-table" 
      title="Country List"
      columns={columns}
      data={filteredItems}
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};