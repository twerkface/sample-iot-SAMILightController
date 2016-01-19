# Control an LED using Android App via SAMI

Build a remote light control system using SAMI, LED, Raspberry Pi, and an Android application. The system contains the following components:

 - An IoT device that acts on received commands, turn on/off the LED, and finally sends back the latest state.
 - An Android application that sends commands to the device and displays the latest state of the device.

Introduction
-------------

The tutorial [Your first IoT remote control system](https://developer.samsungsami.io/sami/tutorials/your-first-iot-control-system.html) at http://developer.samsungsami.io/ describes what the system does and how it is implemented.

This repository contains the following software:

 - A Node.js script running on the Raspberry Pi
 - An Android application running on the Android phone

Android Application
-------------

The root directory of the application is `sample-android-SAMIIoTSimpleController`.

Consult [set up the Android project](https://developer.samsungsami.io/sami/tutorials/your-first-iot-control-system.html#set-up-the-android-project) in the tutorial to learn the prerequisites and installation steps.

Nodejs Program for Raspberry Pi
-------------

The code is located in `raspberrypi` directory. Consult [Set up the Raspberry Pi](https://developer.samsungsami.io/sami/tutorials/your-first-iot-control-system.html#set-up-the-software) in the tutorial to install the packages and to run the program on the Pi.

More about SAMI
---------------

If you are not familiar with SAMI, we have extensive documentation at http://developer.samsungsami.io

The full SAMI API specification with examples can be found at http://developer.samsungsami.io/sami/api-spec.html

Peek into advanced sample applications at https://developer.samsungsami.io/sami/samples/

To create and manage your services and devices on SAMI, visit developer portal at http://devportal.samsungsami.io

License and Copyright
---------------------

Licensed under the Apache License. See LICENSE.

Copyright (c) 2016 Samsung Electronics Co., Ltd.
