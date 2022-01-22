import { Link } from "react-router-dom";

function Transaction({ transaction, id }){
    let amountColor = transaction.amount<0 ? 'danger' : 'success';
    return (
        <tr>
            <td>
                {transaction.date}
            </td>
            <td>
                <Link to={`/transactions/${id}`}>{transaction.name}</Link>
            </td>
            <td className={`text-${amountColor}`}>
                {transaction.amount}
            </td>
      </tr>
    )
}

export default Transaction;