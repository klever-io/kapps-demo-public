import { useSdk } from '@klever/sdk';
import CopyWrapper from 'components/CopyWrapper';
import Loader from 'components/Loading/Loader';
import { useDidUpdateEffect } from 'hooks';
import { useState } from 'react';
import api from 'services/api';
import { ICollectionResponse } from 'types';
import {
  AccordionContent,
  AccordionTitle,
  CopyIcon,
  Item,
  StyledExpandIcon,
} from './styles';

interface IAccordionProps {
  title: string;
  assetId: string;
  onClick?: () => void;
}

const Accordion: React.FC<IAccordionProps> = ({
  children,
  title,
  assetId,
  onClick,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [assetLoading, setAssetLoading] = useState(false);
  const [items, setItems] = useState<JSX.Element[]>([]);

  const sdk = useSdk();

  useDidUpdateEffect(() => {
    if (isOpen) {
      const getItems = async (assetId: string) => {
        setAssetLoading(true);
        setItems([]);
        const response: ICollectionResponse = await api.get({
          route: `address/${sdk
            .getAccount()
            ?.getAddress()}/collection/${assetId}`,
          query: {
            limit: 400,
          },
        });
        if (response.error) {
          return;
        }

        setAssetLoading(false);

        const auxItems = response.data.collection
          .sort(
            (a, b) =>
              Number(a.assetId.split('/')[1]) - Number(b.assetId.split('/')[1]),
          )
          .map(item => (
            <Item key={String(item.assetId)}>
              #{item.assetId.split('/')[1]}{' '}
              <CopyWrapper
                hoverLabel="Copy NFT ID"
                value={`${item.assetId}`}
                width={10}
              >
                <CopyIcon />
              </CopyWrapper>
            </Item>
          ));

        setItems(auxItems);
      };

      getItems(assetId);
    }
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div {...props}>
      <AccordionTitle onClick={handleClick}>
        {title} <StyledExpandIcon isOpen={isOpen} />
      </AccordionTitle>
      <AccordionContent isOpen={isOpen}>
        {assetLoading && <Loader />}
        {isOpen && items}
      </AccordionContent>
    </div>
  );
};

export default Accordion;
