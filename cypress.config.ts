import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: 'https://demo.evershop.io',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        // viewportWidth: 1280,
        // viewportHeight: 720,
    },
});
