import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatNameForUrl } from "../../utils/formatNameForUrl";
import ChooseRoom from "../ChooseRoom/ChooseRoom";
import WeekTable from "../Table/WeekTable.jsx";
import Prices from "./Prices.jsx";

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

    return (
        <div>
            <h2>{roomObj && roomObj.name}</h2>
            <h3>Réservez votre Escape Game !</h3>
            <p>
                Les réservations s’effectuent en ligne, jusqu’à 3 mois à
                l’avance.
            </p>
            <p>Les disponibilités sont mises à jour en temps réel</p>
            <ChooseRoom roomName={roomName} />
            <WeekTable roomObj={roomObj} />
            <Prices />
        </div>
    );
}
