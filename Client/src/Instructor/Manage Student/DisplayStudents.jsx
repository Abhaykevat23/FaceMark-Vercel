import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import SearchContext from '../../SearchContext';

function DisplayStudents() {

    const { searchTerm } = useContext(SearchContext);
    const [students, setStudents] = useState([]);
    
    const displayColumns = [
        { key: "student_name", label: "Student Name" },
        { key: "student_class", label: "Class" },
        { key: "roll_number", label: "Roll Number" },
        { key: "enrollment_number", label: "Enrollment Number" },
        { key: "student_image", label: "Image" },
    ];
    useEffect(() => {
        const getStudents = async () => {
            const response = await fetch("http://localhost:5000/api/managestudent/displaystudents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ instructorClass }),
            });
            const data = await response.json();
            console.log(data);
            setStudents(data);
        }
        
        const instructorClass = localStorage.getItem('class');
        getStudents();
    }, [])

    const filteredStudents = students.filter(student =>
        student.student_name.toLowerCase().includes(searchTerm.toLowerCase())||
        student.enrollment_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="container">
                <div className="table_data">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                {displayColumns.map((column) => (
                                    <th key={column.key}>{column.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {displayColumns.map((column) => (
                                        <td key={column.key}>
                                            {column.key === "student_image" ? (
                                                <img
                                                    src={`http://localhost:5000/studentImages/${student[column.key]}.jpg`}
                                                    alt={student.stud_name}
                                                    width="50"
                                                    height="50"
                                                />

                                            ) : (
                                                student[column.key]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default DisplayStudents