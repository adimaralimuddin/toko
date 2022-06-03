


function Select_({ label, name, values }) {
    return (
        <span className='flex flex-col'>
            <label htmlFor={name}>{label}</label>
            <select name={name} id="" className='ring-1 m-1 p-1 rounded-md'>
                {
                    values?.map(value => (
                        <option value={value}>{value?.toString()}</option>
                    ))
                }
            </select>
        </span>
    )
}

export default Select_

