import { CaretDown, UserCircle, Check } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { createPortal } from "react-dom";

type props = {
  label: string;
  helperText?: string;
  isDisabled?: boolean;
  isError?: boolean;
  placeholder?: string;
  options: string[];
  onSelect?: (index: number) => void;
  selectedIndex?: number;
  clearable?: boolean;
  leftIcon?: React.ReactNode;
  iconType?: "check" | "radio";
};

type DropdownListProps = {
  isOpen: boolean;
  options: string[];
  handleChange: (index: number) => void;
  offset?: DOMRect | null;
  selectedIndex?: number;
  iconType?: "check" | "radio";
};

const DropdownList = ({
  isOpen,
  options,
  handleChange,
  offset,
  selectedIndex,
  iconType,
}: DropdownListProps) => {
  const position = useMemo(() => {
    if (offset) {
      if (offset.bottom + 230 > window.innerHeight) {
        return { bottom: `${offset?.bottom + 4}px` };
      }
      return { top: `${offset?.top + offset?.height + 4}px` };
    }
  }, [offset]);

  if (isOpen) {
    return createPortal(
      <div
        className="dropdown-container absolute border-[1px] overflow-y-auto max-h-[230px] shadow-lg rounded-sm z-10 w-full"
        style={
          offset
            ? {
                ...position,
                left: offset?.left,
                width: offset?.width,
              }
            : {}
        }
      >
        {options.map((option, index) => {
          return (
            <div
              className={`px-2 py-3 text-[15px] hover:bg-gray-100 gap-x-2   cursor-pointer flex justify-between items-center
              {
                ${selectedIndex === index ? "bg-green-100" : "bg-white"}
              `}
              onClick={() => handleChange(index)}
              key={index}
            >
              {iconType === "radio" && (
                <input
                  type="radio"
                  width={24}
                  height={24}
                  className="h-5 w-5 accent-green-600"
                  checked={selectedIndex === index}
                />
              )}

              <div className="flex-1">{option}</div>

              {selectedIndex === index && iconType === "check" && (
                <div className="text-green-500">
                  <Check width={24} height={24} />
                </div>
              )}
            </div>
          );
        })}
      </div>,
      document.body
    );
  }

  return null;
};

const Dropdown = ({
  label,
  helperText,
  isDisabled,
  isError,
  placeholder,
  options,
  onSelect,
  selectedIndex,
  iconType = "check",
  clearable,
  leftIcon = <UserCircle width={24} height={24} />,
}: props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<
    number | undefined
  >();

  const handleChange = (index: number) => {
    setSelectedOptionIndex(index);
    onSelect && onSelect(index);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedIndex !== undefined && options) {
      selectedIndex && setSelectedOptionIndex(selectedIndex);
    } else {
      setSelectedOptionIndex(undefined);
    }
  }, [selectedIndex, options]);

  const [offset, setOffset] = useState<DOMRect | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    className: "dropdown-container",
    handler: () => setIsOpen(false),
  });

  useEffect(() => {
    const handleResize = () => {
      if (dropdownRef.current) {
        setOffset(dropdownRef.current.getBoundingClientRect());
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dropdownRef]);

  return (
    <div className="dropdown-container">
      <div className="flex justify-between">
        <p className="text-[13.5px] font-medium">{label}</p>

        {clearable && selectedOptionIndex !== undefined && (
          <button
            onClick={() => setSelectedOptionIndex(undefined)}
            className="text-[13.5px] text-gray-500"
          >
            clear
          </button>
        )}
      </div>
      <div className="relative my-1" ref={dropdownRef}>
        <button
          onClick={() => {
            if (!isDisabled) {
              setIsOpen(!isOpen);
            }
          }}
          className={`p-[8px] min-w-48 w-[250px] h-[40px] cursor-pointer flex items-center justify-between rounded-lg gap-2 
          hover:border-gray-400 focus:outline-none 
          ${
            isError
              ? "border-red-500 border-[2px]"
              : "border-gray-300 border-[1px]"
          } 
          ${
            isDisabled ? "bg-gray-100 text-gray-400" : "bg-white text-gray-800"
          }`}
        >
          <div>{leftIcon && leftIcon}</div>
          <div className="min-w-32 flex-1 text-[15px text-left text-ellipsis whitespace-nowrap overflow-hidden">
            <span className="text-gray-500">
              {selectedOptionIndex !== undefined
                ? options[selectedOptionIndex]
                : placeholder}
            </span>
          </div>
          <div
            className={`${isOpen && "-rotate-180"} transition-transform duration-300 ease-in-out`}
          >
            <CaretDown width={24} height={24} />
          </div>
        </button>
      </div>
      <p
        className={`text-[12px] text-left ${isError ? "text-red-500" : "text-gray-500"}`}
      >
        {helperText}
      </p>
      <DropdownList
        isOpen={isOpen}
        options={options}
        handleChange={handleChange}
        offset={offset}
        iconType={iconType}
        selectedIndex={selectedOptionIndex}
      />
    </div>
  );
};

export default Dropdown;
