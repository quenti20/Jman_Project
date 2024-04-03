import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for the date picker

const CalendarComponent = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="calendar-wrapper">
            <input
                type="text"
                className="calendar-input"
                value={value ? value.toLocaleDateString() : ''}
                onFocus={() => setIsOpen(true)}
                readOnly // Make the input read-only to prevent manual typing
            />
            {isOpen && (
                <div className="calendar-popup">
                    <DatePicker
                        selected={value}
                        onChange={onChange}
                        dateFormat="dd/MM/yyyy"
                        showTimeSelect={false} // Change to true if you want to include time selection
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;
