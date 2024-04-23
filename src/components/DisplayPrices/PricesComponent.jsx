import { useEffect, useState } from "react";
import { getPricesData } from "../../features/prices";
import { useDispatch, useSelector } from "react-redux";

export default function PricesComponent({ roomObj }) {
    const dispatch = useDispatch();
    const { pricesData } = useSelector((state) => state.prices);
    const [prices, setPrices] = useState([]);
    const [infos, setInfos] = useState(null);
    const [activeBtn, setActiveBtn] = useState({
        previous: null,
        next: null,
    });

    useEffect(() => {
        if (roomObj) {
            dispatch(getPricesData(roomObj.room_id));
        }
    }, [dispatch, roomObj]);

    useEffect(() => {
        if (pricesData) {
            const newPrices = [];

            for (let i = 0; i < pricesData.highest_capacity; i++) {
                newPrices.push({
                    id: pricesData.highest_capacity - i,
                    opacity: pricesData.prices[i + 1] ? 0.45 : 1,
                    prices: pricesData.prices[i]
                        ? pricesData.prices[i].price
                        : 0,
                    capacity: pricesData.prices[i]
                        ? pricesData.prices[i].capacity
                        : 0,
                });
            }

            newPrices.reverse();
            setPrices(newPrices);

            setInfos({
                price: pricesData.prices[pricesData.prices.length - 1].price,
                capacity: pricesData.lowest_capacity,
            });

            setActiveBtn({
                previous: true,
                next: false,
            });
        }
    }, [pricesData]);

    const handleFewerPlayers = () => {
        setPrices((prevState) => {
            const filter = prevState.filter((price) => price.opacity === 1);
            const itemToUpdate = filter[filter.length - 1];
            const infosUpdate = filter[filter.length - 2];

            if (itemToUpdate && itemToUpdate.id > pricesData.lowest_capacity) {
                setInfos({
                    price: infosUpdate.prices,
                    capacity: infosUpdate.capacity,
                });

                setActiveBtn({
                    previous:
                        infosUpdate.capacity <= pricesData.lowest_capacity,
                });

                return prevState.map((item) =>
                    item.id === itemToUpdate.id
                        ? { ...item, opacity: 0.45 }
                        : item
                );
            }

            return prevState;
        });
    };

    const handleMorePlayers = () => {
        setPrices((prevState) => {
            const itemToUpdate = prevState.find((price) => price.opacity !== 1);

            if (itemToUpdate) {
                setInfos({
                    price: itemToUpdate.prices,
                    capacity: itemToUpdate.capacity,
                });

                setActiveBtn({
                    next: itemToUpdate.capacity >= pricesData.highest_capacity,
                });

                return prevState.map((item) =>
                    item.id === itemToUpdate.id ? { ...item, opacity: 1 } : item
                );
            }
            return prevState;
        });
    };

    return (
        <>
            {pricesData && (
                <>
                    <h2 className="text-center text-2xl font-semibold mt-8">
                        Tarifs
                    </h2>
                    <div className="w-[500px] m-auto mt-4">
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center">
                                <p>
                                    Voir les tarifs pour (min.{" "}
                                    {pricesData.lowest_capacity}, max.{" "}
                                    {pricesData.highest_capacity})
                                </p>
                                <div className="flex items-center">
                                    <button
                                        onClick={handleFewerPlayers}
                                        disabled={activeBtn.previous}
                                        className="bg-blue-600 flex justify-center items-center w-8 h-8 rounded-full text-white text-2xl hover:bg-blue-700 disabled:bg-gray-500"
                                    >
                                        <img
                                            src="/img/minus.svg"
                                            alt="Enlever un joueur"
                                            className="w-4 h-4"
                                        />
                                    </button>
                                    <ul className="flex mx-2">
                                        {prices.map((price) => (
                                            <li
                                                key={price.id}
                                                className={`w-6 h-6 mr-1`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                    opacity={price.opacity}
                                                >
                                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                                </svg>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={handleMorePlayers}
                                        disabled={activeBtn.next}
                                        className="bg-blue-600 flex justify-center items-center w-8 h-8 rounded-full text-white text-2xl hover:bg-blue-700 disabled:bg-gray-500"
                                    >
                                        <img
                                            src="/img/plus.svg"
                                            alt="Enlever un joueur"
                                            className="w-4 h-4"
                                        />
                                    </button>
                                </div>
                                <p>{infos && infos.capacity} joueurs</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3>Tarif</h3>
                                <p>En semaine et weekend</p>
                                <p>{infos && infos.price}€ / personne</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
