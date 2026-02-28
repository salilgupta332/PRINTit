pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '683745388773'
        ECR_REPO = 'printit'
        IMAGE_TAG = "${BUILD_NUMBER}"

         ECR_FRONTEND = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/printit-frontend"
         ECR_BACKEND  = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/printit-backend"
         ECR_ADMIN    = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/printit-admin"
    }

    stages {

        stage("Checkout") {
            steps {
                git branch: 'main',
                    url: 'https://github.com/salilgupta332/PRINTit.git'
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
            sh "docker tag frontend:${IMAGE_TAG} ${ECR_FRONTEND}:${IMAGE_TAG}"
            sh "docker tag frontend:${IMAGE_TAG} ${ECR_FRONTEND}:latest"
            sh "docker tag backend:${IMAGE_TAG} ${ECR_BACKEND}:${IMAGE_TAG}"
            sh "docker tag backend:${IMAGE_TAG} ${ECR_BACKEND}:latest"
            sh "docker tag admin:${IMAGE_TAG} ${ECR_ADMIN}:${IMAGE_TAG}"
            sh "docker tag admin:${IMAGE_TAG} ${ECR_ADMIN}:latest"

            sh "docker push ${ECR_FRONTEND}:${IMAGE_TAG}"
            sh "docker push ${ECR_FRONTEND}:latest"
            sh "docker push ${ECR_BACKEND}:${IMAGE_TAG}"
            sh "docker push ${ECR_BACKEND}:latest"
            sh "docker push ${ECR_ADMIN}:${IMAGE_TAG}"
            sh "docker push ${ECR_ADMIN}:latest"
                }
            }
        }
    }
}