package main

import (
 . "fmt"
 "errors"
 // "time"
)


type myError struct{
   arg int
   errMsg string
}

func (e *myError) Error() string {
    return  Sprintf("%d - %s",e.arg,e.errMsg)
}


func main(){

    res,err := checkError(200)

    Println("res=",res,",err=",err)

    f()
    Println("Returned normally from f.")
}


func checkError( arg int)  (int ,error){
      if arg < 1 {

          return -1,errors.New("bad arguments - negtive")

      }else if arg > 300 {

         return -2,&myError{arg,"too big"}

      }

      return arg*arg,nil
}


func triggerPanic( i int)  {
    if i > 1 {

        Println(" it is paniced!!")

        panic(Sprintf(" the value is %d",i))

    }
}


func f() {

  defer func() {

     if r := recover(); r!= nil {
       Println("recovered in f",r)
     }

  }()


  for i := 0; i < 4 ; i++ {

    Println("calling trigger with ",i)

    triggerPanic(i)

    Println("calling trigger with ",i)

  }

}
