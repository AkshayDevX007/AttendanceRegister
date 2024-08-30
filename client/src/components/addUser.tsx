import { useEffect, useState } from "react";
import { useAddUserMutation } from "../actions/user/userAddMutation";
import toast from "react-hot-toast";

const AddUser = () => {
  const {
    mutate: addUser,
    isPending: isAdding,
    isSuccess: isAdded,
  } = useAddUserMutation();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [unitName, setUnitName] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleAdd = () => {
    if (email && !validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }
    if (phone && !validatePhone(phone)) {
      toast.error("Invalid phone number");
      return;
    }
    addUser({
      name: name,
      email: email,
      phone: phone,
      unitName: unitName,
    });
  };

  useEffect(() => {
    if (isAdded) {
      setShowAdd(false);
      setName("");
      setEmail("");
      setPhone("");
      setUnitName("");
    }
  }, [isAdded]);

  return (
    <>
      <div className="mb-6 flex justify-end">
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          Add User
        </button>
      </div>
      {showAdd && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h1 className="font-bold text-lg text-center mb-6">Add User</h1>
            <div className="flex flex-col gap-4 mb-6">
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone"
                required
                className="input input-bordered"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Unit"
                required
                className="input input-bordered"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-error mr-2"
                disabled={isAdding}
                onClick={handleAdd}
              >
                {isAdding ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  "Add"
                )}
              </button>
              <button
                className="btn btn-ghost"
                disabled={isAdding}
                onClick={() => setShowAdd(false)}
              >
                {isAdding ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  "Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
