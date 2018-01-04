# js-dev-environment
JavaScript Development Starter Kit

It is advised that you use Visual Studio Code as your code editor.

------------
REQUIREMENTS
------------

[1] GitHub Account For Making Changes To The GitHub Repository
[2] Git
[3] Visual Studio Code
[4] Editorconfig Plug-in For Visual Studio Code
[5] Python 2.7 is installed at C:\python27.
[6] On windows use an elevated command prompt and type:

    - npm install --global --production windows-build-tools

---------------------------------------------------
TO INITIALISE THE PROJECT AFTER CLONING FROM GITHUB
---------------------------------------------------

Open up a terminal window and type:

npm install

This will install all the required dependencies and development dependencies.

--------------------------------------------------
SWITCHING BETWEEN DEVELOPMENT AND PRODUCTION BUILD
--------------------------------------------------

Open the file 'buildScripts/build.js', and modify the following line:

-- For development build: process.env.NODE_ENV = 'development';

-- For production build: process.env.NODE_ENV = 'production';

---------------------------------
TO RUN THE PROGRAM IN THE BROWSER
---------------------------------

Open up a terminal window and type:

npm start -s

The default URL is:

https://localhost:3000

This command also performs a secrity check on your code, and alerts you to your vulnerability status.

---------------------------
TO SHARE WORK ON PUBLIC URL
---------------------------

Open a terminal window and type:

npm run share

The default URL will be:

https://yewtree.localtunnel.me

This command also performs a secrity check on your code, and alerts you to your vulnerability status.

----------------------------
TO WATCH FILES AND LINT THEM
----------------------------

To watch files and lint them, open a terminal window and type:

npm run lint:watch

----------------------
CONTINUOUS INTEGRATION
----------------------

The development environment has been configured to work with a Linux CI server called Travis CI, and a Windows CI server called Appveyor.

The configuration file for Travis CI is .travis.yml.

The configuration file for Appveyr CI is appveyor.yml.

At the moment, I am unable to get TeamCity to pick up the build file automatically. So I have had to add a build step manually. The build step settings are:

- Runner Type                       : Command Line
- Step Name                         : tests with security check.
- Execute Step                      : If all previous steps finished successfully.
- Working Direcory                  : <LocalDrive>:\<LocalRepository>
- Run                               : Custom Script
- Custom Script                     : <LocalDrive>:\<LocalRepository>
                                      npm run test:security-check -s
- Format STDERR Output As           : Warning
- Run Step Within Docker Container  :

---------------------
LOGGING USING TRACKJS
---------------------

To enable online logging of your application, uncomment the following line in the file 'webpack.config.prod.js', and replace '<YOUR_TRACKJS_TOKEN_HERE>' with your TrackJS token:

//trackJSToken: '<YOUR_TRACKJS_TOKEN_HERE>'