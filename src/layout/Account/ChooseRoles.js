import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { apiKey } from '../../service/http';

const roleBase = [
    { id: 1, tenQuyen: "Admin" },
    { id: 2, tenQuyen: "User" }
];

const ChooseRoles = ({ user, onRoleUpdate }) => {
    const [selectedRole, setSelectedRole] = useState(roleBase.find(role => role.tenQuyen === user.tenQuyen));
    const dispatch = useDispatch();

    const onClickUpdateRole = async (e) => {
        e.preventDefault();
        const params = {
            ...user,
            MaQuyen: selectedRole.id,
        };

        try {
            const response = await apiKey.put("/Login/SuaTaikhoanByAdmin", params);
            if (response.data.success === 200) {
                message.success("Cập nhật quyền thành công", 1.2);
                onRoleUpdate(selectedRole.tenQuyen);
            } else {
                message.error("Cập nhật quyền thất bại", 1.2);
            }
        } catch (err) {
            message.error("Cập nhật quyền thất bại", 1.2);
        }
    };

    return (
        <div>
            <form className='choose-roles' onSubmit={onClickUpdateRole}>
                <h3 style={{ textAlign: "center" }}>Chọn quyền</h3>
                <select 
                    value={selectedRole.id} 
                    onChange={(e) => setSelectedRole(roleBase.find(role => role.id == e.target.value))}
                    className="form-select"
                >
                    {roleBase.map(item => (
                        <option key={item.id} value={item.id}>{item.tenQuyen}</option>
                    ))}
                </select>
                <button type="submit" className="submit-button">Cấp quyền</button>
            </form>
        </div>
    );
};

export default ChooseRoles;
