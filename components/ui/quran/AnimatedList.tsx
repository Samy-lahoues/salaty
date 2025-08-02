"use client";
import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
  MouseEventHandler,
  UIEvent,
} from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: false });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ y: 30, opacity: 0, scale: 0.95 }}
      animate={
        inView
          ? { y: 0, opacity: 1, scale: 1 }
          : { y: 30, opacity: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="mb-3"
    >
      {children}
    </motion.div>
  );
};

interface AnimatedListProps<T> {
  items?: T[];
  renderItem: (item: T, index: number) => ReactNode;
  onItemSelect?: (item: T, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemsClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  emptyState?: ReactNode;
  maxHeight?: string;
}

const AnimatedList = <T,>({
  items = [],
  renderItem,
  onItemSelect,
  showGradients = false,
  enableArrowNavigation = false,
  className = "",
  itemsClassName = "",
  displayScrollbar = true,
  initialSelectedIndex = -1,
  emptyState = null,
  maxHeight = "400px",
}: AnimatedListProps<T>) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] =
    useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!showGradients) return;

    const { scrollTop, scrollHeight, clientHeight } =
      e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1),
    );
  };

  useEffect(() => {
    if (!enableArrowNavigation || items.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;

    const container = listRef.current;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`,
    ) as HTMLElement | null;

    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;

      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" });
      } else if (
        itemBottom >
        containerScrollTop + containerHeight - extraMargin
      ) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  if (items.length === 0 && emptyState) {
    return <div className={className}>{emptyState}</div>;
  }

  // Custom scrollbar classes based on displayScrollbar and screen size
  const scrollbarClasses = displayScrollbar
    ? "overflow-y-auto smooth-scroll"
    : "overflow-y-auto smooth-scroll scrollbar-hide";

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={listRef}
        className={`${scrollbarClasses} ${itemsClassName}`}
        style={{
          maxHeight,
          scrollBehavior: "smooth",
        }}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={Math.min(index * 0.03, 0.5)}
            index={index}
            onMouseEnter={
              enableArrowNavigation ? () => setSelectedIndex(index) : undefined
            }
            onClick={
              onItemSelect
                ? () => {
                    setSelectedIndex(index);
                    onItemSelect(item, index);
                  }
                : undefined
            }
          >
            {renderItem(item, index)}
          </AnimatedItem>
        ))}
      </div>

      {showGradients && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none transition-opacity duration-300 z-10"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none transition-opacity duration-300 z-10"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedList;
