import { projectDetails_sidebar } from "../utils/data-components.jsx";

export const DetailsUpdate = () => {
    return (
        <>
            <div
                className="bg-white border hidden mb-6 mt-4 pt-0 relative rounded-2xl md:fixed md:flex md:h-[calc(100%-96px)] md:mr-2 md:pl-4 md:pr-0 md:py-4 md:w-80 md:z-50">
                <div className="bg-white flex flex-col pr-4 w-full">
                    <div className="flex items-center w-full">
                        <h2 className="flex-1 font-semibold select-none text-xl" data-id="15">Details</h2>
                        <button data-id="5"
                                className="flex focus:outline-none focus:ring-0 focus:ring-offset-0 font-medium hover:bg-opacity-90 hover:duration-200 hover:shadow-inner hover:text-yellow-900 hover:transition-all items-center p-2 rounded-lg shadow text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="w-4 h-4" data-id="6">
                                <path
                                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                    <div className="pt-2">
                        <div className="font-normal select-none text-gray-700 text-sm">Posted on March 23, 2023</div>
                        <div className="select-none text-gray-700 text-sm">By City Government</div>
                    </div>
                    {/*-----------DETAILS-----------*/ }
                    <div className="border-t mt-4 overflow-y-scroll pt-4 w-full">
                        { projectDetails_sidebar.map((pds, index) => {
                            const { name, pds_type, color } = pds;
                            if (pds_type === "single") {
                                return (
                                    <div className="mb-5" key={ index }>
                                        <div
                                            className="font-bold my-2 select-none text-gray-900 text-xs uppercase">
                                            { name }
                                        </div>
                                        <span
                                            className={ `${ color } font-bold px-3 py-1 rounded-2xl select-none text-white text-xs` }>
                                            10%
                                        </span>
                                    </div>

                                );
                            } else if (pds_type === "multiple") {
                                return (
                                    <div className="mb-5" key={ index }>
                                        <div
                                            className="font-bold my-2 select-none text-gray-900 text-xs uppercase">{ name }
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {/*TODO: map the barangay ids here or location here from single project*/ }
                                            <span
                                                className={ `${ color } font-bold px-3 py-1 rounded-2xl select-none text-white text-xs` }>
                                                Linao
                                            </span>
                                            <span
                                                className={ `${ color } font-bold px-3 py-1 rounded-2xl select-none text-white text-xs` }>
                                                Linao
                                            </span>
                                            <span
                                                className={ `${ color } font-bold px-3 py-1 rounded-2xl select-none text-white text-xs` }>
                                                Linao
                                            </span>
                                            <span
                                                className={ `${ color } font-bold px-3 py-1 rounded-2xl select-none text-white text-xs` }>
                                                Linao
                                            </span>
                                            <span
                                                className={ `${ color } font-bold px-3 py-1 rounded-2xl select-none text-white text-xs` }>
                                                Linao
                                            </span>
                                            <span
                                                className={ `${ color } font-bold px-3 py-1 rounded-2xl select-none text-white text-xs` }>
                                                Linao
                                            </span>

                                        </div>
                                    </div>
                                );
                            }
                        }) }
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-between mt-1">
                </div>
            </div>
        </>
    );
};