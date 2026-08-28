import { defineConfig } from 'vitest/config';

export default defineConfig({
    build: {
        emptyOutDir: true,
        lib: {
            entry: 'src/index.js',
            name: 'DateTime',
        },
        minify: false,
        outDir: 'dist',
        rolldownOptions: {
            output: [
                {
                    entryFileNames: 'frost-datetime.js',
                    format: 'umd',
                    minify: false,
                    name: 'DateTime',
                },
                {
                    entryFileNames: 'frost-datetime.min.js',
                    format: 'umd',
                    minify: true,
                    name: 'DateTime',
                },
                {
                    entryFileNames: 'frost-datetime.esm.js',
                    format: 'es',
                    minify: false,
                },
                {
                    entryFileNames: 'frost-datetime.esm.min.js',
                    format: 'es',
                    minify: true,
                },
            ],
        },
        sourcemap: true,
        target: 'baseline-widely-available',
    },
    test: {
        allowOnly: false,
        coverage: {
            include: ['src/**/*.js'],
            reporter: ['text', 'lcov'],
        },
        setupFiles: ['test/setup.js'],
    },
});
