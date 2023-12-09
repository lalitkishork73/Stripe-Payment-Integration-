const TableHeader = () => <>
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="px-4 py-3 text-center">Action</th>
            <th scope="col" className="px-6 py-3 text-center">Product</th>
            <th scope="col" className="px-6 py-3 text-center">Name</th>
            <th scope="col" className="px-6 py-3 text-center">Price</th>
            <th scope="col" className="px-20 py-3 text-center">Qty</th>
            <th scope="col" className="px-6 py-3 text-center">Total Amount</th>
        </tr>
    </thead>

</>

export default TableHeader;