FROM node:20-slim AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM python:3.13-slim
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ ./
COPY --from=frontend-build /frontend/dist /frontend/dist

CMD sh -c "python manage.py collectstatic --noinput && python manage.py migrate && gunicorn datafalcon_main.wsgi --bind 0.0.0.0:$PORT --log-file -"
