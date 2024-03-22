import { useState } from "react";
import CalendarToday from "./CalendarToday";
import CalendarWeek from "./CalendarWeek";
import { CalendarViewEnum } from "./helpers/CalendarViewEnum";
import CalendarMoth from "./CalendarMoth";

function CalendarContainer() {
  const [calendarView, setCalendarView] = useState<CalendarViewEnum>(
    CalendarViewEnum.DAY
  );

  const renderCalendarView = () => {
    switch (calendarView) {
      case CalendarViewEnum.DAY:
        return <CalendarToday setCalendarView={setCalendarView} />;
      case CalendarViewEnum.WEEK:
        return <CalendarWeek setCalendarView={setCalendarView} />;
      case CalendarViewEnum.MONTH:
        return <CalendarMoth setCalendarView={setCalendarView} />;
    }
  };

  return <div>{renderCalendarView()}</div>;
}

export default CalendarContainer;
