import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timerID);
    }, []);

    const weekday = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const day = weekday[date.getDay()];
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');

    return (
        <div id="clock">
            <i className="fa fa-clock-o" aria-hidden="true"></i>
            <span className="date">{`${day}, ${dd}/${mm}/${yyyy} | ${h}:${m}:${s}`}</span>
        </div>
    );
};

export default Clock;
