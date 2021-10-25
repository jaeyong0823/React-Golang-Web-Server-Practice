package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func Reader(conn *websocket.Conn) {

	for {
		messageType, p, err := conn.ReadMessage()
		fmt.Println(messageType)
		if err != nil {
			log.Println(err)
			return
		}
		packet := strings.Split(string(p), " ")
		for _, str := range packet {
			fmt.Println(str)
		}
		DoQuery(DBConnectionPool.conn.Front().Value.(*sql.DB), packet, conn)

	}
}

func ServeWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	Reader(ws)
}

func SetupRoutes() {
	http.HandleFunc("/ws", ServeWs)

}
