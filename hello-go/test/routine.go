package main

import (
  "fmt"
 // "errors"
  "time"
//  "runtime"
  "sync"
  "math/rand"
  "sync/atomic"
//  "common"
)


func f(msg string){
  time.Sleep(time.Second  )
  for {
    //time.Sleep(time.Second  )
    fmt.Println("show ",msg)
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
          fmt.Println("id:", i, "  ticket:", g_total_tickets)

        }else {
            fmt.Println(i," stoped")
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

    fmt.Println("cnt:", cntFinal)
}

func main(){

  /*
  runtime.GOMAXPROCS(4)

  //go f("show me")
  msg := "hahah"

  common.ShowArea()
  for i := 0; i < 5; i++ { //并发5个goroutine来卖票
          go sellTicket(i)
 }

  fmt.Println("bingo",msg)

  go func( msg string) {
        fmt.Println("bingo",msg)
  }("run")
  */


  timer()

  // atomAdd()
  // Scanln(&input)

  var input string

  fmt.Scanln(&input)

}


func channelTest()  {


  channel := make(chan string)

  go func(){

      //time.Sleep(time.Second * 10)
      channel <- "hellotalk 11"
      channel <- "hellotalk 12"

      time.Sleep(time.Second *2 )

      channel <- "hellotalk 13"

  }()
 var msg string= ""
 msg = <- channel
 fmt.Println("msg= ",msg)

 msg = <- channel
 fmt.Println("msg= ",msg,channel)

 msg = <- channel
 fmt.Println("msg= ",msg)


}


func checkSelect(){


   c1 := make(chan string)
   c2 := make(chan string)


   go func(){
    // for {
       time.Sleep(time.Second * 1)
       c1 <- "c1 data"
  //   }

   }()


    go func(){
    //  for {
        time.Sleep(time.Second * 1)
        c2 <- "c2 data"
      //}
    }()


    for   {
      timout_cnt := 0
      select {
          case msg1 := <- c1:
              fmt.Println("received:" ,msg1)
          case msg2 := <- c2:
              fmt.Println("received:" ,msg2)
          /*
          case  <-time.After(time.Second * 30):
              fmt.Println("Time Out")
              timout_cnt++
          */
          default: //default会导致无阻塞
            fmt.Println("nothing received!")
            time.Sleep(time.Second)

        }
        fmt.Println(" select end timout_cnt=",timout_cnt)
    }

   fmt.Println(" show end ")

}


func moreChanel(){

  channel := make(chan string,20)
     rand.Seed(time.Now().Unix())

     //向channel发送随机个数的message
     go func () {
         cnt := 1
         fmt.Println("message cnt :", cnt)
         for i:=0; i<cnt; i++{
             fmt.Println("push to chan:", i)
             channel <- fmt.Sprintf("message-%2d", i)
         }

         time.Sleep(time.Second *2 )
          close(channel) //关闭Channel
     }()

     var more bool = true
     var msg string
     for more {
         select {
           //channel会返回两个值，一个是内容，一个是还有没有内容
          case msg, more = <- channel:
                   if more {
                       fmt.Println(msg)
                       time.Sleep(time.Second*3)
                   }else{
                       fmt.Println("channel closed!")
                   }


         }
     }



}


func timer(){

    tim := time.NewTimer(2*time.Second)

    tic := time.NewTicker(2*time.Second)

 fmt.Println("show NewTimer")
    go func(){ 
        for t := range tic.C {
          fmt.Println("Tick at", t)
        }
    }()

   <- tim.C

  fmt.Println("show NewTimer")
}
