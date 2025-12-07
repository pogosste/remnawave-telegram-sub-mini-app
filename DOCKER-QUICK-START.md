# 🚀 Быстрый старт с Docker

## 1️⃣ Запуск Production версии

```bash
# Клонируй репозиторий
git clone https://github.com/pogosste/remnawave-telegram-sub-mini-app.git
cd remnawave-telegram-sub-mini-app

# Создай .env файл
cp .env.example .env

# Отредактируй .env с твоими данными
# Не забудь заполнить:
# - REMNAWAVE_PANEL_URL
# - REMNAWAVE_TOKEN
# - TELEGRAM_BOT_TOKEN
# - BUY_LINK

nano .env

# Запусти приложение
docker-compose -f docker-compose.prod.yml up -d

# Проверь статус
docker-compose -f docker-compose.prod.yml ps
```

**✅ Готово!** Приложение доступно на `http://localhost:3000`

---

## 2️⃣ Запуск Development версии

```bash
# Создай .env
cp .env.example .env

# Запусти dev сервер с горячей перезагрузкой
docker-compose -f docker-compose.dev.yml up -d

# Смотри логи
docker-compose -f docker-compose.dev.yml logs -f
```

---

## 3️⃣ Полезные команды

```bash
# Остановить приложение
docker-compose -f docker-compose.prod.yml down

# Просмотреть логи
docker-compose -f docker-compose.prod.yml logs -f

# Перезапустить
docker-compose -f docker-compose.prod.yml restart

# Вход в контейнер
docker-compose -f docker-compose.prod.yml exec remnawave-telegram-sub-mini-app sh
```

---

## 📦 Docker Image

Образ автоматически публикуется в GitHub Container Registry:

```bash
# Загрузить актуальный образ
docker pull ghcr.io/pogosste/remnawave-telegram-sub-mini-app:latest

# Все доступные версии
docker pull ghcr.io/pogosste/remnawave-telegram-sub-mini-app:main
docker pull ghcr.io/pogosste/remnawave-telegram-sub-mini-app:develop
docker pull ghcr.io/pogosste/remnawave-telegram-sub-mini-app:v2.2.3
```

---

## 📖 Более подробно

Смотри [DOCKER.md](DOCKER.md) для полной документации.
