import React, { useState } from 'react';

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateClick = (day) => {
    const selectedMonth = currentDate.getMonth();
    const selectedYear = currentDate.getFullYear();
    const selectedDate = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(selectedDate);
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = prevDate.getMonth() - 1;
      const prevYear = prevDate.getFullYear();
      return new Date(prevYear, prevMonth);
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 1;
      const nextYear = prevDate.getFullYear();
      return new Date(nextYear, nextMonth);
    });
  };

  const renderCalendar = () => {
    // Obtenir le mois et l'année actuels
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Obtenir le premier jour du mois
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDayOfMonth.getDay();

    // Obtenir le nombre de jours dans le mois
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Générer les jours du calendrier
    const calendarDays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = day === currentDate.getDate();
      const isSelectedDay = selectedDate && day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear();

      calendarDays.push(
        <div
          key={day}
          className={`calendar-day ${isCurrentDay ? 'current-day' : ''} ${
            isSelectedDay ? 'selected-day' : ''
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="prev-month" onClick={handlePrevMonth}>
          &lt;
        </button>
        <div className="current-month-year">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </div>
        <button className="next-month" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <div className="calendar">{renderCalendar()}</div>
    </div>
  );
};

export default CustomCalendar;



