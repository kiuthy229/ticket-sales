import { DatePicker, DatePickerProps, Radio, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './lich.css'
import moment from "moment";

type PickerType = "time" | "date" | "week" | "month" | "quarter" | "year" | undefined

const Calendar = ({ format = "YYYY-MM-DD", placeholder = "yy-mm-dd", onClick, setFromDate, setToDate}: any) => {

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(dateString);
        if (date) {
            if (setFromDate) setFromDate(dateString);
            if (setToDate) setToDate(dateString);
        }
    };

    const [value, setValue] = useState<PickerType>("date");

    const onChangePickerType = (e: RadioChangeEvent) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };
    
    return (
        <div>
            <DatePicker
                showToday={value !== undefined ? false : undefined}
                picker={value}
                placeholder={placeholder}
                onChange={onChange}
                format={format}
                defaultValue={moment()}
                renderExtraFooter={() => (
                    <Radio.Group onChange={onChangePickerType} value={value}>
                        <Radio value="date">Theo ngày</Radio>
                        <Radio value="week">Theo tuần</Radio>
                    </Radio.Group>
                )}
            />
        </div>
    )
};

export default Calendar;