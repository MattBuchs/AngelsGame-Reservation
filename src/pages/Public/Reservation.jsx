import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Reservation() {
    const navigate = useNavigate();
    const { finalizingReservation } = useSelector((state) => state.reservation);

    useEffect(() => {
        if (!finalizingReservation) {
            navigate("/home");
        }
    }, [finalizingReservation, navigate]);

    return (
        <section>
            <h2 className="text-center text-4xl font-semibold mt-4">
                Réservation
            </h2>
        </section>
    );
}
