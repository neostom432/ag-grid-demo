import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sigan, sigan } from "@/utils";
import { StyleCalendarIcon } from "@parte-ds/icons";
import { Box, Headline } from "@parte-ds/ui";
import { ko } from "date-fns/locale";
import { useState } from "react";

type CommonProps = {
  disabled?: boolean;
  isError?: boolean;
  readOnly?: boolean;
  width?: string | number;
};
type AgGridDateProps = CommonProps & {
  value?: Sigan | null;
  onChange?: (value: string) => void;
  usePortal?: boolean;
  minDate?: Sigan;
  maxDate?: Sigan;
};
export default function TableDatePicker(props: AgGridDateProps) {
  const { value, onChange, disabled, isError, readOnly = false, minDate, maxDate } = props;

  const siganValue = sigan(value).toDate() ?? undefined;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Box minWidth={130} width="100%" height="100%" display="flex">
          <Box display="flex" justifyContent="flex-start" width="100%" alignItems="center">
            <StyleCalendarIcon size={12} className="mr-2" />
            {value ? (
              `${sigan(siganValue).format()}`
            ) : (
              <Headline size={200} color="N600">
                날짜 선택
              </Headline>
            )}
          </Box>
        </Box>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ? siganValue : undefined}
          onSelect={(date) => {
            if (!date) return;
            onChange?.(sigan(date).format());
            setIsOpen(false);
          }}
          disabled={(date) => disabled || maxDate?.isBefore(date) || !!minDate?.isAfter(date)}
          initialFocus
          locale={ko}
        />
      </PopoverContent>
    </Popover>
  );
}
