import { Typography } from "@mui/material";
import "./dashboard.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../store/actions/productAction";
import { getAllOrders } from "../../store/actions/orderAction";

function Dashboard() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackroundColor: ["#4B5000", "#35014F"],
        data: [
          outOfStock,
          products && Array.isArray(products)
            ? products.length - outOfStock
            : 0,
        ],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products.length}</p>
            </Link>

            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>

            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>

          </div>
          <div>
            <p>
             Total Amount <br /> {totalAmount} AFN
            </p>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
