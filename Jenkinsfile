pipeline {
    agent {
    label 'aws-agent'
    }


    stages {
        stage('build') {
            steps {
               sh 'mvn clean package'
            }
        }

        stage('test') {
            steps {
                echo "test in progress"
            }
        }

        stage('deploy') {
            steps {
                echo "deploy in progress"
            }
        }
    }
}
