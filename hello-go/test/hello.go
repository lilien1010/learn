

package main

import (
 . "fmt"
 "math"
 "time"
 "errors"
)

var (
  g_age int
  g_gender bool
  g_name string

)


func main(){

  basic()
  constVarArray()
  mapDict()
  pp := porinter(33,44)
  pp += 1

  checkStruct()

  checkRect()


}


type Person struct {
  name string
  age int
  sex int
  email string
}

type rect struct {
  width, height int
}


func (r *rect) area() int {
  return r.width * r.height
}

func (r *rect) perimeter() int {
  return 2 * (r.width+r.height)
}


func checkRect()  {

   r := rect{width:10,height:30}

   Println("area=",r.area())
   Println("area=",r.perimeter())

}

func checkStruct() {

  person := Person{"liline",3,2,"lilien@qq.com"}

  Printf("person\t=%v \n",person)

  pPersion  := &person

  pPersion.name = "liling"

  Println("after person\t= ",person)

}


func basic()  {
    g_age, g_gender, g_name = 32,true,"asdf"
   var _name = "nihao"
   var _id int = 10
   var _age = 10

   wo,ni := 343,22.44
   ta,tta := ni,wo

   Println("Hello Worl2d",_name,_id,_age)
   Println(g_age,g_gender,g_name)
   Println(wo,ni)
   Println(ta,tta)
   Println("math.pi",math.Pi)

}

func constVarArray(){

   const _HOST_DEFAULT int = 100

    Println(_HOST_DEFAULT)


    var a [5]int
    Println("nihao=",len(a),"a=",a)

    b := [7]int{1,2,3,4,6,7,8}
    Println("b=",b)

    var c [2][3]int

    for i := 0; i < 2; i++ {
        for j := 0; j < 3; j++ {
            c[i][j] = b[j] + i + j
        }
    }

    Println("array=",c)

    b1  :=  b[2:4]  //a[2] and a[3] 但不包括a[4]
    Println("b slice=",b1)


    b2 := b[:2]  //从 a[0] 到 a[4]

    Println("b slice=",b2)

    b3 := b[2:]
    Println("b slice=",b3)

    /******分支循环******/

    x := 6

    if x % 2 == 0 {
      Println("nihao x=",x)
    } else {
      Println("nihao x is odd")
    }

    switch x {
      case 3:
          Println("x is 3")
      case 4,5,6:
          Println("nihao 4,5,6")
      default:
          Println(" what is the bad")
    }

    /***for循环 ***/
    time.Sleep(time.Second)
    for {
      if x < 1 {
        break;
      }
      Println("in for x=",x)
      x--
    }
    Println("after for x=",x)
}

func mapDict()  {
    m := make(map[string]int)

    m["map"]   = 2
    m["id"]    = 33
    m["name"]  = 333

    Println("m =",m,",len=",len(m))

    delete(m,"map")
    Println("after delete m =",m,",len=",len(m))


    m1 := map[string]int{"id":33,"name":34,"age":333}

    for key,val := range m1 {
      Printf("%s => %d \n",key,val)
    }

}

//make 只用于创建 slice map和chan，并且返回T*
//new 返回 T

func porinter(a int ,b int) int  {
    var i int = 3

    var pInt *int = &i

    Printf("i=%d \t pInt=%p *pInt=%d  v1=%v ,v2=%v\n",i,pInt,*pInt,i,pInt)



    var p *[]int = new([]int)
    Println("a=",a,b,"p=",p)
    tot   := sump(1,2,3,4)

    Println(" sum =",tot)

    runNextNum()

    fact := fact(10)

    Println(" fact =",fact)

    return i
}
//闭包函数

func nextNum() func() int {
    i,j := 1,1
    return func() int {
       tmp := i+j
       i, j = j,tmp
       return tmp
    }
}

func runNextNum() {


  nextNumFunc := nextNum()

  for i := 0 ;i<10; i++ {
      Println(nextNumFunc())
  }

}

func fact (n int) int {
  if n==0 {
     return 1
  }
  return n* fact(n-1)
}
//不定参数
func sump(nums ...int) int {

   Println("nums=",nums)
   var _total int = 0
   for _, num := range nums {
     _total  += num
   }

   return _total
}
