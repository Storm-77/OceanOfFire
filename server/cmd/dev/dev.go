package main

import (
	"fmt"
	"github.com/Storm-77/OceanOfFire/internal"
	"net/http"
)

func main() {

	endpoints.SetupEndpoints()

	fmt.Println("Starting dev backend server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Error starting server:", err)
	}

}
