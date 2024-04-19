import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setNbPlayers,
    addPlayer,
    removePlayer,
    toggleChildren,
    addReservation,
} from "../../features/reservation";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import Toggles from "../Button/Toggles";

export default function ModalReservation({ closeModal, roomDate, roomInfos }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { nbPlayers, isChildren } = useSelector((state) => state.reservation);

    useEffect(() => {
        if (roomInfos) {
            dispatch(setNbPlayers(roomInfos.lowest_capacity));
        }
    }, [roomInfos, dispatch]);

    const handleMorePlayers = (e) => {
        e.preventDefault();
        if (nbPlayers >= roomInfos.highest_capacity) return;
        console.log(nbPlayers, roomInfos.highest_capacity);

        dispatch(addPlayer());
    };

    const handleFewerPlayers = (e) => {
        e.preventDefault();
        if (nbPlayers <= roomInfos.lowest_capacity) return;

        dispatch(removePlayer());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addReservation());
        navigate("/reservation");
    };

    return (
        <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-300 text-slate-900 px-10 py-5 rounded relative mb-[8vh] w-[500px]"
            >
                <button
                    onClick={closeModal}
                    className="absolute top-1 right-1 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
                >
                    X
                </button>
                <div className="flex flex-col items-center mt-6 mb-10">
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

                    <button className="mt-10 bg-blue-600 text-white px-4 py-1 rounded">
                        suivant
                    </button>
                </form>
            </div>
        </div>
    );
}
