#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
let app = new app_1.App();
app.run().then(_ => { }).catch(_ => { });
