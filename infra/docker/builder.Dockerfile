# Placeholder Dockerfile for Angular builder app.
# Build this after the Nx workspace is initialized.
FROM nginx:alpine
COPY dist/apps/builder-app /usr/share/nginx/html
