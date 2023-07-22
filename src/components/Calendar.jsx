import React, { useState, useRef, useEffect } from 'react';

import Dropdown from './dropdown'

const CustomCalendar = ({ label, updateDate }) => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [isEditingMonth, setIsEditingMonth] = useState(false);
	const [isEditingYear, setIsEditingYear] = useState(false);
	const [displayCalendar, setDisplayCalendar] = useState(false);
	const inputRef = useRef(null);
	const calendarContainerRef = useRef(null);
	const now = new Date(Date.now())

	const handleDateClick = (day) => {
		const selectedMonth = currentDate.getMonth();
		const selectedYear = currentDate.getFullYear();
		const selectedDate = new Date(selectedYear, selectedMonth, day);
		setSelectedDate(selectedDate);
		setDisplayCalendar(false);
		updateDate(selectedDate)

	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (calendarContainerRef.current && !calendarContainerRef.current.contains(event.target)) {
				if (!event.target.classList.contains('letShow') && !event.target.classList.contains('dropdown')) {
					setDisplayCalendar(false);
				}
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);

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

	const handleMonthClick = () => {
		setIsEditingMonth(true);
	};

	const handleYearClick = () => {
		setIsEditingYear(true);
	};

	const handleMonthChange = (event) => {
		const newMonth = event.target.value;
		setCurrentDate((prevDate) => {
			const currentYear = prevDate.getFullYear();
			return new Date(currentYear, newMonth);
		});
		setIsEditingMonth(false);
	};

	const handleYearChange = (event) => {
		const newYear = event.target.value;
		setCurrentDate((prevDate) => {
			const currentMonth = prevDate.getMonth();
			return new Date(newYear, currentMonth);
		});
		setIsEditingYear(false);
	};

	const updateInputValue = () => {
		if (inputRef.current) {
			if (selectedDate) {
				const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1
					}/${selectedDate.getFullYear()}`;
				inputRef.current.value = formattedDate;
			} else {
				inputRef.current.value = '';
			}
		}
	};

	const renderCalendar = () => {
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();
		const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
		const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

		// Move the daysOfWeek array to match the starting day of the month
		const reorderedDays = [...daysOfWeek.slice(firstDayOfMonth), ...daysOfWeek.slice(0, firstDayOfMonth)];

		const calendarDays = [];
		for (let i = 0; i < reorderedDays.length; i++) {
			calendarDays.push(
				<div key={i + 's'} className="calendar-day day-of-week">
					{reorderedDays[i]}
				</div>
			);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const isCurrentDay =
				day === currentDate.getDate() &&
				currentMonth === currentDate.getMonth() &&
				currentYear === currentDate.getFullYear();
			const isSelectedDay =
				selectedDate &&
				day === selectedDate.getDate() &&
				currentMonth === selectedDate.getMonth() &&
				currentYear === selectedDate.getFullYear();

			calendarDays.push(
				<div
					key={day + 'w'}
					className={`calendar-day ${isCurrentDay ? 'current-day' : ''
						} ${isSelectedDay ? 'selected-day' : ''}`}
					onClick={() => handleDateClick(day)}
				>
					{day}
				</div>
			);
		}

		return calendarDays;
	};

	const monthOptions = Array.from({ length: 12 }, (_, index) => {
		const monthDate = new Date(currentDate.getFullYear(), index);
		return {
			value: index,
			label: monthDate.toLocaleString('default', { month: 'long' }),
		};
	});

	const yearOptions = Array.from({ length: 101 }, (_, index) => {
		const year = now.getFullYear() - 100 + index; // Show 100 years before and the current year
		return {
			value: year,
			label: year.toString(),
		};
	});

	return (
		<div className="position-relative d-flex flex-column" ref={calendarContainerRef}>
			<label htmlFor="start-date">{label}</label>
			<input
				id="start-date"
				type="text"
				autoComplete="off"
				readOnly
				value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ''}
				onFocus={() => {
					setDisplayCalendar(true);
					updateInputValue();
				}}
				ref={inputRef}
			/>
			{displayCalendar && (
				<div className="calendar-container mt-2">
					<div className="calendar-header d-flex w-100 align-items-center">
						<button className="prev-month w-auto" onClick={handlePrevMonth}>
							&lt;
						</button>
						<div className="current-month-year w-100 text-center d-flex flex-row align-items-center justify-content-center pl-1 pr-1" style={{gap: 10}}>
							{isEditingMonth ? (
								<Dropdown options={monthOptions} defaultValue={currentDate.getMonth()} onBlur={() => { setIsEditingMonth(false); updateInputValue(); }} onChange={(val) => { const value = { target: { value: val } }; handleMonthChange(value); updateInputValue(); }} />
							) : (
								<span className='letShow' onClick={handleMonthClick}>
									{currentDate.toLocaleString('default', { month: 'long' })}
								</span>
							)}
							{isEditingYear ? (
								<Dropdown options={yearOptions} defaultValue={currentDate.getFullYear()} onBlur={() => { setIsEditingYear(false); updateInputValue(); }} onChange={(val) => { const value = { target: { value: val } }; handleYearChange(value); updateInputValue(); }} />
							) : (
								<span className='letShow' onClick={handleYearClick}>
									{currentDate.getFullYear()}
								</span>
							)}
						</div>
						<button className="next-month w-auto" onClick={handleNextMonth}>
							&gt;
						</button>
					</div>
					<div className="calendar">{renderCalendar()}</div>
				</div>
			)}
		</div>
	);
};

export default CustomCalendar;