package main

import (
	"fmt"
	// "io"
	"net/http"
	"net/url"
	// "path/filepath"
)

const http_root = "/Users/admin/Documents/learn/hello-go/test"

func main() {

	buf := make([]byte, 20)

	fmt.Println(len(buf))

	buf[3] = 'a'

	rr := buf[4:]

	rr[9] = 'b'
	fmt.Println(buf)
	// httpServer()
}

func httpServer() {

	http.HandleFunc("/", rootHandler)

	//http.HandleFunc("/view", viewHandler)

	//http.HandleFunc("/html/", htmlHandler)

	http.ListenAndServe(":8083", nil)
}

func rootHandler(w http.ResponseWriter, r *http.Request) {

	// fmt.Println("ResponseWrite", w)
	// fmt.Println("Request", r)

	queryForm, err := url.ParseQuery(r.URL.RawQuery)
	if err == nil && len(queryForm["id"]) > 0 {
		fmt.Println(" queryForm ", queryForm)
		fmt.Fprintln(w, queryForm["id"][0])
	}

	fmt.Fprintf(w, " this is not bad = %s ,%v ", r.URL.Path, r)
}
