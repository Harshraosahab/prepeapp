import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import "./Admin.css";

const ManageUsers = ({ apiEndpoint }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(apiEndpoint || "/api/admin/users");
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [apiEndpoint]);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="manage-section">
      <h3>Users</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id || user.id} className="fade-in">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role || "user"}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
