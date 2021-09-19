#!/usr/bin/env node

import { App } from "./app";

let app = new App()
app.run().then(_ => {}).catch(_ => {})