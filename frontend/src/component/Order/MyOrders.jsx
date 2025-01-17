import { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "./../../store/actions/orderAction";
import Loader from "./../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import MetaData from "./../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";

function MyOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user, isAuthenticated, loading:userLoading,} = useSelector((state) => state.user);


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
  
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
  
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
  
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
     if (isAuthenticated === false) {
      navigate("/login");
    }

    dispatch(myOrders());
  }, [dispatch, alert, error, navigate, isAuthenticated]);


  if (userLoading) {
    return <Loader />;
  }

  // Handle case where user is not available (null or undefined)
  if (!user) {
    return <Loader />;
  }

  

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{user.name}'s MyOrders</Typography>
        </div>
      )}
    </>
  );
}

export default MyOrders;
