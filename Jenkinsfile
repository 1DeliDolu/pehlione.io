pipeline {
  agent any

  tools {
    nodejs 'NodeJS'
  }

  options {
    disableConcurrentBuilds()
  }

  parameters {
    booleanParam(
      name: 'RUN_E2E',
      defaultValue: false,
      description: 'Run Playwright E2E tests. Requires browser dependencies on the Jenkins agent.'
    )

    booleanParam(
      name: 'DEPLOY_TO_GH_PAGES',
      defaultValue: false,
      description: 'Deploy dist output to the gh-pages branch for pehlione.com. Use only from main.'
    )
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Verify toolchain') {
      steps {
        sh '''
          set -eu

          echo "Node version:"
          node --version

          echo "npm version:"
          npm --version

          node - <<'NODE'
          const [major, minor] = process.versions.node.split('.').map(Number)

          if (major < 22 || (major === 22 && minor < 12)) {
            console.error(`Node.js >=22.12.0 is required. Current: ${process.versions.node}`)
            process.exit(1)
          }

          console.log(`Node.js version OK: ${process.versions.node}`)
NODE
        '''
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Typecheck') {
      steps {
        sh 'npm run typecheck'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('E2E tests') {
      when {
        expression {
          return params.RUN_E2E
        }
      }
      steps {
        sh '''
          npx playwright install chromium firefox
          npm run test:e2e
        '''
      }
    }

    stage('Deploy to gh-pages') {
      when {
        expression {
          return params.DEPLOY_TO_GH_PAGES
        }
      }
      steps {
        withCredentials([
          usernamePassword(
            credentialsId: 'github-pages-token',
            usernameVariable: 'GIT_USERNAME',
            passwordVariable: 'GIT_TOKEN'
          )
        ]) {
          sh '''
            set -eu

            git fetch origin main

            CURRENT_COMMIT="$(git rev-parse HEAD)"
            MAIN_COMMIT="$(git rev-parse origin/main)"

            if [ "$CURRENT_COMMIT" != "$MAIN_COMMIT" ]; then
              echo "Refusing to deploy: current commit is not origin/main."
              echo "Current: $CURRENT_COMMIT"
              echo "origin/main: $MAIN_COMMIT"
              exit 1
            fi

            git config user.name "Jenkins"
            git config user.email "jenkins@pehlione.com"

            git remote set-url origin "https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/1DeliDolu/pehlione.io.git"

            touch dist/.nojekyll

            npm run deploy -- \
              --cname pehlione.com \
              -u "Jenkins <jenkins@pehlione.com>" \
              -m "ci: deploy pehlione.com from Jenkins build ${BUILD_NUMBER}"
          '''
        }
      }
    }
  }

  post {
    success {
      echo 'Jenkins pipeline completed successfully.'
    }

    failure {
      echo 'Jenkins pipeline failed. Check the stage logs above.'
    }

    always {
      archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
    }
  }
}
