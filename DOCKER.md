# Docker Setup Guide

## 📦 Запуск с помощью Docker Compose

### Production (готовый образ)

```bash
# 1. Скопируй .env.example в .env
cp .env.example .env

# 2. Отредактируй .env с твоими значениями
nano .env

# 3. Запусти приложение
docker-compose -f docker-compose.prod.yml up -d
```

**Приложение будет доступно:** http://localhost:3000

---

### Development (локальная разработка)

```bash
# 1. Создай .env
cp .env.example .env

# 2. Запусти dev сервер
docker-compose -f docker-compose.dev.yml up -d

# 3. Смотри логи
docker-compose -f docker-compose.dev.yml logs -f
```

**Горячая перезагрузка:** Сохраняет изменения в `src/` автоматически

---

## 🔧 Переменные окружения

| Переменная | Обязательна | Описание |
|----------|-----------|---------|
| `REMNAWAVE_PANEL_URL` | ✅ | URL API панели Remnawave |
| `REMNAWAVE_TOKEN` | ✅ | Bearer токен для API |
| `TELEGRAM_BOT_TOKEN` | ✅ | Токен бота Telegram |
| `BUY_LINK` | ✅ | Ссылка на покупку подписки |
| `CRYPTO_LINK` | ❌ | Использовать ли криптошифрование (true/false) |
| `REDIRECT_LINK` | ❌ | URL редиректа для deep links |
| `AUTH_API_KEY` | ❌ | API ключ для TinyAuth (если нужен) |
| `PORT` | ❌ | Порт приложения (default: 3000) |

---

## 📊 Полезные команды

### Просмотр логов
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

### Остановка приложения
```bash
docker-compose -f docker-compose.prod.yml down
```

### Перезапуск
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Вход в контейнер
```bash
docker-compose -f docker-compose.prod.yml exec remnawave-telegram-sub-mini-app sh
```

### Пересборка образа
```bash
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 🐳 Использование предестроенного образа

Образ автоматически публикуется в GitHub Container Registry при каждом push в `main` ветку.

### Загрузить образ
```bash
docker pull ghcr.io/pogosste/remnawave-telegram-sub-mini-app:latest
```

### Запустить напрямую
```bash
docker run -d \
  --name remnawave-app \
  -p 3000:3000 \
  -e REMNAWAVE_PANEL_URL="https://panel.example.com" \
  -e REMNAWAVE_TOKEN="your-token" \
  -e TELEGRAM_BOT_TOKEN="your-bot-token" \
  -e BUY_LINK="https://example.com/buy" \
  ghcr.io/pogosste/remnawave-telegram-sub-mini-app:latest
```

---

## 📝 Примеры .env файлов

### Minimal (требуется заполнить)
```env
REMNAWAVE_PANEL_URL=https://panel.example.com
REMNAWAVE_TOKEN=abc123def456
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklmno_PQRST-UVWxyZ
BUY_LINK=https://t.me/yourbot
```

### Full (все параметры)
```env
REMNAWAVE_PANEL_URL=https://panel.example.com
REMNAWAVE_TOKEN=abc123def456
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklmno_PQRST-UVWxyZ
BUY_LINK=https://t.me/yourbot
CRYPTO_LINK=true
REDIRECT_LINK=https://maposia.github.io/redirect-page/?redirect_to=
AUTH_API_KEY=optional-api-key
PORT=3000
```

---

## 🚀 Production Deployment

### На сервере с Docker

```bash
# 1. Клонируй репозиторий
git clone https://github.com/pogosste/remnawave-telegram-sub-mini-app.git
cd remnawave-telegram-sub-mini-app

# 2. Создай .env с production значениями
cp .env.example .env
# Отредактируй .env

# 3. Запусти в background
docker-compose -f docker-compose.prod.yml up -d

# 4. Проверь статус
docker-compose -f docker-compose.prod.yml ps
```

### С использованием HTTPS (рекомендуется)

Используй Nginx reverse proxy или Traefik:

```yaml
version: '3.8'
services:
  remnawave-app:
    image: ghcr.io/pogosste/remnawave-telegram-sub-mini-app:latest
    networks:
      - web
    environment:
      # ... твои env переменные

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    networks:
      - web
    depends_on:
      - remnawave-app

networks:
  web:
```

---

## 🔍 Health Check

Приложение имеет встроенный health check:

```bash
curl http://localhost:3000
```

Должен вернуть 200 статус с HTML страницей.

---

## 📋 Troubleshooting

### Контейнер не запускается
```bash
docker-compose -f docker-compose.prod.yml logs
```

### Высокое использование памяти
Увеличь лимиты в docker-compose:
```yaml
services:
  remnawave-telegram-sub-mini-app:
    mem_limit: 1g
    memswap_limit: 2g
```

### Ошибка подключения к API
Проверь переменные окружения в `.env` и сетевое соединение.

---

## 📦 Версии образов

- `latest` - Latest version from main branch
- `main` - Latest from main branch
- `develop` - Development version
- `vX.Y.Z` - Specific release version
- `SHA-SHORT` - Specific commit

Пример:
```bash
docker pull ghcr.io/pogosste/remnawave-telegram-sub-mini-app:v2.2.3
```
