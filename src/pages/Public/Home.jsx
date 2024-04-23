import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DayTable from "../../components/Table/DayTable.jsx";
import ChooseRoom from "../../components/ChooseRoom/ChooseRoom.jsx";
import PrevBtn from "../../components/Button/PrevBtn.jsx";
import NextBtn from "../../components/Button/NextBtn.jsx";
import { disabledCalendar } from "../../features/rooms.js";

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = `Réservation Angel's Game`;
    }, []);

    return (
        <div onClick={() => dispatch(disabledCalendar())}>
            <section className="text-center mt-4">
                <h2 className="text-lg italic mt-1">
                    Réservez votre Escape Game !
                </h2>
                <p className="mt-2">
                    Les réservations s’effectuent en ligne, jusqu’à 3 mois à
                    l’avance.
                </p>
                <p>Les disponibilités sont mises à jour en temps réel</p>
            </section>
            <section className="mt-10 flex justify-center">
                <PrevBtn isWeek={false} />
                <ChooseRoom />
                <NextBtn isWeek={false} />
            </section>
            <section className="flex flex-col items-center">
                <DayTable />
            </section>
        </div>
    );
}
