# Placeholder Dockerfile for Angular admin app.
# Build this after the Nx workspace is initialized.
FROM nginx:alpine
COPY dist/apps/admin-app /usr/share/nginx/html
