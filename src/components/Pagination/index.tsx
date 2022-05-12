import React from 'react';

import { ArrowLeft, ArrowRight } from 'assets/pagination';
import calculate from './paginate';
import { ArrowContainer, Container, ItemContainer } from './styles';

interface IPagination {
  count: number;
  page: number;
  onPaginate(page: number): void;
}

const Pagination: React.FC<IPagination> = ({ count, page, onPaginate }) => {
  count += 1;
  if (count >= 1000) count = 1000;
  const cells = calculate(count, page);

  const prevProps = {
    active: page > 0,
    onClick: () => {
      if (page > 0) {
        onPaginate(page - 1);
      }
    },
  };

  const nextProps = {
    active: page < count - 1,
    onClick: () => {
      if (page < count) {
        onPaginate(page + 1);
      }
    },
  };

  return (
    <Container>
      <ArrowContainer {...prevProps}>
        <img src={ArrowLeft} alt="" />
      </ArrowContainer>

      {cells.map(({ value, ellipsis }) => {
        const props = {
          active: value === page + 1,
          onClick: () => onPaginate(value - 1),
        };

        return (
          <ItemContainer key={String(value)} {...props}>
            <span>{ellipsis ? '...' : value}</span>
          </ItemContainer>
        );
      })}

      <ArrowContainer {...nextProps}>
        <img src={ArrowRight} alt="" />
      </ArrowContainer>
    </Container>
  );
};

export default Pagination;
