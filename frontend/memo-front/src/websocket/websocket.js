var socket = new WebSocket("ws://localhost:8080/ws");

let connect = ({ onReceivedPriorMemo }) => {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
    sendMsg("0");
  };

  socket.onmessage = (msg) => {
    console.log("Get Message From Server");

    if (msg.data !== "0") {
      const packet = msg.data.split(" ");

      var i = 0;
      while (i + 3 < packet.length) {
        var memoCount = packet[i];
        onReceivedPriorMemo(
          memoCount.charCodeAt(0),
          packet[i + 1],
          packet[i + 2]
        ); // count , title , contents
        i += 3;
      }
    }
    console.log(msg);
  };

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = (error) => {
    console.log("Socket Error: ", error);
  };
};

let sendMsg = (msg) => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg };
