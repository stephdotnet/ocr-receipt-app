#!/usr/bin/env node

const { execSync } = require('child_process');

const env = Object.create(process.env);
env.EXPO_USE_CUSTOM_INSPECTOR_PROXY = true;

const command = 'npx expo start --clear --dev-client';

execSync(command, { env: env, stdio: 'inherit' });
