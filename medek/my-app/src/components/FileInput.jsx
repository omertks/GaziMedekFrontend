import React from "react";


export default function FileInput({
    text,
    onChange,
    id,
    name
}) {


    return (
        <>
            <div className="form-group">
                <label htmlFor={id} className="form-label">{text}</label>
                <input type="file" className="form-control" name={name} id={id} onChange={onChange} multiple />
            </div>

        </>
    );

}