import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for the date picker

const TimePickerComponent = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="time-picker-wrapper">
            <input
                type="text"
                className="time-picker-input"
                value={value ? value.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                onFocus={() => setIsOpen(true)}
                readOnly // Make the input read-only to prevent manual typing
            />
            {isOpen && (
                <div className="time-picker-popup">
                    <DatePicker
                        selected={value}
                        onChange={onChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15} // Set time intervals, e.g., every 15 minutes
                        timeCaption="Time" // Set time caption
                        dateFormat="h:mm aa" // Display format for the time
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default TimePickerComponent;
