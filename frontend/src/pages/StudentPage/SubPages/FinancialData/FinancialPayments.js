import React, { useState, useEffect } from "react";
import "./financialdata.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import header from "../../../../services/auth-header";
import API_URL from "../../../../services/API_URL";

// const data = [
//   {
//     assinged: 12.4,
//     assingedDate: "20.07.2020",
//     paid: 12.4,
//     paidDate: "20.07.2020",
//   },
//   {
//     assinged: 12.4,
//     assingedDate: "20.07.2020",
//     paid: 12.4,
//     paidDate: "20.07.2020",
//   },
//   {
//     assinged: 12.4,
//     assingedDate: "20.07.2020",
//     paid: 0,
//     paidDate: "20.07.2020",
//   },
//   {
//     assinged: 12.4,
//     assingedDate: "20.07.2020",
//     paid: 12.4,
//     paidDate: "20.07.2020",
//   },
// ];

export default function FinancialPayments() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const config = {
      headers: header(),
    };
    axios
      .post(API_URL + "student/paymentDetails", { payment_id: id }, config)
      .then((response) => {
        setData(response.data.payments);
      });
  }, []);

  return (
    <div className="financialdata">
      <h1>Szczegóły płatności</h1>
      <div className="financialdata-container">
        <table className="primary-table">
          <thead>
            <tr>
              <th colSpan={2}>Przypisane</th>
              <th colSpan={2}>Wpłaty</th>
              <th rowSpan={2}>Saldo</th>
            </tr>
            <tr>
              <th>Kwota</th>
              <th>Data</th>
              <th>Kwota</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((row) => {
                return (
                  <tr>
                    <td>{row.assinged}</td>
                    <td>{row.assinged_date}</td>
                    <td>{row.paid}</td>
                    <td>{row.paid_date}</td>
                    <td>{row.paid - row.assinged}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="loading"></tr>
            )}
            {data ? (
              <tr>
                <td colSpan={2}>
                  {data.reduce((sum, row) => sum + row.assinged, 0)}
                </td>
                <td colSpan={2}>
                  {data.reduce((sum, row) => sum + row.paid, 0)}
                </td>
                <td>
                  {data.reduce(
                    (sum, row) => sum + (row.paid - row.assinged),
                    0
                  )}
                </td>
              </tr>
            ) : (
              <div className="loading"></div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
