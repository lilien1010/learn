package main

import (
    "fmt"
    "time"
)

func main() {
    channel := make(chan string, 2)

    go func() {
        fmt.Println("sleep 1")
        time.Sleep(10 * time.Second)
        fmt.Println("sleep 2")
    }()
 
    fmt.Println("...")
    msg1 := <-channel
    fmt.Println(msg1)
}
