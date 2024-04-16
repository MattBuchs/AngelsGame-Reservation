import { NavLink } from "react-router-dom";
import logo from "/img/logo.webp";

export default function Nav() {
    return (
        <header className="flex justify-between items-center px-2 bg-slate-700 border-b border-slate-900">
            <img src={logo} alt="Logo Angel's Game" className="w-20 h-20" />

            <nav className="text-white text-xl mr-6">
                <ul>
                    <li>
                        <NavLink to={"/"}>Home</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
