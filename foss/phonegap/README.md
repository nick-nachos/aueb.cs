# aueb.cs/foss/phonegap

This is the workarea of the Adobe PhoneGap/Apache Cordova presentation for FOSS/AUEB.

## Setup dev environment

First, setup the basic development tools required:

1. Download and install [git], then add it to your PATH
2. Download and install [Node.js], then add it to your PATH
3. Install cordova:

    ```sh
    $ npm install -g cordova
    ```

Then you will need to install the platform specific tools/APIs in order to be able to build and deploy to your device (Android/iOS)

##### Android

1. Download and install the [Android SDK]. You don't need to download Android Studio, the standalone API will suffice.
2. Create the environment variable ANDROID_HOME and assign it to the path of the Android SDK folder
3. Run the Android SDK Manager ([sdk-home]/tools/android) and install:
    * Android SDK tools
    * Android SDK platform tools
    * Android SDK build tools
    * The Android API image used by cordova build (at the time of writing, cordova 6.0.0, which is the latest version, makes use of Android 6.0 (API 23)
    * Add [sdk-home]/tools and  [sdk-home]/platform-tools to your PATH
    
##### iOS _(applicable only to OSX platforms)_

1. Download and install [Xcode]
2. Install node module [ios-deploy], which allows for device deployment of cordova apps

    ```sh
    $ npm install -g ios-deploy
    ```

## Build instructions

1. Clone this repository to your local machine

    ```sh
    $ git clone https://github.com/nick-nachos/aueb.cs.git
    ```
    
2. Open a terminal in the directory [aueb.cs.git]/foss/phonegap/demo-notes
3. Install web project dependencies:
    
    ```sh
    $ npm install
    ```
    
4. Add the desired target platform (android/ios) to your cordova project
    
    ```sh
    $ cordova platform add <platform_name>
    ```
    
5. Build the platform (android/ios) to check that everything went OK
    
    ```sh
    $ cordova build <platform_name> --debug
    ```

## Deploy on device

If build was OK, then:

1. Connect your device to your computer via USB cable
    * Make sure for Android devices that you have enabled USB debugging from your phone's developer options.
2. Run the following command from a terminal within the [aueb.cs.git]/foss/phonegap/demo-notes directory:
    
    ```sh
    $ cordova run <platform_name> --device
    ```

Enjoy!

[Node.js]: <https://nodejs.org/en/download/>
[git]: <https://git-scm.com/downloads>
[Android SDK]: <http://developer.android.com/sdk/installing/index.html>
[Xcode]: <https://developer.apple.com/xcode/download/>
[ios-deploy]: <https://github.com/phonegap/ios-deploy>

