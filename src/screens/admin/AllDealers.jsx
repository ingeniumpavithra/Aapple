import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Outlet, useNavigate } from "react-router";

const AllDealers = () => {
  const [users, setUsers] = useState(null);
  let location = useLocation();
  useEffect(() => {

    async function getdealers(){
      const res =await axios.get("http://127.0.0.1:8000/api/dealersrequest");

    if(res){
      //console.log(res.data);
      let trueData = res.data.ondealers;
      setUsers(trueData);
    }
    }
    getdealers();

  }, []);

  return (
    <section>
      {location.pathname === "/admin-dashboard/all-dealers" && (
        <section className="requests-table-wrapper mt-4 pt-4">
          <div className="container">
            <h5 className="alert alert-primary display-6 fw-normal">
              All Dealers
            </h5>
            <table className="table table-hover">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Sno</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone no</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, index) => {
                    return (
                      <Dealer key={index + 1} userData={user} id={index + 1} />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {/* requests table */}
      <Outlet />
    </section>
  );
};

const Dealer = (props) => {
  let Navigate = useNavigate();
  const navigateToUser = () => {
    Navigate(`${props.id}`, { state: props.userData });
  };
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.userData.contact_person}</td>
      <td>{props.userData.email}</td>
      <td>{props.userData.address}</td>
      <td>{props.userData.phone}</td>
      <td className="d-flex gap-2">
        <button className="btn btn-success" onClick={navigateToUser}>
          Details
        </button>
        <button className="btn btn-info">Transaction</button>
      </td>
    </tr>
  );
};
export default AllDealers;
