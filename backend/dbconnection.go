package main

import (
	"container/list"
	"database/sql"
	"fmt"

	"log"

	"github.com/gorilla/websocket"
)

type DBPool struct {
	conn *list.List //현재는 하나
}

var DBConnectionPool = DBPool{}

func DBConnect() *sql.DB {
	db, err := sql.Open("mysql", DSN(dbname))
	fmt.Println("Succesfully Conncted to MySQL database")
	DBErrorCheck(err)

	return db
}

func DoQuery(DBConn *sql.DB, Packet []string, conn *websocket.Conn) {
	header := Packet[0]
	switch header {
	case "0":
		var id byte
		var title string
		var contents string
		var packet []byte
		rows, err := DBConn.Query("SELECT * FROM memo_table")
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(&id, &title, &contents)
			if err != nil {
				log.Fatal(err)
			}

			packet = append(packet, id)
			packet = append(packet, []byte(title)...)
			packet = append(packet, []byte(contents)...)

			fmt.Println(id, title, contents)
			conn.WriteMessage(1, packet)

		}

	case "1":
		stmt, err := DBConn.Prepare("INSERT INTO memo_table(count,memo_title,memo_content) VALUES(?,?,?)")
		DBErrorCheck(err)
		defer stmt.Close()
		_, err = stmt.Exec(Packet[1], Packet[2], Packet[3])
		DBErrorCheck(err)

	case "2":
		stmt, err := DBConn.Prepare("DELETE FROM memo_table WHERE count = ?")
		DBErrorCheck(err)
		defer stmt.Close()
		_, err = stmt.Exec(Packet[1])
		DBErrorCheck(err)

	default:
		fmt.Println("Unknown Header.")

	}
}

func DBErrorCheck(err error) {
	if err != nil {
		panic(err.Error())
	}
}
