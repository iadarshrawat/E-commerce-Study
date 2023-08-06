import React, { useState } from 'react'

function CategoryForm({handleSubmit, value, setValue}) {

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 w-50">
                    <input type="text" className="form-control" placeholder='Enter new Category' value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>


        </>
    )
}

export default CategoryForm