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

const (
	username string = "root"
	password string = "irenepeace1214!"
	hostname string = "127.0.0.1:3306"
	dbname   string = "memo_trunk"
)

func DSN(dbName string) string {
	return fmt.Sprintf("%s:%s@tcp(%s)/%s", username, password, hostname, dbName)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	CheckOrigin: func(r *http.Request) bool { return true },
}

func Reader(conn *websocket.Conn) {

	for {

		messageType, p, err := conn.ReadMessage()
		fmt.Println(messageType)
		if err != nil {
			log.Println(err)
			return
		}

		if err := conn.WriteMessage(messageType, p); err != nil {
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
