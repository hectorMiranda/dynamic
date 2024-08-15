# Dynamic Authentication Overview

## Introduction

Dynamic provides a versatile authentication framework that supports various user onboarding preferences, from traditional email and social media logins to advanced Web3 wallet integrations. This flexibility ensures a smooth and tailored onboarding process, enhancing user experience and increasing conversion rates.

## Authentication Methods

### 1. **Email Sign-Up**
Users can easily sign up using their email address, offering a familiar and straightforward method of authentication. This option can be enabled within your application's setup.

### 2. **Social Media Sign-Up**
Dynamic supports authentication via social media accounts, including Apple, Discord, Facebook, Github, Google, Telegram, Twitch, and Twitter. By configuring and enabling the desired social media providers, users can log in with their existing accounts, simplifying the sign-up process.

### 3. **SMS Sign-Up**
For users who prefer to use their phone numbers, SMS-based authentication is available. After enabling this option, users will receive a verification code via SMS to complete their sign-up.

### 4. **Branded Wallet Sign-Up**
Web3 wallet authentication allows users to log in using their blockchain-based wallets, supporting decentralized and secure identity management. To set this up, you can enable the necessary blockchain chains, configure RPC URLs, and toggle the wallet login option. Additional features such as multi-wallet support and network management can also be implemented as needed.

## Access Lists

Access lists or waitlists are essential tools for controlling access to your site or specific sections of it. With Dynamic, you can restrict access or return specific scopes within a JWT based on predefined criteria, such as user emails or wallet addresses. You can create and manage these lists within your application, ensuring that only authorized users gain access to your content.

For those needing more dynamic access control, the custom hook `useDynamicScopes` simplifies checking and validating user scopes, allowing you to tailor access based on user roles or status. Additionally, you can customize the access control messages and actions to enhance the user experience when access is restricted.

## JWTs/Authentication Tokens

JWTs (JSON Web Tokens) play a crucial role in user authentication, especially for server-side applications. These tokens can be stored securely in local storage or as HTTPOnly cookies, depending on your security needs. You can retrieve and verify JWTs using utility functions or directly from storage, ensuring that only authenticated users can access your application.

For enhanced security, JWTs can be validated server-side using public keys from a JWKS endpoint, providing a reliable method for verifying user identity and claims.

## Third-Party Authentication

Dynamic also supports third-party authentication, allowing integration with external authentication systems. This feature is ideal for enterprises that want to maintain their existing authentication methods while integrating Dynamic’s Web3 functionality. By using the `useExternalAuth` hook, you can sign in or link an external JWT to a Dynamic JWT, seamlessly connecting your users to your application.

## Cookie-Based Authentication

For applications requiring secure, cross-domain authentication, Dynamic offers cookie-based authentication. This method uses HttpOnly cookies to keep authentication tokens secure, allowing users to authenticate across subdomains without needing to log in multiple times. To implement this, you'll need to configure a custom subdomain and set up the necessary DNS records.

## Captcha Protection

To protect against bots and automated attacks, Dynamic supports hCaptcha integration. By setting up hCaptcha, you can add an additional layer of security to your authentication process, ensuring that only legitimate users can sign up and log in.

