# 📱 SmartKWACE - Online Phone Shop

A modern, responsive e-commerce web application for browsing and purchasing premium smartphones. Built with vanilla HTML, CSS, and JavaScript, containerized with Docker, and deployed to AWS ECS Fargate using CI/CD automation.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations and hover effects
- **Product Catalog**: Display of premium smartphones with images, prices, and descriptions
- **Interactive Shopping**: Add-to-cart functionality for seamless shopping experience
- **Fast Performance**: Lightweight vanilla JavaScript implementation with no framework overhead
- **Containerized Deployment**: Docker-based deployment for consistency across environments
- **Automated CI/CD**: GitHub Actions workflow for continuous integration and deployment

## 🚀 Live Demo

The application is deployed on AWS ECS Fargate and accessible via Application Load Balancer.

## 📋 Table of Contents

- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [AWS Infrastructure](#aws-infrastructure)
- [Features in Detail](#features-in-detail)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 💻 Technologies Used

### Frontend
- **HTML5**: Semantic markup for better accessibility and SEO
- **CSS3**: Modern styling with Flexbox and Grid layouts
- **JavaScript (ES6+)**: Vanilla JavaScript for interactive features

### DevOps & Infrastructure
- **Docker**: Containerization using nginx:alpine base image
- **AWS ECR**: Container registry for Docker images
- **AWS ECS Fargate**: Serverless container orchestration
- **AWS CloudWatch**: Logging and monitoring
- **GitHub Actions**: CI/CD automation
- **Nginx**: Web server for serving static content

### AWS Services
- Amazon Elastic Container Registry (ECR)
- Amazon Elastic Container Service (ECS)
- AWS Fargate
- Application Load Balancer (ALB)
- Amazon CloudWatch Logs
- AWS IAM (Identity and Access Management)
- Amazon VPC (Virtual Private Cloud)

## 🏗️ Architecture

```
┌─────────────────┐
│   GitHub Repo   │
└────────┬────────┘
         │
         │ Push to main
         ▼
┌─────────────────┐
│ GitHub Actions  │
│   Workflow      │
└────────┬────────┘
         │
         │ Build & Push
         ▼
┌─────────────────┐
│   AWS ECR       │
│ (Docker Image)  │
└────────┬────────┘
         │
         │ Deploy
         ▼
┌─────────────────┐
│   ECS Fargate   │
│   (Container)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Load Balancer  │
└────────┬────────┘
         │
         ▼
    End Users
```

## 📁 Project Structure

```
phone-shop-app/
│
├── .github/
│   └── workflows/
│       └── phoneshopdeploy.yml    # CI/CD pipeline configuration
│
├── css/
│   └── style.css                  # Application styles
│
├── images/
│   ├── download.jpg               # Product images
│   ├── download1.jpg
│   └── download2.jpg
│
├── js/
│   └── script.js                  # JavaScript functionality
│
├── Dockerfile                     # Docker container configuration
├── index.html                     # Main HTML file
├── task-definition.json           # ECS task definition
└── README.md                      # Project documentation
```

## 🎯 Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Safari, or Edge)
- Docker (for containerized deployment)
- AWS Account (for cloud deployment)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/phone-shop-app.git
   cd phone-shop-app
   ```

2. **Open locally**
   
   Simply open `index.html` in your web browser:
   ```bash
   # On Windows
   start index.html
   
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   ```

3. **Or use a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```
   
   Then navigate to `http://localhost:8000`

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t phone-shop-app .
   ```

2. **Run the container**
   ```bash
   docker run -d -p 80:80 phone-shop-app
   ```

3. **Access the application**
   
   Open your browser and navigate to `http://localhost`

## 🚢 Deployment

### Manual AWS Deployment

1. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name phoneshop-repo --region us-east-2
   ```

2. **Authenticate Docker to ECR**
   ```bash
   aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-2.amazonaws.com
   ```

3. **Build and Push Image**
   ```bash
   docker build -t phoneshop-repo .
   docker tag phoneshop-repo:latest <account-id>.dkr.ecr.us-east-2.amazonaws.com/phoneshop-repo:latest
   docker push <account-id>.dkr.ecr.us-east-2.amazonaws.com/phoneshop-repo:latest
   ```

4. **Create ECS Cluster**
   ```bash
   aws ecs create-cluster --cluster-name phoneshop-cluster --region us-east-2
   ```

5. **Register Task Definition**
   ```bash
   aws ecs register-task-definition --cli-input-json file://task-definition.json
   ```

6. **Create ECS Service**
   ```bash
   aws ecs create-service \
     --cluster phoneshop-cluster \
     --service-name phoneshop-service \
     --task-definition phoneshop-taskdef \
     --desired-count 1 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
   ```

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for automated deployment. The workflow is triggered on every push to the `main` branch.

### Workflow Steps

1. **Checkout Code**: Retrieves the latest code from the repository
2. **Configure AWS Credentials**: Sets up AWS authentication using GitHub Secrets
3. **Login to Amazon ECR**: Authenticates Docker with AWS ECR
4. **Build Docker Image**: Creates a Docker image from the Dockerfile
5. **Tag Docker Image**: Tags the image with the ECR repository URI
6. **Push to ECR**: Uploads the Docker image to Amazon ECR
7. **Update Task Definition**: Updates the ECS task definition with the new image
8. **Deploy to ECS**: Deploys the updated task definition to ECS Fargate
9. **Wait for Stability**: Ensures the service is running and stable

### Required GitHub Secrets

Configure the following secrets in your GitHub repository:

- `AWS_ACCESS_KEY_ID`: AWS access key for authentication
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key
- `AWS_REGION`: AWS region (e.g., us-east-2)
- `ECR_REPOSITORY_URI`: Full URI of the ECR repository
- `CONTAINER_NAME`: Name of the container (phoneshop-container)
- `ECS_SERVICE`: Name of the ECS service
- `ECS_CLUSTER`: Name of the ECS cluster

### Workflow Triggers

The pipeline runs on:
- Push to `main` branch
- Excludes changes to documentation files (`docs/**`, `readme.md`)

## ☁️ AWS Infrastructure

### ECS Task Configuration

- **CPU**: 1024 units (1 vCPU)
- **Memory**: 3072 MB (3 GB)
- **Network Mode**: awsvpc
- **Launch Type**: FARGATE
- **Platform**: Linux/X86_64

### Container Configuration

- **Base Image**: nginx:alpine
- **Port Mapping**: 80 (HTTP)
- **Log Driver**: awslogs
- **Log Group**: /ecs/phoneshop-taskdef

### IAM Roles

- **Task Role**: my-ecs-task-role
- **Execution Role**: my-ecs-task-role

Permissions include:
- ECR image pull
- CloudWatch Logs write access
- ECS task execution

## 🎨 Features in Detail

### Responsive Navigation

- Fixed header with brand logo
- Navigation menu with smooth hover effects
- Mobile-friendly responsive design

### Hero Section

- Eye-catching gradient background
- Clear call-to-action button
- Compelling value proposition

### Product Grid

- Responsive grid layout (auto-fit with minmax)
- Product cards with:
  - High-quality product images
  - Product name and pricing
  - Interactive "Add to Cart" buttons
  - Hover animations for better UX

### Styling Highlights

- Modern color scheme (dark theme with orange accents)
- Smooth transitions and hover effects
- Box shadows for depth
- Rounded corners for modern look
- Optimized for readability and accessibility

## 🔮 Future Enhancements

- [ ] Shopping cart functionality with local storage
- [ ] Product detail pages
- [ ] Search and filter capabilities
- [ ] User authentication and accounts
- [ ] Payment gateway integration
- [ ] Backend API with database
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking system
- [ ] Admin dashboard for inventory management
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Progressive Web App (PWA) features

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Kwasi**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Product images sourced from respective manufacturers
- Inspired by modern e-commerce design patterns
- Built with best practices for cloud-native applications

## 📞 Contact

For questions or feedback, please reach out through:
- GitHub Issues
- Email: your.email@example.com

---

⭐ If you found this project helpful, please consider giving it a star!

**Built with ❤️ using AWS, Docker, and GitHub Actions**
