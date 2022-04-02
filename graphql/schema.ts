import { makeSchema, queryType } from "@nexus/schema";
import { resolve } from "path";
import User from "../Models/User";
import * as types from "./types";
import path from "path"


export const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(process.cwd(), "schema.graphql"), 
    typegen: path.join(process.cwd(), "./graphql", "generated", "nexus.ts"),
  }
});
