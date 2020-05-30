
# App usage guidelines

* When clicking the 'which item?' a list of items will be shown, select the item you want to add to your cart.
  * On mobile, if 'which item?' does not appear, it means the `baseUrl` in `a1-mobile/src/config.js` is not available.
  * On web, if 'which item?' appears with no items, it means the `baseUrl` in `src/config.js` is not available.
* Enter the quantity you want to add - bigger than 0
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

# To build mobile app

All mobile app code is under `a1-mobile` and all commands should be run from that folder.

Update `a1-mobile/src/config.js` to use the relevant baseUrl,
e.g, for production environment, use:
```
const BASE_URL = 'https://csc301-a1-nmab.herokuapp.com/api';
```

### Run mobile app in web browser
Run `ionic serve`

### Build apk file and install on device
Run `ionic capacitor build android`.

Under `./android/app/build/outputs/apk/debug` you will have `app-debug.apk`.

To install in emulator, drag the apk file to the emulator.

# Web development

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
