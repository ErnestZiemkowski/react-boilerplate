# Getting Started with react-boilerplate

This project is a boilerplate application ready to be used to develop any UI with pre-defined configuration containing:

- React
- Redux
- GraphQL
- Apollo client
- I18n
- Docker
- Cypress
- Sass
- Nginx

## Basic configuration:

In order to make this project work correctly you need to:

- Fill environment variables inside of `.env` that will point requests to particular API URL
- Change git remote
- Define all the variables inside of `.gitlab-ci.yml` that will define to which services should point the CI/CD pipeline (assuming that you will use AWS ECR & AWS ECS)
- Make sure to assign correct environment varialbes to GitLab Project space in order to make CI/CD sucessfully build

Note: After you manage to successfully build this project and host it in a cloud, the Nginx will prevent from unprivliged access with its default authentication. In order to access this resource you should provide the credentials which you can either get from the author or generate these credentials by your own https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/.
