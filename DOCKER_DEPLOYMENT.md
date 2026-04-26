# 🐳 Docker Deployment Guide

## 📋 Yêu cầu trước
- ✅ Docker Desktop đã cài (Windows/Mac) hoặc Docker Engine (Linux)
- ✅ Docker Compose v2+
- ✅ Git (nếu clone từ repo)

**Kiểm tra:**
```bash
docker --version
docker-compose --version
```

---

## 📦 Cấu trúc Files Docker

```
DemoDocker/
├── Dockerfile              # Backend (Spring Boot)
├── .dockerignore          # Exclude files from build
└── pom.xml

demo_docker_fe/
├── Dockerfile             # Frontend (React + Nginx)
├── .dockerignore
├── nginx.conf             # Nginx config
└── package.json

docker-compose.yml         # Orchestrate services
application-docker.yaml    # Backend config for Docker
```

---

## 🚀 Deployment Steps

### **Option 1: Quick Start (Recommended)**

**Step 1: Đứng trong thư mục root project**
```bash
cd D:\CNTT\Fullstack\DemoDocker
```

**Step 2: Build và start các service**
```bash
docker-compose up --build
```

**Output sẽ tương tự:**
```
Creating demodocker-mysql ... done
Creating demodocker-backend ... done
Creating demodocker-frontend ... done
```

**Step 3: Truy cập ứng dụng**
- 🖥️ Frontend: **http://localhost** (Port 80)
- 🔌 Backend API: **http://localhost:8080** (Port 8080)
- 💾 MySQL: **localhost:3306**

**Step 4: Dừng ứng dụng**
```bash
docker-compose down
```

---

### **Option 2: Build riêng (Advanced)**

**Build Backend:**
```bash
docker build -t demodocker-backend:latest ./DemoDocker
```

**Build Frontend:**
```bash
docker build -t demodocker-frontend:latest ./demo_docker_fe
```

**Run manually:**
```bash
# Start MySQL
docker run -d --name mysql-db \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -e MYSQL_DATABASE=demo_docker \
  -p 3306:3306 \
  mysql:8.0-alpine

# Start Backend
docker run -d --name backend \
  -e SPRING_DATASOURCE_URL=mysql-db:3306/demo_docker \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=123456 \
  -p 8080:8080 \
  demodocker-backend:latest

# Start Frontend
docker run -d --name frontend \
  -p 80:80 \
  demodocker-frontend:latest
```

---

## 📊 Các Service trong Docker Compose

### **1. MySQL** 🗄️
```yaml
mysql:
  image: mysql:8.0-alpine
  ports: 3306:3306
  database: demo_docker
  user: root / password: 123456
```

### **2. Backend** ⚙️
```yaml
backend:
  build: ./DemoDocker
  ports: 8080:8080
  depends_on: mysql
```

### **3. Frontend** 🎨
```yaml
frontend:
  build: ./demo_docker_fe
  ports: 80:80
  reverse-proxy to backend /api
```

---

## 🔍 Kiểm tra Logs

```bash
# Xem logs tất cả service
docker-compose logs -f

# Xem logs backend riêng
docker-compose logs -f backend

# Xem logs frontend
docker-compose logs -f frontend

# Xem logs MySQL
docker-compose logs -f mysql
```

---

## 🛠️ Các lệnh hữu ích

```bash
# List running containers
docker-compose ps

# Execute command in container
docker-compose exec backend bash

# View container stats
docker stats

# Remove volumes (xóa data)
docker-compose down -v

# Rebuild without cache
docker-compose build --no-cache

# Scale service
docker-compose up --scale backend=3
```

---

## 🚨 Troubleshooting

### ❌ Port 80 đã được sử dụng
```bash
# Change port in docker-compose.yml
# ports:
#   - "8000:80"  # Use 8000 instead of 80
```

### ❌ MySQL connection failed
```bash
# Check if MySQL is ready
docker-compose logs mysql

# Wait for MySQL health check
docker-compose up -d mysql
docker-compose up -d backend  # Start backend after MySQL ready
```

### ❌ Backend can't connect to MySQL
```bash
# Make sure service name is correct in connection string
# jdbc:mysql://mysql:3306/demo_docker
#            ^^^^^ service name in docker-compose.yml
```

### ❌ Frontend can't reach backend
```bash
# Check nginx config
# location /api/ { proxy_pass http://backend:8080; }
#                                ^^^^^^^ service name
```

---

## 📈 Production Deployment

### **Option 1: Docker Hub Registry**
```bash
# Login to Docker Hub
docker login

# Tag images
docker tag demodocker-backend:latest username/demodocker-backend:1.0
docker tag demodocker-frontend:latest username/demodocker-frontend:1.0

# Push to registry
docker push username/demodocker-backend:1.0
docker push username/demodocker-frontend:1.0
```

### **Option 2: Environment Variables**
```bash
# Create .env file
cat > .env << EOF
MYSQL_PASSWORD=your_secure_password
SPRING_PROFILE=production
ENVIRONMENT=prod
EOF

# Reference in docker-compose.yml
# environment:
#   MYSQL_ROOT_PASSWORD: ${MYSQL_PASSWORD}
```

### **Option 3: Kubernetes**
```bash
# Export docker-compose to Kubernetes manifests
kompose convert -f docker-compose.yml

# Deploy to Kubernetes
kubectl apply -f .
```

---

## 📝 File References

| File | Purpose |
|------|---------|
| `DemoDocker/Dockerfile` | Multi-stage build for Spring Boot |
| `demo_docker_fe/Dockerfile` | Multi-stage build for React + Nginx |
| `demo_docker_fe/nginx.conf` | Nginx configuration & SPA routing |
| `.dockerignore` | Exclude files from build context |
| `docker-compose.yml` | Orchestrate 3 services |
| `application-docker.yaml` | Spring Boot config for Docker |

---

## ✅ Verification Checklist

- [ ] Docker & Docker Compose installed
- [ ] Dockerfile exists in both directories
- [ ] docker-compose.yml in root directory
- [ ] `.dockerignore` files created
- [ ] MySQL initialization working
- [ ] Backend API responding at http://localhost:8080
- [ ] Frontend accessible at http://localhost
- [ ] Health checks passing

---

## 🎯 Next Steps

1. **Local Testing**: `docker-compose up`
2. **Push to Registry**: Upload to Docker Hub/Private Registry
3. **Deploy to Cloud**: AWS ECS, Azure Container Instances, Google Cloud Run, etc.
4. **Monitor**: Setup Prometheus, Grafana, ELK Stack

---

**Happy Dockering! 🚀**
