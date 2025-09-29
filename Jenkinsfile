pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/lsah62431/calculator-devops.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test:ci'
            }
            post {
                always {
                    junit 'coverage/clover.xml'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t calculator-devops .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
