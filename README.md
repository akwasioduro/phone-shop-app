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
- [AWS Infrastructure Setup](#aws-infrastructure-setup)
- [Deployment Guide](#deployment-guide)
- [Monitoring & Logging](#monitoring--logging)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 DevOps Overview

This project demonstrates a complete DevOps workflow for deploying a containerized web application to AWS ECS Fargate with automated CI/CD using GitHub Actions.

### Key DevOps Capabilities Demonstrated

- **Containerization**: Docker-based application packaging with nginx
- **CI/CD Automation**: GitHub Actions workflow for build, test, and deploy
- **Container Registry**: AWS ECR for secure image storage
- **Serverless Orchestration**: AWS ECS Fargate for container management
- **Infrastructure as Code**: JSON-based ECS task definitions
- **Automated Deployments**: Zero-downtime rolling deployments
- **Logging & Monitoring**: CloudWatch integration for observability
- **Security**: IAM roles, secrets management, and least privilege access

---

## 🏗️ Architecture

### High-Level Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                     DEVELOPER WORKFLOW                        │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ git push
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                      GITHUB REPOSITORY                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  • Source Code                                         │  │
│  │  • Dockerfile                                          │  │
│  │  • task-definition.json                                │  │
│  │  • .github/workflows/phoneshopdeploy.yml               │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ Trigger on push to main
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                     GITHUB ACTIONS CI/CD                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  1. Checkout Code                                      │  │
│  │  2. Configure AWS Credentials                          │  │
│  │  3. Login to Amazon ECR                                │  │
│  │  4. Build Docker Image                                 │  │
│  │  5. Tag & Push to ECR                                  │  │
│  │  6. Update ECS Task Definition                         │  │
│  │  7. Deploy to ECS Fargate                              │  │
│  │  8. Wait for Service Stability                         │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ Push Docker Image
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                   AWS ELASTIC CONTAINER REGISTRY (ECR)        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  • Private Docker Registry                             │  │
│  │  • Image Versioning (latest tag)                       │  │
│  │  • Vulnerability Scanning                              │  │
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
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ Route Traffic
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                  APPLICATION LOAD BALANCER (ALB)              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  • Health Checks                                       │  │
│  │  • SSL/TLS Termination                                 │  │
│  │  • Traffic Distribution                                │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/HTTP
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                          END USERS                            │
└──────────────────────────────────────────────────────────────┘

         ┌────────────────────────────────────────┐
         │      AWS CLOUDWATCH LOGS               │
         │  • Container Logs                      │
         │  • Application Metrics                 │
         │  • Monitoring & Alerts                 │
         └────────────────────────────────────────┘
```

---

## 🛠️ Infrastructure Components

### AWS Services Used

| Service | Purpose | Configuration |
|---------|---------|---------------|
| **Amazon ECR** | Container image registry | Private repository with image scanning |
| **Amazon ECS** | Container orchestration | Fargate launch type for serverless |
| **AWS Fargate** | Serverless compute engine | 1 vCPU, 3GB RAM per task |
| **Application Load Balancer** | Traffic distribution | HTTP/HTTPS with health checks |
| **Amazon VPC** | Network isolation | Public/private subnets with NAT |
| **CloudWatch Logs** | Centralized logging | Log group: `/ecs/phoneshop-taskdef` |
| **IAM** | Access management | Task and execution roles |
| **AWS Secrets Manager** | Secrets management | GitHub Actions credentials |

### Project Structure

```
phone-shop-app/
│
├── .github/
│   └── workflows/
│       └── phoneshopdeploy.yml        # CI/CD pipeline definition
│
├── css/
│   └── style.css                      # Application assets
│
├── images/
│   ├── download.jpg
│   ├── download1.jpg
│   └── download2.jpg
│
├── js/
│   └── script.js
│
├── Dockerfile                         # Container image definition
├── index.html                         # Application entry point
├── task-definition.json               # ECS task configuration
└── README.md                          # This file
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The automated pipeline is defined in `.github/workflows/phoneshopdeploy.yml`

#### Pipeline Stages

```yaml
Trigger: Push to main branch (excluding docs/**, readme.md)
Runner: ubuntu-latest

Stages:
  1. Source Code Management
     └── Checkout code from repository
  
  2. Authentication & Authorization
     └── Configure AWS credentials using GitHub Secrets
  
  3. Container Registry Access
     └── Authenticate Docker client with Amazon ECR
  
  4. Build Phase
     └── Build Docker image from Dockerfile
  
  5. Image Management
     ├── Tag image with ECR repository URI
     └── Push image to Amazon ECR
  
  6. Deployment Configuration
     └── Render ECS task definition with new image
  
  7. Deployment Execution
     ├── Deploy updated task definition to ECS
     └── Wait for service stability (health checks)
```

#### Required GitHub Secrets

Configure these secrets in your GitHub repository settings:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | AWS deployment region | `us-east-2` |
| `ECR_REPOSITORY_URI` | Full ECR repository URI | `123456789012.dkr.ecr.us-east-2.amazonaws.com/repo-name` |
| `CONTAINER_NAME` | ECS container name | `phoneshop-container` |
| `ECS_SERVICE` | ECS service name | `phoneshop-service` |
| `ECS_CLUSTER` | ECS cluster name | `phoneshop-cluster` |

#### Pipeline Features

- ✅ **Automated Builds**: Triggered on every push to main branch
- ✅ **Path Filtering**: Ignores documentation changes
- ✅ **Zero Downtime**: Rolling deployment strategy
- ✅ **Health Checks**: Waits for service stability before completion
- ✅ **Debugging**: Task definition output for troubleshooting
- ✅ **Idempotent**: Safe to re-run without side effects

---

## 🐳 Docker Configuration

### Dockerfile Analysis

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

#### Container Strategy

- **Base Image**: `nginx:alpine` (lightweight, ~5MB)
- **Web Server**: Nginx for serving static content
- **Security**: Alpine Linux for minimal attack surface
- **Performance**: Optimized for fast startup and low memory footprint
- **Port**: Exposes port 80 for HTTP traffic

#### Build Process

```bash
# Local build
docker build -t app-name:latest .

# Multi-stage builds (optional enhancement)
# Add build stages for optimization
```

---

## ☁️ AWS Infrastructure Setup

### Step 1: Create ECR Repository

```bash
aws ecr create-repository \
  --repository-name phoneshop-repo \
  --region us-east-2 \
  --image-scanning-configuration scanOnPush=true \
  --encryption-configuration encryptionType=AES256
```

### Step 2: Create ECS Cluster

```bash
aws ecs create-cluster \
  --cluster-name phoneshop-cluster \
  --region us-east-2 \
  --capacity-providers FARGATE FARGATE_SPOT \
  --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1
```

### Step 3: Create IAM Roles

#### Task Execution Role

```bash
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document file://trust-policy.json

aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
```

#### Task Role (for application permissions)

```bash
aws iam create-role \
  --role-name ecsTaskRole \
  --assume-role-policy-document file://trust-policy.json
```

### Step 4: Register Task Definition

```bash
aws ecs register-task-definition \
  --cli-input-json file://task-definition.json \
  --region us-east-2
```

### Step 5: Create ECS Service

```bash
aws ecs create-service \
  --cluster phoneshop-cluster \
  --service-name phoneshop-service \
  --task-definition phoneshop-taskdef \
  --desired-count 1 \
  --launch-type FARGATE \
  --platform-version LATEST \
  --network-configuration "awsvpcConfiguration={
    subnets=[subnet-xxxxx,subnet-yyyyy],
    securityGroups=[sg-xxxxx],
    assignPublicIp=ENABLED
  }" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:region:account-id:targetgroup/name,containerName=phoneshop-container,containerPort=80"
```

### Step 6: Configure Application Load Balancer

```bash
# Create ALB
aws elbv2 create-load-balancer \
  --name phoneshop-alb \
  --subnets subnet-xxxxx subnet-yyyyy \
  --security-groups sg-xxxxx \
  --scheme internet-facing \
  --type application

# Create Target Group
aws elbv2 create-target-group \
  --name phoneshop-tg \
  --protocol HTTP \
  --port 80 \
  --vpc-id vpc-xxxxx \
  --target-type ip \
  --health-check-path / \
  --health-check-interval-seconds 30

# Create Listener
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:region:account-id:loadbalancer/app/name \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:region:account-id:targetgroup/name
```

---

## 📊 ECS Task Definition Configuration

### Key Parameters

```json
{
  "family": "phoneshop-taskdef",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",                    // 1 vCPU
  "memory": "3072",                 // 3 GB
  "executionRoleArn": "arn:aws:iam::account-id:role/my-ecs-task-role",
  "taskRoleArn": "arn:aws:iam::account-id:role/my-ecs-task-role",
  "containerDefinitions": [
    {
      "name": "phoneshop-container",
      "image": "account-id.dkr.ecr.region.amazonaws.com/phoneshop-repo:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp",
          "appProtocol": "http"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/phoneshop-taskdef",
          "awslogs-region": "us-east-2",
          "awslogs-stream-prefix": "ecs",
          "awslogs-create-group": "true"
        }
      }
    }
  ]
}
```

### Resource Allocation

| Resource | Value | Justification |
|----------|-------|---------------|
| CPU | 1024 units (1 vCPU) | Sufficient for nginx serving static content |
| Memory | 3072 MB (3 GB) | Overhead for container runtime and caching |
| Network Mode | awsvpc | Required for Fargate, provides ENI per task |
| Platform | Linux/X86_64 | Standard architecture for compatibility |

---

## 📈 Monitoring & Logging

### CloudWatch Logs

**Log Group**: `/ecs/phoneshop-taskdef`

```bash
# View logs
aws logs tail /ecs/phoneshop-taskdef --follow

# Filter logs
aws logs filter-log-events \
  --log-group-name /ecs/phoneshop-taskdef \
  --filter-pattern "ERROR"
```

### CloudWatch Metrics

Monitor these key metrics:

- **CPUUtilization**: Container CPU usage
- **MemoryUtilization**: Container memory usage
- **TargetResponseTime**: ALB response time
- **HealthyHostCount**: Number of healthy targets
- **UnHealthyHostCount**: Number of unhealthy targets

### Setting Up Alarms

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name high-cpu-utilization \
  --alarm-description "Alert when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2
```

---

## 🔒 Security Best Practices

### Implemented Security Measures

1. **IAM Least Privilege**
   - Separate task execution and task roles
   - Minimal permissions for ECR pull and CloudWatch logs

2. **Secrets Management**
   - GitHub Secrets for sensitive credentials
   - No hardcoded credentials in code

3. **Network Security**
   - VPC isolation with security groups
   - Private subnets for containers (optional)
   - ALB in public subnet for internet access

4. **Container Security**
   - Alpine-based images for minimal attack surface
   - ECR image scanning enabled
   - Regular base image updates

5. **Encryption**
   - ECR encryption at rest (AES256)
   - TLS/SSL for data in transit (ALB)

### Security Checklist

- [ ] Enable ECR image scanning
- [ ] Implement least privilege IAM policies
- [ ] Use AWS Secrets Manager for sensitive data
- [ ] Enable VPC Flow Logs
- [ ] Configure security groups with minimal ports
- [ ] Enable CloudTrail for audit logging
- [ ] Implement WAF rules on ALB
- [ ] Use HTTPS with ACM certificates
- [ ] Enable container insights
- [ ] Regular security patching

---

## 🚀 Deployment Guide

### Prerequisites

- AWS Account with appropriate permissions
- GitHub repository
- AWS CLI installed and configured
- Docker installed locally (for testing)

### Quick Start Deployment

1. **Clone and Configure**
   ```bash
   git clone <repository-url>
   cd phone-shop-app
   ```

2. **Set Up AWS Infrastructure**
   ```bash
   # Run infrastructure setup script
   ./scripts/setup-infrastructure.sh
   ```

3. **Configure GitHub Secrets**
   - Navigate to repository Settings → Secrets and variables → Actions
   - Add all required secrets listed in [CI/CD Pipeline](#cicd-pipeline)

4. **Deploy**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

5. **Verify Deployment**
   ```bash
   # Check service status
   aws ecs describe-services \
     --cluster phoneshop-cluster \
     --services phoneshop-service
   
   # Get ALB DNS name
   aws elbv2 describe-load-balancers \
     --names phoneshop-alb \
     --query 'LoadBalancers[0].DNSName'
   ```

### Manual Deployment (Without CI/CD)

```bash
# 1. Build and push Docker image
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-2.amazonaws.com
docker build -t phoneshop-repo .
docker tag phoneshop-repo:latest <account-id>.dkr.ecr.us-east-2.amazonaws.com/phoneshop-repo:latest
docker push <account-id>.dkr.ecr.us-east-2.amazonaws.com/phoneshop-repo:latest

# 2. Update ECS service
aws ecs update-service \
  --cluster phoneshop-cluster \
  --service phoneshop-service \
  --force-new-deployment
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: Container fails to start

```bash
# Check task logs
aws logs tail /ecs/phoneshop-taskdef --follow

# Describe task for error details
aws ecs describe-tasks \
  --cluster phoneshop-cluster \
  --tasks <task-id>
```

**Solutions:**
- Verify IAM execution role has ECR pull permissions
- Check container image exists in ECR
- Validate task definition CPU/memory allocation

#### Issue: Service deployment stuck

```bash
# Check service events
aws ecs describe-services \
  --cluster phoneshop-cluster \
  --services phoneshop-service \
  --query 'services[0].events'
```

**Solutions:**
- Verify security group allows traffic on port 80
- Check subnet has internet access (NAT Gateway or public IP)
- Validate target group health check configuration

#### Issue: GitHub Actions pipeline fails

**Solutions:**
- Verify all GitHub Secrets are correctly configured
- Check AWS credentials have necessary permissions
- Review GitHub Actions logs for specific error messages
- Ensure ECR repository exists before pipeline runs

#### Issue: High memory utilization

```bash
# Check container metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/ECS \
  --metric-name MemoryUtilization \
  --dimensions Name=ServiceName,Value=phoneshop-service \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-02T00:00:00Z \
  --period 3600 \
  --statistics Average
```

**Solutions:**
- Increase memory allocation in task definition
- Optimize container image size
- Review application memory leaks

---

## 📚 Additional Resources

### AWS Documentation
- [Amazon ECS Developer Guide](https://docs.aws.amazon.com/ecs/)
- [AWS Fargate Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
- [Amazon ECR User Guide](https://docs.aws.amazon.com/ecr/)

### GitHub Actions
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS Actions for GitHub](https://github.com/aws-actions)

### Docker
- [Docker Documentation](https://docs.docker.com/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## 🎯 DevOps Skills Demonstrated

This project showcases proficiency in:

- ✅ **Container Orchestration**: ECS Fargate serverless container management
- ✅ **CI/CD Pipelines**: GitHub Actions automation
- ✅ **Infrastructure as Code**: JSON-based task definitions
- ✅ **Cloud Architecture**: AWS multi-service integration
- ✅ **Containerization**: Docker image creation and optimization
- ✅ **Monitoring & Logging**: CloudWatch integration
- ✅ **Security**: IAM, secrets management, network isolation
- ✅ **Automation**: End-to-end deployment automation
- ✅ **Troubleshooting**: Debugging containerized applications

---

## 📝 License

This project is licensed under the MIT License - free to use as a template for your own projects.

---

## 🤝 Contributing

This is a template project. Feel free to fork and customize for your needs.

---

**Built for DevOps Engineers | AWS + Docker + GitHub Actions**
