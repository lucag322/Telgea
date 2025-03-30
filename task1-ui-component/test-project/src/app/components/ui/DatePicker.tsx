"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "./Button";

interface DatePickerProps {
  onSelect: (date: Date | null) => void;
  onBack: () => void;
  onConfirm: (date: Date) => void;
  confirmButtonText?: string;
  backButtonText?: string;
}

export default function DatePicker({
  onSelect,
  onBack,
  onConfirm,
  confirmButtonText = "Request Top-up",
  backButtonText = "Back",
}: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const firstDayOfWeek = firstDayOfMonth.getDay();
  const firstDayIndex = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const daysInPrevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  const days = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = firstDayIndex; i > 0; i--) {
    const prevMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      daysInPrevMonth - i + 1
    );
    days.push({
      day: daysInPrevMonth - i + 1,
      isCurrentMonth: false,
      isPast: prevMonthDate < today,
      date: prevMonthDate,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const currentMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i
    );
    days.push({
      day: i,
      isCurrentMonth: true,
      isPast: currentMonthDate < today,
      date: currentMonthDate,
    });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      i
    );
    days.push({
      day: i,
      isCurrentMonth: false,
      isPast: false,
      date: nextMonthDate,
    });
  }

  const changeMonth = (increment: number) => {
    if (increment < 0) {
      const now = new Date();
      const firstOfCurrentMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );
      const firstOfTargetMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + increment,
        1
      );

      if (firstOfTargetMonth < firstOfCurrentMonth) {
        return;
      }
    }

    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
    setSelectedDate(null);
    onSelect(null);
  };

  const handleDateSelect = (
    day: number,
    isCurrentMonth: boolean,
    isPast: boolean,
    date: Date
  ) => {
    if (!isPast) {
      setSelectedDate(date);
      onSelect(date);
    }
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const isDaySelected = (day: number, date: Date) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear()
    );
  };

  const isCurrentMonthTheCurrentCalendarMonth = () => {
    const now = new Date();
    return (
      currentDate.getMonth() === now.getMonth() &&
      currentDate.getFullYear() === now.getFullYear()
    );
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <div>
        <p className="mb-6">When should the top-up be activated?</p>
        <div>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                isCurrentMonthTheCurrentCalendarMonth() ? "opacity-50" : ""
              }`}
              disabled={isCurrentMonthTheCurrentCalendarMonth()}
            >
              <div className="transform rotate-180">
                <Image
                  src="/Arrow.svg"
                  alt="Previous month"
                  width={18}
                  height={16}
                  priority
                />
              </div>
            </button>
            <span className="font-medium">{formatMonthYear(currentDate)}</span>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Image
                src="/Arrow.svg"
                alt="Next month"
                width={18}
                height={16}
                priority
              />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"].map((day) => (
              <div
                key={day}
                className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}

            {days.map((day, index) => (
              <button
                key={index}
                disabled={day.isPast}
                onClick={() =>
                  handleDateSelect(
                    day.day,
                    day.isCurrentMonth,
                    day.isPast,
                    day.date
                  )
                }
                className={`h-8 w-8 flex items-center justify-center rounded-full text-sm ${
                  isDaySelected(day.day, day.date)
                    ? "bg-[#e0ff4f] font-bold"
                    : day.isCurrentMonth
                    ? day.isPast
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100"
                    : day.isPast
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto py-10">
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="md"
            className="flex-1"
            onClick={onBack}
          >
            {backButtonText}
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            disabled={!selectedDate}
            onClick={() => selectedDate && onConfirm(selectedDate)}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
