import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";
const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }
  const currFilter = searchParams.get(filterField) || options.at(0).value;
  return (
    <StyledFilter>
      {options.map((el) => (
        <FilterButton
          onClick={() => handleClick(el.value)}
          key={el.value}
          active={currFilter === el.value}
          disabled={currFilter === el.value}
        >
          {el.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
