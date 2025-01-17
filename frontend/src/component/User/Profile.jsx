import React, { useEffect } from "react";
import MetaData from "./../layout/MetaData";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./../layout/Loader/Loader";
import "./Profile.css";

function Profile() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  // Handle case where user is not available (null or undefined)
  if (!user) {
    return <Loader />;
  }

  const options = {
    displaySearch: "none",
  };

  return (
    <>
      <MetaData title={`${user.name}'s Profile`} />
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src={user.avatar[0]?.url} alt={user.name} />
          <Link className="large-btn" to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substr(0, 10)}</p>
          </div>

          <div>
            <Link className="large-btn" to="/orders">My Orders</Link>
            <Link className="large-btn" to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
