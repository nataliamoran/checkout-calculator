
# App video presentation
Web Desktop: https://youtu.be/hEerC0v8Leo

Web Tablet/Mobile: https://youtu.be/OENyNA1mKvo

Mobile: https://youtu.be/Nyif3UUj6Dg

# App usage guidelines

* When clicking the 'which item?' a list of items will be shown, select the item you want to add to your cart.
  * On mobile, if 'which item?' does not appear, it means the `baseUrl` in `a1-mobile/src/config.js` is not available.
  * On web, if 'which item?' appears with no items, it means the `baseUrl` in `src/config.js` is not available.
* Enter the quantity you want to add - more than 0
* Click 'add item' to add the item to the cart
  * An error message will be shown if item or quantity are not chosen
  * An error message will be shown if quantity is smaller than 1
  * An error message will be shown if item type is already added to cart
* You should see the items added to the cart
* If you wish to remove an item from the cart, click the remove button.
* After finalizing your cart, enter the desired discount - a number between 0-1.
* Click checkout
  * An error message will be shown if discount is not between 0-1
  * See the calculation for your order
* To start a new calculation, click 'start new cart'.

# Mobile app

All mobile app code is under `a1-mobile` and all commands should be run from that folder.

Production APK is under `a1-mobile/apk`

To install in emulator, drag the apk file to the emulator.

### Base URL

Update `a1-mobile/src/config.js` to use the relevant baseUrl,
e.g, for production environment, use:
```
const BASE_URL = 'https://csc301-a1-nmab.herokuapp.com/api';
```

### Run mobile app in web browser
Run `ionic serve`

### Build apk file 
Run `ionic capacitor build android`.

Under `./android/app/build/outputs/apk/debug` you will have `app-debug.apk`.


# Web app - local development

## Available Scripts

In the project directory, you can run:

### `npm run server`

Builds the frontend and serves the backend API server.
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

This depends on `npm run server` being run in another tab, because the frontend makes calls to localhost:5000 to obtain the items and cart products

### `npm run lint`

Runs eslint using the AirBnB presets to ensure that code is consistent and conforms with JavaScript best practices across the entire repository.

### `npm test`

Launches the frontend test runner in the interactive watch mode (using the Jest test runner).
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Once the interactive watch mode is completed, it will run the backend tests.

### `npm run test:server

Runs all the backend tests using the Jest test runner. To add more tests, add files in the `server/__tests__` folder.

Backend tests use the supertest library, which test all the endpoints of the API

### `npm run clean`

Deletes the `build` folder as a precaution.

### `npm run build`

Builds the frontend app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

The `npm run clean` task is configured as a prebuild task, in order to delete the `build` folder as a precaution.

### `npm run ci`

Attempts to build the application, lint the entire codebase, and to run both the frontend and backend tests.

It sets the CI environment variable to true so that tests are not run in watch mode (and they run once and terminate).

# Web app - CI/CD

The web app uses Github Actions for CI/CD. See the `.github/workflows` folder for the workflow tasks

## web-ci

The web-ci action runs `npm install` and `npm run ci` on every pull request to master

## deploy-staging

The deploy-staging action will deploy the master branch to the staging server, named `afternoon-brook-48620` on heroku (https://afternoon-brook-48620.herokuapp.com/)

The trigger for deploy-staging is any new commits on the master branch. Because we have agreed to never push directly to master and only merge branches to master through pull requests, this will result in an automated deployment to the staging server whenever new code is pushed to master

## deploy-prod

The deploy-prod action will deploy the master branch to the prod server, named `csc301-a1-nmab` on heroku (https://csc301-a1-nmab.herokuapp.com/)

The trigger for deploy-prod is a new tag on the master branch. We have agreed to create tags through the Github releases feature. This means that any time a new release is created in github, a new git tag will be created, which will result in a new deployment to the production server.

We elected to choose git tags to allow for a simpler branching flow and to force us to keep staging and master closer to each other.
