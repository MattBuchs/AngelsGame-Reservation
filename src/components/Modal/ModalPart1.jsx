import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setNbPlayers,
    addPlayer,
    removePlayer,
    toggleChildren,
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
    const { nbPlayers, isChildren } = useSelector((state) => state.reservation);

    useEffect(() => {
        if (roomInfos.data) {
            dispatch(setNbPlayers(roomInfos.data.lowest_capacity));
        }
    }, [roomInfos.data, dispatch]);

    const handleMorePlayers = (e) => {
        e.preventDefault();
        if (nbPlayers >= roomInfos.data.highest_capacity) return;
        console.log(nbPlayers, roomInfos.data.highest_capacity);

        dispatch(addPlayer());
    };

    const handleFewerPlayers = (e) => {
        e.preventDefault();
        if (nbPlayers <= roomInfos.data.lowest_capacity) return;

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
                className="bg-slate-300 text-slate-900 p-10 rounded relative mb-[10vh] w-[500px]"
            >
                <button
                    onClick={closeModal}
                    className="absolute top-1 right-1 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
                >
                    X
                </button>
                <div className="flex flex-col items-center mb-10">
                    <img
                        src={roomDate.icon}
                        alt=""
                        className="w-12 h-12 mb-2"
                    />
                    <p>{roomDate.name}</p>
                    <p>{formatDate(roomDate.day)}</p>
                    <p>à {roomDate.hour}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center">
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

                    <div className="mt-4">
                        <Toggles
                            label={"Enfants"}
                            isChecked={isChildren}
                            setIsChecked={toggleChildren()}
                        />
                        {isChildren && (
                            <div className="w-3/4">
                                <p className="text-xs text-gray-600 italic">
                                    Attention les enfants de moins de 15 ans
                                    doivent toujours être accompagnés par un
                                    adulte.
                                </p>
                                <div className="mt-2 ml-2">
                                    <label htmlFor="number_children">
                                        - Âge des enfants :
                                    </label>
                                    <input
                                        type="text"
                                        id="number_children"
                                        placeholder="14, 10..."
                                        className="ml-1.5 w-28"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex mt-10">
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
