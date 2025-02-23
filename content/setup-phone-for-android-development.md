---
title: Setting Up Physical device for Android Development
date: 2023-03-02T18:30:00.000Z
tags:
    - ADB
    - Android development
    - Android SDK
    - Android Studio
    - command line tools
    - developer options
    - Expo CLI
    - hybrid technologies.
    - Linux
    - physical device setup
    - React Native
    - USB debugging
categories:
    - ADB
    - Android Development
    - Android Studio
    - Developer Options
    - Expo CLI
    - Hybrid Technologies
    - Linux Development
    - Mobile Development
    - Physical Device Setup
    - React Native
description: Learn how to set up a physical device for Android development on Linux with our step-by-step guide for a smooth development experience.
---

# Connecting a Physical device for Android Development in Linux

Native Android development could be a resource heavy job for old devices running light-weight linux. A nice alternative for that could be hybrid technologies like react-native which is light on resources when served as a web app or connected to a physical device (which in my opinion is better). Following are the steps needed to setup a development environment.

## Prerequisites for Android Development
The things needed before setting up a project are as follows,

1. Android Studio
2. Android SDK
3. CMDLine Platform Tools
4. An android device

#### 1. Android Studio
Install Android studio from the package manager of your choice, almost all major distributions ship android studio in their package repository, so it shouldn't be a problem to fine out.

Once installed, remember to export android studio's path by adding 
`ANDROID_SDK=<install path of android-studio>` 
at the end of your `.bashrc` file. Restart the terminal (or you can source into the update config if you're familiar with that).

#### 2. Android SDK
Once android studio is installed, opening a fresh install would prompt to install platform SDK. This is a crucial step in the process. Remember to install the SDK level of the physical device you're planning to connect to the system, only then will the device connect for live development.

#### 3. Command Line Tools
After setting up android studio, we need to gain access to adb(android debugger). To do that, you should once again go to your packager manager and look for `android-sdk-platform-tools`. Installing that should provide you with a few CMD line tools.

#### 4. Android Device
You need to enable developer options in your android device before you can connect to the system.
To do that, open `Settings>About Phone` or `Settings>System>About Phone`, If you scroll the resulting screen to bottom you'll find `Build Number`, tap on it for 7 times, your device will prompt that you have enabled developer options, to confirm this, you'll find a new option `Developer Options` listed in your `Settings`. 
Inside `Developer Options` screen you'll find a toggle switch to on/off the developer options. You'll also find an option `USB Debugging` in that screen, which you'll need to enable.

Once you've enabled developer options, you can proceed with connecting your device to the development system with a USB. Sometimes, your device will prompt to enable `USB Debugging` when connecting to a system, even after enabling in the developer options, go ahead and click `Ok`.

## Steps for Setting up the System
After connecting the device to the system, check if `adb` can detect the device, using the following the command in your terminal.
>`adb devices`

It should provide a list of devices, with custom identifiers, if only one android device is connect it should list only one. If not listed, check if your device is properly connect using the command,
>`lsusb`

which should list the devices connected to the system, in which you'll find your device's manufacturer name. If you don't find your device's manufacturer name, check the connectivity of your device to the system.

If `adb` has no problem listing your device, we need to map you device to the system via reverse tcp which you can do by the following command,
>`adb -s <your-device-name> reverse tcp:8081 tcp:8081`

Replace your device name with the name list by `adb` in the previous command. If this doesn't throw any error, we're all set for development.

## Creating an Empty Project with Expo-CLI
Let's create a react-native project and test out our setup. We'll use the expo cli to create the project.
> `npx expo init`

This will follow with a few prompts, once done, will leave you with a project directory. Now navigate into the project and run the command,
>`npm run android`

This will start an expo developer tools tab in your default browser. In this web app, under connections, switch the connection type to `local` and click on `Run on Android Device/emulator`. If all previous setup went right, this will install a container app `Expo Go` in your android device and open the current project inside that app.

Open the project in your favourite  editor and hack away.

Happy Hacking! :-)