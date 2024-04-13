import { useDispatch } from "react-redux";
import check from "/img/check.svg";
import cross from "/img/cross.svg";

export default function Toggles({ label, isChecked, setIsChecked }) {
    const dispatch = useDispatch();
    return (
        <div className="flex justify-between items-center">
            <label className="flex cursor-pointer select-none items-center">
                {label}
            </label>
            <button
                onClick={(e) => {
                    dispatch(setIsChecked), e.preventDefault();
                }}
                className={`w-12 h-7 rounded-full relative px-0.5 ${
                    isChecked ? "bg-blue-400" : "bg-[#e5e7eb]"
                }`}
            >
                <div
                    className={`w-6 h-6 rounded-full bg-white flex justify-center items-center transition-transform ${
                        isChecked ? "translate-x-[20px]" : "translate-x-0"
                    }`}
                >
                    <img
                        src={isChecked ? check : cross}
                        alt=""
                        className="w-3 h-3"
                    />
                </div>
            </button>
        </div>
    );
}
