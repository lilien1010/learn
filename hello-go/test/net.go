package main

import (
	"fmt"
	"io"
	"net"
)

const RECV_BUF_LEN = 1024

func main() {

	listener, err := net.Listen("tcp", "0.0.0.0:6666")

	if err != nil {
		panic(" error when listening ," + err.Error())
	}

	fmt.Println("start server")

	for {
		conn, err := listener.Accept()

		if err != nil {
			panic(" Error accept " + err.Error())
		}

		fmt.Println(" Accepted the Connection ", conn.RemoteAddr())

		go EchoServer(conn)

	}

}

func EchoServer(conn net.Conn) {

	buf := make([]byte, RECV_BUF_LEN)

	defer conn.Close()

	for {

		n, err := conn.Read(buf)

		switch err {
		case nil:
			conn.Write(buf[0:n])
		case io.EOF:
			fmt.Println(" end of data", err)
			return
		default:
			fmt.Println("Error: Reading Data", err)
			return
		}

		if err == nil && n > 0 {
			fmt.Println("len=", n, "recv data:", string(buf[0:n]))
		}
	}

}
