package main

import (
	"container/list"
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Memo DB Backend")
	DBConnectionPool.conn = list.New()

	db := DBConnect()

	DBConnectionPool.conn.PushBack(db)

	defer db.Close()

	go SetupRoutes()

	http.ListenAndServe(":8080", nil)
}
