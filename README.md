# 🚀 Containerized Web Application with AWS ECS Fargate CI/CD Pipeline

A complete DevOps implementation showcasing containerization, automated CI/CD pipelines, and serverless container orchestration on AWS. This project demonstrates infrastructure as code, GitHub Actions automation, and production-grade deployment strategies.

![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-ECS%20Fargate-FF9900?logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)

---

## 📋 Table of Contents

- [DevOps Overview](#devops-overview)
- [Architecture](#architecture)
- [Infrastructure Components](#infrastructure-components)
- [CI/CD Pipeline](#cicd-pipeline)
- [Docker Configuration](#docker-configuration)
- [ECS Task Definition](#ecs-task-definition)
- [Deployment Workflow](#deployment-workflow)
- [Monitoring & Logging](#monitoring--logging)
- [Troubleshooting](#troubleshooting)

---

## 🎯 DevOps Overview

This project demonstrates a complete DevOps workflow for deploying a containerized web application to AWS ECS Fargate with automated CI/CD using GitHub Actions.

### Key DevOps Capabilities Demonstrated

- **Containerization**: Docker-based application packaging with nginx:alpine
- **CI/CD Automation**: GitHub Actions workflow for build, test, and deploy
- **Container Registry**: AWS ECR for secure image storage
- **Serverless Orchestration**: AWS ECS Fargate for container management
- **Infrastructure as Code**: JSON-based ECS task definitions
- **Automated Deployments**: Zero-downtime rolling deployments
- **Logging**: CloudWatch Logs integration for observability
- **Security**: IAM roles and GitHub Secrets management

---

## 🏗️ Architecture

### Deployment Flow

```
┌──────────────────────────────────────────────────────────────┐
│                     DEVELOPER WORKFLOW                        │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ git push to main
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                      GITHUB REPOSITORY                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  • Source Code (HTML, CSS, JS, Images)                 │  │
│  │  • Dockerfile                                          │  │
│  │  • task-definition.json                                │  │
│  │  • .github/workflows/phoneshopdeploy.yml               │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ Trigger on push (excludes docs/**, readme.md)
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                     GITHUB ACTIONS CI/CD                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Step 1: Checkout Code                                 │  │
│  │  Step 2: Configure AWS Credentials                     │  │
│  │  Step 3: Login to Amazon ECR                           │  │
│  │  Step 4: Build Docker Image                            │  │
│  │  Step 5: Tag Docker Image                              │  │
│  │  Step 6: Push Image to ECR                             │  │
│  │  Step 7: Render ECS Task Definition                    │  │
│  │  Step 8: Debug Task Definition (cat output)            │  │
│  │  Step 9: Deploy to ECS Fargate                         │  │
│  │  Step 10: Wait for Service Stability                   │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ Push Docker Image
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                   AWS ELASTIC CONTAINER REGISTRY (ECR)        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Repository: phoneshop-repo                            │  │
│  │  Image Tag: latest                                     │  │
│  │  Region: us-east-2                                     │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ Pull Image
                              ▼
┌──────────────────────────────────────────────────────────────┐
│              AWS ECS FARGATE (Serverless Containers)          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Cluster: phoneshop-cluster                            │  │
│  │  Service: phoneshop-service                            │  │
│  │  Task Definition: phoneshop-taskdef                    │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Container: phoneshop-container                  │  │  │
│  │  │  • CPU: 1 vCPU (1024 units)                      │  │  │
│  │  │  • Memory: 3 GB (3072 MB)                        │  │  │
│  │  │  • Port: 80 (HTTP)                               │  │  │
│  │  │  • Network Mode: awsvpc                          │  │  │
│  │  │  • Platform: Linux/X86_64                        │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ Logs
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                      AWS CLOUDWATCH LOGS                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Log Group: /ecs/phoneshop-taskdef                     │  │
│  │  Log Stream Prefix: ecs                                │  │
│  │  Region: us-east-2                                     │  │
│  │  Auto-create: Enabled                                  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Infrastructure Components

### AWS Services Used

| Service | Purpose | Configuration |
|---------|---------|---------------|
| **Amazon ECR** | Container image registry | Private repository for Docker images |
| **Amazon ECS** | Container orchestration | Fargate launch type for serverless compute |
| **AWS Fargate** | Serverless compute engine | 1 vCPU, 3GB RAM per task |
| **CloudWatch Logs** | Centralized logging | Log group: `/ecs/phoneshop-taskdef` |
| **IAM** | Access management | Task and execution roles |

### Project Structure

```
phone-shop-app/
│
├── .github/
│   └── workflows/
│       └── phoneshopdeploy.yml        # CI/CD pipeline definition
│
├── css/
│   └── style.css                      # Application styles
│
├── images/
│   ├── download.jpg                   # Product images
│   ├── download1.jpg
│   └── download2.jpg
│
├── js/
│   └── script.js                      # Application JavaScript
│
├── Dockerfile                         # Container image definition
├── index.html                         # Application entry point
├── task-definition.json               # ECS task configuration
└── README.md                          # This file
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

**File**: `.github/workflows/phoneshopdeploy.yml`

#### Workflow Configuration

```yaml
Trigger: 
  - Push to main branch
  - Excludes: docs/**, readme.md

Runner: ubuntu-latest

Pipeline Steps:
  1. Checkout Code
     └── actions/checkout@v4
  
  2. Configure AWS Credentials
     └── aws-actions/configure-aws-credentials@v4
     └── Uses GitHub Secrets for authentication
  
  3. Login to Amazon ECR
     └── aws-actions/amazon-ecr-login@v2
  
  4. Build Docker Image
     └── docker build -t $ECR_REPOSITORY_URI:latest .
  
  5. Tag Docker Image
     └── docker tag $ECR_REPOSITORY_URI:latest
  
  6. Push to ECR
     └── docker push $ECR_REPOSITORY_URI:latest
  
  7. Render ECS Task Definition
     └── aws-actions/amazon-ecs-render-task-definition@v1
     └── Updates task-definition.json with new image
  
  8. Debug Task Definition
     └── cat rendered task definition (for troubleshooting)
  
  9. Deploy to ECS
     └── aws-actions/amazon-ecs-deploy-task-definition@v2
     └── Updates ECS service with new task definition
  
  10. Wait for Service Stability
      └── Ensures deployment completes successfully
```

#### Required GitHub Secrets

Configure these in **Settings → Secrets and variables → Actions**:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key | `wJalrXUtnFEMI/K7MDENG/...` |
| `AWS_REGION` | AWS deployment region | `us-east-2` |
| `ECR_REPOSITORY_URI` | Full ECR repository URI | `123456789012.dkr.ecr.us-east-2.amazonaws.com/phoneshop-repo` |
| `CONTAINER_NAME` | ECS container name | `phoneshop-container` |
| `ECS_SERVICE` | ECS service name | `phoneshop-service` |
| `ECS_CLUSTER` | ECS cluster name | `phoneshop-cluster` |

#### Pipeline Features

- ✅ **Automated Builds**: Triggered on every push to main branch
- ✅ **Path Filtering**: Ignores documentation changes to prevent unnecessary builds
- ✅ **Zero Downtime**: Rolling deployment strategy with health checks
- ✅ **Service Stability**: Waits for ECS service to stabilize before completing
- ✅ **Debugging**: Outputs rendered task definition for troubleshooting
- ✅ **Idempotent**: Safe to re-run without side effects

---

## 🐳 Docker Configuration

### Dockerfile

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

### Container Strategy

| Component | Details |
|-----------|---------|
| **Base Image** | `nginx:alpine` - Lightweight (~5MB) |
| **Web Server** | Nginx for serving static content |
| **Content** | Copies all files to nginx html directory |
| **Port** | Exposes port 80 for HTTP traffic |
| **OS** | Alpine Linux for minimal attack surface |

### Why This Approach?

- **Lightweight**: Alpine-based image minimizes container size
- **Fast Startup**: Small image size = faster pulls and deployments
- **Security**: Minimal OS reduces attack surface
- **Simplicity**: Single-stage build for static content
- **Production-Ready**: Nginx is battle-tested for serving static files

---

## 📊 ECS Task Definition

### Configuration Overview

**File**: `task-definition.json`

```json
{
  "family": "phoneshop-taskdef",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "3072",
  "taskRoleArn": "arn:aws:iam::266735801381:role/my-ecs-task-role",
  "executionRoleArn": "arn:aws:iam::266735801381:role/my-ecs-task-role"
}
```

### Container Definition

```json
{
  "name": "phoneshop-container",
  "image": "266735801381.dkr.ecr.us-east-2.amazonaws.com/phoneshop-repo",
  "cpu": 0,
  "portMappings": [
    {
      "name": "phoneshop-container-80-tcp",
      "containerPort": 80,
      "hostPort": 80,
      "protocol": "tcp",
      "appProtocol": "http"
    }
  ],
  "essential": true,
  "logConfiguration": {
    "logDriver": "awslogs",
    "options": {
      "awslogs-group": "/ecs/phoneshop-taskdef",
      "awslogs-create-group": "true",
      "awslogs-region": "us-east-2",
      "awslogs-stream-prefix": "ecs"
    }
  }
}
```

### Resource Allocation

| Resource | Value | Justification |
|----------|-------|---------------|
| **CPU** | 1024 units (1 vCPU) | Sufficient for nginx serving static content |
| **Memory** | 3072 MB (3 GB) | Adequate for container runtime and caching |
| **Network Mode** | awsvpc | Required for Fargate, provides dedicated ENI |
| **Platform** | Linux/X86_64 | Standard architecture for compatibility |
| **Launch Type** | FARGATE | Serverless - no EC2 instance management |

### IAM Roles

- **Task Role**: `my-ecs-task-role` - Permissions for the application
- **Execution Role**: `my-ecs-task-role` - Permissions for ECS to pull images and write logs

Required permissions:
- ECR image pull (ecr:GetAuthorizationToken, ecr:BatchGetImage)
- CloudWatch Logs write (logs:CreateLogStream, logs:PutLogEvents)

---

## 🚀 Deployment Workflow

### How Deployment Works

1. **Code Change**: Developer pushes code to main branch
2. **Trigger**: GitHub Actions workflow starts automatically
3. **Build**: Docker image is built from Dockerfile
4. **Push**: Image is tagged and pushed to ECR
5. **Update**: Task definition is updated with new image URI
6. **Deploy**: ECS service is updated with new task definition
7. **Rolling Update**: ECS performs zero-downtime deployment
8. **Health Check**: Pipeline waits for service stability
9. **Complete**: New version is live

### Deployment Strategy

- **Type**: Rolling update
- **Minimum Healthy**: 100% (ensures zero downtime)
- **Maximum**: 200% (allows new tasks before stopping old ones)
- **Health Checks**: Service stability verification

---

## 📈 Monitoring & Logging

### CloudWatch Logs

**Configuration**:
- **Log Group**: `/ecs/phoneshop-taskdef`
- **Region**: `us-east-2`
- **Stream Prefix**: `ecs`
- **Auto-create**: Enabled

### Viewing Logs

```bash
# View real-time logs
aws logs tail /ecs/phoneshop-taskdef --follow --region us-east-2

# Filter logs by pattern
aws logs filter-log-events \
  --log-group-name /ecs/phoneshop-taskdef \
  --filter-pattern "ERROR" \
  --region us-east-2

# Get logs for specific time range
aws logs filter-log-events \
  --log-group-name /ecs/phoneshop-taskdef \
  --start-time 1609459200000 \
  --end-time 1609545600000 \
  --region us-east-2
```

### Key Metrics to Monitor

- **Task Count**: Number of running tasks
- **CPU Utilization**: Container CPU usage
- **Memory Utilization**: Container memory usage
- **Deployment Status**: Success/failure of deployments
- **Service Events**: ECS service event logs

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: Pipeline fails at "Login to Amazon ECR"

**Symptoms**: Authentication error when logging into ECR

**Solutions**:
```bash
# Verify AWS credentials are correct
aws sts get-caller-identity --region us-east-2

# Check IAM user has ECR permissions
aws iam get-user-policy --user-name <username> --policy-name ECRAccess
```

#### Issue: Container fails to start

**Symptoms**: Task stops immediately after starting

**Solutions**:
```bash
# Check task logs
aws logs tail /ecs/phoneshop-taskdef --follow --region us-east-2

# Describe stopped task
aws ecs describe-tasks \
  --cluster phoneshop-cluster \
  --tasks <task-id> \
  --region us-east-2

# Common causes:
# - IAM execution role lacks ECR pull permissions
# - Container image doesn't exist in ECR
# - Insufficient CPU/memory allocation
```

#### Issue: Deployment stuck in progress

**Symptoms**: ECS service deployment doesn't complete

**Solutions**:
```bash
# Check service events
aws ecs describe-services \
  --cluster phoneshop-cluster \
  --services phoneshop-service \
  --region us-east-2 \
  --query 'services[0].events'

# Common causes:
# - Security group blocking traffic
# - Subnet has no internet access
# - Task definition errors
```

#### Issue: GitHub Actions workflow fails

**Symptoms**: Pipeline fails at various steps

**Solutions**:
- Verify all GitHub Secrets are configured correctly
- Check AWS credentials have necessary permissions
- Review GitHub Actions logs for specific error messages
- Ensure ECR repository exists before first run
- Validate task-definition.json syntax

#### Issue: Cannot access application

**Symptoms**: Application not reachable after deployment

**Solutions**:
```bash
# Get task public IP
aws ecs describe-tasks \
  --cluster phoneshop-cluster \
  --tasks <task-id> \
  --region us-east-2 \
  --query 'tasks[0].attachments[0].details'

# Check security group allows inbound traffic on port 80
# Verify task has public IP assigned (assignPublicIp=ENABLED)
```

---

## 🎯 DevOps Skills Demonstrated

This project showcases proficiency in:

- ✅ **Container Orchestration**: ECS Fargate serverless container management
- ✅ **CI/CD Pipelines**: GitHub Actions workflow automation
- ✅ **Infrastructure as Code**: JSON-based ECS task definitions
- ✅ **Containerization**: Docker image creation and optimization
- ✅ **Cloud Services**: AWS ECR, ECS, Fargate, CloudWatch integration
- ✅ **Monitoring & Logging**: CloudWatch Logs configuration
- ✅ **Security**: IAM roles and GitHub Secrets management
- ✅ **Automation**: End-to-end deployment automation
- ✅ **Troubleshooting**: Debugging containerized applications in AWS

---

## 📚 Additional Resources

### AWS Documentation
- [Amazon ECS Developer Guide](https://docs.aws.amazon.com/ecs/)
- [AWS Fargate Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
- [Amazon ECR User Guide](https://docs.aws.amazon.com/ecr/)
- [CloudWatch Logs Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/)

### GitHub Actions
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS Actions for GitHub](https://github.com/aws-actions)

### Docker
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Docker Official Image](https://hub.docker.com/_/nginx)

---

## 📝 License

This project is open source and available as a template for your own projects.

---

**Built for DevOps Engineers | AWS ECS Fargate + Docker + GitHub Actions**
