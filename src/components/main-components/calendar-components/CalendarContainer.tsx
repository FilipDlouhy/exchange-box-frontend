import { useState } from "react";
import CalendarToday from "./CalendarToday";
import CalendarWeek from "./CalendarWeek";
import { CalendarViewEnum } from "./helpers/CalendarViewEnum";
import CalendarMoth from "./CalendarMoth";
import CalendarAddEventForm from "./CalendarAddEventForm";

function CalendarContainer() {
  const [calendarView, setCalendarView] = useState<CalendarViewEnum>(
    CalendarViewEnum.DAY
  );
  const [open, setOpen] = useState(false);

  const renderCalendarView = () => {
    switch (calendarView) {
      case CalendarViewEnum.DAY:
        return (
          <CalendarToday setOpen={setOpen} setCalendarView={setCalendarView} />
        );
      case CalendarViewEnum.WEEK:
        return (
          <CalendarWeek setOpen={setOpen} setCalendarView={setCalendarView} />
        );
      case CalendarViewEnum.MONTH:
        return (
          <CalendarMoth setOpen={setOpen} setCalendarView={setCalendarView} />
        );
    }
  };

  return (
    <div>
      {renderCalendarView()}{" "}
      <CalendarAddEventForm open={open} setOpen={setOpen} />
    </div>
  );
}

export default CalendarContainer;
