import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Forms() {

    const [forms, setForms] = useState([]);
    const [nextRowId, setNextRowId] = useState(1);

    //fetch data form the API on component mounting
    const apiURL = "http://localhost:8080/api/login/check";
    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await axios.get(apiURL);
                const formattedData = response.data.forms.map((form)=>({
                ...form,
                rows: [], //Initialize rows for each form
            }));
            setForms(formattedData);
            }catch(err){
                console.error("Error fetching API data", err.message);
            }
        };

        fetchData();
    }, [])


    // Function to handle new Row
    const addRow = (formId) => {
        setForms((prevForms) => {
            prevForms.map((form) => {
                if(form.form_id === formId){
                    const newRow = {
                        id: nextRowId,
                        fields: form.fields.map((field)=>({
                            id: field.id,
                            value: "", // initialize the new row fields as empty
                        })),
                    };
                    setNextRowId(nextRowId+1); // update row id
                    return {...form, rows: [...form.rows, newRow]}
                }
                return form;
            })
        });
    };

    //function to handle field change

    const handleFormChange = (formId, fieldId, rowId, value) => {
        setForms((prevForms) => prevForms.map((form) => {
            if(form.form_id === formId){
                const updateRows = form.rows.map((row)=>{
                    if(row.id === rowId){
                        const updateFields = row.fields.map((field)=>{
                            if(field.id === fieldId){
                                return {...field, value};
                            }
                            return field;
                        });
                        return {...row, fields: updateFields};
                    }
                    return row;
                });
                return {...form, row: updateRows};
            }
            return form;
        }));
    };

    //Function to delete a row

    const deleteRow = (formId, rowId) => {
        setForms((prevForms) => prevForms.map((form)=>{
            if(form.form_id === formId){
                const updatedRows = form.rows.filter((row) => row.id !== rowId);
                return {...form, rows: updatedRows};
            }
            return form;
        }));
    };

    //Function to save Data to the Backend

    const saveData = async() => {
        try{
            for(let form of forms){
                for(let row of form.rows){
                    const newRowData = row.field.reduce((acc, field) => {
                        acc[field.name] = field.value;
                        return acc;
                    }, {});

                    // only save rows that have data
                    if(Object.values(newRowData).some((value)=> value !== "")){
                        await axios.post(`http://localhost:8080/api`, newRowData);
                    }
                }
            }
            alert("Data saved successfully");
        }catch(err){
            console.error("Error Saving Data", err.message);
            alert("Error Saving Data.");
        }
    };


    return (
        <div className="container">
            <h2 className="text-center text-2xl font-semibold mt-6 mb-6 text-gray-700">
                
            </h2>
            {forms.map((form) => (
                <div key={form.form_id} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700">{form.name}</h3>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            {form.fields.map((field) => (
                            <th key={field.id} className="px-4 py-2 border text-gray-800 text-lg">
                                {field.name}
                            </th>
                            ))}
                            <th className="px-4 py-2 border text-gray-800 text-lg">Actions</th>
                        </tr>
                    </thead>
                <tbody>
                {form.rows.map((row) => (
                    <tr key={row.id}>
                    {form.fields.map((field) => (
                        <td key={field.id} className="px-4 py-2 border">
                        {field.field_data_type === "Integer" ? (
                            <input
                            type="number"
                            value={row.fields.find((f) => f.id === field.id)?.value || ""}
                            onChange={(e) =>
                                handleFieldChange(form.form_id, row.id, field.id, e.target.value)
                            }
                            className="rounded-md px-8 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                            spellCheck={false}
                            />
                        ) : (
                            <input
                            type="text"
                            value={row.fields.find((f) => f.id === field.id)?.value || ""}
                            onChange={(e) =>
                                handleFieldChange(form.form_id, row.id, field.id, e.target.value)
                            }
                            className="rounded-md px-8 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                            spellCheck={false}
                            />
                        )}
                        </td>
                    ))}
                    <td className="px-4 py-2 border">
                        <button
                        onClick={() => deleteRow(form.form_id, row.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md outline-red-800"
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="m-4">
                <button
                onClick={() => addRow(form.form_id)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md outline-blue-800"
                >
                Add Row
                </button>
            </div>
            </div>
        ))}

        <div className="m-4">
            <button
            onClick={saveData}
            className="bg-green-500 text-white px-3 py-1 ml-2 rounded-md outline-green-800"
            >
            Save All Data
            </button>
        </div>
    </div>
    );
};

export default Forms;
