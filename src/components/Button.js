import { twMerge } from 'tailwind-merge'
const Button = ({ text, onClick, className }) => {
    return (
        <button onClick={onClick} className={twMerge("capitalize font-medium min-w-[200px] bg-gray-600 sm:min-w-[150px] border-[1px] border-gray-300 text-white button_slide slide_right", className)}>
            <div className="content px-3 py-2">
                <span className="span">
                    {text}
                </span>
            </div>
        </button>
    )
}

export default Button