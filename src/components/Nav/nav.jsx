import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "/img/logo.webp";

export default function Nav() {
    const { finalizingReservation } = useSelector((state) => state.reservation);

    return (
        <header className="flex justify-between items-center px-2 bg-slate-700 border-b border-slate-900">
            <img src={logo} alt="Logo Angel's Game" className="w-20 h-20" />

            <nav className="text-white text-lg mr-6">
                <ul className="flex">
                    <li className="mr-6">
                        <NavLink to={"/home"}>Accueil</NavLink>
                    </li>
                    <li className={`${finalizingReservation ? "mr-6" : ""}`}>
                        <NavLink to={"/prices"}>Tarifs</NavLink>
                    </li>
                    {finalizingReservation && (
                        <li>
                            <NavLink to={"/reservation"}>Réservation</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
