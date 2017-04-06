package main

import (
 . "fmt"
 // "errors"
  "time"
  "runtime"
  "sync"
  "math/rand"
  "sync/atomic"
  "common"
)


func f(msg string){
  time.Sleep(time.Second  )
  for {
    //time.Sleep(time.Second  )
    Println("show ",msg)
  }

}

var g_total_tickets int32  =  14
var g_mutex                =  &sync.Mutex{}

func sellTicket(i int)  {

    for {

        g_mutex.Lock()

        if g_total_tickets >0 {


          //time.Sleep(time.Second)
          time.Sleep( time.Duration(rand.Intn(5)) * time.Millisecond)
          g_total_tickets--
          Println("id:", i, "  ticket:", g_total_tickets)

        }else {
            Println(i," stoped")
            break;
        }

        g_mutex.Unlock()

    }
}


func atomAdd()  {

    var cnt uint32 = 0

    for i := 0; i < 10 ; i++ {

          go func() {
               for j := 0 ;j<20 ;j++ {
                  time.Sleep( time.Duration(rand.Intn(5)) * time.Millisecond)
                  atomic.AddUint32(&cnt,2)
               }
          }()
    }

    time.Sleep(time.Second)

    cntFinal := atomic.LoadUint32(&cnt)

    Println("cnt:", cntFinal)
}

func main(){
runtime.GOMAXPROCS(4)
  //go f("show me")
  msg := "hahah"

  common.ShowArea()
  for i := 0; i < 5; i++ { //并发5个goroutine来卖票
          go sellTicket(i)
 }

  Println("bingo",msg)

  go func( msg string) {
        Println("bingo",msg)
  }("run")

  var input string

  Scanln(&input)

  atomAdd()


  Scanln(&input)

}
