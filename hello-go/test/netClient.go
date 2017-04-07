package main

import (
    "net"
    "io"
    "fmt"
)

const RECV_BUF_LEN    = 1024

func main() {

    conn,err := net.Dail("tcp","127.0.0.1:6666")


}


func EchoServer(conn net.Conn)  {



}
