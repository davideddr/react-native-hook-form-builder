# React Native Hook Form Builder

Simple and configurable form builder with react native components build with:

![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg) ![MIT License](https://img.shields.io/npm/l/@react-native-community/slider.svg)

[![develop: React Hook Form](https://img.shields.io/badge/develop-🧾%20React%20Hook%20Form-2d2d2d.svg)](https://github.com/react-hook-form/react-hook-form)
[![develop: Yup](https://img.shields.io/badge/validation%20schema-🚨%20Yup-2d2d2d.svg)](https://github.com/jquense/yup)
[![develop: Lottie](https://img.shields.io/badge/animations-🍭%20Lottie-2d2d2d.svg)](https://github.com/react-native-community/lottie-react-native)

## Getting started

```bash
yarn add react-native-hook-form-builder
```

or

```bash
npm install react-native-hook-form-builder
```

Follow the installation instructions of the dependencies:

- [Datetimepicker](https://github.com/react-native-community/react-native-datetimepicker)
- [Lottie](https://github.com/react-native-community/lottie-react-native)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

## General Usage

```js
import Form from "react-native-hook-form-builder";
```

or

```js
const Form = require("react-native-hook-form-builder");
```

### Base usage

```js
import React from "react";
import { Alert, Text, SafeAreaView, ScrollView } from "react-native";
import Form from "react-native-hook-form-builder";
// JSON WITH FORM CONFIGURATION
import appFormConfig from "../../utils/appFormConfig.json";
// CUSTOM FORM STYLE
import formStyle from "../../utils/formStyle";

export default class App extends React.Component {
  onSubmit = data => Alert.alert("Form Data", JSON.stringify(data));

  onChangeCustom = (field, value) => {
    if (field === "firstName") {
      return value.toUpperCase();
    }
    return value;
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Text>Form Builder!</Text>
          <Form
            formConfig={appFormConfig}
            mode="onBlur"
            onSubmit={this.onSubmit}
            onChangeCustom={this.onChangeCustom}
            customStyles={formStyle}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
```

## Props

### `formConfig (required)`

JSON file with form configuration from a static file or via API.

### `mode`

Event to trigger the submit of the form.
Possible values are:

- `"onSubmit"`
- `"onBlur"`
- `"onChange"`

You can find more informations about the [React Hook Form](https://github.com/react-hook-form/react-hook-form) configuration at this [page](https://react-hook-form.com/api/#useForm).

### `onSubmit (required)`

This function is called when submit the form.

### `onChangeCustom`

This function is called before set value of the field.

### `customStyles`

JSON file with the custom style rules.

In the `lib/utils/formStyle.js` file there is the list with the possible values to override.

You can override a single filed style by adding the name of the configuration in the end of the name.

For example if you have a filed with name `email` and i you want to change the style of the input text only for this element in the custom styles file you can add `inputTextEmail` key with the custom style rules.

```js
const formStyle = {
  inputText: {
    color: "red",
    marginBottom: 10
  }
};

export default formStyle;
```

## Configuration

Supported type of fileds:

- email
- password
- text
- date
- select
- checkbox
- radio

You can dinamicaly show/hide fields via `showIf` property.

In the value you have to add the name of the field you want to watch and the corrispondent value. Es=`"showIf": "terms-and-conditions=true"` to show a field when terms and conditions are accepted.

## Example

<details><summary>Example with a registration form</summary>

```json
{
  "showSubmit": true,
  "submitText": {
    "it": "Invia",
    "en": "Send",
    "default": "Submit"
  },
  "groups": [
    {
      "label": {
        "it": "Dati utente",
        "en": "User data",
        "default": "User data"
      },
      "children": [
        {
          "type": "email",
          "name": "email",
          "autoCompleteType": "email",
          "keyboardType": "email-address",
          "textContentType": "emailAddress",
          "changeBackgroundOnFocus": true,
          "required": false,
          "icon": "at",
          "label": {
            "it": "email",
            "en": "email",
            "default": "email"
          },
          "placeholder": {
            "it": "Inserisci la tua email",
            "en": "Insert your email",
            "default": "Insert your email"
          },
          "validations": [
            { "name": "string" },
            { "name": "required", "params": { "message": "Test" } },
            { "name": "email" }
          ],
          "showIf": "terms-and-conditions=true"
        },
        {
          "type": "text",
          "name": "username",
          "autoCompleteType": "email",
          "keyboardType": "email-address",
          "textContentType": "emailAddress",
          "required": false,
          "iconLeft": "at",
          "label": {
            "it": "Username",
            "en": "Username",
            "default": "Username"
          },
          "placeholder": {
            "it": "Username placeholder",
            "en": "Username placeholder",
            "default": "Username placeholder"
          },
          "validations": [
            { "name": "string" },
            { "name": "required", "params": { "message": "Test" } },
            { "name": "email" }
          ]
        },
        {
          "type": "password",
          "name": "password",
          "autoCompleteType": "password",
          "textContentType": "password",
          "secureTextEntry": true,
          "required": false,
          "iconLeft": "lock",
          "label": {
            "it": "Password",
            "en": "Password",
            "default": "Password"
          },
          "placeholder": {
            "it": "Password",
            "en": "Password",
            "default": "Password"
          },
          "validations": [
            { "name": "string" },
            { "name": "required" },
            { "name": "min", "params": { "limit": 6 } }
          ]
        },
        {
          "type": "password",
          "name": "password-confirmation",
          "autoCompleteType": "password",
          "textContentType": "password",
          "secureTextEntry": true,
          "required": false,
          "iconLeft": "lock",
          "label": {
            "it": "Password Confirmation",
            "en": "Password Confirmation",
            "default": "Password Confirmation"
          },
          "passwordConfirmationMessage": {
            "it": "Le password devono coincidere",
            "en": "Passwords must match",
            "default": "Passwords must match"
          },
          "placeholder": {
            "it": "Password Confirmation",
            "en": "Password Confirmation",
            "default": "Password Confirmation"
          },
          "validations": [
            { "name": "string" },
            { "name": "required" },
            { "name": "min", "params": { "limit": 6 } }
          ]
        }
      ]
    },
    {
      "label": {
        "it": "Informazioi personali",
        "en": "Informazioi personali",
        "default": "Informazioi personali"
      },
      "children": [
        {
          "type": "text",
          "name": "firstName",
          "required": false,
          "label": {
            "it": "Nome",
            "en": "First name",
            "default": "First name"
          },
          "placeholder": {
            "it": "Nome",
            "en": "First name",
            "default": "First name"
          }
        },
        {
          "type": "text",
          "name": "lastName",
          "required": false,
          "label": {
            "it": "Cognome",
            "en": "Last name",
            "default": "Last name"
          },
          "placeholder": {
            "it": "Cognome",
            "en": "Last name",
            "default": "Last name"
          }
        },
        {
          "type": "date",
          "name": "birthdayDate",
          "required": false,
          "label": {
            "it": "Data di nascita",
            "en": "Birthday date",
            "default": "Birthday date"
          },
          "placeholder": {
            "it": "Data di nascita",
            "en": "Birthday date",
            "default": "Birthday date"
          },
          "minimumDate": "2019-10-25",
          "maximumDate": "2019-10-30",
          "iconRight": "arrow-down",
          "iconSize": 15,
          "iconColor": "#000"
        },
        {
          "type": "select",
          "name": "age",
          "required": false,
          "label": {
            "it": "Etá",
            "en": "Age",
            "default": "Age"
          },
          "confirmLabel": {
            "it": "Conferma",
            "en": "Done",
            "default": "Done"
          },
          "placeholder": {
            "it": "Etá",
            "en": "Age",
            "default": "Age"
          },
          "items": [
            { "label": "18", "value": 18 },
            { "label": "19", "value": 19 },
            { "label": "20", "value": 20 },
            { "label": "21", "value": 21 },
            { "label": "22", "value": 22 }
          ],
          "validations": [
            { "name": "string" },
            { "name": "required" }
          ],
          "iconRight": "arrow-down",
          "iconSize": 15,
          "iconColor": "#000"
        },
        {
          "type": "select",
          "name": "sex",
          "required": false,
          "label": {
            "it": "Sesso",
            "en": "Sex",
            "default": "Sex"
          },
          "confirmLabel": {
            "it": "Conferma",
            "en": "Done",
            "default": "Done"
          },
          "placeholder": {
            "it": "Sesso",
            "en": "Sex",
            "default": "Sex"
          },
          "items": [
            { "label": "Male", "value": "m" },
            { "label": "Female", "value": "f" },
            { "label": "Other", "value": "o" }
          ]
        },
        {
          "type": "checkbox",
          "name": "privacy",
          "required": true,
          "label": {
            "it": "Privacy",
            "en": "Privacy",
            "default": "Privacy"
          },
          "text": "Privacy text",
          "buttonAcceptLabel": "Accept",
          "buttonDeclineLabel": "Decline",
          "validations": [
            { "name": "bool" },
            { "name": "required" }
          ]
        },
        {
          "type": "checkbox",
          "name": "terms-and-conditions",
          "required": true,
          "label": {
            "it": "Terms",
            "en": "Terms",
            "default": "Terms"
          },
          "text": "Terms text",
          "buttonAcceptLabel": "Accept",
          "buttonDeclineLabel": "Decline",
          "validations": [
            { "name": "bool" },
            { "name": "required" }
          ]
        },
        {
          "type": "radio",
          "name": "newsletter",
          "label": {
            "it": "Newsletter",
            "en": "Newsletter",
            "default": "Newsletter"
          },
          "items": [
            { "label": "Yes", "value": true },
            { "label": "No", "value": false }
          ]
        }
      ]
    }
  ]
}
```
</details>

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/davideddr">
        <img src="https://avatars2.githubusercontent.com/u/7225305?v=4" width="120px;" style="border-radius: 50%" alt="Davide Da Rech"/>
        <br />
        <sub><b>Davide Da Rech</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/mattska">
        <img src="https://avatars2.githubusercontent.com/u/58304782?v=4" width="120px;" style="border-radius: 50%" alt="Mattia Scagno"/>
        <br />
        <sub><b>Mattia Scagno</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ketz86">
        <img src="https://avatars0.githubusercontent.com/u/11291190?v=4" width="120px;" style="border-radius: 50%" alt="Davide Luchetta"/>
        <br />
        <sub><b>Davide Luchetta</b></sub>
      </a>
    </td>
  </tr>
</table>
<!-- ALL-CONTRIBUTORS-LIST:END -->
