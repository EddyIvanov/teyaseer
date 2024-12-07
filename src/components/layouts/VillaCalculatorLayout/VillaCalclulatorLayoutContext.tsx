import React, { createContext, ReactNode, useContext } from 'react';

interface CarouselContextType {
  selectedIndex: number;
  handleScroll: (index: number) => void;
}

const CarouselContext = createContext<CarouselContextType>({
  selectedIndex: 0,
  handleScroll: () => {},
});

export const useCarouselContext = () => useContext(CarouselContext);

type TProps = {
  children: ReactNode;
  selectedIndex: number;
  handleScroll: (index: number) => void;
};

export const CarouselProvider = ({
  children,
  selectedIndex,
  handleScroll,
}: TProps) => {
  return (
    <CarouselContext.Provider value={{ selectedIndex, handleScroll }}>
      {children}
    </CarouselContext.Provider>
  );
};
