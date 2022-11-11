import React from 'react';
import PokemonInfo from '../../common/components/PokemonInfo';
import { ResultItem } from './SearchResultItem.styled';
import Form from '../../common/constants/Form';

// types
import { Types } from '../../common/types';

interface SearchResultItemProps {
  listItem: {
    name: string;
    types: Types;
    form: Form;
  };
  onClick: (name: string, form: Form) => void;
}

export default function SearchResultItem({
  listItem: { name, types, form },
  onClick,
}: SearchResultItemProps) {
  return (
    <ResultItem onClick={() => onClick(name, form)}>
      <PokemonInfo
        name={name}
        types={types}
        form={form}
        titleColor="white"
      />
    </ResultItem>
  );
}
