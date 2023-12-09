const TableHeader = () => <>
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="px-4 py-3">Action</th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-20 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Total Amount</th>
        </tr>
    </thead>

</>

export default TableHeader;