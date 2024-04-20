import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Google.css'

const Google = () => {
    const [sheetData, setSheetData] = useState([]);
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from Google Sheets
                const response = await axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRSsw-tR2msE2Eqx26vzPZjRyFzoZz8T5u2O-qQX6FTezmE3ZLvRgAcZ948iuhVmKst-jBI7DDC0Myl/pub?output=tsv');
                const data = response.data;

                // Parse TSV data
                const rows = data.split('\n');
                const parsedData = rows.slice(1).map(row => {
                    const [timestamp, name, position, email, b1, b2, b3, b4, img, dept, display, ack, alumni, wdyn, year] = row.split('\t');
                    return {timestamp, name, position, email, b1, b2, b3, b4, img, dept, display, ack, alumni, wdyn, year};
                });

                // Set the fetched data in state
                setSheetData(parsedData);

            } catch (error) {
                console.error('Error fetching data from Google Sheets:', error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };


    return (
        <div>
            <h1>Group Members</h1>
            <div className="container-fluid">
            <div  className='input'>
                <label htmlFor="filter"></label>
                <input
                    type="text"
                    id="filter"
                    className='form-label'
                    placeholder='Enter Position'
                    value={filterValue}
                    onChange={handleFilterChange}
                />
            </div>
                <div className="row">
                    {sheetData.map((row, index) => (
                        <div className="" key={index}>
                            {row.name && (filterValue === '' || row.position.toLowerCase().includes(filterValue.toLowerCase()))?
                            <div className="card d-flex">
                                <div className="card-img-top">
                                    <img src="https://drive.google.com/thumbnail?id=1jLPSgfbNrzG9s-Sc75LkOE32aIAyxMvt&sz=w300" alt="pro" />
                                </div>
                                <div className="card-body">
                                    <div className="card-title">{row.name}</div>
                                    <div className="card-text">{row.position}, {row.dept}</div>
                                    <div className="card-text">email:{row.email}</div>
                                    <ul>
                                        {row.b1?<li>{row.b1}</li>:<></>}
                                        {row.b2?<li>{row.b2}</li>:<></>}
                                        {row.b3?<li>{row.b3}</li>:<></>}
                                        {row.b4?<li>{row.b4}</li>:<></>}
                                    </ul>
                                </div>
                            </div>
                            :<></>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Google;
