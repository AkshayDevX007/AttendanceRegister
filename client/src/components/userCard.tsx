import { useEffect, useState } from "react";
import { User } from "../types/user";
import { useEditUserMutation } from "../actions/user/userEditMutation";
import useDeleteUserMutation from "../actions/user/deleteUser";

const UserCard = ({ user }: { user: User }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [unitName, setUnitName] = useState(user?.unitName || "");

  const {
    mutate: editUser,
    isPending: isEditing,
    isSuccess: isEdited,
  } = useEditUserMutation();
  const {
    mutate: deleteUser,
    isPending: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteUserMutation();

  const handleEdit = () => {
    setShowEdit(true);
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleCancel = () => {
    setShowEdit(false);
    setShowDelete(false);
  };

  const handleCornfirmEdit = () => {
    editUser({
      name: name != "" ? name : user?.name,
      email: email != "" ? email : user?.email,
      phone: phone != "" ? phone : user?.phone,
      unitName: unitName != "" ? unitName : user?.unitName,
      _id: user?._id,
    });
  };

  useEffect(() => {
    if (isEdited) {
      setShowEdit(false);
      setName(user?.name || "");
      setEmail(user?.email || "");
      setPhone(user?.phone || "");
      setUnitName(user?.unitName || "");
    }
  }, [isEdited]);

  useEffect(() => {
    if (isDeleted) {
      setShowDelete(false);
    }
  }, [isDeleted]);

  const handleConfirmDelete = () => {
    deleteUser(user?._id);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{user?.name || "jeffin"}</h2>
        <p>Email: {user?.email || ""}</p>
        <p>Phone: {user?.phone || ""}</p>
        <p>Unit: {user?.unitName || ""}</p>
        {showEdit ? (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Unit:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
              />
            </div>
            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-primary"
                onClick={handleCornfirmEdit}
                disabled={isEditing}
              >
                {isEditing ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  "Save"
                )}
              </button>
              <button
                className="btn btn-ghost"
                onClick={handleCancel}
                disabled={isEditing}
              >
                {isEditing ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  "Cancel"
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="card-actions justify-end">
            <button className="btn btn-ghost btn-sm" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-error btn-sm" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
        {showDelete && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete User</h3>
              <p className="py-4">Are you sure you want to delete this user?</p>
              <div className="modal-actions">
                <button
                  className="btn btn-error"
                  disabled={isDeleting}
                  onClick={handleConfirmDelete}
                >
                  {isDeleting ? (
                    <span className="loading loading-ring loading-md"></span>
                  ) : (
                    "Delete"
                  )}
                </button>
                <button
                  className="btn btn-ghost"
                  disabled={isDeleting}
                  onClick={handleCancel}
                >
                  {isDeleting ? (
                    <span className="loading loading-ring loading-md"></span>
                  ) : (
                    "Cancel"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
