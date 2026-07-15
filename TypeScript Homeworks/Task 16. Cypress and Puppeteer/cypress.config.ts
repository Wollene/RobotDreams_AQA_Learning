import { defineConfig } from "cypress";

export default defineConfig({
    allowCypressEnv: false,
    e2e: {
        setupNodeEvents(on, config) {},
    },
    retries: {
        runMode: 1,
        openMode: 0,
    }
});
