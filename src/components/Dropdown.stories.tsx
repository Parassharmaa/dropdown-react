import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./Dropdown";
import { MagnifyingGlass } from "@phosphor-icons/react";

const meta = {
  title: "Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Label",
    helperText: "Helper text",
    placeholder: "Lorem ipsum",
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
    ],
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    placeholder: "Select an option",
    helperText: "Required",
    isDisabled: false,
    isError: true,
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
    ],
    selectedIndex: undefined,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    placeholder: "Select an option",
    isDisabled: true,
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
    ],
    selectedIndex: undefined,
  },
};

export const RadioButton: Story = {
  args: {
    label: "Label",
    placeholder: "Lorem ipsum",
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
    ],
    selectedIndex: undefined,
    iconType: "radio",
  },
};

export const CheckIcon: Story = {
  args: {
    label: "Label",
    placeholder: "Lorem ipsum",
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
    ],
    selectedIndex: 1,
  },
};

export const Clearable: Story = {
  args: {
    label: "Label",
    placeholder: "Lorem ipsum",
    clearable: true,
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
    ],
    selectedIndex: 1,
  },
};

export const CustomLeftIcon: Story = {
  args: {
    label: "Label",
    placeholder: "Lorem ipsum",
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
    ],
    selectedIndex: 1,
    leftIcon: <MagnifyingGlass width={24} height={24} />,
  },
};
