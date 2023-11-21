function socket(socketIo) {

    let onlineUses = [];

    socketIo.on("connection", (socket) => {

        socket.on("addOnlineUser", (userId) => {
            !onlineUses.some(user => user.userId === userId) &&
            onlineUses.push({
                userId,
                socketId: socket.id
            });

            socketIo.emit("getOnlineUser", onlineUses);
        });

        socket.on("sendDataFromClient", (data) => {
            const recipient = onlineUses?.find((user) => user.userId === data.recipientId);
           
            if(recipient) {
                socketIo.to(recipient.socketId).emit("sendDataFromServer", data);
            }
        });

        socket.on("disconnect", () => {
            onlineUses = onlineUses.filter((user) => user.socketId !== socket.id);

            socketIo.emit("getOnlineUser", onlineUses);
        });
    });

}

module.exports = socket;