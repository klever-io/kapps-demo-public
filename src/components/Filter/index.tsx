import React, { useRef, useState } from 'react';

import { Container, Content, Item, SelectorContainer } from './styles';

import ArrowDown from '../../assets/icons/arrow-down.svg';

export interface IFilterItem {
  name: string;
  value: any;
}

export interface IFilter {
  title: string;
  data: IFilterItem[];
  onClick?(item: IFilterItem): void;
}

const Filter: React.FC<IFilter> = ({ title, data, onClick }) => {
  const noItem: IFilterItem = { name: 'Choose an Asset', value: 'none' };

  const [selected, setSelected] = useState(noItem);
  const [open, setOpen] = useState(true);

  const contentRef = useRef<any>(null);
  const selectorRef = useRef<any>(null);

  const handleDropdown = (behavior?: boolean) => {
    const to = behavior || !open;

    setOpen(to);
  };

  const getDataArray = () => [noItem].concat(data);

  const SelectorItem: React.FC<IFilterItem> = item => {
    const handleClick = () => {
      if (onClick) {
        onClick(item);
      }

      setSelected(item);
      handleDropdown(false);
    };

    return (
      <Item onClick={handleClick} selected={item.name === selected.name}>
        <p>{item.name}</p>
      </Item>
    );
  };

  const contentProps = {
    ref: contentRef,
    open,
    onClick: () => handleDropdown(),
  };

  const selectorProps = {
    ref: selectorRef,
    open,
  };

  return (
    <Container>
      <span>{title}</span>

      <Content {...contentProps}>
        <span>{selected.name}</span>
        <img src={ArrowDown} alt="arrow down" />

        <SelectorContainer {...selectorProps}>
          {getDataArray().map((item, index) => (
            <SelectorItem key={String(index)} {...item} />
          ))}
        </SelectorContainer>
      </Content>
    </Container>
  );
};

export default Filter;
