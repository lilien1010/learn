package main

import (
	"fmt"
	"net"
	"time"
)

const RECV_BUF_LEN = 1024

func main() {

	conn, err := net.Dial("tcp", "127.0.0.1:6666")

	if err != nil {
		fmt.Println("error when connect", err)
		return
	}

	defer conn.Close()

	buf := make([]byte, RECV_BUF_LEN)

	for j := 0; j < 5; j++ {

		msg := fmt.Sprintf("the data is %d \n", j)

		n, err := conn.Write([]byte(msg))

		if err != nil {
			fmt.Println("write data error ", err)
			break
		}

		fmt.Println("write:", n)

		n, err = conn.Read(buf)

		if err != nil {
			fmt.Println("read data error ", err)
			break
		}

		fmt.Println("recv length", n, "recv:", string(buf[0:n]))

		time.Sleep(time.Second * 7)

	}
}
