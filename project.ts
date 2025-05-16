import {
  CosmosDatasourceKind,
  CosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

import * as dotenv from "dotenv";
import {resolve} from "node:path";

const mode = process.env.NODE_ENV || "production";

// Load the appropriate .env file
const dotenvPath = resolve(__dirname, `.env${mode !== "production" ? `.${mode}` : ""}`);
dotenv.config({path: dotenvPath});

// Can expand the Datasource processor types via the generic param
const project: CosmosProject = {
  specVersion: "1.0.0",
  name: "subquery-cosmos-indexing",
  runner: {
    node: {
      name: "@subql/node-cosmos",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    chainId: "bbn-1",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: [
      "https://babylon-archive.nodes.guru/rpc",
      "https://babylon-archive-rpc.polkachu.com",
    ],
  },
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleMetadataUpdated",
            kind: CosmosHandlerKind.Event,
            filter: {
              type: "wasm-MetadataUpdated",
              attributes: {
                _contract_address: "bbn1qtvnjezrv3fnqvuq869595zq6e2jk0zfhupg52aua0d6ht2a4jjsprqeae",
              }
            },
          },
        ],
      },
    },
  ],
};

export default project;
