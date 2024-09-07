const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className='capitalize font-medium min-w-[200px] sm:min-w-[150px] border-[1px] border-gray-300 mt-4 bg-gray-600 text-white button_slide slide_right'>
            <div className="content px-3 py-2">
                <span className="span">
                    {text}
                </span>
            </div>
        </button>
    )
}

export default Button