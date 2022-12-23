


function Input_(data) {
    const { label, className, htmlFor } = data
    return (
        <div className={'flex flex-col ' + className}>
            <label htmlFor={htmlFor} className='whitespace-nowrap'>{label}</label>
            <input {...data}
                className='p-1 rounded-md ring-gray-200 ring-1' />
        </div>
    )
}

export default Input_