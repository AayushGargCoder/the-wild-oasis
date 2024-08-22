import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currSortBy = searchParam.get("sortBy") || "";

  function handleChange(e) {
    searchParam.set("sortBy", e.target.value);
    setSearchParam(searchParam);
  }
  return (
    <Select
      options={options}
      type="white"
      value={currSortBy}
      onChange={handleChange}
    />
  );
}
