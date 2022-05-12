import Loader from 'components/Loading/Loader';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import ReactSelect, { components } from 'react-select';
import { Container, LoaderContainer } from './styles';

export interface ISelectItem {
  label: string;
  value: any;
}

export enum Sizes {
  Small = 'small',
  Medium = 'medium',
}

export interface IFilter {
  title?: string;
  data: ISelectItem[];
  disabled?: boolean;
  placeholder?: string;
  size?: Sizes;
  loading?: boolean;
  onClick?(item: ISelectItem): void;
  onChange?(e: any): void | Promise<void>;
}

const Select: React.FC<IFilter> = ({
  data,
  title,
  size = Sizes.Medium,
  disabled,
  placeholder,
  loading,
  onClick,
  onChange,
}) => {
  const Placeholder = (props: any) => {
    return <components.Placeholder {...props} />;
  };
  const CaretDownIcon = () => {
    return <IoIosArrowDown />;
  };
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };
  return (
    <Container size={size}>
      {title && <span>{title}</span>}
      {!loading && (
        <ReactSelect
          classNamePrefix="react-select"
          placeholder={placeholder ? placeholder : 'Select a trigger type'}
          components={{ Placeholder, DropdownIndicator }}
          options={data}
          onChange={onChange}
          isDisabled={disabled}
        />
      )}

      {loading && (
        <LoaderContainer>
          <Loader inline />
        </LoaderContainer>
      )}
    </Container>
  );
};

export default Select;
