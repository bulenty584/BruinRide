# Installation Guidelines 

1. Clone the repo using git clone. This might take a while since we have a large codebase with dependencies.

2. Next we have to get into the actual folder to run our React App. To do so open a Terminal and type in the following commands:
   
```bash
# Change directory to BruinRide
cd BruinRide

# Change directory to bruin_ride
cd bruin_ride

# Install npm dependencies
npm install

# Start the React App
npm start
```
3. For the cloud functions to work properly you must register your own configuration file. This can be done by generating such a file from firebase cloud itself, and then moving the file into the backend directory where the <i>index.js</i> file is located with the cloud functions. Using the firebase cloud function CLI, you can deploy them yourself.

4. The App should work now. Happy travels :)
