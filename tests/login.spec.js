const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { DashboardPage } = require('../pages/dashboard/dashboard-page');

test('ON-8 Login with an email address', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.enterEmail(process.env.LOGIN_EMAIL);
  await loginPage.enterPwd(process.env.LOGIN_PWD);
  await loginPage.clickLoginButton();
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.isHeaderDisplayed('Projects');
});

test('ON-13 Login with invalid email address', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.enterEmail('test@com');
  await loginPage.enterPwd(process.env.LOGIN_PWD);
  await loginPage.isEmailInputErrorDisplayed('Enter a valid email please');
  await loginPage.isLoginButtonDisplayed();
  await loginPage.isLoginButtonDisabled();
});

test('ON-14 Login with no password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.enterEmail(process.env.LOGIN_EMAIL);
  await loginPage.clickPwdInput();
  await loginPage.clickHeader();
  await loginPage.isLoginButtonDisplayed();
  await loginPage.isLoginButtonDisabled();
});

test('ON-15 Login with incorrect password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.enterEmail(process.env.LOGIN_EMAIL);
  await loginPage.enterPwd('11223344');
  await loginPage.clickLoginButton();
  await loginPage.isLoginErrorMessageDisplayed('Email or password is incorrect.');
});
