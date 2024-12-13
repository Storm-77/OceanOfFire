package main

import (
	"encoding/json"
	"fmt"
	"github.com/Storm-77/OceanOfFire/internal"
	"net/http"
)

func handleRoot(w http.ResponseWriter, r *http.Request) {

	endpoints.SetCORSHeaders(w)
	response := map[string]string{"message": "hello from server"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)

	// temporary handler change to serving frontends prod build directory
}

func main() {

	endpoints.SetupEndpoints()
	http.HandleFunc("/", handleRoot)

	fmt.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
