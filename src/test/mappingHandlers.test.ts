import { subqlTest } from "@subql/testing";
import { test } from "vitest";

// https://academy.subquery.network/build/testing.html

test("mapping handlers", async () => {
  subqlTest(
    "testName", // test name
    1000003, // block height to process
    [], // dependent entities
    [], // expected entities
    "handleEvent", //handler name
  );
});