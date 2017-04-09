package main

import (
	"bytes"
	"flag"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
)

const RECV_BUF_LEN = 1024

func main() {

	os.Setenv("WEB", "hellotalk.org")

	fmt.Println(os.Getenv("WEB"))

	for _, env := range os.Environ() {

		e := strings.Split(env, "=")

		fmt.Println(e[0], "\t=\t", e[1])

	}

	stdCmd()
	getArgs()
}

func runCmd() {

	cmd := exec.Command("ping", "qq.com", "-t", "3")

	out, err := cmd.Output()

	if err != nil {
		fmt.Println(" Command Error! ", err.Error())
		return
	}

	fmt.Println(string(out))

}

func getArgs() {
	args := os.Args
	fmt.Println(args)

	fmt.Println(args[1:])

	host := flag.String("host", "www.qq.com", "this is host")
	port := flag.Int("port", 30, " a port num,default is 30")

	debug := flag.Bool("d", false, "enable/disable debug mode")

	flag.Parse()

	fmt.Println(" host = ", *host, " port= ", *port, "debug=", *debug)

}

func stdCmd() {

	cmd := exec.Command("tr", "a-z", "A-Z")

	cmd.Stdin = strings.NewReader("this is liling")

	var out bytes.Buffer

	cmd.Stdout = &out

	err := cmd.Run()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("in all caps", out.String())

}
