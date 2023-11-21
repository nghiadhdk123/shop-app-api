function checkRole(req, res, next, permissions = null) {
    if(permissions) {
        const permissionsOfUser = req.cookies.user.permissions;

        // console.log(permissionsOfUser);

        if(permissionsOfUser.length > 0) {
            for(let permission of permissions) {
                for(let permissionUser of permissionsOfUser) {
                    if(permissionUser === "super-admin") {
                        return next();
                    }
                    if(permissionUser == permission) {
                        return next();
                    }
                }
            }
        }
        return res.status(403).json({ message: "Bạn không có quyền" });
    }
    return res.status(403).json({ message: "Bạn không có quyền" });
}

module.exports = checkRole;
