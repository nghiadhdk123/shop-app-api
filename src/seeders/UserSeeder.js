const bcrypt = require('bcrypt');
const User = require('../models/User');
const Permssion = require('../models/Permission');
const Role = require('../models/Role');

const permissions = [
    {
        name: 'Super Admin',
        code: 'super-admin',
        description: 'Có toàn quyền sử dụng hệ thống'
    },
    {
        name: 'Thêm mới sản phẩm',
        code: 'create-product',
        description: 'Quyển thêm mới sản phẩm'
    },
    {
        name: 'Chỉnh sửa sản phẩm',
        code: 'edit-product',
        description: 'Quyền chỉnh sửa sản phẩm'
    },
    {
        name: 'Xóa sản phẩm',
        code: 'delete-product',
        description: 'Quyển xóa sản phẩm'
    },
    {
        name: 'Thêm mới danh mục sản phẩm',
        code: 'create-category',
        description: 'Quyền thêm mới danh mục sản phẩm'
    },
    {
        name: 'Chỉnh sửa danh mục sản phẩm',
        code: 'edit-category',
        description: 'Quyền chỉnh sửa danh mục sản phẩm'
    },
    {
        name: 'Xóa danh mục sản phẩm',
        code: 'delete-category',
        description: 'Quyền xóa danh mục sản phẩm'
    },
    {
        name: 'Thêm mới nhân viên',
        code: 'create-user',
        description: 'Quyền thêm mới nhân viên'
    },
    {
        name: 'Chỉnh sửa nhân viên',
        code: 'edit-user',
        description: 'Quyền chỉnh sửa nhân viên'
    },
    {
        name: 'Xóa nhân viên',
        code: 'delete-user',
        description: 'Quyền xóa tài khoản nhân viên'
    },
    {
        name: 'Thay đổi trạng thái nhiên viên',
        code: 'change-user-status',
        description: 'Quyền thay đổi trạng thái tài khoản nhân viên'
    },
    {
        name: 'Phân vai trò cho nhân viên',
        code: 'update-user-role',
        description: 'Quyền phân vai trò cho nhân viên'
    },
    {
        name: 'Thêm mới vai trò',
        code: 'create-role',
        description: 'Quyền thêm mới vai trò'
    },
    {
        name: 'Chỉnh sửa vai trò',
        code: 'edit-role',
        description: 'Quyền chỉnh sửa vai trò'
    },
    {
        name: 'Xóa vai trò',
        code: 'delete-role',
        description: 'Quyền xóa vai trò'
    },
    {
        name: 'Phân quyển cho vai trò',
        code: 'update-role-permission',
        description: 'Quyền phân quyền cho vai trò'
    },
];

async function UserSeeder(req, res, next)
{
    //Xóa toàn bộ dữ liệu để khởi tạo lại
    await User.deleteMany({}).then(() => {
        console.log('Delete All Data Success');
    });
    await Permssion.deleteMany({}).then(() => {
        console.log('Delete All Data Success');
    });
    await Role.deleteMany({}).then(() => {
        console.log('Delete All Data Success');
    });

    const role = new Role({
        name: 'Super Admin',
        description: 'Quản lí toàn bộ hệ thống',
    });

    for (let value of permissions) {
        const permission = new Permssion({
            name: value.name,
            code: value.code,
            description: value.description,
        });
        await permission.save();
        await role.permission_ids.push(permission._id);
    }

    await role.save();

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('123456789', salt); 

    const user = new User({
        name: 'admin',
        email: 'admin@gmail.com',
        password: hashed,
        role_ids: role._id
    });

    await user.save();
    console.log('Create User Success');
}

module.exports = UserSeeder();