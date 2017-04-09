package main

import (
	"fmt"
	"github.com/yunge/sphinx"
)

func main() {
	fmt.Println("nihao ")
	// Get sphinx client
	opts := &Options{
		Host:    host,
		Port:    9312,
		Timeout: 5000,
	}

	sc := sphinx.NewClient(opts)

	// Or use this style:
	// Note: SetServer("", 0) means use default value.
	sc := sphinx.NewClient().SetServer(host, 0).SetConnectTimeout(5000)
	if err := sc.Error(); err != nil {
		// handle errinslta
	}

	res, err := sc.Query(words, index, "Some comment...")
	if err != nil {
		// handle err
	}

	for _, match := range res.Matches {
		// handle match.DocId
	}
}
