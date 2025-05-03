import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

// Desc: Common form component for reusability
function CommonForm({
  formControl = [],
  formData = {},
  setFormData,
  onSubmit,
  submitText,
  isBtnDisabled,
}) {
  const renderInputByType = (getControlItem) => {
    let inputElement = null;
    const value = formData[getControlItem.name] || "";
    if (value !== undefined) {
      getControlItem.value = value;
    }

    switch (getControlItem.componentType) {
      case "input":
        inputElement = (
          <Input
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            name={getControlItem.name}
            id={getControlItem.name}
            className="p-2 border border-gray-300 rounded-md "
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "textarea":
        inputElement = (
          <Textarea
            placeholder={getControlItem.placeholder}
            name={getControlItem.name}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
            className="p-2 border border-gray-300 rounded-md"
          />
        );
        break;
      case "select":
        inputElement = (
          <Select
            className="p-2 border border-gray-300 rounded-md"
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={getControlItem.label || "Select an option"}
              />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.option && getControlItem.option.length > 0
                ? getControlItem.option.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      default:
        inputElement = (
          <Input
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            name={getControlItem.name}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
            className="p-2 border border-gray-300 rounded-md"
          />
        );
    }
    return inputElement;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControl.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputByType(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-4 w-full" disabled={isBtnDisabled}>
        {submitText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
