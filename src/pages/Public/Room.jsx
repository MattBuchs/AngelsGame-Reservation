import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatNameForUrl } from "../../utils/formatNameForUrl.js";
import ChooseRoom from "../../components/ChooseRoom/ChooseRoom.jsx";
import WeekTable from "../../components/Table/WeekTable.jsx";
import Prices from "../../components/DisplayPrices/Prices.jsx";
import PrevBtn from "../../components/Button/PrevBtn.jsx";
import NextBtn from "../../components/Button/NextBtn.jsx";

export default function Room() {
    const { roomName } = useParams();
    const { roomsData } = useSelector((state) => state.rooms);
    const [roomObj, setRoomObj] = useState();

    useEffect(() => {
        if (roomsData) {
            const room = roomsData.find(
                (obj) => formatNameForUrl(obj.name) === roomName
            );

            setRoomObj(room);
        }
    }, [roomsData, roomName]);

    useEffect(() => {
        if (roomObj) {
            document.title = `Réservation Angel's Game | ${roomObj.name}`;
        }
    }, [roomObj]);

    return (
        <>
            <title>Mon site : Contactez-nous</title>
            <section className="text-center mt-4">
                <h2 className="text-3xl font-semibold">
                    {roomObj && roomObj.name}
                </h2>
                <h3 className="text-lg italic mt-1">
                    Réservez votre Escape Game !
                </h3>
                <p className="mt-2">
                    Les réservations s’effectuent en ligne, jusqu’à 3 mois à
                    l’avance.
                </p>
                <p>Les disponibilités sont mises à jour en temps réel</p>
            </section>
            <section className="mt-10 flex justify-center">
                <PrevBtn isWeek={true} />
                <ChooseRoom roomName={roomName} />
                <NextBtn isWeek={true} />
            </section>
            <section className="flex flex-col items-center mt-2">
                <WeekTable roomObj={roomObj} />
            </section>
            <section>
                <Prices roomObj={roomObj} />
            </section>
        </>
    );
}