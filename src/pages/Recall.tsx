// Recall.tsx - Corrected structure for separate list items


export default function Recall() {
    return (
        <div className="recall-page-container p-4 max-w-2xl mx-auto text-left">

            <div className='recall-header'>Information om återkallelse av produkter</div>

            {/* --- LIST ITEM 1 --- */}
            {/* The wrapper holds the background and spacing */}
            <div className="list-item-wrapper bg-gray-100 p-3 rounded-md mb-4">
                <div className="bullet-item">
                    Hel koriander 100g - Kalra
                    <div className="font-normal">07 december 2025</div>
                    {/* Inner Content Block (Nested Bullet) */}
                    <div className="bullet-container mt-2">
                        <div className="bullet-item secondary">
                            Kalra återkallar hela sin koriander på 100 g (batch GF/COW/0724/39) på grund av analys av produkten. Den innehåller **bekämpningsmedelsrester över de tillåtna gränsvärdena** och får därför inte säljas.
                        </div>
                    </div>
                </div>
            </div>

            {/*/!* --- LIST ITEM 2 --- *!/*/}
            {/*/!* This is a separate, sibling element *!/*/}
            {/*<div className="list-item-wrapper bg-gray-100 p-3 rounded-md mb-4">*/}
            {/*    <div className="bullet-item">*/}
            {/*        **Whole Corriander 200g - Kalra***/}

            {/*        /!* Inner Content Block (Nested Bullet) *!/*/}
            {/*        <div className="bullet-container mt-2">*/}
            {/*            <div className="bullet-item secondary">*/}
            {/*                Kalra is recalling its whole Corriander of 100g (Batch GF/COW/0724/39) due to analysis of the product. It contains **pesticide residues above the permitted limit values**, and therefore may not be sold.*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div> // Closing recall-page-container
    );
}