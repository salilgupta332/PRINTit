pipeline {
    agent any
    tools {
        nodejs 'node18'
    }
    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '683745388773'
        ECR_REPO = 'printit'
        IMAGE_TAG = "${BUILD_NUMBER}"
        SCANNER_HOME = tool 'sonar-scanner'
        ECR_FRONTEND = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/printit-frontend"
        ECR_BACKEND = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/printit-backend"
         ECR_ADMIN    = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/printit-admin"
    }
    stages {
        stage("Checkout") {
            steps {
                git url: 'https://github.com/salilgupta332/PRINTit.git',  branch: 'dev'
            }
        }
        stage("Install Dependencies") {
            parallel {
                stage("Frontend Install") {
                    steps {
                        dir('frontend') {
                            sh "npm install"
                        }
                    }
                }
                stage("Backend Install") {
                    steps {
                        dir('backend') {
                            sh "npm install"
                        }
                    }
                }
                stage("Admin Install") {
                    steps {
                        dir('admin') {
                            sh "npm install"
                        }
                    }
                }
            }
        }
        stage('Build Applications') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        dir("frontend") {
                            sh "npm run build"
                        }
                    }
                }
                stage('Build Backend') {
                    steps {
                        dir("backend") {
                            sh "npm run build || true"
                        }
                    }
                }
                stage('Build Admin') {
                    steps {
                        dir("admin") {
                            sh "npm run build"
                        }
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            stages {
     
                stage('Frontend Scan') {
                    steps {
                        dir("frontend") {
                            withSonarQubeEnv('sonar-server') {
                                sh """
                                $SCANNER_HOME/bin/sonar-scanner \
                                -Dsonar.projectName=PrintIT-Frontend \
                                -Dsonar.projectKey=printit-frontend \
                                -Dsonar.sources=. \
                                -Dsonar.exclusions=node_modules/**,dist/**
                                """
                            }
                        }
                    }
                }
                stage('Backend Scan') {
                    steps {
                        dir("backend") {
                            withSonarQubeEnv('sonar-server') {
                                sh """
                                $SCANNER_HOME/bin/sonar-scanner \
                                -Dsonar.projectName=PrintIT-Backend \
                                -Dsonar.projectKey=printit-backend \
                                -Dsonar.sources=. \
                                -Dsonar.exclusions=node_modules/**
                                """
                            }
                        }
                    }
                }
                stage('Admin Scan') {
                    steps {
                        dir("admin") {
                            withSonarQubeEnv('sonar-server') {
                                sh """
                                $SCANNER_HOME/bin/sonar-scanner \
                                -Dsonar.projectName=PrintIT-Admin \
                                -Dsonar.projectKey=printit-admin \
                                -Dsonar.sources=. \
                                -Dsonar.exclusions=node_modules/**
                                """
                            }
                        }
                    }
                }
                }
            
        }
        stage("Build Images") {
            steps {
                script {
                    dir('frontend') {
                        sh "docker build -t frontend:${IMAGE_TAG} ."
                    }
                    dir('backend') {
                        sh "docker build -t backend:${IMAGE_TAG} ."
                    }
                    dir('admin') {
                        sh "docker build -t admin:${IMAGE_TAG} ."
                    }
                }
            }
        }
        stage('Login to AWS ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | \
                        docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                    """
                }
            }
        }
        stage('Push Images to ECR') {
            steps {
                script {
                    echo "Tagging and pushing images to ECR..."
                    echo "Tagging frontend image..."
                    sh "docker tag frontend:${IMAGE_TAG} ${ECR_FRONTEND}:${IMAGE_TAG}"
                    sh "docker tag frontend:${IMAGE_TAG} ${ECR_FRONTEND}:latest"

                    echo "Tagging backend image..."
                    sh "docker tag backend:${IMAGE_TAG} ${ECR_BACKEND}:${IMAGE_TAG}"
                    sh "docker tag backend:${IMAGE_TAG} ${ECR_BACKEND}:latest"
                    echo "Tagging admin image..."
                    sh "docker tag admin:${IMAGE_TAG} ${ECR_ADMIN}:${IMAGE_TAG}"
                    sh "docker tag admin:${IMAGE_TAG} ${ECR_ADMIN}:latest"

                    echo "Pushing images to ECR..."
                    
                    echo "Pushing frontend image..."
                    sh "docker push ${ECR_FRONTEND}:${IMAGE_TAG}"
                    sh "docker push ${ECR_FRONTEND}:latest"

                    echo "Pushing backend image..."
                    sh "docker push ${ECR_BACKEND}:${IMAGE_TAG}"
                    sh "docker push ${ECR_BACKEND}:latest"

                    echo "Pushing admin image..."
                    sh "docker push ${ECR_ADMIN}:${IMAGE_TAG}"
                    sh "docker push ${ECR_ADMIN}:latest"
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}