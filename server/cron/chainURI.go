package cron

import (
	"encoding/json"
	"log"

	"github.com/vitwit/resolute/server/clients"
	"github.com/vitwit/resolute/server/config"
)

func (c *Cron) StartCheckUris() {
	data := config.GetChainAPIs()
	// error already logged in GetChainAPIs
	if data == nil {
		return
	}
	for _, c := range data {
		for _, u := range c.RestURIs {
			if c.CheckStatus {
				status, _ := clients.GetStatus(u, c.ChainId)
				if status {
					c.RestURI = u
					break
				}
			} else {
				c.RestURI = u
			}
		}
	}

	bytes, err := json.Marshal(data)
	if err != nil {
		log.Println(err)
	}

	clients.SetValue("chains", string(bytes))
}
