module.exports = {
  apps: [
    {
      name: "erp-client",
      script: "pnpm",
      args: "run start",
      instances: 2,
      autorestart: true,
      watch: false,
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: "production",
      },
      output: "./logs/output.log",
      error: "./logs/error.log",
    },
  ],
};
