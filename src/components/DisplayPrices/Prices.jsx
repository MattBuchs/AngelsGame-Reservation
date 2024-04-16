import { useEffect } from "react";
import { getPricesData } from "../../features/prices";
import { useDispatch, useSelector } from "react-redux";

export default function Prices({ roomObj }) {
    const dispatch = useDispatch();
    const { pricesData } = useSelector((state) => state.prices);

    useEffect(() => {
        if (roomObj) {
            dispatch(getPricesData(roomObj.room_id));
        }
    }, [dispatch, roomObj]);

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
                                <div className="flex">
                                    <button className="bg-blue-600 w-8 h-8 rounded-full text-white text-2xl hover:bg-blue-700">
                                        -
                                    </button>
                                    <ul className="flex">
                                        {Array.from(
                                            {
                                                length: pricesData.highest_capacity,
                                            },
                                            (_, index) => (
                                                <li
                                                    key={index}
                                                    className="w-7 h-7"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 320 512"
                                                        opacity={
                                                            index <
                                                            pricesData.lowest_capacity
                                                                ? 1
                                                                : 0.45
                                                        }
                                                        className="w-full h-full"
                                                    >
                                                        <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z" />
                                                    </svg>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <button className="bg-blue-600 w-8 h-8 rounded-full text-white text-2xl hover:bg-blue-700">
                                        +
                                    </button>
                                </div>
                                <p>{pricesData.lowest_capacity} joueurs</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3>Tarif</h3>
                                <p>En semaine et weekend</p>
                                <p>
                                    {
                                        pricesData.prices[
                                            pricesData.prices.length - 1
                                        ].price
                                    }
                                    € / personne
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
