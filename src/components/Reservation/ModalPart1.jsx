import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setNbPlayers,
    addPlayer,
    removePlayer,
    toggleChildren,
    setNumberChildren,
} from "../../features/reservation";
import { formatDate } from "../../utils/formatDate";
import Toggles from "../Button/Toggles";

export default function ModalContent({
    closeModal,
    roomDate,
    roomInfos,
    setShowModal2,
}) {
    const dispatch = useDispatch();
    const { nbPlayers, isChildren, numberChildren } = useSelector(
        (state) => state.reservation
    );
    console.log(nbPlayers);
    // const [numberChildren, setNumberChildren] = useState(1);

    useEffect(() => {
        if (roomInfos.data && nbPlayers === null) {
            dispatch(setNbPlayers(roomInfos.data.lowest_capacity));
        }
    }, [roomInfos.data, dispatch, nbPlayers]);

    const handleMorePlayers = (e) => {
        e.preventDefault();
        if (nbPlayers === roomInfos.data.highest_capacity) return;

        dispatch(addPlayer());
    };

    const handleFewerPlayers = (e) => {
        e.preventDefault();
        if (nbPlayers === roomInfos.data.lowest_capacity) return;

        dispatch(removePlayer());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        setShowModal2(true);
        closeModal();
    };

    return (
        <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-300 text-slate-900 p-10 rounded relative mb-[10vh]"
            >
                <button
                    onClick={closeModal}
                    className="absolute top-1 right-1 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
                >
                    X
                </button>
                <div>
                    <p>{roomDate.name}</p>
                    <p>{formatDate(roomDate.day)}</p>
                    <p>{roomDate.hour}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        <p>Joueurs</p>
                        <div className="flex">
                            <button
                                onClick={handleFewerPlayers}
                                className="px-3 border border-blue-600 text-xl hover:bg-blue-600 rounded"
                            >
                                -
                            </button>
                            <p className="w-6 text-center">
                                {nbPlayers && nbPlayers}
                            </p>
                            <button
                                onClick={handleMorePlayers}
                                className="px-3 border border-blue-600 text-xl hover:bg-blue-600 rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div>
                        <Toggles
                            label={"Enfants de moins de 13 ans"}
                            isChecked={isChildren}
                            setIsChecked={toggleChildren()}
                        />
                        {isChildren && (
                            <div>
                                <p>
                                    Attention les enfants de moins de 13 ans
                                    doivent toujours être accompagnés par un
                                    adulte.
                                </p>
                                <label htmlFor="number_children">
                                    Nombres d&apos;enfant
                                </label>
                                <input
                                    type="number"
                                    id="number_children"
                                    min={1}
                                    max={Number(
                                        roomInfos.data.highest_capacity - 1
                                    )}
                                    onChange={(e) =>
                                        dispatch(
                                            setNumberChildren(e.target.value)
                                        )
                                    }
                                    value={numberChildren}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="gray"
                            opacity="0.4"
                            viewBox="0 0 320 512"
                            width="1.5rem"
                            height="1.5rem"
                        >
                            Font Awesome Free 6.5.1 by @fontawesome -
                            https://fontawesome.com License -
                            https://fontawesome.com/license/free Copyright 2024
                            Fonticons, Inc.
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                        </svg>
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#fff"
                                viewBox="0 0 320 512"
                                width="1.5rem"
                                height="1.5rem"
                            >
                                Font Awesome Free 6.5.1 by @fontawesome -
                                https://fontawesome.com License -
                                https://fontawesome.com/license/free Copyright
                                2024 Fonticons, Inc.
                                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
